let formulario = document.querySelector('.formulario');

document.addEventListener('DOMContentLoaded',function (){
    
    var usuario = undefined;

    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            window.location.href = '../index.html';
        }
    }

    if(localStorage.getItem('idEntrada')){

        let btnCrearEntradaEliminado = document.querySelector('#enviarDatos');
        btnCrearEntradaEliminado.parentNode.removeChild(btnCrearEntradaEliminado);

        let btnCargarEntrada = document.createElement('input');
        btnCargarEntrada.setAttribute('type','submit');
        btnCargarEntrada.setAttribute('id','cargarDatos');
        btnCargarEntrada.setAttribute('value','Cargar Datos');
        btnCargarEntrada.addEventListener('click',mostrandoDatosEntrada);
        formulario.appendChild(btnCargarEntrada);

        const editarArticulo = localStorage.getItem('idEntrada');

        const url = `../backend/entradas/datosEntrada.php?id_entrada=${editarArticulo}`;
        fetch(url)
            .then((response) => response.json())
            .then(mostrandoDatosEntrada)
            .catch(console.log);
        
    }

})

function mostrandoDatosEntrada({entrada}){
    
    document.querySelector('#cargarDatos').addEventListener('click',function(){

        var inputFile = document.querySelector('input[type="file"]');

        var usuario = undefined;

        usuario = localStorage.getItem('usuario');
        if (!usuario) {
            usuario = sessionStorage.getItem('usuario');
            if (!usuario) {
                window.location.href = '../index.html';
            }
        }

        document.querySelector('#cargarDatos').setAttribute('disabled',true );

        let titulo = entrada[0];
        let imagen = entrada[1];
        let contenido = entrada[2];
        let descripcion = entrada[3];
    
        document.querySelector('#titulo').value = titulo;
        document.querySelector('#mostrarNombreImagen').value = imagen;
        document.querySelector('#descripcion').value = descripcion;
    
        let ckEditor = document.querySelector('iframe').contentWindow.document;

        let ckEditorContenido = ckEditor.querySelector('body');

        var datosCk = ckEditorContenido.outerHTML;

        datosCk = contenido;

        ckEditor.querySelector('body').innerHTML = datosCk;

        let btnActualizarDatos = document.createElement('input');
        btnActualizarDatos.setAttribute('type','submit');
        btnActualizarDatos.setAttribute('id','actualizarDatos');
        btnActualizarDatos.setAttribute('value','Actualizar datos');
        btnActualizarDatos.addEventListener('click',function(){

            document.querySelector('#cargarDatos').setAttribute('disabled','true');

            let ckEditor = document.querySelector('iframe').contentWindow.document;

            let ckEditorContenido = ckEditor.querySelector('body');

            var datosCk = ckEditorContenido.outerHTML;
            
            var variable = datosCk.substring(5,122);

            var etiquetaBodyPasaDiv = datosCk.replace('body','div').replace(variable,'').replace('/body','/div');
            
            let tituloModificado = document.querySelector('#titulo').value;
            let imagenModificado = document.querySelector('#mostrarNombreImagen').value;
            let descripcionModificado = document.querySelector('#descripcion').value;
        
            var data = new FormData()
            data.append('file', inputFile.files[0])
            data.append('nombre_fichero', inputFile.files[0].name)
            data.append('tituloModificado', tituloModificado)
            data.append('descripcionModificado', descripcionModificado)
            data.append('etiquetaBodyPasaDiv', etiquetaBodyPasaDiv)
            data.append('idEntrada', localStorage.getItem('idEntrada'))
            data.append('usuario', usuario)

            actualizarEntrada(data);
        });
        formulario.appendChild(btnActualizarDatos);

    })

}

function actualizarEntrada(data){

    console.log(data);

    const url = `../backend/entradas/actualizarEntrada.php?id_entrada=${localStorage.getItem('idEntrada')}`;
        fetch(url, {
                    method: 'POST',
                    body: data
                }
            )
            .then((response) => response.json())
            .then(localStorage.removeItem('idEntrada'))
            .then(window.location.href = './miCuenta.html')
            .catch(console.log);

}