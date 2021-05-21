<?php

function mensajes($conexion){

    $receptor = $_POST['idUsuarioReceptor'];

    $sql = 'SELECT mensaje FROM mensajes WHERE receptor=(:receptor OR :emisor) AND emisor=(:receptor OR :emisor)';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':emisor' => $_SESSION['usuario'],
        ':receptor' => $receptor
    ));

    while($row = $result->fetch()){
        echo $row['mensaje'] . '    ' . $receptor . '<br/>';
    }

}

function mandarMensaje($conexion){

    $sql = 'INSERT INTO mensajes (emisor,receptor,mensaje,leido) VALUES (:emisor,:receptor,:mensaje,"no")';

    $receptor = $_POST['idUsuarioReceptor'];

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':emisor' => $_SESSION['usuario'],
        ':receptor' => $receptor,
        ':mensaje' => $_POST['mensaje']
    ));

    if($result->rowCount() > 0){
        echo 'Mensaje enviado';
    }

}

?>