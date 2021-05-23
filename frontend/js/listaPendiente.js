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
        divPendiente.appendChild(nombreUsuario);

        let pEstadoAmistad = document.createElement('p');
        divPendiente.appendChild(pEstadoAmistad);

        let textEstadoAmistad = document.createTextNode('DESCONOCIDO/PENDIENTE');
        pEstadoAmistad.appendChild(textEstadoAmistad);

        //Inicio de opcion para aceptar usuario

        let labelAceptar = document.createElement('label');
        labelAceptar.setAttribute('for',`aceptar${usuario}`);
        divPendiente.appendChild(labelAceptar);

        let iAceptar = document.createElement('i');
        iAceptar.setAttribute('class','fas fa-check iAceptar');
        labelAceptar.appendChild(iAceptar);

        let botonAceptar = document.createElement('input');
        botonAceptar.setAttribute('type','button');
        botonAceptar.setAttribute('id',`aceptar${usuario}`);
        botonAceptar.setAttribute('class',`btnAceptarUsuario`);
        botonAceptar.setAttribute('value',usuario);
        botonAceptar.addEventListener('click',aceptarAmigo);
        divPendiente.appendChild(botonAceptar);

        //Fin de opcion para aceptar usuario
        
        //Inicio de opcion para rechazar usuario

        let labelRechazar = document.createElement('label');
        labelRechazar.setAttribute('for',`rechazar${usuario}`);
        divPendiente.appendChild(labelRechazar);

        let iRechazar = document.createElement('i');
        iRechazar.setAttribute('class','fas fa-user-times iRechazar');
        labelRechazar.appendChild(iRechazar);

        let botonRechazar = document.createElement('input');
        botonRechazar.setAttribute('type','button');
        botonRechazar.setAttribute('id',`rechazar${usuario}`);
        botonRechazar.setAttribute('class',`btnRechazarUsuario`);
        botonRechazar.setAttribute('value',usuario);
        botonRechazar.addEventListener('click',rechazarUsuario);
        divPendiente.appendChild(botonRechazar);

        //Fin de opcion para rechazar usuario
        
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

    const amigoSeleccionado = e.currentTarget.value;

    let datosAmistad = [amigoSeleccionado, usuario];

    const url = `../backend/aceptarAmigo.php`;
    
    fetch(url, {
                method: 'POST',
                body: datosAmistad,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(window.location.reload())
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

    const amigoSeleccionado = e.currentTarget.value;

    let datosAmistad = [amigoSeleccionado, usuario];

    const url = `../backend/rechazarUsuario.php`;
    
    fetch(url, {
                method: 'POST',
                body: datosAmistad,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(window.location.reload())
        .catch(console.log);
}