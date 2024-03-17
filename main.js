// Definir una funcion para agregar un nuevo instrumento a la lista
function agregarInstrumento(lista, nombre, tipo) {
    lista.push({ nombre: nombre, tipo: tipo });
}

// Definir una funcion para listar todos los instrumentos
function listarInstrumentos(lista) {
    console.log("Lista de instrumentos:");
    for (let i = 0; i < lista.length; i++) {
        console.log("Nombre:", lista[i].nombre, "- Tipo:", lista[i].tipo);
    }
}

// Definir una funcion para buscar un instrumento por su tipo
function buscarInstrumentoPorTipo(lista, tipo) {
    const encontrados = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].tipo.toLowerCase() === tipo.toLowerCase()) {
            encontrados.push(lista[i]);
        }
    }
    return encontrados.length ? encontrados : null; // Retorna null si no se encuentra ningun instrumento del tipo especificado
}

// Array de instrumentos
const instrumentos = [
    { nombre: "Guitarra", tipo: "Cuerda" },
    { nombre: "Batería", tipo: "Percusión" },
    { nombre: "Teclado", tipo: "Teclado" }
];

// Solicitar al usuario que ingrese nuevos instrumentos hasta que decida salir
let continuar = true;
while (continuar) {
    const nombre = prompt("Ingrese el nombre del nuevo instrumento:");
    const tipo = prompt("Ingrese el tipo del nuevo instrumento:");
    agregarInstrumento(instrumentos, nombre, tipo);
    const respuesta = prompt("¿Desea ingresar otro instrumento? (s/n)");
    continuar = respuesta.toLowerCase() === 's';
}

// Listar todos los instrumentos
listarInstrumentos(instrumentos);

// Buscar instrumentos por tipo
const tipoBuscado = "cuerda";
const instrumentosEncontrados = buscarInstrumentoPorTipo(instrumentos, tipoBuscado);
if (instrumentosEncontrados) {
    console.log("Instrumentos encontrados de tipo", tipoBuscado + ":");
    listarInstrumentos(instrumentosEncontrados);
} else {
    console.log("No se encontraron instrumentos del tipo", tipoBuscado);
}