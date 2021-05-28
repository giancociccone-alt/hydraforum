<?php
    require_once '../conexion.php';

    $conexion = conexionDB();

    $usuario = $_GET['usuario'];

    $sql = 'SELECT COUNT(leido) as mensajeNotificacion, emisor FROM mensajes WHERE receptor = :username AND leido = "no"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));
    
    $indice = 0;

    while($fila = $result->fetch()){
        $numeroNotificaciones[$indice] = [$fila['mensajeNotificacion'], $fila['emisor']];
        $indice++;
    }

    $sql = 'SELECT COUNT(leido) as amigoNotificacion, emisor FROM amigos WHERE receptor = :username AND leido = "no"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));

    while($fila = $result->fetch()){
        $numeroNotificaciones[$indice] = [$fila['amigoNotificacion'], $fila['emisor']];
        $indice++;
    }

    
    $totalNotificaciones = $numeroNotificaciones[0][0] + $numeroNotificaciones[1][0];

    $numeroNotificaciones[$indice] = [$totalNotificaciones];

    if (empty($numeroNotificaciones)) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "No tienes solicitud de amistad"));
        exit();
    }

    header('HTTP/ 200 Entradas devueltas esitosamente');
    echo json_encode(array("estado" => "exito", "notificaciones" => $numeroNotificaciones));

?>