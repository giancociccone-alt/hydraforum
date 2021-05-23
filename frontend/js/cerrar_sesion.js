let usuario = undefined;

usuario = localStorage.getItem('usuario');
if (!usuario) {
    usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        let cerrarSesion = document.querySelector('#cerrarSesion');
        cerrarSesion.parentNode.removeChild(cerrarSesion);
    }
}

if(usuario){
    
    document.querySelector("#miCuenta").innerHTML = usuario.toUpperCase();
    if(window.location.pathname == "/hydraforum/index.html"){
        document.querySelector("#miCuenta").setAttribute('href','./frontend/miCuenta.html');
    }else{
        document.querySelector("#miCuenta").setAttribute('href','./miCuenta.html');
    }

    document.querySelector("#cerrarSesion").addEventListener('click',function(e){
        sessionStorage.clear();
        localStorage.clear();
        if(window.location.pathname == "/hydraforum/index.html"){
            document.querySelector("#cerrarSesion").setAttribute('href','./index.html');
        }else{
            document.querySelector("#cerrarSesion").setAttribute('href','../index.html');
        }

    });

}