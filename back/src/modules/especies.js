const express = require("express");
const bd = require("./bd.js");
const especies = express();
especies.get("/api/especies/listarespecies", (req, res) => {
  let query = "SELECT * FROM especies";
  bd.query(query, (error, especies) => {
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
        especies: especies,
      });
    }
  });
});
especies.get("/api/especies/listarid/:id", (req, res) => {
  let id = req.params.id;
  let query ="SELECT * FROM especies WHERE idespecie = ?";
  bd.query(query, [id], (error, especies)  => {
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
        especies: especies,
      });
    }
  });
});
especies.post("/api/especies/crear", (req, res) => {
  let frmSpeciesDatos = {
    nombre_especie: req.body.nombre,
  };
  let query = "INSERT INTO especies SET ?";
  bd.query(query, [frmSpeciesDatos], (error, especies) => {
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
        especies: especies,
      });
    }
  });
});
especies.put("/api/especies/editar/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    nombre_especie: req.body.nombre,
  };
  let query = "UPDATE especies SET ? WHERE idespecie = ?";
  bd.query(query, [frmDatos, id], (error, especies) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "actualización exitosa",
        especies: especies,
      });
    }
  });
});
especies.delete("/api/especies/borrar/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM especies WHERE idespecie = ?";
  bd.query(consulta, [id], (error, especies) => {
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
        especies: especies,
      });
    }
  });
});
module.exports = especies;