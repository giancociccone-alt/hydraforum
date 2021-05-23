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

        const url = `../backend/listaAmigo.php?receptor=${usuario}`;

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

        let div = document.createElement('div');
        listaAmigos.appendChild(div);

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

        // let chatAmigo = document.createElement('input');
        // chatAmigo.setAttribute('type','button');
        // chatAmigo.setAttribute('id',usuario);
        // chatAmigo.setAttribute('value','enviarMensaje');
        // // chatAmigo.addEventListener('click',chatAmigo);
        // div.appendChild(chatAmigo);

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

    const url = `/piton-4life/backend/eliminarAmigo.php`;
    
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