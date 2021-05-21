<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosAmistad = preg_split("/[,]+/",$content);

        $amigoSeleccionado = $datosAmistad[0];
        $usuario = $datosAmistad[1];

    }

    $sql = 'UPDATE amigos set estado ="ACEPTADO" WHERE emisor = :emisor AND receptor = :receptor';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':receptor' => $amigoSeleccionado,
        ':emisor' => $usuario
    ));
    
    if($result->rowCount() > 0){

        $sql = 'UPDATE amigos set estado ="ACEPTADO" WHERE emisor = :emisor AND receptor = :receptor';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':emisor' => $amigoSeleccionado,
            ':receptor' => $usuario
        ));

        if ($result->fetch()) {
            header('HTTP/ 200 Entradas devueltas esitosamente');
            echo json_encode(array("estado" => "exito", "usuarios" => "Se ha eliminado la amistad exitosamente"));
        }

    }else{
        $sql = 'UPDATE amigos set estado ="ACEPTADO" WHERE emisor = :emisor AND receptor = :receptor';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':receptor' => $usuario,
            ':emisor' => $amigoSeleccionado
        ));

        if ($result->fetch()) {

            $sql = 'UPDATE amigos set estado ="ACEPTADO" WHERE emisor = :emisor AND receptor = :receptor';

            $result = $conexion->prepare($sql);
            $result->execute(array(
                ':receptor' => $amigoSeleccionado,
                ':emisor' => $usuario
            ));

            if ($result->fetch()) {
                header('HTTP/ 200 Entradas devueltas esitosamente');
                echo json_encode(array("estado" => "exito", "usuarios" => "Se ha eliminado la amistad exitosamente"));
            }
        }

    }

    if($result->rowCount() == 0){

        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Por favor, inicia sesión"));
        exit();

    }

?>