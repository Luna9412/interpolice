// Modulo para administrar la info de los ciudadanos
const express = require("express");
const bd = require("./bd.js");
const citizen = express();

// mostrtar los ciudadanos
citizen.get("/api/citizen/listartodos", (req, res) => {
  let query =
    "SELECT idciudadano, roles_idrol, especies_idespecie ,nombre_ciudadano, apellido_ciudadano, email_ciudadano, apodo_ciudadano, fechaorigen, nombre_especie, nombre_rol FROM ciudadanos inner join especies on idespecie = especies_idespecie inner join roles on idrol = roles_idrol order by idciudadano asc";
  bd.query(query, (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
});

citizen.get("/api/citizen/listarid/:id", (req, res) => {
  let id = req.params.id;
  let query =
    "SELECT idciudadano, roles_idrol, especies_idespecie ,nombre_ciudadano, apellido_ciudadano, email_ciudadano, apodo_ciudadano, fechaorigen, password_ciudadano, nombre_especie, nombre_rol FROM ciudadanos inner join especies on idespecie = especies_idespecie inner join roles on idrol = roles_idrol WHERE idciudadano = ?";
  bd.query(query, [id], (error, citizen)  => {
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
        citizen: citizen,
      });
    }
  });
});

// crear ciudadano

citizen.post("/api/citizen/crear", (req, res) => {
  let frmCitizenDatos = {
    nombre_ciudadano: req.body.nombre,
    apellido_ciudadano: req.body.apellido,
    email_ciudadano: req.body.email,
    apodo_ciudadano: req.body.apodo,
    password_ciudadano: req.body.password,
    fechaorigen: req.body.fecha,
    especies_idespecie: req.body.especie,
    roles_idrol: req.body.rol,
    foto_ciudadano: req.body.foto,
  };

  // hacemos la consulta

  let query = "INSERT INTO ciudadanos SET ?";

  bd.query(query, [frmCitizenDatos], (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
});

// editar ciudadano

citizen.put("/api/citizen/editar/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    nombre_ciudadano: req.body.nombre,
    apellido_ciudadano: req.body.apellido,
    email_ciudadano: req.body.email,
    apodo_ciudadano: req.body.apodo,
    password_ciudadano: req.body.password,
    fechaorigen: req.body.fecha,
    especies_idespecie: req.body.especie,
    roles_idrol: req.body.rol,
    foto_ciudadano: req.body.foto,
  };

  let query = "UPDATE ciudadanos SET ? WHERE idciudadano = ?";

  bd.query(query, [frmDatos, id], (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
});

citizen.delete("/api/citizen/borrar/:id", (req, res) => {
  let id = req.params.id;

  let consulta = "DELETE FROM ciudadanos WHERE idciudadano = ?";

  bd.query(consulta, [id], (error, citizen) => {
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
        citizen: citizen,
      });
    }
  });
});

module.exports = citizen;
