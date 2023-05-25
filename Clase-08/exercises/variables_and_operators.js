//  Variables 

console.log("VARIABLES")

/*
    a. Crear dos variables numéricas y utilizar el operador suma para guardar el valor de la suma de ambos números en una 3er variable.
    b. Crear dos variables de tipo String y concatenarlas guardando el resultado en una3er variable.
    c. Crear dos variables de tipo String y sumar el largo de cada variable (cantidad deletras del string) guardando el resultado de la suma en una 3er variable (utilizarlength)
*/

console.log("VARIABLES - Ejercio a")
var a = 23
var b = 15

var result = a + b

console.log(`El resultado es: ${result}`)
console.log("---------------------------------------------------")
console.log("VARIABLES - Ejercio b")
a = "Hola. "
b = "Buenos dias."

result = a + b
console.log(`El resultado es: ${result}`)

console.log("---------------------------------------------------")
console.log("VARIABLES - Ejercio c")
a = "Hola."
b = "Buenos dias."

result = a.toString().length + b.toString().length
console.log(`El resultado es: ${result}`)


console.log("")
console.log("")
console.log("")