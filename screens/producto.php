<?php
include '../backend/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];

    $stmt = $mysqli->prepare("SELECT * FROM productos WHERE nombre = ?");
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $producto = $result->fetch_assoc();
        echo "<!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <title>Dashboard</title>
            <link rel='stylesheet' href='../styles/primary_styles.css'>
        </head>
        <body class='primary_body'>
        
            <header>
                <h1 class='primary_title'>Detalles del producto</h1>
            </header>

            <main class='primary_box'>
            <form action='../backend/editarProducto.php' method='post'>
                <h3 class='primary_lbl'>Nombre</h3>
                <input class='primary_inp' type='text' name='nombre' id='nombre' required value='" . htmlspecialchars($producto['nombre'], ENT_QUOTES) . "'>
                <h3 class='primary_lbl'>Precio</h3>
                <input class='primary_inp_num' type='number' name='precio' id='precio' required value='" . htmlspecialchars($producto['precio'], ENT_QUOTES) . "'>
                <h3 class='primary_lbl'>Stock</h3>
                <input class='primary_inp_num' type='number' name='stock' id='stock' required value='" . htmlspecialchars($producto['stock'], ENT_QUOTES) . "'>
                <h3 class='primary_lbl'>Descripcion</h3>
                <input class='primary_inp_area' type='text' name='desc' id='desc' required value='" . htmlspecialchars($producto['descripcion'], ENT_QUOTES) . "'>
                <input class='hide' type='number' name='id' id='id' required value='" . htmlspecialchars($producto['id'], ENT_QUOTES) . "'>
                <button class='primary_btn' type='submit' id='submit1'>Editar</button>
            </form>
            <form action='../backend/eliminarProducto.php' method='post' onsubmit='return confirm(\"¿Estás seguro de que deseas eliminar este producto?\");'>
                <input class='hide' type='number' name='id' id='id' required value='" . htmlspecialchars($producto['id'], ENT_QUOTES) . "'>
                <button class='logout_btn' type='submit' id='delete'>Eliminar</button>
            </form>
            </main>

            <button class='return_btn' onclick='goBack()' id='return'>Regresar</button>

            <script>
                function goBack(){
                    window.location.href = 'productos.php'; 
                }
            </script>
        </body>
        </html>";
    } else {
        echo "Producto no encontrado.";
    }

    $stmt->close();
}

$mysqli->close();
?>
