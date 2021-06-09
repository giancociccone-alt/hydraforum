<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    
    if( ! is_uploaded_file($_FILES["file"]['tmp_name'])){
        header('HTTP/ 400 Subida fallida');
        echo json_encode(array("estado" => "true", "mensaje" => "ERROR: El fichero encontrado no fue procesado por la subida correctamente"));
        exit;
    }

    $content = trim(file_get_contents("php://input"));
    
    $source = $_FILES["file"]['tmp_name'];
    
    $ficheroNombre = $_POST['nombre_fichero'];
    $titulo = $_POST['titulo'];
    $contenido = $_POST['contenido'];
    $descripcion = $_POST['descripcion'];
    $usuario = $_POST['usuario'];

    $carpetaUsuario = "../../frontend/imagenesUsuarios/$usuario";
    
    if(!file_exists($carpetaUsuario)){
        mkdir($carpetaUsuario,0777,true);
    }

    $destination = "../../frontend/imagenesUsuarios/$usuario/$ficheroNombre";

    if( is_file($destination)){
        unlink("../../frontend/imagenesUsuarios/$usuario/$ficheroNombre");
    }

    if( ! @move_uploaded_file($source, $destination)){
        header('HTTP/ 400 Subida fallida');
        echo json_encode(array("estado" => "true", "mensaje" => "ERROR: No se ha podido mover el fichero enviado a la carpeta de destino: " . $destination));
        @unlink(ini_get('upload_tmp_dir').$_FILES["name"]['tmp_name']);
        exit;
    }

    $sql = 'INSERT INTO entrada (titulo,imagen, entrada, descripcion,usuario) VALUES (:titulo,:imagen,:entrada,:descripcion,:usuario)';

    $imagen = "./imagenesUsuarios/$usuario/$ficheroNombre";

    $result = $conexion->prepare($sql);
    $result->bindParam(':titulo', $titulo);
    $result->bindParam(':imagen', $imagen);
    $result->bindParam(':entrada', $contenido);
    $result->bindParam(':descripcion', $descripcion);
    $result->bindParam(':usuario', $usuario);
    $result->execute();

    if($result->rowCount() == 1){
        header('HTTP/ 200 Entrada Exitosa');
        echo json_encode(array("estado" => "true", "mensaje" => "Entrada insertada exitosamente en la BBDD"));
        exit();
    }

    header('HTTP/ 400 Entrada Fallida');
    echo json_encode(array("estado" => "false", "mensaje" => "No se ha insertado la entrada en la BBDD"));

?>