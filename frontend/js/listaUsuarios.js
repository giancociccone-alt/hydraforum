window.addEventListener('DOMContentLoaded', function(){
    var usuario = undefined;

    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            document.querySelector('#usuario').addEventListener('click',function(e){
                e.preventDefault();
            });
        }
    }

    if(usuario){

        const url = `/piton-4life/backend/listaUsuarios.php?username=${usuario}`;
    
        fetch(url)
            .then((response) => response.json())
            .then(mostrandoUsuarios)
            .catch(console.log);

    }

});

function mostrandoUsuarios({usuarios}){

    let listaUsuarios = document.querySelector('#usuarios');

    usuarios.forEach( (datosUsuario) => {

        let usuario = datosUsuario[0];
        let estadoAmistad = datosUsuario[1];

        let div = document.createElement('div');
        listaUsuarios.appendChild(div);

        let nombreUsuario = document.createElement('input');
        nombreUsuario.setAttribute('type','text');
        nombreUsuario.setAttribute('class','nombreUsuario');
        nombreUsuario.setAttribute('disabled','true');
        nombreUsuario.setAttribute('value',usuario);
        nombreUsuario.setAttribute('id',usuario);
        div.appendChild(nombreUsuario);

        let pEstadoAmistad = document.createElement('p');
        div.appendChild(pEstadoAmistad);

        if(estadoAmistad == "ACEPTADO"){
            let textEstadoAmistad = document.createTextNode('AMIGOS');
            pEstadoAmistad.appendChild(textEstadoAmistad);

            let chatAmigo = document.createElement('input');
            chatAmigo.setAttribute('type','button');
            chatAmigo.setAttribute('id',usuario);
            chatAmigo.setAttribute('value','enviarMensaje');
            // chatAmigo.addEventListener('click',chatAmigo);
            div.appendChild(chatAmigo);

            let eliminarAmigo = document.createElement('input');
            eliminarAmigo.setAttribute('type','button');
            eliminarAmigo.setAttribute('id',usuario);
            eliminarAmigo.setAttribute('name',usuario);
            eliminarAmigo.setAttribute('value','eliminarAmistad');
            eliminarAmigo.addEventListener('click',eliminarAmistad);
            div.appendChild(eliminarAmigo);

        }else if(estadoAmistad == "PENDIENTE"){

            let textEstadoAmistad = document.createTextNode('PENDIENTE');
            pEstadoAmistad.appendChild(textEstadoAmistad);

            let botonAceptar = document.createElement('input');
            botonAceptar.setAttribute('type','button');
            botonAceptar.setAttribute('id',usuario);
            botonAceptar.setAttribute('value','ACEPTADO');
            botonAceptar.addEventListener('click',aceptarAmigo);
            div.appendChild(botonAceptar);

            let botonRechazar = document.createElement('input');
            botonRechazar.setAttribute('type','button');
            botonRechazar.setAttribute('id',usuario);
            botonRechazar.setAttribute('value','RECHAZADO');
            botonRechazar.addEventListener('click',rechazarUsuario);
            div.appendChild(botonRechazar);

        }else{
            let textEstadoAmistad = document.createTextNode('DESCONOCIDO');
            pEstadoAmistad.appendChild(textEstadoAmistad);

            let agregarAmigo = document.createElement('input');
            agregarAmigo.setAttribute('type','button');
            agregarAmigo.setAttribute('id',usuario);
            agregarAmigo.setAttribute('value','agregarAmigo');
            agregarAmigo.addEventListener('click',solicitudAmistad);
            div.appendChild(agregarAmigo);
        }
        
    });

}

function solicitudAmistad(e){

    var usuario = undefined;

    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            document.querySelector('#usuario').addEventListener('click',function(e){
                e.preventDefault();
            });
        }
    }

    const amigoSeleccionado = e.currentTarget.id;

    let datosAmistad = [amigoSeleccionado, usuario];

    const url = `/piton-4life/backend/agregarAmigo.php`;
    
    fetch(url, {
                method: 'POST',
                body: datosAmistad,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(console.log('chido'))
        .catch(console.log);
}

function eliminarAmistad(e){

    var usuario = undefined;

    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            document.querySelector('#usuario').addEventListener('click',function(e){
                e.preventDefault();
            });
        }
    }

    const amigoSeleccionado = e.currentTarget.id;

    let datosAmistad = [amigoSeleccionado, usuario];

    const url = `/piton-4life/backend/eliminarAmigo.php`;
    
    fetch(url, {
                method: 'POST',
                body: datosAmistad,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(console.log('chido'))
        .catch(console.log);
}

function aceptarAmigo(e){

    var usuario = undefined;

    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            document.querySelector('#usuario').addEventListener('click',function(e){
                e.preventDefault();
            });
        }
    }

    const amigoSeleccionado = e.currentTarget.id;

    let datosAmistad = [amigoSeleccionado, usuario];

    const url = `/piton-4life/backend/aceptarAmigo.php`;
    
    fetch(url, {
                method: 'POST',
                body: datosAmistad,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(console.log('chido'))
        .catch(console.log);
}

function rechazarUsuario(e){

    var usuario = undefined;

    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            document.querySelector('#usuario').addEventListener('click',function(e){
                e.preventDefault();
            });
        }
    }

    const amigoSeleccionado = e.currentTarget.id;

    let datosAmistad = [amigoSeleccionado, usuario];

    const url = `/piton-4life/backend/rechazarUsuario.php`;
    
    fetch(url, {
                method: 'POST',
                body: datosAmistad,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(console.log('chido'))
        .catch(console.log);
}