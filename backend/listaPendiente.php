<?php
    require_once './conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    $usuario = $_GET['receptor'];

    $sql = 'SELECT emisor, estado FROM amigos WHERE receptor = :receptor AND estado = "PENDIENTE"';
    $resultado = $conexion->prepare($sql);
    $resultado->execute(array(':receptor' => $usuario));
    
    $indice = 0;

    while($fila = $resultado->fetch()){
        $usuariosRegistrados[$indice] = [$fila['emisor'],$fila['estado']];
        $indice++;
    }
    
    if (empty($usuariosRegistrados)) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "No tienes solicitud de amistad"));
        exit();
    }

    header('HTTP/ 200 Entradas devueltas esitosamente');
    echo json_encode(array("estado" => "exito", "usuarios" => $usuariosRegistrados));

?>