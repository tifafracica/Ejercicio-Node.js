var express = require('express');
var router = express.Router();
const axios = require("axios");

isbnArray = [];

//ROUTES TO WORK WIHT: 
//GET /books
//GET /books/:isbn
//POST /books

function validateIsbn (book){
  const validateNumber = /^\d+$/; //solo numeros
  if (validateNumber.test(book.isbn) === false) {
    return false;
  }   
  return true; // aqui los campos son todos validos.
}

router.post('/books', function (req, res) { // aqui agregamos Usuarios
  const newIsbn = req.body; //traemos la informacion 
  console.log(newIsbn);
  
  // validamos la informacion agregada
  if (!validateIsbn(newIsbn)) {
    return res.status(418).end("you fuck it up")
  }
  isbnArray.push(newIsbn);

  console.log(isbnArray)
  // le respondemos con el array de objetos
  res.json(newIsbn);
});


router.get('/books', function(req, res) { // aca le digo a mi server Che pasame toda la informacion del array
  res.json(isbnArray)
})


router.get("/books/detail/:isbn", function(req, res, next) { //llamamos a la API de google
  const isbn = req.params.isbn; // aqui ponemos el Isbn en una variable con req.params (pues es un paramentro)
  axios
  .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
  .then(function (theResult) {
    const data = theResult.data; // aca recuperamos la data del libro
      if (data.totalItems > 0) {
    
      const theBook = {
        title: data.items[0].volumeInfo.title ||  null,
        subtitle: data.items[0].volumeInfo.subtitle || " ",
        description: data.items[0].volumeInfo.description || " ",
        authors: data.items[0].volumeInfo.authors || null,
        cover: data.items[0].volumeInfo.imageLinks ? data.items[0].volumeInfo.imageLinks.thumbnail : null,
        isbn: isbn
      };
      res.json(theBook);

    }else {
      res.json({error:"El isbn no existe"})
    }    
    
  })
  .catch(function(err){ // es un Fail, cuando explota algo.
    console.log ('houston we got a problem'+ err)
  })
})

module.exports = router;
