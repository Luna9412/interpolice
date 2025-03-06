require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) =>{
  res.status(200).send({
      status:"OK",
      mensaje: "Bienvenido a la API de interpolice",
  })
})
app.use("/", require("./src/modules/antecedentes"));
app.use("/", require("./src/modules/citizen"));
app.use("/", require("./src/modules/especies"));
app.use("/", require("./src/modules/delitos"));
app.use("/", require("./src/modules/grados"));
app.use("/", require("./src/modules/roles"));
const port = process.env.PORT || 4100
app.listen(port, () => {console.log(`api rest encendida en el puerto ${port}`);});
