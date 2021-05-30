<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosAmistad = preg_split("/[,]+/",$content);

        $username = $datosAmistad[0];

    }

    $sql = 'UPDATE usuarios SET sancion ="0000-00-00" WHERE username = :username';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':username' => $username,
    ));
    
    if($result->rowCount() > 0){

        if ($result->fetch()) {
            header('HTTP/ 200 Entradas devueltas esitosamente');
            echo json_encode(array("estado" => "exito", "usuarios" => "Se ha eliminado la amistad exitosamente"));
        }

    }

    if($result->rowCount() == 0){

        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Por favor, inicia sesión"));
        exit();

    }

?>