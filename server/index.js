const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Conexion a base de datos

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
        res.send(result);
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

// Modificar elementos

app.put("/update", (req, res) => {

  const id = req.body.id;
  const category = req.body.category;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  db.query(
    "UPDATE productos SET category=?, name=?, description=?, price=? WHERE id=?",
    [category, name, description, price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Eliminar un producto

app.delete("/delete/:id", (req, res) => {

  const id = req.params.id;
  
  db.query(
    "DELETE FROM productos WHERE id=?" ,id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Escuchando");
});
