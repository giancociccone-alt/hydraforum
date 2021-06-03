document.addEventListener('DOMContentLoaded',function (){
    //Esto sigue siendo una prueba
    if(localStorage.getItem('idEntrada')){

        let btnCargarEntrada = document.querySelector('#enviarDatos');
        btnCargarEntrada.setAttribute('id','cargarDatos');
        btnCargarEntrada.setAttribute('value','Cargar Datos');

        const editarArticulo = localStorage.getItem('idEntrada');

        const url = `../backend/entradas/datosEntrada.php?id_entrada=${editarArticulo}`;
        fetch(url)
            .then((response) => response.json())
            .then(mostrandoDatosEntrada)
            .catch(console.log);
        
    }

})

function mostrandoDatosEntrada({entrada}){
    // buscar manera que se use esto sin el boton
    document.querySelector('#cargarDatos').addEventListener('click',function(){
        let titulo = entrada[0];
        let imagen = entrada[1];
        let contenido = entrada[2];
        let descripcion = entrada[3];
    
        let tituloModificado = document.querySelector('#titulo').value = titulo;
        let imagenModificado = document.querySelector('#mostrarNombreImagen').value = imagen;
        let descripcionModificado = document.querySelector('#descripcion').value = descripcion;
    
        let ckEditor = document.querySelector('iframe').contentWindow.document;

        let ckEditorContenido = ckEditor.querySelector('body').innerHTML = contenido;
        // let ckEditorContenido = ckEditor.querySelector('body').outerHTML;
        
        // var variable = ckEditorContenido.substring(5,122);

        // var etiquetaBodyPasaDiv = obtenerCkEditor.replace('body','div').replace(variable,'').replace('/body','/div');

        // etiquetaBodyPasaDiv.value = contenido;

        // console.log(etiquetaBodyPasaDiv);

        datosEntradaModificado = [tituloModificado, descripcionModificado, imagenModificado, etiquetaBodyPasaDiv, localStorage.getItem('idEntrada')];

        let btnActualizarEntrada = document.querySelector('#cargarDatos');
        btnActualizarEntrada.setAttribute('value','Actualizar Entrada');
        btnActualizarEntrada.addEventListener('click',actualizarEntrada);

        actualizarEntrada(datosEntradaModificado);

    })

}

function actualizarEntrada(datosEntradaModificado){

    const url = `../backend/entradas/actualizarEntrada.php?id_entrada=${localStorage.getItem('idEntrada')}`;
        fetch(url, {
                    method: 'POST',
                    body: datosEntradaModificado
                }
            )
            .then((response) => response.json())
            // .then(localStorage.removeItem('idEntrada'))
            .catch(console.log);

}