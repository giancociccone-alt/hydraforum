<?php

    require_once '../conexion.php';

    $conexion = conexionDB();

    $id_entrada = $_GET['id_entrada'];

    $sql = 'SELECT titulo, imagen, entrada, descripcion FROM entrada WHERE id_entrada = :id_entrada';
    $resultado = $conexion->prepare($sql);
    $resultado->execute(array(':id_entrada' => $id_entrada));

    if ($resultado->rowCount() == 0) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "No existe la entrada seleccionada"));
        exit();
    }

    if($fila = $resultado->fetch()){
    
        $estadoPeticiones = [$fila['titulo'],$fila['imagen'],$fila['entrada'],$fila['descripcion']];

        header('HTTP/ 200 Entradas devueltas esitosamente');
        echo json_encode(array("estado" => "exito", "entrada" => $estadoPeticiones));   
        
    }

?>