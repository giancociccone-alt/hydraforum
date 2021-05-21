let button = document.querySelector('#enviarDatos');
button.addEventListener('click', crearEntrada);

let fileImagen = document.querySelector('#fileImagen');

let mostrarImagen = document.querySelector('#mostrarImagen');

fileImagen.addEventListener('change', function () {
    document.querySelector('#mostrarNombreImagen').innerHTML = fileImagen.files[0].name;
});

function crearEntrada(){

    let dataTitulo = document.querySelector('#titulo').value;
    let dataDescripcion = document.querySelector('#descripcion').value;

    let ckEditor = document.querySelector('iframe');
    let ckEditorHtml = ckEditor.contentWindow.document;

    let ckEditorContenido = ckEditorHtml.querySelector('body');

    var datosCk = ckEditorContenido.outerHTML;

    var data = [
                    { titulo: dataTitulo},
                    { imagen: fileImagen.files[0].name },
                    { datosCk: datosCk },
                    { descripcion: dataDescripcion}
                ]; 

    let titulo = data[0];
    let imagen = data[1];
    let obtenerCkEditor = data[2];
    let obtenerDescripcion = data[3];

    //Transformando la DATA a json
    var jsonTitulo = JSON.stringify(titulo);
    var jsonImagen = JSON.stringify(imagen);
    var jsonCkEditor = JSON.stringify(obtenerCkEditor.datosCk);
    var jsonDescripcion = JSON.stringify(obtenerDescripcion);

    var variable = jsonCkEditor.substring(6,129);

    var etiquetaBodyPasaDiv = jsonCkEditor.replace('body','div').replace(variable,'').replace('/body','/div');

    var transformadoTitulo = JSON.parse(jsonTitulo);
    var transformadoImagen = JSON.parse(jsonImagen);
    var transformadoCkEditor = JSON.parse(etiquetaBodyPasaDiv);
    var transformadoDescripcion = JSON.parse(jsonDescripcion);

    let dataArray = [transformadoTitulo.titulo, transformadoImagen.imagen ,transformadoCkEditor, ""];

    if(dataDescripcion != null){
        dataArray = [transformadoTitulo.titulo, transformadoImagen.imagen ,transformadoCkEditor, transformadoDescripcion.descripcion];
    }

    let usuario = undefined;
    
    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            window.location = '../index.html';
        }
    }
    
    dataArray.push(usuario);
    
    if((dataArray[0] && dataArray[1]) != ""){
        mandarDatosBaseDatos(dataArray);
    }else{
        console.log('error');
    }

}

function mandarDatosBaseDatos(dataArray){
    
    const url = `/piton-4life/backend/insertarEntrada.php`;

    fetch(url, {
                    method: 'POST',
                    body: dataArray,
                    headers:{'Content-Type': 'application/json'}
                }
        )
        .then((response) => response.json())
        .then(recibiendoDatos)
        .catch(console.log);

}

function recibiendoDatos({estado, mensaje}){

    if(estado === true){
        console.log(mensaje);
    }else{
        console.log(mensaje);
    }

}