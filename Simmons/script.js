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
var velocidadRepeticion = 500; 
var temporizador = 0
var intervalTiempo;

var MostrarOcultarForm = function (mostrar) {
    var form = document.getElementById('form')
    if(mostrar){
        form.classList.remove("d-block");
        nombre.innerHTML = "";
        form.classList.add("d-none");
    }
    else{
        form.classList.remove("d-none");
        form.classList.add("d-block");
    }

}

var MostrarOcultarSimmon = function (mostrar) {
    var simmon = document.getElementById('simmon')
    if(mostrar){
        simmon.classList.remove("d-none");
        nivel = 0;
        score = 0;
        temporizador = 0;
        secuenciaJuego = [];
        secuenciaJugador = [];
    }
    else{
        simmon.classList.add("d-none");
    }
}

var SetLocalStorage = function(name, esScore = false, esRanking=false) {
    var nombreObjeto = "";
    var objeto = {};
    if(!esScore && !esRanking){
        objeto = {
            nameUser : name
        }
        nombreObjeto = "jugador"
    }
    else{
        if(esScore){
            objeto = {
                nivel : nivel,
                score : score,
                secuencia: secuenciaJuego, 
                velocidad: velocidadRepeticion
            }
            nombreObjeto = "simmonMemoria"
        }
        else{
            objeto = {
                nombre : JSON.parse(localStorage.getItem('jugador')).nameUser,
                nivel : nivel,
                score : score,
                fecha : new Date(Date.now()).toLocaleString('es-AR',  {  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            }


            var objetoCopia = []
            /* Verificamos si ya hubo o no participantes anteriores */
            if(JSON.parse(localStorage.getItem('ranking')) != null && JSON.parse(localStorage.getItem('ranking')) != '' && JSON.parse(localStorage.getItem('ranking')) != undefined){
                var ObjetoRanking = JSON.parse(localStorage.getItem('ranking'))
                for (let i = 0; i < ObjetoRanking.length; i++) {
                    objetoCopia.push(ObjetoRanking[i])
                }
            }
            objetoCopia.push(objeto)
            objeto = objetoCopia;
            nombreObjeto = "ranking"
        }
    }
    localStorage.setItem(nombreObjeto, JSON.stringify(objeto));
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
        velocidadRepeticion = obj.velocidad
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
        temporizador = 0;
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
    detenerTiempo();
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
                /* ejecutamos temporizador */
                intervalTiempo = setInterval(mostrarTiempo, 1000); 
                mostrarMensaje("Es tu turno. Repite la secuencia.");
                buttonResaltarTodos();
                velocidadRepeticionSimmon()
                SetLocalStorage('', true)

                salir.disabled  = false;
            }, 500);
        }
    }, 1000);
}

var velocidadRepeticionSimmon = function () {
    /* En caso de llegar a 0, reseteo la velocidad otra ves en 500ms */
    velocidadRepeticion = velocidadRepeticion !== 0 ? (velocidadRepeticion - 50) : 500; // 500ms = 0.5s, por cada vuelta le estaremos sacando 50ms = 0.05s, para aumentar su velocidad
    return velocidadRepeticion;
}

var penalizacionTiempo = function(nivel, tiempo) {
    switch (nivel) {
        case (nivel >= 2 && nivel <= 5):
            if(tiempo > 5){
                score = (score - 0.5)
            }
        break;
        case (nivel >= 6 && nivel <= 9):
            if(tiempo > 10){
                score = (score - 1)
            }
        break;
        case (nivel >= 10 && nivel <= 13):
            if(tiempo > 15){
                score = (score - 1.5)
            }
        break;
        case (nivel >= 14 && nivel <= 18):
            if(tiempo > 20){
                score = (score - 2)
            }
        break;
        case (nivel >= 19 && nivel <= 21):
            if(tiempo > 25){
                score = (score - 2.5)
            }
        break;
    
        default:
            if(tiempo > 0 && nivel >=22){
                score = (score - 3)
            }
        break;
    }
}

var buttonResaltar = function (buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('simmon-opacidad');
    setTimeout(() => {
        button.classList.remove('simmon-opacidad');
    }, velocidadRepeticion);
}

var mostrarTiempo = function () {
    temporizador++; 
    var tiempo = document.getElementById('tiempo')
    tiempo.innerHTML = `Tiempo trascurrido: ${temporizador}`
}

var detenerTiempo = function () {
    clearInterval(intervalTiempo);
    temporizador = 0;
    var tiempo = document.getElementById('tiempo')
    tiempo.innerHTML = ''
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
            detenerTiempo();
            return;
        }
    }
    score++;
    mostrarMensaje('', true, true)
    if (secuenciaJugador.length === secuenciaJuego.length) {
        penalizacionTiempo(nivel, temporizador)
        detenerTiempo();
        secuenciaJugador = [];
        setTimeout(nuevoNivel, 1000);
    }
}

var finalizarJuego = function () {
    SetLocalStorage('', false, true)
    esTurnoJugador = false;
    juegoIniciado = false;
    iniciar.disabled  = false;
    score = 0
    velocidadRepeticion = 500;
    detenerTiempo();
    localStorage.removeItem('simmonMemoria');
    mostrarMensaje('', true, true)
    //mostrarMensaje("¡Perdiste! Presiona 'Iniciar' para jugar de nuevo.");
    abrirModal("¡Perdiste!", "Presiona 'Reiniciar' para jugar de nuevo.");
}

var salirJuego = function () {
    esTurnoJugador = false;
    juegoIniciado = false;
    score = 0;
    nivel = 0;
    iniciar.disabled  = false;
    iniciar.innerHTML = "Iniciar";
    nombre.innerHTML = "";
    salir.disabled  = false;
    localStorage.removeItem('jugador')
    localStorage.removeItem('simmonMemoria')
    detenerTiempo();
    MostrarOcultarSimmon(false);
    MostrarOcultarForm(false);
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
    detenerTiempo();
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

var verRanking = function() {
    abrirModal("Ranking", "Últimos que entraron", true)
}

var cerrarModal = function() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
    var removerTabla = document.getElementById("tabla-ranking").firstChild;
    if(removerTabla != null){
        removerTabla.remove()
    }

}

var abrirModal = function(titulo, msj, visualizarTabla = false){
    mostrarMensaje("");
    var modal = document.getElementById("modal");
    modal.style.display = "flex";
    document.getElementById("titulo-modal").innerHTML = titulo
    var cuerpoModal = document.getElementById("cuerpo-modal")
    cuerpoModal.innerHTML = msj
    if(!visualizarTabla){
        var iniciar =  document.getElementById('iniciar-simmon')
        iniciar.innerHTML =  'Reiniciar'
        setTimeout(() => {
            modal.style.display = "none";
            mostrarMensaje("Presiona 'Reiniciar' para jugar de nuevo.");
        }, 2000);
    }
    else{
        // Informacion LocalStorage
        var ranking = JSON.parse(localStorage.getItem('ranking'))
        var div = document.getElementById("tabla-ranking")
        if(ranking != null && ranking != '' && ranking != undefined){
            var headers = ['Nombre', 'Puntaje', 'Nivel', 'Fecha']
            var table = document.createElement("table")
            table.className = 'sortable'
            var thead = document.createElement("thead")
            var tbody = document.createElement("tbody")
            var tr = document.createElement('tr')
            var th =  document.createElement('th')
            div.appendChild(table)
            table.appendChild(thead)
            thead.appendChild(tr)

            for (let i = 0; i < headers.length; i++) {
                var th =  document.createElement('th')
                th.innerHTML = headers[i]
                if(headers[i] == 'Fecha' || headers[i] == 'Puntaje'){
                    th.id = headers[i].toLowerCase();
                    th.onclick = function() {
                        var orden = th.getAttribute('data-order') === 'asc' ? 'desc' : 'asc'; // Se obtiene el atributo
                        ordenarHtml(i, orden);
                        th.setAttribute('data-order', orden);
                    };
                    th.setAttribute('data-order', 'asc'); // Establecer el orden inicial como ascendente
                }
                tr.appendChild(th);
            }
            table.appendChild(tbody)
            /* Ordenamos inicialmente por score */
            ranking = ordenar(ranking)
            ranking.forEach(function callback(e) {
                tbody.insertRow().innerHTML = `<td>${e.nombre}</td><td>${e.score}</td><td>${e.nivel}</td><td>${e.fecha}</td>`
            });
        }
        else{
            var p = document.createElement("p")
            p.innerHTML = 'Todavia no se ha juagado'
            p.className = 'p'
            div.appendChild(p)
        }
    }
}

var ordenar = function (data) {
    data.sort(function(a, b) {
        return  b.score - a.score;
    });
    return data;
}

var ordenarHtml = function (posicion, orden) {
    var tablaRanking = document.getElementsByClassName('sortable')[0];
    var tbodyRanking = tablaRanking.querySelector('tbody');
    var filasRanking = Array.from(tbodyRanking.getElementsByTagName('tr')); // se crea array para recorrer despues

    filasRanking.sort(function(a, b) {
        var primero = a.getElementsByTagName('td')[posicion].textContent;
        var segundo = b.getElementsByTagName('td')[posicion].textContent;

        if (orden === 'asc') {
            return primero.localeCompare(segundo, undefined, { numeric: true });
        } else {
            return segundo.localeCompare(primero, undefined, { numeric: true });
        }
    });
    tbodyRanking.innerHTML = ''; // se limpia tabla, y se inserta el nuevo oreden
    filasRanking.forEach(x => tbodyRanking.appendChild(x));
}


window.addEventListener("load", getLocalStorage);
nombre.addEventListener("blur", validacionForm);