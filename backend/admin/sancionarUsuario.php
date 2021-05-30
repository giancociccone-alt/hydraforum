<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosUsuario = preg_split("/[,]+/",$content);

        $username = $datosUsuario[0];
        $fechaSancionar = $datosUsuario[1];
        $fechaActual = date('Y-m-d');

    }

    if($fechaActual > $fechaSancionar){
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => 'No puedes poner una sancion cuando se pasado de la fecha'));
        exit();
    }

    $sql = 'SELECT username, sancion FROM usuarios WHERE username = :username';
    
    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':username' => $username
    ));

    $indice = 0;

    if($result->fetch()){

        $sql = 'UPDATE usuarios SET sancion =:fechaSancion WHERE username = :username';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':username' => $username,
            ':fechaSancion' => $fechaSancionar
        ));

    }

    header('HTTP/ 200 Entrada Exitosa');
    echo json_encode(array("estado" => "true", "mensaje" => 'Fecha establecida de la sancion'));

?>