const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "desafio",
};
const connection = mysql.createConnection(config);

const names = ["Henrique", "Wesley", "Luiz"];
const index = Math.floor(Math.random() * names.length);

const query = `INSERT INTO people(name) values('${names[index]}')`;
const query2 = `SELECT * FROM people`;
let html = `<h1>Full Cycle Rocks!</h1><p>Nomes cadastrados no banco:</p>`;

connection.query(query);
connection.query(query2, (err, results) => {
  if (err) throw new Error("Não foi possivel coletar os nomes cadastrados");

  results.forEach((person) => {
    html = `${html}<p> - ${person.name}</p>`;
  });
});

connection.end();

app.get("/", (req, res) => {
  res.send(html);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
