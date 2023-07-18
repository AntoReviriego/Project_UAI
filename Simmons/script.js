/* Variables necesarias para el juego */
var nombre = document.getElementById('nombre')
var buttons = ['VE', 'RE', 'AM', 'AZ'];
var secuenciaJuego = [];
var secuenciaJugador = [];
var nivel = 0;
var esTurnoJugador = false;
var juegoIniciado = false;
var score = 0;
var iniciar = ""
var salir = ""

var MostrarOcultarForm = function (mostrar) {
    var form = document.getElementById('form')
    if(mostrar){
        form.classList.remove("d-block");
        form.classList.add("d-none");
    }
    else{
        form.classList.remove("d-none");
        form.classList.add("d-block");
        nombre.innerHTML = ""; 
    }

}

var MostrarOcultarSimmon = function (mostrar) {
    var simmon = document.getElementById('simmon')    
    if(mostrar){
        simmon.classList.remove("d-none");
    }
    else{
        simmon.classList.add("d-none");
    }

}

var SetLocalStorage = function(name, esScore = false) {
    if(!esScore){
        var objeto = {
            nameUser : name
        }
        localStorage.setItem('jugador', JSON.stringify(objeto));
    }
    else{
        var objeto = {
            nivel : nivel, 
            score : score, 
            secuencia: secuenciaJuego
        }
        localStorage.setItem('simmonMemoria', JSON.stringify(objeto));
    }
}

var getLocalStorage = function () {
    if(JSON.parse(localStorage.getItem('jugador')) != null && JSON.parse(localStorage.getItem('jugador')) != '' && JSON.parse(localStorage.getItem('jugador')) != undefined){
        var obj = JSON.parse(localStorage.getItem('jugador'))
        MostrarOcultarForm(true)
        MostrarOcultarSimmon(true)
        mostrarMensaje(`Bienvenido al juego de Simon Dice, ${obj.nameUser}`, true)
    }

    if(JSON.parse(localStorage.getItem('simmonMemoria')) != null && JSON.parse(localStorage.getItem('simmonMemoria')) != '' && JSON.parse(localStorage.getItem('simmonMemoria')) != undefined){
        var obj = JSON.parse(localStorage.getItem('simmonMemoria'))
        nivel = obj.nivel; 
        secuenciaJuego = obj.secuencia; 
        score = obj.score; 
        retomarJuego()
    }
}

var setNombreJugador = function() {
    if(nombre.value != "" && nombre.value != undefined && nombre.value != null && nombre.value.length > 3){
        MostrarOcultarForm(true)
        MostrarOcultarSimmon(true)
        mostrarMensaje(`Bienvenido al juego de Simon Dice, ${nombre.value}`, true)
        SetLocalStorage(nombre.value)
    }
}

var iniciarJuego = function() {
    if (!juegoIniciado) {
        juegoIniciado = true;
        nivel = 0;
        score = 0;
        secuenciaJuego = [];
        secuenciaJugador = [];
        iniciar = document.getElementById('iniciar-simmon');
        iniciar.disabled = true;
        salir = document.getElementById('salir-simmon');
        mostrarMensaje("Concentrate...");
        setTimeout(nuevoNivel, 1000);
    }
}

var nuevoNivel = function () {
    salir.disabled  = true;
    nivel++;
    mostrarMensaje(`Nivel ${nivel}`);
    agregarColorAleatorio();
    secuenciaSimmon();
}

var agregarColorAleatorio = function () {
    const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    secuenciaJuego.push(randomButton);
}

var secuenciaSimmon = function () {
    esTurnoJugador = false;
    let i = 0;
    var interval = setInterval(() => {
        buttonResaltar(secuenciaJuego[i]);
        i++;
        if (i >= secuenciaJuego.length) {
            clearInterval(interval);
            setTimeout(() => {
                esTurnoJugador = true;
                mostrarMensaje("Es tu turno. Repite la secuencia.");
                buttonResaltarTodos();
                SetLocalStorage('', true)
                salir.disabled  = false;
            }, 500);

        }
       
    }, 1000);
}

var buttonResaltar = function (buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('simmon-opacidad');
    setTimeout(() => {
        button.classList.remove('simmon-opacidad');
    }, 500);
}

var buttonResaltarTodos = function () {
    buttons.forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        button.classList.remove('simmon-opacidad');
    });
}

var clickColor = function (buttonId) {
    if (esTurnoJugador) {
        buttonResaltar(buttonId);
        secuenciaJugador.push(buttonId);
        verificarSecuencia();
    }
}

var verificarSecuencia = function () {
    for (let i = 0; i < secuenciaJugador.length; i++) {
        if (secuenciaJugador[i] !== secuenciaJuego[i]) {
            finalizarJuego();
            return;
        }
    }
    score++; 
    mostrarMensaje('', true, true)
    if (secuenciaJugador.length === secuenciaJuego.length) {
        secuenciaJugador = [];
        setTimeout(nuevoNivel, 1000);
    }
}

var finalizarJuego = function () {
    esTurnoJugador = false;
    juegoIniciado = false;
    iniciar.disabled  = false;
    score = 0
    localStorage.removeItem('simmonMemoria');
    mostrarMensaje('', true, true)
    mostrarMensaje("¡Perdiste! Presiona 'Iniciar' para jugar de nuevo.");
}

var salirJuego = function () {
    MostrarOcultarSimmon(false);
    MostrarOcultarForm(false);    
    esTurnoJugador = false;
    juegoIniciado = false;
    score = 0;
    nivel = 0;
    iniciar.disabled  = false;
    salir.disabled  = false;
    localStorage.removeItem('jugador')
}

var mostrarMensaje = function (mensaje, esBienvenida = false, esScore = false) {
    if(!esBienvenida){
        document.getElementById('mensaje').innerText = mensaje;
    }
    else{
        if(esScore){
            document.getElementById('score').innerHTML = `Score: ${score}`;
        }
        else{
            document.getElementById('h1-bienvenida').innerHTML = mensaje;
        }
    }
}

var retomarJuego = function () {
    
    mostrarMensaje(`Nivel ${nivel}`); // Nivel
    mostrarMensaje('', true, true) // Score
    secuenciaSimmon() // Repite secuencia guardada
    iniciar = document.getElementById('iniciar-simmon'); 
    iniciar.disabled  = true;
}

var validacionForm = function () {
    var html = document.getElementById('msj-error')
    if(nombre.value == ""){
        html.innerHTML = 'Este campo es obligatorio para continuar.';
    }
    else{
        if(nombre.value.length < 3){
            html.innerHTML = 'Este campo, debe tener al menos 3 letras.';
        }
        else{
            html.innerHTML = '';
        }
    }
}

window.addEventListener("load", getLocalStorage);

nombre.addEventListener("blur", validacionForm);