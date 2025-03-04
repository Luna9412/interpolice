const express = require("express");
const bd = require("./bd.js");
const antecedentes = express();

antecedentes.get("/api/antecedentes/listartodos", (req, res) => {
    let query =
      "SELECT * FROM antecedentes";
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
          antecedentes: antecedentes,
        });
      }
    });
  });

/*   antecedentes.post("/api/antecedentes/crear", (req, res) => {
    let frmAntecedentesDatos = {
      grado_delito: req.body.nombre,
      descripcion_grado: req.body.descripcion,
    };
  
    // hacemos la consulta
  
    let query = "INSERT INTO antecedentes SET ?";
  
    bd.query(query, [frmAntecedentesDatos], (error, grados) => {
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
  
  // editar ciudadano
  
  grados.put("/api/grados/editar/:id", (req, res) => {
    let id = req.params.id;
    let frmDatos = {
      grado_delito: req.body.nombre,
      descripcion_grado: req.body.descripcion,
    };
  
    let query = "UPDATE antecedentes SET ? WHERE idantecedente = ?";
  
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
  
    let consulta = "DELETE FROM antecedentes WHERE idantecedente = ?";
  
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
   */

module.exports = antecedentes;