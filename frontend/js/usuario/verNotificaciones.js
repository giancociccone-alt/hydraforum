usuario = undefined;

usuario = localStorage.getItem('usuario');
if (!usuario) {
    usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        //nada
    }
}

if(usuario){

    const url = `../backend/usuarios/verNotificaciones.php?usuario=${usuario}`;
        fetch(url)
        .then((response) => response.json())
        .then(verNotificaciones)
        .catch(console.log);
    
}