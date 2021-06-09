var contadorHistorialViejo = 0;
var contadorHistorialNuevo = 0;

window.addEventListener('DOMContentLoaded', function(){

    document.querySelector('#live-chat').style.display = 'none';

    var usuario = undefined;
    
    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            window.location.href = '../index.html';
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
    let fieldset = document.querySelector('fieldset');

    if(usuarios != null){

        let tituloUsuario = document.createElement('h3');
        listaAmigos.appendChild(tituloUsuario);

        let textTituloUsuario = document.createTextNode('AMIGOS');
        tituloUsuario.appendChild(textTituloUsuario);

    }

    usuarios.forEach( (datosUsuario) => {

        let usuario = datosUsuario[0];
        let fechaSancion = datosUsuario[1];

        let div = document.createElement('div');
        div.setAttribute('class','usuario');
        div.setAttribute('id','circuloNotificacion');
        listaAmigos.appendChild(div);
        /* BOTON DE ENVIAR MENSAJE */

        let inputEnviarMensaje = document.createElement('input');
        inputEnviarMensaje.setAttribute('type','submit');
        inputEnviarMensaje.setAttribute('id',`${usuario}`);
        inputEnviarMensaje.addEventListener('click', enviarMensaje);
        inputEnviarMensaje.setAttribute('value',`enviar`);
        fieldset.appendChild(inputEnviarMensaje);

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
            nombreUsuario.setAttribute('type','button');
            nombreUsuario.setAttribute('class','nombreUsuario');
            // nombreUsuario.setAttribute('disabled','true');
            nombreUsuario.addEventListener('click',verEntrada);
            nombreUsuario.setAttribute('value',usuario);
            div.appendChild(nombreUsuario);

            let pEstadoAmistad = document.createElement('p');
            div.appendChild(pEstadoAmistad);

            let textEstadoAmistad = document.createTextNode('AMIGOS');
            pEstadoAmistad.appendChild(textEstadoAmistad);

            let chatAmigo = document.createElement('input');
            chatAmigo.setAttribute('type','button');
            chatAmigo.setAttribute('id',usuario);
            chatAmigo.setAttribute('value','Abrir chat');
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

            // let verEntradasAmigo = document.createElement('input');
            // verEntradasAmigo.setAttribute('type','button');
            // verEntradasAmigo.setAttribute('id',`${usuario}`);
            // verEntradasAmigo.setAttribute('value',usuario);
            // verEntradasAmigo.addEventListener('click',verEntrada);
            // div.appendChild(verEntradasAmigo);

    });

}

function verEntrada(e){

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

    localStorage.setItem('verEntradaAmigo', amigoSeleccionado);

    window.location.href = './miCuenta.html';

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

function enviarMensaje(e){

    let mensaje = document.querySelector('#mensaje').value;
            
    const amigoSeleccionado = e.currentTarget.id;
        
    const url = `../backend/enviarMensaje.php?username=${usuario}&amigo=${amigoSeleccionado}`;

    fetch(url, {
        method: 'POST',
        body: mensaje
        }
    )
        .then((response) => response.json())
        .then(cargandoChatDespuesEnviarMensaje)
        .catch(console.log);

}

function cargandoChatDespuesEnviarMensaje({mensajes}){

    let usuario = mensajes[0];
    let amigoSeleccionado = mensajes[1];

            const url = `../backend/mensajes.php?username=${usuario}&amigo=${amigoSeleccionado}`;

            fetch(url, {
                method: 'POST'
                }
            )
                .then((response) => response.json())
                // .then(mostrandoHistorialChat)
                .catch(console.log);
        
        
    
}

function setIntervalManu(usuarioAmigo){

    const url = `../backend/mensajes.php?username=${usuario}&amigo=${usuarioAmigo}`;

    fetch(url, {
        method: 'POST'
        }
    )
        .then((response) => response.json())
        .then(contar)
        .then(actualizandoChat)
        .catch(console.log);

}

function conseguirMensajeActualizacion(mensajes){
    
    let posicionMensaje = mensajes.mensajes.length-1;

    let mensaje = mensajes.mensajes[posicionMensaje][0];
    let usuarioMensaje = mensajes.mensajes[1][1];

    let chatHistory = document.querySelector('.chat-history');
    
    let divChatMensajeClearix = document.createElement('div');
    divChatMensajeClearix.setAttribute('class','chat-message clearfix');
    chatHistory.appendChild(divChatMensajeClearix);

    let divchatMensajeContenidoClearfix = document.createElement('div');
    divchatMensajeContenidoClearfix.setAttribute('class','chat-message-content clearfix');
    divChatMensajeClearix.appendChild(divchatMensajeContenidoClearfix);

    let divchatTime = document.createElement('div');
    divchatTime.setAttribute('class','chat-time');
    divchatMensajeContenidoClearfix.appendChild(divchatTime);
    
    if(usuarioMensaje == usuario){
        
        let h5 = document.createElement('h5');
        divchatTime.appendChild(h5);

        let h5Nombre = document.createTextNode('Usted');
        h5.appendChild(h5Nombre);

        let p = document.createElement('p');
        divchatTime.appendChild(p);

        let pMensaje = document.createTextNode(mensaje);
        p.appendChild(pMensaje);
        
    }else{
        
        let h5 = document.createElement('h5');
        divchatTime.appendChild(h5);

        let h5Nombre = document.createTextNode(usuarioMensaje);
        h5.appendChild(h5Nombre);

        let p = document.createElement('p');
        divchatTime.appendChild(p);

        let pMensaje = document.createTextNode(mensaje);
        p.appendChild(pMensaje);

    }

}

function actualizandoChat(boleano){

    let amigoSeleccionado = undefined;

    for(let usuarioAmigo of boleano[0].mensajes.mensajes){

        if(usuarioAmigo[1] != usuario){
            amigoSeleccionado = usuarioAmigo[1];
            break
        }
        
    }

    if(boleano[1] === true){
        const url = `../backend/mensajes.php?username=${usuario}&amigo=${amigoSeleccionado}`;

        fetch(url, {
            method: 'POST'
            }
        )
            .then((response) => response.json())
            .then(conseguirMensajeActualizacion)
            .catch(console.log);
    }

}

function contar(mensajes){

    contadorHistorialNuevo = mensajes.mensajes.length;

    if(contadorHistorialNuevo > contadorHistorialViejo){
        contadorHistorialViejo++;
        contadorHistorialNuevo = 0;

        return [{mensajes}, true];
    }else{
        return [{mensajes}, false];
    }

}

function recuperandoChatEntreAmigos(e){

    document.querySelector('#live-chat').style.display = 'block';

    const amigoSeleccionado = e.currentTarget.id;
    
    let chatHistory = document.querySelector('.chat-history');
    
    while(chatHistory.hasChildNodes()){
        chatHistory.removeChild(chatHistory.lastChild);
    }

    const url = `../backend/mensajes.php?username=${usuario}&amigo=${amigoSeleccionado}`;

    fetch(url, {
        method: 'POST'
        }
    )
        .then((response) => response.json())
        .then(mostrandoMensajesEntreAmigos)
        .catch(console.log);

}

function mostrandoMensajesEntreAmigos({mensajes}){

    let clearfix = document.querySelector('.clearfix');

    let h4 = document.createElement('h4');
    clearfix.appendChild(h4);

    let h4Nombre = document.createTextNode(mensajes[0][1]);
    h4.appendChild(h4Nombre);

    let chatHistory = document.querySelector('.chat-history');
    
    for(let mensaje of mensajes){
        
        let mensajaEntreUsuarios = mensaje[0];
        let mensajeEmisor = mensaje[1];

        let divChatMensajeClearix = document.createElement('div');
        divChatMensajeClearix.setAttribute('class','chat-message clearfix');
        chatHistory.appendChild(divChatMensajeClearix);

        let divchatMensajeContenidoClearfix = document.createElement('div');
        divchatMensajeContenidoClearfix.setAttribute('class','chat-message-content clearfix');
        divChatMensajeClearix.appendChild(divchatMensajeContenidoClearfix);

        let divchatTime = document.createElement('div');
        divchatTime.setAttribute('class','chat-time');
        divchatMensajeContenidoClearfix.appendChild(divchatTime);

        if(mensajeEmisor == usuario){

            let h5 = document.createElement('h5');
            divchatTime.appendChild(h5);

            let h5Nombre = document.createTextNode('Usted');
            h5.appendChild(h5Nombre);

            let p = document.createElement('p');
            divchatTime.appendChild(p);

            let pMensaje = document.createTextNode(mensajaEntreUsuarios);
            p.appendChild(pMensaje);
            
        }else{
            
            let h5 = document.createElement('h5');
            divchatTime.appendChild(h5);

            let h5Nombre = document.createTextNode(mensajeEmisor);
            h5.appendChild(h5Nombre);

            let p = document.createElement('p');
            divchatTime.appendChild(p);

            let pMensaje = document.createTextNode(mensajaEntreUsuarios);
            p.appendChild(pMensaje);

        }

        let hr = document.createElement('hr');
        divchatTime.appendChild(hr);

        contadorHistorialViejo++;

    }
    
    setInterval(function(){
        setIntervalManu(mensajes[0][1]);
    }, 1000);

}

function cerrar() {
    var chat = document.querySelector('#live-chat');

    chat.style.display = 'none';
}