<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosUsuario = preg_split("/[,]+/",$content);

        $username = $datosUsuario[0];
        $password = $datosUsuario[1];
        $tipoSesion = $datosUsuario[2];
        $fechaActual = date('Y-m-d');

    }

    //Consulta para iniciar sesion
    $sql = 'SELECT username, sancion FROM usuarios WHERE username = :username AND pass = hex(AES_ENCRYPT(:pass,"AES"))';
    
    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':username' => $username,
        ':pass' => $password
    ));

    $indice = 0;

    if($fila = $result->fetch()){

        if($fila['sancion'] >= $fechaActual){
            header('HTTP/ 400 Entrada Fallida');
            echo json_encode(array("estado" => "sancion", "mensaje" => $fila['sancion']));
            exit();
        }

        //Actualizamos el tipo de sesion que eligio el usuario
        $sql = 'UPDATE usuarios SET tipo_sesion =:sesion WHERE username = :username AND pass = hex(AES_ENCRYPT(:pass,"AES"))';
        
        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':username' => $username,
            ':pass' => $password,
            ':sesion' => $tipoSesion
        ));

        if($result->rowCount() == 1){

            //Otra consulta con los datos actualizados de tipo de sesion
            $sql = 'SELECT username, tipo_sesion FROM usuarios WHERE username = :username AND pass = hex(AES_ENCRYPT(:pass,"AES"))';

            $result = $conexion->prepare($sql);
            $result->execute(array(
                ':username' => $username,
                ':pass' => $password
            ));

            while($row = $result->fetch()){

                $user[$indice] = [$row['username'], $row['tipo_sesion'], $row['rol']];
                $indice++;

            }

        }else{
            //Consulta dado caso qeu el tipo de sesion sea el mismo
            $sql = 'SELECT username, tipo_sesion, rol FROM usuarios WHERE username = :username AND pass = hex(AES_ENCRYPT(:pass,"AES"))';

            $result = $conexion->prepare($sql);
            $result->execute(array(
                ':username' => $username,
                ':pass' => $password
            ));

            while($row = $result->fetch()){

                $user[$indice] = [$row['username'], $row['tipo_sesion'], $row['rol']];
                $indice++;

            }

        }

    }else{
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "Usuario o contrase??a erronea"));
        exit();
    }

    header('HTTP/ 200 Entrada Exitosa');
    echo json_encode(array("estado" => "true", "mensaje" => $user));

?>