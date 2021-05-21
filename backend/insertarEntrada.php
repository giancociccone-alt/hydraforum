<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $divido = preg_split("/[,]+/",$content);
    }

    // if( isset( $_FILES ) && isset( $_FILES["'".$divido[4]."'"]) && isset( $_FILES["'".$divido[4]."'"]"'".$divido[1]."'"] ) && isset($_FILES["'".$divido[4]."'"]['tmp_name'])){
    //     //Colocar el nombre del usuario aqui
    //     mkdir("./users/manu",0777,false);

    //     if( ! is_uploaded_file($_FILES["'".$divido[4]."'"]['tmp_name'])){
    //         echo "ERROR: El fichero encontrado no fue procesado por la subida correctamente";
    //         exit;
    //     }

    //     //Poner la url en la base de datos carpeta_usuario/imagen.extension
    //     $source = $_FILES["'".$divido[4]."'"]['tmp_name'];
    //     //Colocar el nombre del usuario aqui
    //     $destination = __DIR__.'/users/manu/'.$_FILES["'".$divido[4]."'"]"'".$divido[1]."'"];

    //     if( is_file($destination)){
    //         echo "Error: Ya existe almacenado un fichero con ese nombre";
    //         @unlink(ini_get('upload_tmp_dir').$_FILES["'".$divido[4]."'"]['tmp_name']);
    //         exit;
    //     }

    //     if( ! @move_uploaded_file($source, $destination)){
    //         echo "Error: No se ha podido mover el fichero enviado a la carpeta de destino";
    //         @unlink(ini_get('upload_tmp_dir').$_FILES["'".$divido[4]."'"]['tmp_name']);
    //         exit;
    //     }

    //     echo "Fichero subido correctamente a: ".$destination;

        $sql = 'INSERT INTO entrada (titulo,imagen, entrada, descripcion,usuario) VALUES (:titulo,:imagen,:entrada,:descripcion,:usuario)';

        // $foto = base64_encode(file_get_contents(addslashes($divido[1])));

        //$imagenReducido = imagejpeg($divido[1],$divido[1],20);

        // $imagen = './users/manu/'.$_FILES[$divido[4]][$divido[1]];

        $result = $conexion->prepare($sql);
        $result->bindParam(':titulo', $divido[0]);
        $result->bindParam(':imagen', $divido[1]);
        $result->bindParam(':entrada', $divido[2]);
        $result->bindParam(':descripcion', $divido[3]);
        $result->bindParam(':usuario', $divido[4]);
        $result->execute();

        if($result->rowCount() == 1){
            header('HTTP/ 200 Entrada Exitosa');
            echo json_encode(array("estado" => "true", "mensaje" => "Entrada insertada exitosamente en la BBDD"));
            exit();
        }

        header('HTTP/ 400 Entrada Fallida');
        echo json_encode(array("estado" => "false", "mensaje" => "No se ha insertado la entrada en la BBDD"));

    // }

?>