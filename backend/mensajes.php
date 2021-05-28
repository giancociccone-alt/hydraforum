<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    $usuario = $_GET['username'];
    $amigoSeleccionado = $_GET['amigo'];

    $sql = 'SELECT mensaje FROM mensajes WHERE (emisor =:username OR receptor = :username) AND (receptor=:amigoSeleccionado OR emisor=:amigoSeleccionado)';

    $resultado = $conexion->prepare($sql);
    $resultado->execute(
        array(
            ':username' => $usuario,
            ':amigoSeleccionado' => $amigoSeleccionado
        )
    );
    
    $indice = 0;
    
    while($fila = $resultado->fetch()){
        $mensajes[$indice] = $fila['mensaje'];
        $indice++;
    }
    
    if (empty($mensajes)) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Por favor, inicia sesión"));
        exit();
    }
    
    header('HTTP/ 200 Entradas devueltas esitosamente');
    echo json_encode(array("estado" => "exito", "mensajes" => $mensajes));   

?>