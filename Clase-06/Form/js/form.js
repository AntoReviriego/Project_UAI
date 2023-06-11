/* Validacion de campos  */
/*
Se debe validar cada campo y mostrar un mensaje de error descriptivo abajo del campo que falló. Realizar las siguientes validaciones:

Nombre completo: Debe tener más de 6 letras y al menos un espacio entre medio.
Email: debe tener un formato de email válido.
Contraseña: Al menos 8 caracteres, formados por letras y números.
Edad: Número entero mayor o igual a 18.
Teléfono: Número de al menos 7 dígitos, no aceptar espacios, guiones ni paréntesis.
Dirección: Al menos 5 caracteres, con letras, números y un espacio en el medio.
Ciudad: Al menos 3 caracteres.
Código Postal: Al menos 3 caracteres.
DNI: Número de 7 u 8 dígitos.

*/
var msj = ''
var idInputError = ''
let nombre = document.getElementById('nombre')
let email = document.getElementById('email')
let pass = document.getElementById('pass') 
let edad = document.getElementById('edad')
let tel = document.getElementById('tel')
let ciudad = document.getElementById('ciudad')
let cpostal =document.getElementById('cpostal')
let direccion = document.getElementById('direccion')
let dni = document.getElementById('dni')

nombre.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('nombre', msj)
    nombre.addEventListener("keyup", (g) => {
        if(event.target.value != ""){
            document.getElementById('form-bienvenida').innerHTML = `Hola ${g.target.value}`
        }
        else{
            document.getElementById('form-bienvenida').innerHTML = ""
        }

    });

});
nombre.addEventListener("blur", (event) => {
    let nombre = event.target.value;
    /* nombre */
    idInputError = 'nombre'
    if(nombre == ''){
        msj = 'Debe contener al menos 6 letras y un espacio';
    }
    else{
        if(!nombre.indexOf(' ') == 1 && nombre.length >= 6){
            msj = 'Debe contener al menos un espacio';
        }

        if(nombre.length < 6){
        msj += 'Debe contener al menos 6 letras';
        }
    }
    insertMsgError(idInputError, msj)
});

email.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('email', msj)
});
email.addEventListener("blur", (event) => {
    let email = event.target.value;
    /* email */
    idInputError = 'email'
    msj = ''
    if(email == '' || !(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).test(email)){
       msj = 'El email no es válido'
    }
    insertMsgError(idInputError, msj)
});

pass.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('pass', msj)
});
pass.addEventListener("blur", (event) => {
    let pass = event.target.value;
    /* pass */
    idInputError = 'pass'
    msj = ''
    if(pass == ''){
        msj = 'Debe tener al menos 8 caracteres.';
    }
    else{
       if(!(/\d/.test(pass))){
           msj = 'Debe tener al menos un número.';
       }
       
       if(!(/[A-Za-z]/.test(pass))){
           msj += 'Debe tener al menos una letra.';
       }

       if(pass.length < 8){
           msj += 'Debe tener al menos 8 caracteres. La actual posee solo ' + pass.length;
       }
   }
   insertMsgError(idInputError, msj)
});

edad.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('edad', msj)
});
edad.addEventListener("blur", (event) => {
    let edad = event.target.value;
    /* edad */
    idInputError = 'edad'
    msj = ''
    if(edad == ''){
        msj = 'Debes ingresar la edad.';
    }
    else{
        if(edad < 18){
            msj = 'La edad ingresada no esta permitida. Recuende que debe ser mayor de 18.';
        }
    }
    insertMsgError(idInputError, msj)
});

tel.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('tel', msj)
});
tel.addEventListener("blur", (event) => {
    let tel = event.target.value;
   /* telefono */
   idInputError = 'tel'
   msj = ''
   if(tel == ''){
       msj = 'Debes ingresar un número de teléfono válido.';
   }
   else{
       if( Math.sign(tel) == 1){
           if(tel.length < 7){
               msj = 'Debes ingresar un número de teléfono que tengo al menos 7 digitos.'
           }
       }
       else{
           msj += 'El número ingresado es negativo, no es valido para este campo.'
       }
   }
   insertMsgError(idInputError, msj)
});

ciudad.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('ciudad', msj)
});
ciudad.addEventListener("blur", (event) => {
    let ciudad = event.target.value;
    /* ciudad */
    idInputError = 'ciudad'
    msj = ''
    if(ciudad == '' ){
        msj = 'La ciudad no es válido';
    }
    else{
        if(ciudad.length < 3 ){
            msj = 'Debe contener al menos 3 caracteres';
        }
    }
    insertMsgError(idInputError, msj)
});

cpostal.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('cpostal', msj)
});
cpostal.addEventListener("blur", (event) => {
    let cpostal = event.target.value;

   /* cpostal */
   idInputError = 'cpostal'
   msj = ''
   if(cpostal == '' ){
       msj = 'El código postal no es válido.';
   }
   else{
       if(cpostal.length < 3 ){
          msj = 'Debe contener al menos 3 digitos.'
       }
   }
   insertMsgError(idInputError, msj)
});

direccion.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('direccion', msj)
});
direccion.addEventListener("blur", (event) => {
    let direccion = event.target.value;
    /* direccion */
    idInputError = 'direccion'
    msj = ''
    if(direccion == ''){
        msj = 'Debe contener al menos 6 letras y un espacio.'
    }
    else{
        if(!direccion.indexOf(' ') == 1 && nombre.length >= 6){
            msj = 'Debe contener al menos un espacio.'
        }

        if(direccion.length < 6){
           msj += 'Debe contener al menos 6 letras.'
        }
    }
    insertMsgError(idInputError, msj)
});

dni.addEventListener("focus", (event) => {
    msj = ''
    insertMsgError('dni', msj)
});
dni.addEventListener("blur", (event) => {
    let dni = event.target.value;
   
    /* dni */
    idInputError = 'dni'
    msj = ''
    if(dni == '' || (/[0-9]/.test(dni) && dni.length < 7)){
        msj = 'Debe contener entre 7 u 8 números.'
    }
    else{
        if(!/[0-9]/.test(dni) && dni.length >= 7){
            msj = 'Debe contener números.'
        }
    }
    insertMsgError(idInputError, msj)
});


function getValidateForm(){
    var verificacionDeCampos = document.querySelectorAll('msj-error')

        msj = 'Completar'
        if(nombre.value == ''){
            insertMsgError('nombre', msj)
        }
        if(email.value == ''){
            insertMsgError('email', msj)
        }
        if(pass.value == ''){
            insertMsgError('pass', msj)
        }
        if(direccion.value == ''){
            insertMsgError('direccion', msj)
        }
        if(tel.value == ''){
            insertMsgError('tel', msj)
        }
        if(cpostal.value == ''){
            insertMsgError('cpostal', msj)
        }
        if(dni.value == ''){
            insertMsgError('dni', msj)
        }
        if(ciudad.value == ''){
            insertMsgError('ciudad', msj)
        }
        if(edad.value == ''){
            insertMsgError('edad', msj)
        }
        if(verificacionDeCampos.length == 0 && nombre.value != '' && email.value != '' &&  pass.value != '' && direccion.value != '' && tel.value != '' && cpostal.value != '' && dni.value != '' && ciudad.value != '' && edad.value != ''){
            var mensaje = `Nombre: ${nombre.value}\nDNI: ${dni.value}\nEdad: ${email.value}\nDireccion: ${direccion.value}\nTelefono: ${tel.value }\nCodigo Postal: ${cpostal.value}\nCiudad: ${ciudad.value}`
            alert(mensaje)
        }
}


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