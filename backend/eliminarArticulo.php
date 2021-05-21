<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $id_entrada = $_GET['id_entrada'];

    $sql = 'DELETE FROM entrada WHERE id_entrada = :id_entrada';
    $resultado = $conexion->prepare($sql);
    $resultado->execute(array(':id_entrada' => $id_entrada));
    
    if($resultado->rowCount() > 0){
        
        header('HTTP/ 200 Entradas devueltas esitosamente');
        echo json_encode(array("estado" => "exito", "usuarios" => "Se ha eliminado exitosamente"));   
        
    }

    if ($resultado->rowCount() == 0) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Por favor, inicia sesión"));
        exit();
    }

?>