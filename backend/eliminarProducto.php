<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $eliminar = $mysqli->prepare("DELETE FROM ventas WHERE producto = ?");
    $eliminar->bind_param("i", $id);

    if($eliminar->execute()){
        $stmt = $mysqli->prepare("DELETE FROM productos WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo "
            <script>
                alert('Producto eliminado exitosamente.');
                window.location.href = '../screens/productos.php'; 
            </script>
            ";
        } else {
            echo "Error al eliminar el producto: " . $stmt->error;
        }

        $stmt->close();
    }
}
$mysqli->close();
?>
