var express = require('express');
var router = express.Router();
var path = require('path'); //path es un modulo que requerimos el pasillo a nuestras vista.

router.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "new.html"));// esta ruta absoluta va a cambiar, yo neceito porde hacerlo de manera dinamica
});

router.get("/books", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));// esta ruta absoluta va a cambiar, yo neceito porde hacerlo de manera dinamica
});

router.get("/books/detail/", (req, res) => { // siempre se ubican ":" cuando existen parametros.
  res.sendFile(path.join(__dirname, "..", "public", "details.html"));// esta ruta absoluta va a cambiar, yo neceito porde hacerlo de manera dinamica
});


module.exports = router;
