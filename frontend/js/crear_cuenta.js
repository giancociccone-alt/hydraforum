document.querySelector('#formLogin').addEventListener('click',function(e){

    let usuario = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let repeatPassword = document.querySelector('#repeatPassword').value;

    let datosUsuario = [usuario,password,repeatPassword];

    const url = `/piton-4life/backend/crear_cuenta.php`;

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
                title: 'Creacion de cuenta exitosamente',
                timer: 3000,
                showConfirmButton: false
            }
        ).then(function(){
            window.location = "../index.html";
        })

    }else{
        console.log(mensaje);
    }

}