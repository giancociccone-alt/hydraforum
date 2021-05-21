<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosUsuario = preg_split("/[,]+/",$content);

        $username = $datosUsuario[0];
        $password = $datosUsuario[1];
        $tipoSesion = $datosUsuario[2];

    }

    //Consulta para iniciar sesion
    $sql = 'SELECT * FROM usuarios WHERE username = :username AND pass = :pass';
    
    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':username' => $username,
        ':pass' => $password
    ));

    $indice = 0;

    if($result->fetch()){

        //Actualizamos el tipo de sesion que eligio el usuario
        $sql = 'UPDATE usuarios SET tipo_sesion =:sesion WHERE username = :username AND pass = :pass';
        
        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':username' => $username,
            ':pass' => $password,
            ':sesion' => $tipoSesion
        ));

        if($result->rowCount() == 1){

            //Otra consulta con los datos actualizados de tipo de sesion
            $sql = 'SELECT * FROM usuarios WHERE username = :username AND pass = :pass';

            $result = $conexion->prepare($sql);
            $result->execute(array(
                ':username' => $username,
                ':pass' => $password
            ));

            while($row = $result->fetch()){

                $user[$indice] = [$row['username']];
                $indice++;
                $user[$indice] = [$row['tipo_sesion']];
                $indice++;

            }

        }else{
            //Consulta dado caso qeu el tipo de sesion sea el mismo
            $sql = 'SELECT * FROM usuarios WHERE username = :username AND pass = :pass';

            $result = $conexion->prepare($sql);
            $result->execute(array(
                ':username' => $username,
                ':pass' => $password
            ));

            while($row = $result->fetch()){

                $user[$indice] = [$row['username']];
                $indice++;
                $user[$indice] = [$row['tipo_sesion']];
                $indice++;

            }

        }

    }else{
        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "Usuario o contraseña erronea"));
        exit();
    }

    header('HTTP/ 200 Entrada Exitosa');
    echo json_encode(array("estado" => "true", "mensaje" => $user));

?>