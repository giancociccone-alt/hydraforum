<?php

    function notificaciones ($conexion){
        $sql = 'SELECT COUNT(amigos.leido + mensajes.leido) as notificaciones FROM amigos JOIN mensajes ON amigos.emisor = mensajes.emisor WHERE (amigos.leido = "no" OR mensajes.leido = "no") AND (amigos.receptor=:username OR mensajes.receptor=:username)';

        $result = $conexion->prepare($sql);
        $result->execute(array(':username' => $_SESSION['usuario']));

        if($row = $result->fetch()){
            echo $row['notificaciones'] . ' tienes notificaciones';
        }

    }

    function verNotificaciones($conexion){
        $sql = 'SELECT COUNT(amigos.leido + mensajes.leido) as notificaciones FROM amigos JOIN mensajes ON amigos.emisor = mensajes.emisor WHERE (amigos.leido = "no" OR mensajes.leido = "no") AND (amigos.receptor=:username OR mensajes.receptor=:username)';

        $result = $conexion->prepare($sql);
        $result->execute(array(':username' => $_SESSION['usuario']));

        if($fila = $result->fetch()){
            
            $sql = 'UPDATE amigos, mensajes SET amigos.leido = "si", mensajes.leido = "si" WHERE (amigos.leido = "no" OR mensajes.leido= "no") AND amigos.receptor = :username;';

            $result = $conexion->prepare($sql);
            $result->execute(array(':username' => $_SESSION['usuario']));

        }

    }

?>