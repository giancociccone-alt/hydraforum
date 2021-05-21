<?php

    function abrirConexion(){
        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

        $conexion = new PDO('mysql:host=localhost;dbname=sesiones','root','',$opciones);

        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conexion;

    }

?>