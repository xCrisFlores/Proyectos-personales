<?php

include 'conexion.php';

$mysqli->set_charset("utf8mb4");

$nombre = $_POST['nombre'];
$precio = $_POST['precio'];
$stock = $_POST['stock'];
$desc = $_POST['desc'];

$altaProducto = $mysqli->query("INSERT INTO productos (nombre, precio, descripcion, stock) 
VALUES('$nombre', '$precio' , '$desc', '$stock')");

if($altaProducto){
    echo "
    <script>
        alert('Registro exitoso del producto');
        window.location.href = '../screens/productos.php'; 
    </script>
    ";
}else{

    echo "Algo falló: " . $mysqli->error;

}

$mysqli->close();


?>