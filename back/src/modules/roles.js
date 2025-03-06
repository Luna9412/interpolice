const express = require("express");
const bd = require("./bd.js");
const roles = express();
roles.get("/api/roles/listaroles", (req, res) => {
  let query = "SELECT * FROM roles";
  bd.query(query, (error, roles) => {
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
        roles: roles,
      });
    }
  });
});
roles.get("/api/roles/listarid/:id", (req, res) => {
  let id = req.params.id;
  let query ="SELECT * FROM roles WHERE idrol = ?";
  bd.query(query, [id], (error, roles)  => {
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
        roles: roles,
      });
    }
  });
});
roles.post("/api/roles/crear", (req, res) => {
  let frmRolesDatos = {
    nombre_rol: req.body.nombre,
  };
  let query = "INSERT INTO roles SET ?";
  bd.query(query, [frmRolesDatos], (error, roles) => {
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
        roles: roles,
      });
    }
  });
});
roles.put("/api/roles/editar/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    nombre_rol: req.body.nombre,
  };
  let query = "UPDATE roles SET ? WHERE idrol = ?";
  bd.query(query, [frmDatos, id], (error, roles) => {
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
        roles: roles,
      });
    }
  });
});
roles.delete("/api/roles/borrar/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM roles WHERE idrol = ?";
  bd.query(consulta, [id], (error, roles) => {
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
        roles: roles,
      });
    }
  });
});
module.exports = roles;