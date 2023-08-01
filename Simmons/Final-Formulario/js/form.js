var nombre = document.getElementById('nombre');
var email = document.getElementById('email');
var msj = document.getElementById('msj');
var enviar = document.getElementById('enviar');

nombre.addEventListener("focus", (event) => {
    insertMsgError('nombre', '')
});

nombre.addEventListener("blur", (event) => {
    if(event.target.value == "" || !(/^[a-zA-Z0-9]+$/).test(event.target.value)){
        insertMsgError('nombre', 'El nombre debe ser alfanumerico')
    }
    validacionCampos();
});

email.addEventListener("focus", (event) => {
    insertMsgError('email', '')
});

email.addEventListener("blur", (event) => {
    if(event.target.value == '' || !(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).test(event.target.value)){
        insertMsgError('email', 'El email no es válido')
    } 
    validacionCampos();
});

msj.addEventListener("focus", (event) => {
    insertMsgError('msj', '')
});

msj.addEventListener("blur", (event) => {
    if(event.target.value == '' || event.target.value.length < 5){
        insertMsgError('msj', 'El mensaje no puede esta vacio. Al menos 5 letras.')
    } 
    validacionCampos();
});


function insertMsgError(idElementError, msj){
    var spanError =  document.getElementById(idElementError).nextElementSibling;
    if(spanError != undefined){
        spanError.remove();
    }

    if(msj != ''){
        // Nodo a insertar
        var newNode = document.createElement("span");
        newNode.textContent = msj
        newNode.classList.add("msj-error");
        // Obtener una referencia al nodo padre
        var parentDiv = document.getElementById(idElementError).parentNode;
        parentDiv.insertAdjacentElement('beforeend', newNode)
    }
}

var validacionCampos = function() {
    if(nombre.value != "" && (/^[a-zA-Z0-9]+$/).test(nombre.value) && email.value != "" && ((/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)).test(email.value) && msj.value != ''  && msj.value.length >= 5){
        enviar.disabled = false
    }
    else{
        enviar.disabled = true
    }
}

var correo = function(event) {
    event.preventDefault();
    // Obtener los valores del formulario
    var email = document.getElementById('email').value;
    var msj = document.getElementById('msj').value;
    // Crear el enlace para abrir el cliente de email predeterminado
    var asunto = 'Asunto desde javascript';
    var mensaje = msj;
    var mailtoLink = `mailto:${email}?subject=${asunto}&body=${mensaje}`;
    // Abrir el cliente de email predeterminado
    window.location.href = mailtoLink;
}

// Función para enviar el formulario y abrir el cliente de email
document.getElementById('formularioContacto').addEventListener('submit', correo.bind(this));