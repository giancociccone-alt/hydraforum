<?php
    require_once '../conexion.php';

    $conexion = conexionDB();

    $usuario = $_GET['usuario'];

    $sql = 'UPDATE mensajes SET leido="individual" WHERE receptor = :username AND leido = "global"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));

    $sql = 'UPDATE amigos SET leido="individual" WHERE receptor = :username AND leido = "global"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));

    $sql = 'SELECT COUNT(leido) as cantidadMensajeNotificacion, emisor FROM mensajes WHERE receptor = :username AND leido = "individual"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));
    
    $indice = 0;

    while($fila = $result->fetch()){
        $numeroNotificaciones[$indice] = [$fila['cantidadMensajeNotificacion'], $fila['emisor']];
        $indice++;
    }
    
    $sql = 'SELECT COUNT(leido) as cantidadAmigoNotificacion, emisor FROM amigos WHERE receptor = :username AND leido = "individual"';
    
    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));
    
    while($fila = $result->fetch()){
        $numeroNotificaciones[$indice] = [$fila['cantidadAmigoNotificacion'], $fila['emisor']];
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