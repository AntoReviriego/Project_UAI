
console.log("Arrays")
/*
* a. Dado el siguiente array: 
["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] 
mostrar porconsola los meses 5 y 11 (utilizar console.log).
* b. Ordenar el array de meses alfabéticamente y mostrarlo por consola (utilizar sort).
* c. Agregar un elemento al principio y al final del array (utilizar unshift y push).
* d. Quitar un elemento del principio y del final del array (utilizar shift y pop).
* e. Invertir el orden del array (utilizar reverse).
* f. Unir todos los elementos del array en un único string donde cada mes esteseparado por un guión - (utilizar join).
* g. Crear una copia del array de meses que contenga desde Mayo hasta Noviembre(utilizar slice)
*/

var a = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
console.log("ARRAYS - Ejercio a (mes 5 y 11)")
console.log(`Mes 5: ${a[4]}, Mes 11: ${a[10]}`)
console.log("---------------------------------------------------")

console.log("ARRAYS - Ejercio b orden alfabetico")
console.log(`El resultado es: ${a.sort()}`)
console.log("---------------------------------------------------")

console.log("ARRAYS - Ejercio c agrega elementos")
a.unshift("AL PRICIPIO")
a.push("AL FINAL")
console.log(`El resultado es: ${a}`)
console.log("---------------------------------------------------")

console.log("ARRAYS - Ejercio c quitan elementos")
a.shift()
a.pop()
console.log(`El resultado es: ${a}`)
console.log("---------------------------------------------------")

console.log("ARRAYS - Ejercio d invierte orden")
console.log(`El resultado es: ${a.reverse()}`)
console.log("---------------------------------------------------")

console.log("ARRAYS - Ejercio f JOIN")
console.log(`El resultado es: ${a.join('-')}`)
console.log("---------------------------------------------------")

console.log("ARRAYS - Ejercio g slice")
a = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
console.log(`El resultado es: ${a.slice(4, 11)}`)
console.log("---------------------------------------------------")


console.log("")
console.log("")
console.log("")
