<?php

function personas($conexion){
    $sql = 'SELECT username FROM usuarios WHERE username <> :username';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $_SESSION['usuario']));
    while($row = $result->fetch()){
        ?>

            <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <label><?php echo $row[0] ?></label>
                <input type="hidden" name="idUsuarioReceptor" value="<?php echo $row[0] ?>"/>
                <input type="submit" name="enviarAmistad" value="Enviar amistad"/>
                <input type="submit" name="buscarInfoPersona" value="Buscar informacion"/>
                <input type="submit" name="mensaje" value="Ver mensajes"/>
            </form>

        <?php
    }
    
    if(isset($_POST['personasAmistad'])){
        echo 'La persona que le mandaste la solicitud es '.$_POST['personasAmistad'];
    }

}

function enviarSolicitudAmistad($conexion){

    $personasAmistad = $_POST['personasAmistad'];
    $emisor = $_SESSION['usuario'];

    $sql = 'INSERT INTO amigos (username,emisor,estado) VALUES (:personasAmistad, :emisor, "PENDIENTE")';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':personasAmistad' => $personasAmistad,
        ':emisor' => $emisor
    ));

    if($result->rowCount() > 0){
        echo 'EXITO la solicitud';
    }

}

function mostrarSolicitudesAmistades($conexion){

    $emisor = $_SESSION['usuario'];

    $sql = 'SELECT amigos.receptor FROM amigos WHERE emisor=:username AND estado="PENDIENTE"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $_SESSION['usuario']));
    
    while($row = $result->fetch()){
        ?>

            <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <label><?php echo $row[0] ?></label>
                <input type="hidden" name="personaDesconocida" value="<?php echo $row[0] ?>"/>
                <input type="submit" name="aceptarAmistad" value="Aceptar amistad"/>
                <input type="submit" name="rechazarAmistad" value="Rechazar amistad"/>
                <input type="submit" name="buscarInfoPersona" value="Buscar informacion"/>
            </form>

        <?php
    }

}

function aceptarAmistad($conexion){
    /* UTILIZAR EL CODIGO DE ID_AMIGO DONDE ESTA EL "ESTADO"*/
    $sql = 'UPDATE amigos set estado ="ACEPTADO" WHERE emisor = :aceptarUsuario AND estado NOT IN ("ACEPTADO", "RECHAZADO")';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':aceptarUsuario' => $_SESSION['usuario']
    ));

    if($result->rowCount() > 0){
        echo 'Ya son amigos';
    }

}

function rechazarAmistad($conexion){
    /* UTILIZAR EL CODIGO DE ID_AMIGO DONDE ESTA EL "ESTADO"*/
    $sql = 'UPDATE amigos set estado ="RECHAZADO" WHERE emisor = :aceptarUsuario AND estado NOT IN ("ACEPTADO", "RECHAZADO")';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':aceptarUsuario' => $_SESSION['usuario']
    ));

    if($result->rowCount() > 0){
        echo 'Rechazado la amistad';
    }

}

function mostrarAmigos($conexion){

    $sql = 'SELECT amigos.username as usuario FROM usuarios INNER JOIN amigos on usuarios.username = amigos.username WHERE amigos.emisor=:username AND amigos.estado NOT IN ("RECHAZADO","PENDIENTE")';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':username' => $_SESSION['usuario']
    ));

    while($row = $result->fetch()){
        ?>
            <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <label><?php echo $row['usuario'] ?></label>
                <input type="hidden" name="amigo" value="<?php echo $row['usuario'] ?>"/>
                <input type="submit" name="verAmigo" value="ver Amigo"/>
            </form>
        <?php
    }

}

?>