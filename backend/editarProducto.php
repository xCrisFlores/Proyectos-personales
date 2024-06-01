<?php

include 'conexion.php';

$mysqli->set_charset("utf8mb4");

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$precio = $_POST['precio'];
$stock = $_POST['stock'];
$desc = $_POST['desc'];

// Preparar la consulta SQL
$stmt = $mysqli->prepare("UPDATE productos SET nombre = ?, precio = ?, stock = ?, descripcion = ? WHERE id = ?");

if ($stmt) {
    // Vincular los parámetros
    $stmt->bind_param("sdisi", $nombre, $precio, $stock, $desc, $id);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo "
        <script>
            alert('El producto se ha actualizado');
            window.location.href = '../screens/productos.php'; 
        </script>
        ";
    } else {
        echo "Algo falló: " . $stmt->error;
    }

    // Cerrar la declaración
    $stmt->close();
} else {
    echo "Error al preparar la consulta: " . $mysqli->error;
}

// Cerrar la conexión
$mysqli->close();

?>
