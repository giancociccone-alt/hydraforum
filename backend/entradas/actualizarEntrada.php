<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    
    if ($contentType === "application/json") {

        $content = trim(file_get_contents("php://input"));

        $datosEntrada = preg_split("/[,]+/",$content);

        $tituloModificado = $datosEntrada[0];
        $descripcionModificado = $datosEntrada[1];
        $imagenModificado = $datosEntrada[2]
        $ckEditorContenido = $datosEntrada[3]
        $idEntrada = $datosEntrada[4]

    }

    $sql = 'UPDATE entrada SET titulo = :titulo, descripcion = :descripcion, contenido =:contenido, imagen =:imagen WHERE id_entrada = :idEntrada';

    $result = $conexion->prepare($sql);
    $result->bindParam(':titulo', $tituloModificado);
    $result->bindParam(':imagen', $imagenModificado);
    $result->bindParam(':entrada', $ckEditorContenido);
    $result->bindParam(':descripcion', $descripcionModificado);
    $result->bindParam(':idEntrada', $idEntrada);
    $result->execute();

    if($result->rowCount() == 1){
        header('HTTP/ 200 Entrada Exitosa');
        echo json_encode(array("estado" => "true", "mensaje" => "Entrada insertada exitosamente en la BBDD"));
        exit();
    }

    header('HTTP/ 400 Entrada Fallida');
    echo json_encode(array("estado" => "false", "mensaje" => "No se ha insertado la entrada en la BBDD"));

?>