document.querySelector('#formLogin').addEventListener('click',function(e){

    let usuario = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let repeatPassword = document.querySelector('#repeatPassword').value;

    let datosUsuario = [usuario,password,repeatPassword];

    console.log(datosUsuario);

    const url = `../backend/sesiones/olvidarPass.php`;

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
        Swal.fire({
                icon: 'success',
                title: 'Se ha restablecido la contraseña',
                timer: 3000,
                showConfirmButton: false
            }
        ).then(function(){
            window.location = "../index.html";
        })

    }else{
        Swal.fire({
                icon: 'error',
                title: 'El usuario o contraseña estan incorrectos',
                timer: 3000,
                showConfirmButton: false
            }
        )
    }

}