document.querySelector("#cerrarSesion").addEventListener('click',function(){
    sessionStorage.clear();
    localStorage.clear();
});