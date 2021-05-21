<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosUsuario = preg_split("/[,]+/",$content);

        $username = $datosUsuario[0];
        $password = $datosUsuario[1];
        $repetirPassword = $datosUsuario[2];

    }

    if($password != $repetirPassword){
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "La contraseñas no coinciden. Por favor, ingrese las contraseñas correctamente"));
        exit();
    }

    $sql = 'SELECT * FROM usuarios WHERE username=:username';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $username));

    if($result->rowCount() == 0){

        $sql = 'INSERT INTO usuarios (username, pass, rol, privacidad) VALUES (:username, :pass,"2","PUBLICO")';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':username' => $username,
            ':pass' => $password
        ));

        if($result->rowCount() == 0){
            header('HTTP/ 400 Entrada Fallida');
            echo json_encode(array("estado" => "false", "mensaje" => "Hubo un fallo en la creacion de la cuenta"));
            exit();
        }
    
        header('HTTP/ 200 Entrada Exitosa');
        echo json_encode(array("estado" => "true", "mensaje" => "Creacion de la cuenta exitosamente"));

    }

?>