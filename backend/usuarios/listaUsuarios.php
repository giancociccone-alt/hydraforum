<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $usuario = $_GET['username'];

    $sql = 'SELECT username, sancion
    FROM usuarios
    WHERE username != :username
    AND usuarios.username not in (
        SELECT emisor
        FROM amigos
        WHERE emisor = :username OR receptor = :username
    )
    AND usuarios.username not in (
        SELECT receptor
        FROM amigos
        WHERE emisor = :username OR receptor = :username
    )';

    $resultado = $conexion->prepare($sql);
    $resultado->execute(array(':username' => $usuario));
    
    $indice = 0;
    
    while($fila = $resultado->fetch()){
        
        $estadoPeticiones[$indice] = [$fila['username'], $fila['sancion']];
        $indice++;
    }
    
    if (empty($estadoPeticiones)) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Por favor, inicia sesión"));
        exit();
    }
    
    header('HTTP/ 200 Entradas devueltas esitosamente');
    echo json_encode(array("estado" => "exito", "usuarios" => $estadoPeticiones));   

?>