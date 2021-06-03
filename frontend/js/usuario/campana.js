let numeroNotificaciones = document.querySelector('.numeroNotificaciones');
let campana = document.querySelector('#campana');

usuario = undefined;

usuario = localStorage.getItem('usuario');
if (!usuario) {
    usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        //nada
    }
}

if(usuario){


    if(window.location.pathname == "/hydraforum/index.html"){

        const url = `./backend/usuarios/notificaciones.php?usuario=${usuario}`;

        fetch(url)
            .then((response) => response.json())
            .then(notificacionesCampana)
            .catch(console.log);

    }else{
        const url = `../backend/usuarios/notificaciones.php?usuario=${usuario}`;
            fetch(url)
            .then((response) => response.json())
            .then(notificacionesCampana)
            .catch(console.log);
    }
    
}

function notificacionesCampana({ notificaciones }){

    let notificacion = notificaciones[2];

    
    if(notificacion > 0){

        numeroNotificaciones.innerHTML = notificacion;

        let verNotificaciones = document.querySelector('#notificaciones');
        
        let ulNotificaciones = document.createElement('ul');
        verNotificaciones.appendChild(ulNotificaciones);

        let liNotificaciones = document.createElement('li');
        liNotificaciones.setAttribute('id','verNotificaciones');
        ulNotificaciones.appendChild(liNotificaciones);

        if(window.location.pathname == "/hydraforum/index.html"){
            document.querySelector("#cerrarSesion").setAttribute('href','./index.html');
        }else{
            document.querySelector("#cerrarSesion").setAttribute('href','../index.html');
        }

        let aVerNotificaciones = document.createElement('a');
        aVerNotificaciones.setAttribute('href','./frontend/amigos.html');
        liNotificaciones.appendChild(aVerNotificaciones);

        let textVerNotificaciones = document.createTextNode('VER NOTIFICACIONES');
        aVerNotificaciones.appendChild(textVerNotificaciones);

        campana.setAttribute('class',"shake-rotate shake-freeze");

    }

}