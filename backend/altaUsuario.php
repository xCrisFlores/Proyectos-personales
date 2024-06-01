<?php

include 'conexion.php';

$mysqli->set_charset("utf8mb4");

$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$correo = $_POST['correo'];
$contraseña = $_POST['password'];
$telefono = $_POST['telefono'];

$altaUsuario = $mysqli->query("INSERT INTO usuarios (correo, password, nombre, apellidos, telefono)
 VALUES ('$correo', '$contraseña', '$nombre', '$apellidos', '$telefono')");

if($altaUsuario){

    echo "Registro exitoso";
}else{
    echo "Algo falló: " . $mysqli->error;
}

$mysqli->close();
?>