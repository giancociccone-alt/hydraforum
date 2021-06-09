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
    
    let iniciarSesion = document.querySelector('#iniciarSesion');
        iniciarSesion.parentNode.removeChild(iniciarSesion);
    let crearCuenta = document.querySelector('#crearCuenta');
        crearCuenta.parentNode.removeChild(crearCuenta);

    document.querySelector("#miCuenta").innerHTML = usuario.toUpperCase();

    if(window.location.pathname == "/hydraforum/index.html"){
        document.querySelector("#miCuenta").setAttribute('href','./frontend/miCuenta.html');
    }else{
        document.querySelector("#miCuenta").setAttribute('href','./miCuenta.html');
    }

    document.querySelector("#cerrarSesion").addEventListener('click',function(e){

        if(window.location.pathname == "/hydraforum/index.html"){
            document.querySelector("#cerrarSesion").setAttribute('href','./index.html');
        }else{
            document.querySelector("#cerrarSesion").setAttribute('href','../index.html');
        }

        localStorage.removeItem('usuario');
        localStorage.removeItem('rol');
        
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('rol');

    });

}