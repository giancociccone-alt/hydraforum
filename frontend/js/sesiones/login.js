document.querySelector('#formLogin').addEventListener('click',function(e){
    
    sessionStorage.clear();
    localStorage.clear();

    let datosUsuario = new Array();

    let tipoSesiones = document.getElementsByName('sesiones');

    let user = document.querySelector('#txtUsuario').value;
    let pass = document.querySelector('#txtPassword').value;
    
    for(let tipoSesion of tipoSesiones){
        if(tipoSesion.checked && tipoSesion.value === 'sessionStorage'){
            datosUsuario = [user, pass, 'sessionStorage'];
            break;
        }else{
            datosUsuario = [user, pass, 'localStorage'];
            break;
        }
    }

    const url = `../backend/sesiones/iniciar_sesion.php`;

    fetch(url, {
        method: 'POST',
        body: datosUsuario,
        headers:{'Content-Type': 'application/json'}
        }
    )
    .then((response) => response.json())
    .then(recibiendoDatos)
    .catch(console.log);

});

function recibiendoDatos({estado, mensaje}){

    if(estado === "true"){
        
        let usuario = mensaje[0][0];
        let permiso = mensaje[0][2];

        if(mensaje[1] == "localStorage"){
            localStorage.setItem('usuario',usuario);
            localStorage.setItem('rol',permiso);
            window.location = "../index.html";
        }else{
            sessionStorage.setItem('usuario',usuario);
            sessionStorage.setItem('rol',permiso);
            window.location = "../index.html";
        }

    }else{
        
        Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña no valido',
            timer: 3500,
            showConfirmButton: false
        })
    }

}