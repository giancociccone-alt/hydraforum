<?php

    require_once './conexion.php';

    $conexion = conexionDB();

    $usuario = $_GET['username'];

    $sql = 'SELECT emisor, receptor, estado FROM amigos WHERE emisor = :username OR receptor = :username';
    $resultado = $conexion->prepare($sql);
    $resultado->execute(array(':username' => $usuario));
    
    $indice = 0;
    
    while($fila = $resultado->fetch()){
        
        $estadoPeticiones[$indice] = [$fila['emisor'],$fila['receptor'],$fila['estado']];
        $indice++;
    }

    $sql = 'SELECT username FROM usuarios WHERE username <> :username';
    $resultado = $conexion->prepare($sql);
    $resultado->execute(array(':username' => $usuario));

    $indice2 = 0;

    while($fila = $resultado->fetch()){    
        $listaUsuarios[$indice2] = [$fila['username']];
        $indice2++;
    }

    $incrementador = 0;

    $retornarListaUsuario = [[]];

    foreach ($listaUsuarios as $user) {
        
        foreach ($estadoPeticiones as $estadoPeticion) {

            if($estadoPeticion[0] != $user && $estadoPeticion[1] == $user){
                    
                $username = $estadoPeticion[0];
                $estado = $estadoPeticion[2];

                $retornarListaUsuario[$incrementador][0] = $username;

                $retornarListaUsuario[$incrementador][1] = $estado;

            }elseif($estadoPeticion[1] != $user && $estadoPeticion[0] == $user){

                $username = $estadoPeticion[1];
                $estado = $estadoPeticion[2];

                $retornarListaUsuario[$incrementador][0] = $username;

                $retornarListaUsuario[$incrementador][1] = $estado;
            }
            // }elseif( $estadoPeticion[1] != $usuario && $estadoPeticion[0] != $usuario  ){

            //     $username = $user;
            //     $estado = "DESCONOCIDO";

            //     $retornarListaUsuario[$incrementador][0] = [$username];

            //     $retornarListaUsuario[$incrementador][1] = [$estado];
                
            // }

            header('HTTP/ 200 Entradas devueltas esitosamente');
            echo json_encode(array("estado" => "exito", "usuarios" => $estadoPeticion));   
        }


        $incrementador++;

    }
    

    if (empty($estadoPeticiones)) {
        header('HTTP/ 400  No hay entradas disponibles');
        echo json_encode(array("estado" => "error", "tipo" => "Por favor, inicia sesión"));
        exit();
    }

    

?>