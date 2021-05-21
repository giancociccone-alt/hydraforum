<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $usuario = $_GET['usuario'];

    $sql = 'SELECT * FROM entrada WHERE usuario =:usuario';

    $resultado = $conexion->prepare($sql);
    $resultado->execute(
        array(':usuario' => $usuario)
    );
    
    $indice = 0;

    while($fila = $resultado->fetch()){
        $entrada[$indice] = [$fila['titulo'],$fila['imagen'],$fila['entrada'],$fila['descripcion'],$fila['fecha'],$fila['id_entrada']];
        $indice++;
    }
    
    if (empty($entrada)) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "No hay entradas disponibles en la BBDD"));
        exit();
    }

    header('HTTP/ 200 Entradas devueltas esitosamente');
    echo json_encode(array("estado" => "exito", "entradas" => $entrada));

?>