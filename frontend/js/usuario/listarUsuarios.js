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

        const url = `../backend/usuarios/listaUsuarios.php?username=${usuario}`;
    
        fetch(url)
            .then((response) => response.json())
            .then(mostrandoUsuarios)
            .catch(console.log);

    }

});

function mostrandoUsuarios({usuarios}){

    let listaUsuarios = document.querySelector('#usuarios');

    if(usuarios != null){

        let tituloUsuario = document.createElement('h3');
        listaUsuarios.appendChild(tituloUsuario);

        let textTituloUsuario = document.createTextNode('USUARIOS');
        tituloUsuario.appendChild(textTituloUsuario);

    }

    usuarios.forEach( (datosUsuario) => {

        let usuario = datosUsuario[0];
        let fechaSancion = datosUsuario[1];

        let div = document.createElement('div');
        div.setAttribute('class','usuario');
        listaUsuarios.appendChild(div);

        if(sessionStorage.getItem('rol') == 1){

            /* ELIMINAR SANCIONAR */

            if(fechaSancion != '0000-00-00'){
                let labelQuitarSancion = document.createElement('label');
                labelQuitarSancion.setAttribute('id',usuario);
                labelQuitarSancion.setAttribute('name',`${usuario}`);
                labelQuitarSancion.addEventListener('click', quitarSancion);
                div.appendChild(labelQuitarSancion);

                let quitarSancionUsuario = document.createElement('input');
                quitarSancionUsuario.setAttribute('type','button');
                quitarSancionUsuario.setAttribute('id',`${usuario}`);
                quitarSancionUsuario.setAttribute('class',`btnSancionar${usuario}`);
                quitarSancionUsuario.setAttribute('value','Quitar sancion');
                div.appendChild(quitarSancionUsuario);

                let iQuitarSancionUsuario = document.createElement('i');
                iQuitarSancionUsuario.setAttribute('class','far fa-calendar-times iAmigo');
                labelQuitarSancion.appendChild(iQuitarSancionUsuario);
            }

            /* SANCIONAR */
            
            let labelSancionarUsuario = document.createElement('label');
            labelSancionarUsuario.setAttribute('id',usuario);
            labelSancionarUsuario.setAttribute('name',`${usuario}`);
            labelSancionarUsuario.addEventListener('click',enviarFechaSancion);
            div.appendChild(labelSancionarUsuario);

            let sancionarUsuario = document.createElement('input');
            sancionarUsuario.setAttribute('type','date');
            sancionarUsuario.setAttribute('id',`${usuario}`);
            sancionarUsuario.setAttribute('class',`btnSancionar${usuario}`);
            div.appendChild(sancionarUsuario);
            
            let iSancionarUsuario = document.createElement('i');
            iSancionarUsuario.setAttribute('class',`far fa-calendar-times iAmigo`);
            labelSancionarUsuario.appendChild(iSancionarUsuario);
            
        }

            let nombreUsuario = document.createElement('input');
            nombreUsuario.setAttribute('type','text');
            nombreUsuario.setAttribute('class','nombreUsuario');
            nombreUsuario.setAttribute('disabled','true');
            nombreUsuario.setAttribute('value',usuario);
            div.appendChild(nombreUsuario);

            let pEstadoAmistad = document.createElement('p');
            pEstadoAmistad.setAttribute('class','estadoUsuario');
            div.appendChild(pEstadoAmistad);

            let textEstadoAmistad = document.createTextNode('DESCONOCIDO');
            pEstadoAmistad.appendChild(textEstadoAmistad);

            let containerOpciones = document.createElement('div');
            containerOpciones.setAttribute('class','containerOpcionesUsuario');
            div.appendChild(containerOpciones);

            let labelUsuarios = document.createElement('label');
            labelUsuarios.setAttribute('id',`username`);
            labelUsuarios.setAttribute('for',`usuario${usuario}`);
            containerOpciones.appendChild(labelUsuarios);

            let iUsuario = document.createElement('i');
            iUsuario.setAttribute('class','fas fa-user-plus iListaUsuario');
            labelUsuarios.appendChild(iUsuario);

            let agregarUsuario = document.createElement('input');
            agregarUsuario.setAttribute('type','button');
            agregarUsuario.setAttribute('class','btnAgregarUsuario');
            agregarUsuario.setAttribute('id',`usuario${usuario}`);
            agregarUsuario.setAttribute('value',usuario);
            agregarUsuario.addEventListener('click',solicitudAmistad);
            containerOpciones.appendChild(agregarUsuario);

            let amistadesComun = document.createElement('p');
            amistadesComun.setAttribute('class','amistadComun');
            div.appendChild(amistadesComun);

            let textAmistadesComun = document.createTextNode('Contador');
            amistadesComun.appendChild(textAmistadesComun);
        
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

    const amigoSeleccionado = e.currentTarget.value;

    let datosAmistad = [amigoSeleccionado, usuario];

    console.log(datosAmistad);

    const url = `../backend/amistades/agregarAmigo.php`;
    
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