const db = db.getSiblingDB("livraria");

print("\n=== Livros com autores ===");

printjson(db.livro.aggregate([
  {
    $lookup: {
      localField: "autores",
      from: "autor",
      foreignField: "_id",
      as: "autores_doc"
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      autores: "$autores_doc.nome"
    }
  }
]).toArray());
