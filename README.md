# Exercicio MongoDB - Relacionamentos

## Pré-Requisito
Ter o docker de exemplo da aula 08 criado, pois este database usa este docker

## Criar a base de dados
docker exec -i aula08-mongo mongosh < scripts/script_execucao.js

## Validar se os dados existem (Deve retornar 12)
docker exec aula08-mongo mongosh --quiet --eval \ 'db.getSiblingDB("rede_leitura").livros.countDocuments()'

## Entregas
### Parte 1 — Modelagem de relacionamentos
#### 1.1 — Decisões embed × referência
1. Lista de coleções
  - usuario
  - livro
  - resenha
  - comentario
  - seguir

2. Exemplos de documentos
- Disponível no script de apoio ou na base de dados, em caso de ter executado o script, mas vou descrever o primeiro regostro das coleções:
  - usuario
  ```js
  {
    _id: ObjectId("000000000000000000000001"),
    nome: "Ana Silva",
    email: "ana@email.com",
    bio: "Apaixonada por fantasia",
    foto: "https://img.com/ana.jpg",
    data_cadastro: ISODate("2024-01-10"),
    estante: {
      lido: [ObjectId("100000000000000000000001")],
      lendo: [],
      quero_ler: [ObjectId("100000000000000000000002")]
    }
  }
  ```

  - livro
  ```js
  {
    _id: ObjectId("100000000000000000000001"),
    titulo: "O Hobbit",
    autores: ["J.R.R. Tolkien"],
    editora: "HarperCollins",
    ano: 1937,
    generos: ["Fantasia"],
    isbn: "9780000000001",
    sinopse: "Um hobbit sai em uma aventura inesperada."
  }
  ```
  - resenha
  ```js
  {
    _id: ObjectId("200000000000000000000001"),
    usuario_id: ObjectId("000000000000000000000001"),
    livro_id: ObjectId("100000000000000000000001"),
    nota: 5,
    texto: "Livro incrível!",
    data: ISODate("2025-01-01"),
    curtidas: 10
  }
  ```
  - comentario
  ```js
  {
    _id: ObjectId("300000000000000000000001"),
    resenha_id: ObjectId("200000000000000000000001"),
    usuario_id: ObjectId("000000000000000000000002"),
    texto: "Concordo totalmente!",
    data: ISODate("2025-01-02")
  }
  ```
  - seguir
  ```js
  {
    _id: ObjectId("400000000000000000000001"),
    usuario_id: ObjectId("000000000000000000000001"),
    seguidor_id: ObjectId("000000000000000000000002"),
    data: ISODate("2025-01-05")
  }
  ```

3. Decisões de modelagem (embed vs referência)<br>

**(a) Usuário ↔ perfil/foto/configurações**
* Decisão: EMBEDDING
* Justificativa: Por se trata de uma relação é 1:1 e os dados são sempre acessados juntos. Embutir evita necessidade de joins e melhora a performance de leitura. O tamanho do documento é pequeno, logo não há risco com relação ao limite de 16MB do documento.

**(b) Resenha ↔ comentários**<br>
* Decisão: REFERÊNCIA
* Justificativa: Apesar de poder começar como 1:poucos, comentários podem crescer sem limite em resenhas populares. Embutir poderia causar crescimento descontrolado do documento. Além disso, comentários são frequentemente acessados separadamente (paginação), o que favorece coleção própria.

**(c) Livro ↔ resenhas**<br>
* Decisão: REFERÊNCIA
* Justificativa: Como a cardinalidade é de 1:muitos, ela pode crescer muito. Embutir resenhas dentro do livro poderia violar o limite de tamanho e prejudicaria a performance de escrita. Separar permite melhor performance, neste caso e poderia escalar mais facilmente.

**(d) Usuário ↔ livros nas estantes**<br>
* Decisão: EMBEDDING (com referência de IDs)
* Justificativa: A estante pode ser acessada junto com o usuário, o que favorece embedding. São armazenados apenas os ObjectId dos livros, mantendo o documento leve e facilitando futuras manutenções. Apesar de ser N:N, o crescimento é controlado .

**(e) Usuário ↔ usuários (seguir)**<br>
* Decisão: REFERÊNCIA (coleção própria)
* Justificativa: Trata-se de um relacionamento N:N. O número de conexões pode crescer muito (usuários com milhares de seguidores). Embutir isso no documento de usuário causaria crescimento descontrolado, perda de performance e possibilidade de extrapolar a capacidade de armazenamento do documento. A coleção separada permite escalabilidade e consultas eficientes.

#### 1.2 — Cardinalidade que muda a decisão
A decisão entre embedding e referência pode mudar muito conforme o volume de dados cresce. Isso se dá por causa do limite rígido de armazenamento por documento no formato BSON e a degradação de performance em arrays muito grandes com os dados aninhados.

Para o relacionamento (c) Livro ↔ resenhas:<br>
1. Cenário de um livro comum (dezenas de resenhas):<br>
Se a aplicação tiver vínculo apenas com livros de pouco conhecidos ou pouco comentados, a estratégia ideal seria o Embedding. Isso se dá porque ao acessar a página do livro, já traríamos todas as resenhas em uma única solicitação (Request) ao banco de dados, sem necessidade de $lookup ou múltiplas consultas.

2. Cenário de um outlier ou best-seller (centenas de milhares de resenhas):<br>
Se tratarmos grandes sucessos, fazer embadding das resenhas é inviável. O array incharia até estourar o limite de 16MB do documento no MongoDB, causando problemas de persistêncoa de dados além de fazer a leitura do documento muito lenta e pesada para trafegar na rede.

**O Schema Design Pattern que resolve esse caso**<br>
Para suportar tanto livros com poucas resenhas quanto grandes sucessos com milhares de resenmhas, a melhor abordagem é utilizar o Subset Pattern.<br>

Quando um usuário abre a página do livro, o MongoDB retorna 1 único documento leve, que já inclui as 5 principais resenhas para exibição imediata na tela, garantindo performance. Se o usuário quiser ler mais resenhas, ele clica em "Ver próximas", e a aplicação faz uma segunda query separada e paginada na coleção de resenhas.

#### 1.3 — N:N: de que lado guardar a referência?
A melhor abordagem para o relacionamento Usuário ↔ seguir é utilizar uma coleção extra de ligação (collection: seguir), em vez de armazenar arrays dentro dos documentos de usuário.

Essa decisão se baseia principalmente pela possibilidade de existir usuários com milhões de seguidores (outliers). Embutir arrays, seja do lado seguindo ou do lado seguidor faria o documento crescer sem limites e causaria perdsa de performance e até atingir o limite de 16MB do documento.

Paralelo a isso, consultas como “quem eu sigo” e “quem me segue” podem ser resolvidas eficientemente com índices na collection **_seguir_**, sem precisar duplicar dados.

### Parte 2 — $lookup e agregação
#### 2.1 — Enriquecer o dataset
Foram inseridos 4 novos livros na coleção livro, respeitando os relacionamentos com editora e autor por meio de referências (_id).

Critérios atendidos:
* Um livro com múltiplos autores (array de referências)
* Dois livros associados à mesma editora, demonstrando reutilização de referência

#### 2.2 — $lookup básico
**(a) Livros com dados da editora**<br>
Foi utilizado $lookup para realizar um left join entre livro e editora, seguido de $unwind para transformar o array resultante em objeto JSON, e $project para formatar a saída.

Campos retornados:
* title
* editora (nome)
* cidade

Essa abordagem segue o padrão mostrado em aula, onde $lookup sempre retorna um array, mesmo 
em relações 1:1.

**(b) Livros com autores (N:N)**<br>
Foi realizado um segundo $lookup, desta vez com a coleção autor. Como o campo autores já é um array de _id, o MongoDB retorna todos os autores relacionados.

Campos retornados:
* title
* lista de nomes dos autores

### Parte 3 — Schema Design Patterns
#### 3.1 — Extended Reference
```js
{
  "_id": ObjectId("200000000000000000000001"),
  "usuario_id": ObjectId("000000000000000000000001"),
  "usuario_nome": "Ana Silva",
  "livro_id": ObjectId("100000000000000000000001"),
  "livro_titulo": "O Hobbit",
  "nota": 5,
  "texto": "Livro incrível!",
  "data": ISODate("2025-01-01"),
  "curtidas": 10
}

**Justificativa:** Foram duplicados os campos _usuario_nome_ e _livro_titulo_, pois são exibidos em praticamente todas as leituras de resenhas e são relativamente estáveis. Isso evita o uso frequente de $lookup, melhorando a performance de leitura.

#### 3.2 — Subset
#### 3.3 — Computed
#### 3.4 — Escolha livre: Bucket, Outlier ou Versioning
