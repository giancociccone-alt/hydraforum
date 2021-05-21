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

        const url = `../backend/listaPendiente.php?usuario=${usuario}`;

        fetch(url)
            .then((response) => response.json())
            .then(mostrandoPendientes)
            .catch(console.log);

    }
    
});

function mostrandoPendientes( {usuarios} ){

    let listaPendiente = document.querySelector('#pendiente');

    usuarios.forEach( (datosUsuario) => {

        let usuario = datosUsuario[0];

        let divPendiente = document.createElement('div');
        listaPendiente.appendChild(divPendiente);

        let nombreUsuario = document.createElement('input');
        nombreUsuario.setAttribute('type','text');
        nombreUsuario.setAttribute('class','nombreUsuario');
        nombreUsuario.setAttribute('disabled','true');
        nombreUsuario.setAttribute('value',usuario);
        nombreUsuario.setAttribute('id',usuario);
        divPendiente.appendChild(nombreUsuario);

        let pEstadoAmistad = document.createElement('p');
        divPendiente.appendChild(pEstadoAmistad);

        let textEstadoAmistad = document.createTextNode('PENDIENTE');
        pEstadoAmistad.appendChild(textEstadoAmistad);

        let botonAceptar = document.createElement('input');
        botonAceptar.setAttribute('type','button');
        botonAceptar.setAttribute('id',usuario);
        botonAceptar.setAttribute('value','ACEPTADO');
        botonAceptar.addEventListener('click',aceptarAmigo);
        divPendiente.appendChild(botonAceptar);

        let botonRechazar = document.createElement('input');
        botonRechazar.setAttribute('type','button');
        botonRechazar.setAttribute('id',usuario);
        botonRechazar.setAttribute('value','RECHAZADO');
        botonRechazar.addEventListener('click',rechazarUsuario);
        divPendiente.appendChild(botonRechazar);
        
    });

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

    const url = `../backend/aceptarAmigo.php`;
    
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

    const url = `../backend/rechazarUsuario.php`;
    
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