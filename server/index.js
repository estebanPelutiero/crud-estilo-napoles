const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "carta",
});

// Registrar elementos en la db

app.post("/create", (req, res) => {
  const category = req.body.category;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  db.query(
    "INSERT INTO productos(category, name, description, price) VALUES(?, ?, ?, ?)",
    [category, name, description, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Producto registrado con éxito!");
      }
    }
  );
});

// Traer los elementos de la db

app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Escuchando");
});
