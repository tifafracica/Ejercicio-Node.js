const theList = $('.book-list');

axios
    .get("/api/books") // llamas a la API primero    
    .then(function(result) { // esta funcion se va a ejecuta una vez que termine de ejecutarse el GET        
        console.log(result); //.data para recuperar la data que nos lanza la api.
        theList.append(result.data.map(result => `<li data-isbn="${result.isbn}" class="element-list">${result.isbn}
        <button class="btn-details">Ver Detalle</button>
        </li>`).join(" "))        
    })
    
    .catch(function(err){ // es un Fail, cuando explota algo.
        alert ('houston we got a problem'+ err)
    })
       
      
    $(document).on("click", "#link-new", function (){
        window.location.href = ("/new")
    })

   
    $(document).on('click', '.element-list .btn-details', function(){
        const isbn = $(this).parent().data('isbn') // aqui recupero el ISBN
        console.log(isbn)
        window.location.href = `/books/detail?isbn=${isbn}` //siempre se coloca ?cuando es un parametro
    })
 



