// Base: livraria (já criada pelo seed)
const db = db.getSiblingDB("livraria");

print("\n=== Inserindo novos livros ===");

// Buscar editoras existentes
const editoras = db.editora.find().toArray();

// Buscar autores existentes
const autores = db.autor.find().toArray();

// Garantir pelo menos:
// - 1 livro com múltiplos autores
// - 2 livros da mesma editora

db.livro.insertMany([
  {
    title: "MongoDB Avançado",
    url: "http://mongoavancado.com",
    editora: editoras[0]._id,
    autores: [autores[0]._id, autores[1]._id] // múltiplos autores
  },
  {
    title: "NoSQL na Prática",
    url: "http://nosql.com",
    editora: editoras[0]._id, // mesma editora 
    autores: [autores[1]._id]
  },
  {
    title: "Banco de Dados Modernos",
    url: "http://bdmoderno.com",
    editora: editoras[1]._id,
    autores: [autores[2]._id]
  },
  {
    title: "Escalabilidade com MongoDB",
    url: "http://escala.com",
    editora: editoras[2]._id,
    autores: []
  }
]);

print("Livros após inserção:");
printjson(db.livro.find({}, { title: 1, editora: 1, autores: 1 }).toArray());
