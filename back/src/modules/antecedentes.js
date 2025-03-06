const express = require("express");
const bd = require("./bd.js");
const antecedentes = express();
antecedentes.get("/api/antecedentes/listartodos", (req, res) => {
    let query ="SELECT * FROM antecedentes";
    bd.query(query, (error, antecedentes) => {
      if (error) {
        res.send({
          status: "error",
          mensaje: "ocurrió un error en la consulta!",
          error: error,
        });
      } else {
        res.send({
          status: "ok",
          mensaje: "consulta exitosa",
          antecedentes: antecedentes,
        });
      }
    });
  });
module.exports = antecedentes;