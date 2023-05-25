
console.log("STRINGS")
/*
* a.Crear una variable de tipo string con al menos 10 caracteres y convertir todo eltexto en mayúscula (utilizar toUpperCase).
* b. Crear una variable de tipo string con al menos 10 caracteres y generar un nuevostring con los primeros 5 caracteres guardando el 
    resultado en una nuevavariable (utilizar substring).
* c. Crear una variable de tipo string con al menos 10 caracteres y generar un nuevostring con los últimos 3 caracteres guardando el 
    resultado en una nueva variable(utilizar substring).
* d. Crear una variable de tipo string con al menos 10 caracteres y generar un nuevostring con la primera letra en mayúscula y las demás 
    en minúscula. Guardar elresultado en una nueva variable (utilizar substring, toUpperCase, toLowerCase yel operador +).
* e. Crear una variable de tipo string con al menos 10 caracteres y algún espacio enblanco. Encontrar la posición del primer espacio en 
    blanco y guardarla en unavariable (utilizar indexOf).
* f. Crear una variable de tipo string con al menos 2 palabras largas (10 caracteres yalgún espacio entre medio). Utilizar los métodos de 
    los ejercicios anteriores paragenerar un nuevo string que tenga la primera letra de ambas palabras enmayúscula y las demás letras en 
    minúscula (utilizar indexOf, substring,toUpperCase, toLowerCase y el operador +).
*/


console.log("STRINGS - Ejercio a Mayuscula")
var a = 'JaVaScrIPt'
var result = a.toUpperCase()
console.log(`El resultado es: ${result}`)
console.log("---------------------------------------------------")

console.log("STRINGS - Ejercio b Primeros 5")
result = a.substring(0,5)
console.log(`El resultado es: ${result}, palabra original: ${a}`)

console.log("---------------------------------------------------")

console.log("STRINGS - Ejercio c ultimos 3")
result = a.substring(a.length - 3,a.length)
console.log(`El resultado es: ${result}, palabra original: ${a}`)

console.log("---------------------------------------------------")

console.log("STRINGS - Ejercio d substring, toUpperCase, toLowerCase y operador +")
result = (a.substring(0, 1).toUpperCase()) + (a.substring(1,a.length).toLowerCase())
console.log(`El resultado es: ${result}, palabra original: ${a}`)

console.log("---------------------------------------------------")

console.log("STRINGS - Ejercio e indexOf")
a += " espacio en blanco"
result = a.indexOf(' ')
console.log(`El resultado es: ${result}, palabra original: ${a}`)

console.log("---------------------------------------------------")

console.log("STRINGS - Ejercio f indexOf, substring, toUpperCase, toLowerCase y el operador +")
a = "JaVaScrIPt coDIgo"
result = (a.substring(0, 1).toUpperCase()) + (a.substring(1,a.indexOf(' ')).toLowerCase()) + (a.substring(a.indexOf(' '), a.indexOf(' ')+2).toUpperCase()) + (a.substring(a.indexOf(' ')+2, a.length).toLowerCase())
console.log(`El resultado es: ${result}, palabra original: ${a}`)

console.log("")
console.log("")
console.log("")
