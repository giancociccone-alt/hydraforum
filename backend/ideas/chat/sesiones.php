<?php

function login($conexion){
    $username = $_POST['usuario'];
    $password = $_POST['password'];

    $sql = 'SELECT * FROM usuarios WHERE username = :username AND pass = :pass';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':username' => $username,
        ':pass' => $password
    ));

    if($result->fetch()){
        $_SESSION['usuario'] = $username;
    }

}

function crearCuenta($conexion){
    $username = $_POST['usuario'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    $sql = 'SELECT * FROM usuarios WHERE username=:username';

    $result = $conexion->prepare($sql);
    $result->execute(array(':username' => $username));

    if($result->rowCount() == 0){

        $sql = 'INSERT INTO usuarios (username, pass, rol) VALUES (:username, :pass, :rol)';

        $result = $conexion->prepare($sql);
        $result->execute(array(
            ':username' => $username,
            ':pass' => $password,
            ':rol' => $role
        ));

        if($result->rowCount() > 0){
            echo 'EXITO';
        }

    }else{
        echo 'HIJO MIO YA EXISTE ES USUARIO BOLUDO';
    }
}

function cerrarSesion(){
    unset($_SESSION['usuario']);
}

?>