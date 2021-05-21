<?php

    session_start();

    require_once './conexion.php';
    require_once './privacidad.php';
    require_once './sesiones.php';
    require_once './solicitudAmistad.php';

    $conexion = abrirConexion();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

        if(empty($_SESSION['usuario'])){
           ?> 
                <div>
                    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <input type="text" name="usuario" placeholder="Usuario"/>
                        <input type="password" name="password" placeholder="Contraseña"/>
                        <input type="submit" name="login" value="Iniciar Sesion"/>
                    </form>
                </div>
           <?php
        }

        if(empty($_SESSION['usuario'])){
           ?> 
                <div>
                    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <input type="text" name="usuario" placeholder="Nombre usuario"/>
                        <input type="password" name="password" placeholder="Contraseña"/>
                        <input type="number" name="role" placeholder="1, 2 o 3"/>
                        <input type="submit" name="crearCuenta" value="Crear Cuenta"/>
                    </form>
                </div>
           <?php
        }

        if(isset($_SESSION['usuario'])){
           ?> 
                <div>
                    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <input type="submit" name="cerrarSesion" value="Cerrar Cuenta"/>
                    </form>
                </div>
           <?php
        }
        
        if($_POST){
            if(isset($_POST['login'])){
                login($conexion);
            }
    
            if(isset($_POST['crearCuenta'])){
                crearCuenta($conexion);
            }
    
            if(isset($_POST['cerrarSesion'])){
                cerrarSesion();
            }

            opcionesPrivacidadCuenta($conexion);

            if(isset($_POST['selectPrivacidad'])){
                cambiarPrivacidadCuenta($conexion);
            }

            mostrarAmigos($conexion);

            mostrarContenidoBlog($conexion);

            // personas($conexion);
            
            // if(isset($_POST['enviarAmistad'])){
            //     enviarSolicitudAmistad($conexion);
            // }

            // mostrarSolicitudesAmistades($conexion);

            // if(isset($_POST['aceptarAmistad'])){
            //     aceptarAmistad($conexion);
            // }
    
            // if(isset($_POST['rechazarAmistad'])){
            //     rechazarAmistad($conexion);
            // };
        }

    ?>

</body>
</html>