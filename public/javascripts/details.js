const urlParams = new URLSearchParams(window.location.search); // esto me permite recuperar todos los parametros que vienen en la URL
const isbn = urlParams.get("isbn"); //saco del URL el ISBN (o el parametro)

$.ajax(`/api/books/detail/${isbn}`).done(function(book){
  if (book.error) {
    $("#book-container").text("el isbn no existe");
  }
  else {
      $("#book-container").append(`
      <div class="image-container"><img src="${book.cover}"></div>
      <div class="title-subtitle"><h1>${book.title}</h1>
      <small>${book.subtitle}</small></div>
      <p>${book.description}</p>
      <ul>${book.authors.map(a => `<li>${a}</li>`).join("")}</ul> 
      <button class="back-btn">Regresar</button>
    `); //los autores iteramos en el array de objetos(en caso de existir) y hacemos una lista de los autores.
  }  
})

$(document).on("click", ".back-btn", function (){
  window.location.href = ("/books")

})