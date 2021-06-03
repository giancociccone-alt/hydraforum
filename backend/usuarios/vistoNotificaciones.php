<?php
    require_once '../conexion.php';

    $conexion = conexionDB();

    $usuario = $_GET['usuario'];

    $sql = 'UPDATE mensajes SET leido="visto" WHERE receptor = :username AND leido = "individual"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));

    $sql = 'UPDATE amigos SET leido="visto" WHERE receptor = :username AND leido = "individual"';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $usuario));

    if (empty($numeroNotificaciones)) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "No tienes solicitud de amistad"));
        exit();
    }

    // header('HTTP/ 200 Entradas devueltas esitosamente');
    // echo json_encode(array("estado" => "exito", "notificaciones" => $numeroNotificaciones));

?>