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

    const url = `/piton-4life/backend/iniciar_sesion.php`;

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
        
        if(mensaje[1] == "localStorage"){
            localStorage.setItem('usuario',`${mensaje[0]}`);
            window.location = "../index.html";
        }else{
            sessionStorage.setItem('usuario',`${mensaje[0]}`);
            window.location = "../index.html";
        }
        
    }else{
        console.log(mensaje);
        Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña no valido',
            timer: 3500,
            showConfirmButton: false
        })
    }

}