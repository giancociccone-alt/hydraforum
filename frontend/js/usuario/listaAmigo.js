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

        const url = `../backend/usuarios/listaAmigo.php?receptor=${usuario}`;

        fetch(url)
            .then((response) => response.json())
            .then(mostrandoAmigos)
            .catch(console.log);

    }
    
});

function mostrandoAmigos( {usuarios} ){

    let listaAmigos = document.querySelector('#amigos');

    usuarios.forEach( (datosUsuario) => {

        let usuario = datosUsuario[0];
        let fechaSancion = datosUsuario[1];

        let div = document.createElement('div');
        listaAmigos.appendChild(div);

        if(sessionStorage.getItem('rol') == 2){

            /* ELIMINAR */

            // let labelUsuario = document.createElement('label');
            // labelUsuario.setAttribute('for',`eliminar${usuario}`);
            // div.appendChild(labelUsuario);
            
            // let iEliminarUsuario = document.createElement('i');
            // iEliminarUsuario.setAttribute('class','fas fa-heart-broken iAmigo');
            // labelUsuario.appendChild(iEliminarUsuario);
            
            // let EliminarUsuario = document.createElement('input');
            // EliminarUsuario.setAttribute('type','button');
            // EliminarUsuario.setAttribute('id',`eliminar${usuario}`);
            // EliminarUsuario.setAttribute('class',`btnEliminarUsuario`);
            // EliminarUsuario.setAttribute('value',usuario);
            // EliminarUsuario.addEventListener('click',eliminarAmistad);
            // div.appendChild(EliminarUsuario);

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
                iQuitarSancionUsuario.setAttribute('class','fas fa-heart-broken iAmigo');
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
            iSancionarUsuario.setAttribute('class',`fas fa-heart-broken iAmigo`);
            labelSancionarUsuario.appendChild(iSancionarUsuario);

        }

            let nombreUsuario = document.createElement('input');
            nombreUsuario.setAttribute('type','text');
            nombreUsuario.setAttribute('class','nombreUsuario');
            nombreUsuario.setAttribute('disabled','true');
            nombreUsuario.setAttribute('value',usuario);
            div.appendChild(nombreUsuario);

            let pEstadoAmistad = document.createElement('p');
            div.appendChild(pEstadoAmistad);

            let textEstadoAmistad = document.createTextNode('AMIGOS');
            pEstadoAmistad.appendChild(textEstadoAmistad);

            let chatAmigo = document.createElement('input');
            chatAmigo.setAttribute('type','button');
            chatAmigo.setAttribute('id',usuario);
            chatAmigo.setAttribute('value','enviarMensaje');
            chatAmigo.addEventListener('click', recuperandoChatEntreAmigos);
            div.appendChild(chatAmigo);

            let labelAmigo = document.createElement('label');
            labelAmigo.setAttribute('for',`eliminar${usuario}`);
            div.appendChild(labelAmigo);
            
            let iAmigo = document.createElement('i');
            iAmigo.setAttribute('class','fas fa-heart-broken iAmigo');
            labelAmigo.appendChild(iAmigo);
            
            let eliminarAmigo = document.createElement('input');
            eliminarAmigo.setAttribute('type','button');
            eliminarAmigo.setAttribute('id',`eliminar${usuario}`);
            eliminarAmigo.setAttribute('class',`btnEliminarAmigo`);
            eliminarAmigo.setAttribute('value',usuario);
            eliminarAmigo.addEventListener('click',eliminarAmistad);
            div.appendChild(eliminarAmigo);

    });

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

    const amigoSeleccionado = e.currentTarget.value;

    let datosAmistad = [amigoSeleccionado, usuario];

    const url = `../backend/amistades/eliminarAmigo.php`;
    
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

function recuperandoChatEntreAmigos(e){

    const amigoSeleccionado = e.currentTarget.id;

    const url = `../backend/mensajes.php?username=${usuario}&amigo=${amigoSeleccionado}`;

    fetch(url, {
        method: 'GET'
        }
    )
        .then((response) => response.json())
        .then(mostrandoMensajesEntreAmigos)
        .catch(console.log);

}

function mostrandoMensajesEntreAmigos({mensajes}){

    
    for(let mensaje of mensajes){
        let texto = document.querySelector('.cuerpo');

        let div = document.createElement('div');
        div.setAttribute('class','texto');
        texto.appendChild(div);

        let text = document.createTextNode(mensaje);
        div.appendChild(text);

    }

}