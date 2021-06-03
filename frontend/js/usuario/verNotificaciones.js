document.addEventListener("DOMContentLoaded", function() { 

    usuario = undefined;
    
    usuario = localStorage.getItem('usuario');
    if (!usuario) {
        usuario = sessionStorage.getItem('usuario');
        if (!usuario) {
            //nada
        }
    }
    
    if(usuario){
    
        const url = `../backend/usuarios/individualNotificaciones.php?usuario=${usuario}`;
            fetch(url)
            .then((response) => response.json())
            .then(verNotificaciones)
            .catch(console.log);
        
    }

})

function verNotificaciones({ notificaciones }){

    for(let notificacion of notificaciones){

        let cantidadNotificacion = notificacion[0];
        let usuarioNotificacion = notificacion[1];

        let obteniendoDivListaPendiente = document.querySelector(`#notificacion${usuarioNotificacion}`);
        
        if(usuarioNotificacion != null){
            
            let div = document.createElement('div');
            div.setAttribute('class','circuloNotificacion');
            obteniendoDivListaPendiente.appendChild(div);

            let agregarUsuario = document.createElement('input');
            agregarUsuario.setAttribute('type','button');
            agregarUsuario.setAttribute('value','Dejar en visto');
            agregarUsuario.addEventListener('click', dejarEnVisto);
            obteniendoDivListaPendiente.appendChild(agregarUsuario);

            // let pMostrarNumeroNotificacion = document.createElement('p');
            // obteniendoDivListaPendiente.appendChild(pMostrarNumeroNotificacion);

            // let textMostrarNumeroNotificacion = document.createTextNode(cantidadNotificacion);
            // div.appendChild(textMostrarNumeroNotificacion);


        }

    }

}

function dejarEnVisto(){

    const url = `../backend/usuarios/vistoNotificaciones.php?usuario=${usuario}`;
        fetch(url)
        .then((response) => response.json())
        .then(window.location.reload())
        .catch(console.log);

}