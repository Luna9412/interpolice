const express = require("express");
const bd = require("./bd.js");
const grados = express();
grados.get("/api/grados/listartodos", (req, res) => {
    let query ="SELECT * FROM grado_delitos";
    bd.query(query, (error, grados) => {
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
          grados: grados,
        });
      }
    });
  });
  grados.get("/api/grados/listarid/:id", (req, res) => {
    let id = req.params.id;
    let query =
      "SELECT * FROM grado_delitos WHERE idgrado_delito = ?";
    bd.query(query, [id], (error, grados)  => {
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
          grados: grados,
        });
      }
    });
  });
  grados.post("/api/grados/crear", (req, res) => {
  let frmGradosDatos = {
    grado: req.body.grado,
    descripcion: req.body.descripcion,
  };
  let query = "INSERT INTO grado_delitos SET ?";
  bd.query(query, [frmGradosDatos], (error, grados) => {
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
        grados: grados,
      });
    }
  });
});
grados.put("/api/grados/editar/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    grado: req.body.grado,
    descripcion: req.body.descripcion,
  };
  let query = "UPDATE grado_delitos SET ? WHERE idgrado_delito = ?";
  bd.query(query, [frmDatos, id], (error, grados) => {
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
        grados: grados,
      });
    }
  });
});
grados.delete("/api/grados/borrar/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM grado_delitos WHERE idgrado_delito = ?";
  bd.query(consulta, [id], (error, grados) => {
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
        grados: grados,
      });
    }
  });
}); 
module.exports = grados;