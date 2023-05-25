console.log("FOR - alertas")
/*
* a. Crear un array que contenga 5 palabras y recorrer dicho array utilizando un bucle for de JavaScript para mostrar una alerta utilizando 
     cada una de las palabras.
* b. Al array anterior convertir la primera letra de cada palabra en mayúscula ymostrar una alerta por cada palabra modificada.
* c. Crear una variable llamada “sentence” que tenga un string vacío, luego al array del punto a) recorrerlo con un bucle for para 
    ir guardando cada palabra dentro dela variable sentence. Al final mostrar una única alerta con la cadena completa.
* d. Crear una array vacío y con un bucle for de 10 repeticiones. Llenar el array conel número de la repetición, es decir que al final de 
    la ejecución del bucle fordebería haber 10 elementos dentro del array, desde el número 0 hasta al número 9. Mostrar por la consola del 
    navegador el array final (utilizar console.log).
*/

var arreglo = ['palabra1', 'palabra2', 'palabra3', 'palabra4', 'palabra5']
/* Ejercio a */
for (let i = 0; i < arreglo.length; i++) {
    alert(arreglo[i]);
}

/* Ejercio b */
for (let i = 0; i < arreglo.length; i++) {
    var result = (arreglo[i].substring(0, 1).toUpperCase()) + (arreglo[i].substring(1,arreglo[i].length).toLowerCase())
    alert(result);
}

/* Ejercio c */
var sentence = ""
for (let i = 0; i < arreglo.length; i++) {
    sentence += arreglo[i]
}
alert(sentence);


/* Ejercio d */
console.log("FOR - Ejercicio d")
arreglo = []
for (let i = 0; i < 10; i++) {
   arreglo.push(i)
}
console.log(arreglo)


console.log("")
console.log("")
console.log("")