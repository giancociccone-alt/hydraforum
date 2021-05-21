<?php

function opcionesPrivacidadCuenta($conexion){

    $sql = 'SELECT * FROM privacidad';

    $result = $conexion->prepare($sql);
    $result->execute();
    ?>
    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <select name="selectPrivacidad" id="selectPrivacidad">
        <?php
        while($fila = $result->fetch()){
            echo "<option value='".$fila[1]."'>".$fila[1]."</option>";
        }
        ?>
        </select>
        <input type="submit" name="privacidad" value="Privacidad"/>
    </form>
    <?php

}

function cambiarPrivacidadCuenta($conexion){

    $privacidad = $_POST['selectPrivacidad'];

    $sql = 'UPDATE usuarios SET privacidad=:privacidad WHERE username=:username';

    $result = $conexion->prepare($sql);
    $result->execute(array(
        ':privacidad' => $privacidad,
        ':username' => $_SESSION['usuario']
    ));

    if($result->rowCount() > 0){
        echo 'Se ha cambiado la privacidad de la cuenta';
    }

}

// function verInfoAmigo($conexion){
//     $amigo = $_POST['amigo'];

//     if(isset($_POST['verAmigo'])){

//         $sql = 'SELECT mensaje FROM mensajes WHERE receptor=:amigo AND emisor=:username';

//         $result = $conexion->prepare($sql);
//         $result->execute(array(':amigo' => $amigo,':username' => $_SESSION['usuario']));

//         while($row = $result->fetch()){
//             echo '<div>'.$row['mensaje'].'</div>';
//         }

//     }

// }
// /* SEGUIR REVISANDO ESTO */
// function verInfoCualquiera($conexion){

//     $amigo = $_POST['amigo'];

//     if(isset($_POST['verAmigo'])){

//         $sql = 'SELECT mensaje FROM mensajes WHERE receptor=:amigo AND emisor=:username';

//         $result = $conexion->prepare($sql);
//         $result->execute();

//         while($row = $result->fetch()){
//             echo '<div>'.$row['mensaje'].'</div>';
//         }

//     }

// }

/* ESTO SE UTILIZARA DESPUES */
    function mostrarContenidoBlog($conexion){

        if(isset($_POST['verAmigo'])){

            $amigo = $_POST['amigo'];

            // rivado
            //$sql = 'SELECT mensajes.mensaje FROM usuarios INNER JOIN mensajes INNER JOIN amigos ON usuarios.username = amigos.emisor AND usuarios.username = mensajes.emisor WHERE usuarios.privacidad = "PRIVADO" AND amigos.estado = "ACEPTADO" AND usuarios.username = :username';
            // ublico
            $sql = 'SELECT mensajes.mensaje FROM usuarios INNER JOIN mensajes INNER JOIN amigos ON usuarios.username = amigos.emisor AND usuarios.username = mensajes.emisor WHERE usuarios.privacidad = "PUBLICO"';

            $result = $conexion->prepare($sql);
            $result->execute(array(':username' => $amigo));

            while($row = $result->fetch(){
                echo '<div>'.$row['mensajes.mensaje'].'</div>';
            }

        }

    }

?>