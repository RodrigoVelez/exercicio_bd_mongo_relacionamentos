// =============================================================
// Seed do domínio "rede_leitura"
// Uso: docker exec -i <container> mongosh < scripts/01-seed-rede-leitura.js
// ** <container>: aula08-mongo
// =============================================================

const db = db.getSiblingDB("rede_leitura");

// Idempotente: limpa execuções anteriores
["usuario", "livro", "resenha", "comentario", "seguir"].forEach(c => db[c].drop());

// =============================================================
print("\n=== 1. USUÁRIOS — estante embutida (embed 1:1) ===");
// =============================================================

db.usuario.insertMany([
  {
    _id: ObjectId("000000000000000000000001"),
    nome: "Ana Silva",
    email: "ana@email.com",
    bio: "Apaixonada por fantasia",
    foto: "https://img.com/ana.jpg",
    data_cadastro: new Date("2024-01-10"),
    estante: {
      lido:      [ ObjectId("100000000000000000000001") ],
      lendo:     [],
      quero_ler: [ ObjectId("100000000000000000000002") ]
    }
  },
  {
    _id: ObjectId("000000000000000000000002"),
    nome: "José Barreto",
    email: "jose@gmail.com",
    bio: "Estudante",
    foto: "https://img.com/jose.jpg",
    data_cadastro: new Date("2022-01-10"),
    estante: {
      lido: [
        ObjectId("100000000000000000000004"),
        ObjectId("100000000000000000000007"),
        ObjectId("100000000000000000000008")
      ],
      lendo:     [ ObjectId("100000000000000000000001") ],
      quero_ler: [
        ObjectId("100000000000000000000011"),
        ObjectId("100000000000000000000012")
      ]
    }
  }
]);

print("Usuários inseridos: " + db.usuario.countDocuments());

// =============================================================
print("\n=== 2. LIVROS — coleção independente ===");
// =============================================================

db.livro.insertMany([
  {
    _id: ObjectId("100000000000000000000001"),
    titulo: "O Hobbit",
    autores: ["J.R.R. Tolkien"],
    editora: "HarperCollins",
    ano: 1937,
    generos: ["Fantasia"],
    isbn: "9780000000001",
    sinopse: "Um hobbit sai em uma aventura inesperada."
  },
  {
    _id: ObjectId("100000000000000000000002"),
    titulo: "1984",
    autores: ["George Orwell"],
    editora: "Companhia das Letras",
    ano: 1949,
    generos: ["Distopia"],
    isbn: "9780000000002",
    sinopse: "Uma sociedade sob vigilância extrema."
  },
  {
    _id: ObjectId("100000000000000000000003"),
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    autores: ["J.R.R. Tolkien"],
    editora: "HarperCollins",
    ano: 1954,
    generos: ["Fantasia", "Aventura"],
    isbn: "9780000000003",
    sinopse: "Um jovem hobbit recebe a missão de destruir um anel de poder absoluto."
  },
  {
    _id: ObjectId("100000000000000000000004"),
    titulo: "Dom Casmurro",
    autores: ["Machado de Assis"],
    editora: "Principis",
    ano: 1899,
    generos: ["Romance", "Literatura Brasileira"],
    isbn: "9780000000004",
    sinopse: "As memórias de Bento Santiago e a eterna dúvida sobre a traição de Capitu."
  },
  {
    _id: ObjectId("100000000000000000000005"),
    titulo: "Duna",
    autores: ["Frank Herbert"],
    editora: "Aleph",
    ano: 1965,
    generos: ["Ficção Científica"],
    isbn: "9780000000005",
    sinopse: "Uma intriga política e ecológica em um planeta desértico e perigoso."
  },
  {
    _id: ObjectId("100000000000000000000006"),
    titulo: "Orgulho e Preconceito",
    autores: ["Jane Austen"],
    editora: "Martin Claret",
    ano: 1813,
    generos: ["Romance", "Drama"],
    isbn: "9780000000006",
    sinopse: "O embate entre o orgulho de um nobre e o preconceito de uma jovem perspicaz."
  },
  {
    _id: ObjectId("100000000000000000000007"),
    titulo: "O Alquimista",
    autores: ["Paulo Coelho"],
    editora: "Paralela",
    ano: 1988,                          // corrigido: 1988, não 1888
    generos: ["Ficção", "Autoajuda"],
    isbn: "9780000000007",
    sinopse: "A jornada de um pastor espanhol em busca de seu tesouro pessoal no Egito."
  },
  {
    _id: ObjectId("100000000000000000000008"),
    titulo: "Cem Anos de Solidão",
    autores: ["Gabriel García Márquez"],
    editora: "Record",
    ano: 1967,
    generos: ["Realismo Mágico"],
    isbn: "9780000000008",
    sinopse: "A ascensão e a queda da icônica linhagem dos Buendía na vila de Macondo."
  },
  {
    _id: ObjectId("100000000000000000000009"),
    titulo: "O Iluminado",
    autores: ["Stephen King"],
    editora: "Suma",
    ano: 1977,
    generos: ["Terror", "Suspense"],
    isbn: "9780000000009",
    sinopse: "Um zelador de inverno e sua família se isolam em um hotel com passado sombrio."
  },
  {
    _id: ObjectId("100000000000000000000010"),
    titulo: "Sapiens: Uma Breve História da Humanidade",
    autores: ["Yuval Noah Harari"],
    editora: "L&PM",
    ano: 2011,
    generos: ["História", "Não-ficção"],
    isbn: "9780000000010",
    sinopse: "Uma passagem impressionante pela evolução humana desde a Idade da Pedra."
  },
  {
    _id: ObjectId("100000000000000000000011"),
    titulo: "O Pequeno Príncipe",
    autores: ["Antoine de Saint-Exupéry"],
    editora: "Melhoramentos",
    ano: 1943,
    generos: ["Fábula", "Infantojuvenil"],
    isbn: "9780000000011",
    sinopse: "As reflexões filosóficas de um jovem príncipe que viaja por vários planetas."
  },
  {
    _id: ObjectId("100000000000000000000012"),
    titulo: "Crime e Castigo",
    autores: ["Fiódor Dostoiévski"],
    editora: "Editora 34",
    ano: 1866,
    generos: ["Romance Psicológico", "Clássico"],
    isbn: "9780000000012",
    sinopse: "O tormento mental e moral de um estudante que comete um assassinato em São Petersburgo."
  }
]);
print("Livros inseridos: " + db.livro.countDocuments());

// =============================================================
print("\n=== 3. RESENHAS — referência ao usuário e ao livro (ref N:1) ===");
// =============================================================

db.resenha.insertMany([
  {
    _id: ObjectId("200000000000000000000001"),
    usuario_id: ObjectId("000000000000000000000001"),
    livro_id:   ObjectId("100000000000000000000001"),
    nota: 5,
    texto: "Livro incrível! A aventura de Bilbo é cativante do início ao fim.",
    data: new Date("2025-01-01"),
    curtidas: 10
  },
  {
    _id: ObjectId("200000000000000000000002"),
    usuario_id: ObjectId("000000000000000000000002"),
    livro_id:   ObjectId("100000000000000000000004"),
    nota: 4,
    texto: "Machado de Assis é genial. A dúvida sobre Capitu fica na cabeça.",
    data: new Date("2025-02-15"),
    curtidas: 7
  },
  {
    _id: ObjectId("200000000000000000000003"),
    usuario_id: ObjectId("000000000000000000000002"),
    livro_id:   ObjectId("100000000000000000000008"),
    nota: 5,
    texto: "Cem Anos de Solidão é uma obra-prima do realismo mágico.",
    data: new Date("2025-03-10"),
    curtidas: 15
  }
]);
print("Resenhas inseridas: " + db.resenha.countDocuments());

// =============================================================
print("\n=== 4. COMENTÁRIOS — referência à resenha e ao usuário ===");
// =============================================================

db.comentario.insertMany([
  {
    _id: ObjectId("300000000000000000000001"),
    resenha_id: ObjectId("200000000000000000000001"),
    usuario_id: ObjectId("000000000000000000000002"),
    texto: "Concordo totalmente! Tolkien é incomparável.",
    data: new Date("2025-01-02")
  },
  {
    _id: ObjectId("300000000000000000000002"),
    resenha_id: ObjectId("200000000000000000000002"),
    usuario_id: ObjectId("000000000000000000000001"),
    texto: "Também fiquei obcecada com essa questão do Machado!",
    data: new Date("2025-02-16")
  }
]);
print("Comentários inseridos: " + db.comentario.countDocuments());

// =============================================================
print("\n=== 5. SEGUIR — coleção de grafo (ref N:N) ===");
// =============================================================

db.seguir.insertMany([
  {
    _id: ObjectId("400000000000000000000001"),
    usuario_id: ObjectId("000000000000000000000001"),   // Ana segue José
    seguido_id: ObjectId("000000000000000000000002"),
    data: new Date("2025-01-05")
  },
  {
    _id: ObjectId("400000000000000000000002"),
    usuario_id: ObjectId("000000000000000000000002"),   // José segue Ana
    seguido_id: ObjectId("000000000000000000000001"),
    data: new Date("2025-01-06")
  }
]);
print("Relações de seguir inseridas: " + db.seguir.countDocuments());

// =============================================================
print("\n=== Índices recomendados ===");
// =============================================================
db.resenha.createIndex({ livro_id: 1 });      // buscar resenhas de um livro
db.resenha.createIndex({ usuario_id: 1 });    // buscar resenhas de um usuário
db.comentario.createIndex({ resenha_id: 1 }); // buscar comentários de uma resenha
db.seguir.createIndex({ usuario_id: 1 });     // quem eu sigo
db.seguir.createIndex({ seguido_id: 1 });     // quem me segue

print("\n=== Seed concluído — banco: rede_leitura ===");
printjson({
  usuarios:   db.usuario.countDocuments(),
  livros:     db.livro.countDocuments(),
  resenhas:   db.resenha.countDocuments(),
  comentarios: db.comentario.countDocuments(),
  seguir:     db.seguir.countDocuments()
});
