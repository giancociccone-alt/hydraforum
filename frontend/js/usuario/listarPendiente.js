window.addEventListener('DOMContentLoaded', function(){

    var usuario = undefined;

    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            window.location.href = '../index.html';
        }
    }

    if(usuario){

        const url = `../backend/usuarios/listaPendiente.php?usuario=${usuario}`;

        fetch(url)
            .then((response) => response.json())
            .then(mostrandoPendientes)
            .catch(console.log);

    }
    
});

function mostrandoPendientes( {usuarios} ){

    let listaPendiente = document.querySelector('#pendiente');

    if(usuarios != null){

        let tituloUsuario = document.createElement('h3');
        listaPendiente.appendChild(tituloUsuario);

        let textTituloUsuario = document.createTextNode('PENDIENTE');
        tituloUsuario.appendChild(textTituloUsuario);

    }

    usuarios.forEach( (datosUsuario) => {

        let usuario = datosUsuario[0];
        let fechaSancion = datosUsuario[1];

        let divPendiente = document.createElement('div');
        divPendiente.setAttribute('id',`notificacion${usuario}`);
        listaPendiente.appendChild(divPendiente);

        if(sessionStorage.getItem('rol') == 1){

            /* ELIMINAR SANCIONAR */

            if(fechaSancion != '0000-00-00'){
                let labelQuitarSancion = document.createElement('label');
                labelQuitarSancion.setAttribute('id',usuario);
                labelQuitarSancion.setAttribute('name',`${usuario}`);
                labelQuitarSancion.addEventListener('click', quitarSancion);
                divPendiente.appendChild(labelQuitarSancion);

                let quitarSancionUsuario = document.createElement('input');
                quitarSancionUsuario.setAttribute('type','button');
                quitarSancionUsuario.setAttribute('id',`${usuario}`);
                quitarSancionUsuario.setAttribute('class',`btnSancionar${usuario}`);
                quitarSancionUsuario.setAttribute('value','Quitar sancion');
                divPendiente.appendChild(quitarSancionUsuario);

                let iQuitarSancionUsuario = document.createElement('i');
                iQuitarSancionUsuario.setAttribute('class','far fa-calendar-times iAmigo');
                labelQuitarSancion.appendChild(iQuitarSancionUsuario);
            }

            /* SANCIONAR */
            
            let labelSancionarUsuario = document.createElement('label');
            labelSancionarUsuario.setAttribute('id',usuario);
            labelSancionarUsuario.setAttribute('name',`${usuario}`);
            labelSancionarUsuario.addEventListener('click',enviarFechaSancion);
            divPendiente.appendChild(labelSancionarUsuario);

            let sancionarUsuario = document.createElement('input');
            sancionarUsuario.setAttribute('type','date');
            sancionarUsuario.setAttribute('id',`${usuario}`);
            sancionarUsuario.setAttribute('class',`btnSancionar${usuario}`);
            divPendiente.appendChild(sancionarUsuario);
            
            let iSancionarUsuario = document.createElement('i');
            iSancionarUsuario.setAttribute('class',`far fa-calendar-times iAmigo`);
            labelSancionarUsuario.appendChild(iSancionarUsuario);

        }
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

    const url = `../backend/amistades/aceptarAmigo.php`;
    
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

    const url = `../backend/amistades/rechazarUsuario.php`;
    
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

function enviarFechaSancion(e){

    const usuarioSeleccionado = e.currentTarget.id;
    
    const fechaPenalizacion = document.querySelector(`.btnSancionar${usuarioSeleccionado}`).value;
    
    let datosAmistad = [ usuarioSeleccionado, fechaPenalizacion ];

    const url = `../backend/admin/sancionarUsuario.php`;
    
    fetch(url, {
                method: 'POST',
                body: datosAmistad,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(recibiendoDatos)
        .catch(console.log);

}

function quitarSancion(e){

    const usuarioSeleccionado = e.currentTarget.id;

    const url = '../backend/admin/eliminarSancion.php';

    fetch(url, {
                method: 'POST',
                body: usuarioSeleccionado,
                headers:{'Content-Type': 'application/json'}
            }
    )
        .then((response) => response.json())
        .then(window.location.reload())
        .catch(console.log);

}

function recibiendoDatos({estado, mensaje}){

    if(estado === "true"){
        
        Swal.fire({
            icon: 'success',
            title: 'Sancion colocada',
            timer: 3500,
            showConfirmButton: false
        })

    }else{
        
        Swal.fire({
            icon: 'error',
            title: 'Error al colocar la sancion',
            timer: 3500,
            showConfirmButton: false
        })
    }

}