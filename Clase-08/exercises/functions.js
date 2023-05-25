console.log("FUNCIONES")
/*
* a. Crear una función suma que reciba dos valores numéricos y retorne el resultado. Ejecutar la función y guardar el resultado en 
    una variable, mostrando el valor dedicha variable en la consola del navegador.
* b. A la función suma anterior, agregarle una validación para controlar si alguno de los parámetros no es un número, mostrar una alerta 
    aclarando que uno de los parámetros tiene error y retornar el valor NaN como resultado.
* c. Crear una función validate integer que reciba un número como parámetro y devuelva verdadero si es un número entero.
* d. A la función suma del ejercicio 6b) agregarle una llamada que valide que losnúmeros sean enteros. En caso que haya decimales 
    mostrar un alerta con elerror y retorna el número convertido a entero (redondeado).
* e. Convertir la validación del ejercicio 6d) en una función separada y llamarladentro de la función suma probando que todo siga 
    funcionando igual
*/

console.log("FUNCIONES - Ejercicio a. Suma de valores")

var result = suma(4, 25)
console.log(`El resultado es: ${result}`)


console.log("FUNCIONES - Ejercicio b. Verificacion de numeros")
result = suma(4, " g")
console.log(`El resultado es: ${result}`)

console.log("FUNCIONES - Ejercicio c. Funcion validate")
var value = 4
result = validateInterger(value)
console.log(`El resultado es: ${result}, porque el valor enviado es ${value}`)
value = 6.5
result = validateInterger(value)
console.log(`El resultado es: ${result}, porque el valor enviado es ${value} `)

console.log("FUNCIONES - Ejercicio d. Redondeo")
result = suma(4.3, 9)
console.log(`El resultado es: ${result}`)



function suma(a, b) {
    var resultadoSuma = 0
    if(isNaN(a) || isNaN(b)){
        alert("Uno de los parámetros tiene error")
        resultadoSuma = NaN
    }
    else{
        if(validateInterger(a) && validateInterger(b)){
            resultadoSuma = a + b
        }
        else{
            var numbers = [a, b]; 
            alert(mensaje(numbers))
        }

    }
    return resultadoSuma
}

function validateInterger(param) {
    var respuesta = false
    if(!isNaN(param)){
        if(Number.isInteger(param)){
            respuesta = true 
        }
    }
    return respuesta
}

function mensaje(numbers) {
    var msj = "A ocurrido un error."; 
    for (let i = 0; i < numbers.length; i++) {
        if(!validateInterger(numbers[i])){
            msj += `Tu número ${numbers[i]}, no es entero. Tu número deberia ser ${Math.round(numbers[i])}.` 
        }
    }
    return msj
}


