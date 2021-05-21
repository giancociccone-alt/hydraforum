<?php

    session_start();

    include './notificaciones.php';
    include './sesiones.php';
    include './solicitudAmistad.php';
    include './mensajes.php';
    include './conexion.php';

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
                    <h3>INICIAR SESION</h3>
                    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <input type="text" name="usuario" placeholder="Usuario"/>
                        <input type="password" name="password" placeholder="Contraseña"/>
                        <input type="submit" name="login" value="Iniciar Sesion"/>
                    </form>
                </div>
            <?php
        }

    ?>
    
    <div>
        <h3>CREAR UNA CUENTA</h3>
        <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <input type="text" name="usuario" placeholder="Nombre usuario"/>
            <input type="password" name="password" placeholder="Contraseña"/>
            <input type="number" name="role" placeholder="1, 2 o 3"/>
            <input type="submit" name="crearCuenta" value="Crear Cuenta"/>
        </form>
    </div>

    <?php

        if(isset($_SESSION['usuario'])){
            notificaciones($conexion);
            ?>

                <div>
                    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <input type="submit" name="cerrarSesion" value="Cerrar Cuenta"/>
                    </form>
                </div>

                <div>
                    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <input type="submit" name="verNotificaciones" value="ver Notificaciones"/>
                    </form>
                </div>

            <?php
        }

    ?>

    <?php

        if(isset($_POST['login'])){
            login($conexion);
        }

        if(isset($_POST['crearCuenta'])){
            crearCuenta($conexion);
        }

        if(isset($_POST['cerrarSesion'])){
            cerrarSesion();
        }

        if(isset($_POST['verNotificaciones'])){
            verNotificaciones($conexion);
        }

        if(isset($_SESSION['usuario'])){
            personas($conexion);
        }

        if(isset($_POST['enviarAmistad'])){
            enviarSolicitudAmistad($conexion);
        }

        if(isset($_SESSION['usuario'])){
            mostrarSolicitudesAmistades($conexion);
        }

        if(isset($_POST['aceptarAmistad'])){
            aceptarAmistad($conexion);
        }

        if(isset($_POST['rechazarAmistad'])){
            rechazarAmistad($conexion);
        }

        if(isset($_POST['mensaje'])){
            mensajes($conexion);
        }

        // if(isset($_SESSION['usuario'])){
        //     mostrarAmigos($conexion);
        // }

        if(isset($_POST['enviar'])){
            mandarMensaje($conexion);
        }

    ?>

    <div>
        <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <input type="text" name="mensaje" placeholder="Mensaje...">
            <input type="submit" name="enviar" value="enviar"/>
        </form>
    </div>

</body>
</html>