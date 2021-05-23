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

        let div = document.createElement('div');
        div.setAttribute('class','usuario');
        listaUsuarios.appendChild(div);

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