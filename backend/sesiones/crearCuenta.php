<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosUsuario = preg_split("/[,]+/",$content);

        $username = $datosUsuario[0];
        $password = $datosUsuario[1];
        $repetirPassword = $datosUsuario[2];

    }

    $sql = 'SELECT username FROM usuarios WHERE username=:username';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $username));

    if($result->rowCount() == 1){
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "Ya existe un usuario con ese nombre"));
        exit();
    }

    if($password != $repetirPassword){
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "La contraseñas no coinciden. Por favor, ingrese las contraseñas correctamente"));
        exit();
    }

    if($result->rowCount() == 0){

        $sql = 'INSERT INTO usuarios (username, pass, rol) VALUES (:username, hex(AES_ENCRYPT(:pass,"AES")),"2")';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':username' => $username,
            ':pass' => $password
        ));
        
        header('HTTP/ 200 Entrada Exitosa');
        echo json_encode(array("estado" => "true", "mensaje" => "Creacion de la cuenta exitosamente"));
    }

?>