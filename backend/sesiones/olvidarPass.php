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
    
    $sql = 'SELECT * FROM usuarios WHERE username=:username';
    
    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $username));
    
    if($result->rowCount() == 0){
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "El usuario no existe"));
        exit();
    }

    if($password != $repetirPassword){
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "La contraseñas no coinciden. Por favor, ingrese las contraseñas correctamente"));
        exit();
    }

    if($result->rowCount() == 1){

        $sql = 'UPDATE usuarios SET pass = hex(AES_ENCRYPT(:pass,"AES")) WHERE username = :username';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':username' => $username,
            ':pass' => $password
        ));
        
        header('HTTP/ 200 Entrada Exitosa');
        echo json_encode(array("estado" => "true", "mensaje" => "Se ha modificado la contraseña"));
    }


?>