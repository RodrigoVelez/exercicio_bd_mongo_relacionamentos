const db = db.getSiblingDB("livraria");

print("\n=== Livros com dados da editora ===");

printjson(db.livro.aggregate([
  {
    $lookup: {
      localField: "editora",
      from: "editora",
      foreignField: "_id",
      as: "ed"
    }
  },
  { $unwind: "$ed" },
  {
    $project: {
      _id: 0,
      title: 1,
      editora: "$ed.nome",
      cidade: "$ed.cidade"
    }
  }
]).toArray());
