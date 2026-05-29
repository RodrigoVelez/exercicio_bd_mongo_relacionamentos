// Conectar a um database
use rede_leitura;

// limpar base
db.usuarios.drop();
db.livros.drop();
db.resenhas.drop();
db.comentarios.drop();
db.relacoes_seguir.drop();

// USUARIOS
db.usuarios.insertOne({
  _id: ObjectId("000000000000000000000001"),
  nome: "Ana Silva",
  email: "ana@email.com",
  bio: "Apaixonada por fantasia",
  foto: "https://img.com/ana.jpg",
  data_cadastro: ISODate("2024-01-10"),
  estantes: {
    lido: [ObjectId("100000000000000000000001")],
    lendo: [],
    quero_ler: [ObjectId("100000000000000000000002")]
  }
});

// LIVROS
db.livros.insertMany([
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
    ano: 1888,
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

// RESENHAS
db.resenhas.insertOne({
  _id: ObjectId("200000000000000000000001"),
  usuario_id: ObjectId("000000000000000000000001"),
  livro_id: ObjectId("100000000000000000000001"),
  nota: 5,
  texto: "Livro incrível!",
  data: ISODate("2025-01-01"),
  curtidas: 10
});

// COMENTARIOS
db.comentarios.insertOne({
  _id: ObjectId("300000000000000000000001"),
  resenha_id: ObjectId("200000000000000000000001"),
  usuario_id: ObjectId("000000000000000000000001"),
  texto: "Concordo totalmente!",
  data: ISODate("2025-01-02")
});

// RELACOES SEGUIR
db.relacoes_seguir.insertOne({
  _id: ObjectId("400000000000000000000001"),
  seguidor_id: ObjectId("000000000000000000000001"),
  seguido_id: ObjectId("000000000000000000000002"),
  data: ISODate("2025-01-05")
});
