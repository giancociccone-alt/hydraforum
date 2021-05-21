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

        const url = `../backend/listaUsuarios.php?username=${usuario}`;
    
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

        let textEstadoAmistad = document.createTextNode('DESCONOCIDOS');
        pEstadoAmistad.appendChild(textEstadoAmistad);

        let agregarUsuario = document.createElement('input');
        agregarUsuario.setAttribute('type','button');
        agregarUsuario.setAttribute('id',usuario);
        agregarUsuario.setAttribute('name',usuario);
        agregarUsuario.setAttribute('value','agregar Usuario');
        agregarUsuario.addEventListener('click',solicitudAmistad);
        div.appendChild(agregarUsuario);

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
        .then(window.location.reload())
        .catch(console.log);
}