function validarIsbn (book){
    const validarNumero = /^\d+$/; //solo numeros
    if (validarNumero.test(book.isbn) === false) {
       alert('el campo es sol numerico')
        return false;
    }   
    return true;
}

$(document).on('click', '#btn-save', function() {
    var newIsbn = $('#input-isbn').val();

    let theIsbn = {
        isbn: newIsbn
    }
    
    if(!validarIsbn(theIsbn)){
        return;
    }  
    
    axios.post("/api/books", theIsbn)// primero la accion, solo en el caso de post la ruta como parametro.
        .then(function (){
            alert ('esta todo ok')
        })
        .catch(function(err){ // es un Fail, cuando explota algo.
            alert ('ops! hay un problema')
        })

    window.location.href = ("/books")

})

