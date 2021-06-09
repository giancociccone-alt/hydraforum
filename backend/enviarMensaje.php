<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    $content = trim(file_get_contents("php://input"));

    $mensaje = preg_split("/[,]+/",$content)[0];

    $usuario = $_GET['username'];
    $amigoSeleccionado = $_GET['amigo'];

    $sql = 'INSERT INTO mensajes (emisor, receptor, mensaje, leido) VALUE (:username, :amigoSeleccionado, :mensaje, "global")';

    $resultado = $conexion->prepare($sql);
    $resultado->execute(
        array(
            ':username' => $usuario,
            ':amigoSeleccionado' => $amigoSeleccionado,
            ':mensaje' => $mensaje
        )
    );
    
    $datosChatUsuarios = [$usuario, $amigoSeleccionado];

    if ($resultado->rowCount() == 0) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Por favor, inicia sesión"));
        exit();
    }
    
    header('HTTP/ 200 Entradas devueltas esitosamente');
    echo json_encode(array("estado" => "exito", "mensajes" => $datosChatUsuarios));   

?>