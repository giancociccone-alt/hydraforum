CKEDITOR.replace( 'editor1' );

let button = document.querySelector('#enviarDatos');
button.addEventListener('click', crearEntrada);

var inputFile = document.querySelector('input[type="file"]');

inputFile.addEventListener('change', function () {
    document.querySelector('#mostrarNombreImagen').innerHTML = inputFile.files[0].name;
});

function crearEntrada(){

    let dataTitulo = document.querySelector('#titulo').value;
    let dataDescripcion = document.querySelector('#descripcion').value;
    let dataImagen = inputFile.files[0].name;

    let ckEditor = document.querySelector('iframe');
    let ckEditorHtml = ckEditor.contentWindow.document;

    let ckEditorContenido = ckEditorHtml.querySelector('body');

    var datosCk = ckEditorContenido.outerHTML;

    var data = [
                    { titulo: dataTitulo},
                    { imagen: dataImagen },
                    { datosCk: datosCk },
                    { descripcion: dataDescripcion}
                ]; 

    let titulo = data[0].titulo;
    let imagen = data[1].imagen;
    let obtenerCkEditor = data[2].datosCk;
    let obtenerDescripcion = data[3].descripcion;

    var variable = obtenerCkEditor.substring(5,122);

    var etiquetaBodyPasaDiv = obtenerCkEditor.replace('body','div').replace(variable,'').replace('/body','/div');

    let usuario = undefined;
    
    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            window.location = '../index.html';
        }
    }

    var data = new FormData()
    data.append('file', inputFile.files[0])
    data.append('nombre_fichero', imagen)
    data.append('titulo', titulo)
    data.append('contenido', etiquetaBodyPasaDiv)
    data.append('descripcion', obtenerDescripcion)
    data.append('usuario', usuario)

    mandarDatosBaseDatos(data);

}

function mandarDatosBaseDatos(data){
    
    const url = `../backend/entradas/insertarEntrada.php`;

    fetch(url, {
                    method: 'POST',
                    body: data
                }
        )
        .then((response) => response.json())
        .then(recibiendoDatos)
        .catch(console.log);

}

function recibiendoDatos({estado, mensaje}){

    if(estado === "true"){
        Swal.fire({
                icon: 'success',
                title: mensaje,
                timer: 3000,
                showConfirmButton: false
            }
        ).then(function(){
            window.location = "./miCuenta.html";
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: mensaje,
            timer: 3500,
            showConfirmButton: false
        })
    }

}