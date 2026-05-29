# exercicio_bd_mongo_relacionamentos

## Criar a base de dados
docker exec -i aula08-mongo mongosh < scripts/script_execucao.js

## Validar se os dados existem (Deve retornar 12)
docker exec aula08-mongo mongosh --quiet --eval \ 'db.getSiblingDB("rede_leitura").livros.countDocuments()'