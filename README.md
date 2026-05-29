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
1) Lista de coleções
  - usuario
  - livro
  - resenha
  - comentario
  - seguir

2) Exemplos de documentos
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
#### 1.2 — Cardinalidade que muda a decisão
#### 1.3 — N:N: de que lado guardar a referência?

### Parte 2 — $lookup e agregação
#### 2.1 — Enriquecer o dataset
#### 2.2 — $lookup básico

### Parte 3 — Schema Design Patterns
#### 3.1 — Extended Reference
#### 3.2 — Subset
#### 3.3 — Computed
#### 3.4 — Escolha livre: Bucket, Outlier ou Versioning
