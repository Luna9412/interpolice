const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.get('/', (req, res) =>{
  res.status(200).send({
      status:"OK",
      mensaje: "Bienvenido a la API REST de interpolice",
  })
})
app.use("/", require("./src/modules/citizen"));
app.use("/", require("./src/modules/species"));
app.use("/", require("./src/modules/delitos"));
app.use("/", require("./src/modules/grados"));
app.use("/", require("./src/modules/antecedentes"));
const port = process.env.PORT || 4100
app.listen(port, () => {console.log(`api rest encendida en el puerto 4100`);});
