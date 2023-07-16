/* Variables necesarias para el juego */
var nombre = document.getElementById('nombre')
var buttons = ['VE', 'RE', 'AM', 'AZ'];
var secuenciaJuego = [];
var secuenciaJugador = [];
var nivel = 0;
var esTurnoJugador = false;
var juegoIniciado = false;

window.addEventListener("load", (event) => {
    if(JSON.parse(localStorage.getItem('jugador')) != null && JSON.parse(localStorage.getItem('jugador')) != '' && JSON.parse(localStorage.getItem('jugador')) != undefined){
        var obj = JSON.parse(localStorage.getItem('jugador'))
        MostrarOcultarForm(true)
        MostrarOcultarSimmon(true)
        mostrarMensaje(`Bienvenido al juego de Simon Dice, ${obj.nameUser}`, true)
    }
});

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

var SetLocalStorage = function(name) {
    var objeto = {
        nameUser : name
    }
    localStorage.setItem('jugador', JSON.stringify(objeto));
}

var setNombreJugador = function() {
    if(nombre.value != "" && nombre.value != undefined && nombre.value != null){
        MostrarOcultarForm(true)
        MostrarOcultarSimmon(true)
        mostrarMensaje(`Bienvenido al juego de Simon Dice, ${nombre.value}`, true)
        SetLocalStorage(nombre.value)
    }
}

function iniciarJuego() {
    if (!juegoIniciado) {
        juegoIniciado = true;
        nivel = 0;
        secuenciaJuego = [];
        secuenciaJugador = [];
        mostrarMensaje("Concentrate...");
        setTimeout(nuevoNivel, 1000);
    }
}

var nuevoNivel = function () {
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
    const interval = setInterval(() => {
    buttonResaltar(secuenciaJuego[i]);
    i++;
    if (i >= secuenciaJuego.length) {
        clearInterval(interval);
        setTimeout(() => {
            esTurnoJugador = true;
            mostrarMensaje("Es tu turno. Repite la secuencia.");
            buttonResaltarTodos();
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

    if (secuenciaJugador.length === secuenciaJuego.length) {
        secuenciaJugador = [];
        setTimeout(nuevoNivel, 1000);
    }
}


var finalizarJuego = function () {
    esTurnoJugador = false;
    juegoIniciado = false;
    mostrarMensaje("¡Perdiste! Presiona 'Iniciar' para jugar de nuevo.");
}

var salir = function () {
    MostrarOcultarSimmon(false)
    MostrarOcultarForm(false)    
    localStorage.removeItem('jugador')
}

var mostrarMensaje = function (mensaje, esBienvenida=false) {
    if(!esBienvenida){
        document.getElementById('mensaje').innerText = mensaje;
    }
    else{
        document.getElementById('h1-bienvenida').innerHTML = mensaje
    }
}