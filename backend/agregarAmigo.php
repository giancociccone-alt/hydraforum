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

    $sql = 'SELECT * FROM amigos WHERE emisor = :emisor AND receptor = :personasAmistad';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':personasAmistad' => $amigoSeleccionado,
        ':emisor' => $usuario
    ));

    if($result->fetch() == 0){

        $sql = 'INSERT INTO amigos (emisor,receptor,estado) VALUES (:emisor, :personasAmistad, "PENDIENTE")';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':personasAmistad' => $amigoSeleccionado,
            ':emisor' => $usuario
        ));

        header('HTTP/ 200 Entradas devueltas esitosamente');
        echo json_encode(array("estado" => "exito", "usuarios" => "Se ha mandado la solicitud de amistad exitosamente"));

    }
    
    if ($result->rowCount() == 0) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Ya se ha mandando la solicitud de amistad anteriormente"));
        exit();
    }

?>