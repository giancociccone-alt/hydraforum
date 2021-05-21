//Esto sigue siendo una prueba
if(localStorage.getItem('idEntrada')){

    const editarArticulo = localStorage.getItem('idEntrada');

    const url = `/piton-4life/backend/datosEntrada.php?id_entrada=${editarArticulo}`;
    fetch(url)
        .then((response) => response.json())
        .then(mostrandoDatosEntrada)
        .catch(console.log);
    
}

function mostrandoDatosEntrada({entrada}){
    // buscar manera que se use esto sin el boton
    document.querySelector('#enviarDatos').addEventListener('click',function(){
        let titulo = entrada[0];
        let contenido = entrada[2];
        let descripcion = entrada[3];
    
        let tituloModificado = document.querySelector('#titulo').value = titulo;
        let descripcionModificado = document.querySelector('#descripcion').value = descripcion;
    
        let ckEditor = document.querySelector('iframe').contentWindow.document;

        let ckEditorContenido = ckEditor.querySelector('body').innerHTML = contenido;
        
        datosEntradaModificado = [tituloModificado, descripcionModificado, ckEditorContenido];

    })

}