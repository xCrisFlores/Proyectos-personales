<?php
include_once 'conexion.php';

function get_productos() {
    global $mysqli;

    $fetch_info = $mysqli->query("SELECT nombre, precio, stock FROM productos");

    $cont = 3;
    if ($fetch_info) {
        while ($fila = $fetch_info->fetch_assoc()) {
            if($cont%3 == 0){
                echo "
            </div>
            <div class='productos_div'>
            ";

            }

            echo "
            <div class='producto'>
                <h1 class='primary_lbl'>{$fila['nombre']}</h1> 
                <h3 class='primary_lbl'>Precio: {$fila['precio']}</h3>
                <h3 class='primary_lbl'>Stock: {$fila['stock']}</h3>
                <form method='POST' action='producto.php'>
                    <input type='hidden' name='nombre' value='{$fila['nombre']}'>
                    <button class='primary_btn' type='submit'>Ver Detalles</button>
                </form>
            </div>
            ";
            $cont++;
        }
    } else {
        echo "Error al ejecutar la consulta: " . $mysqli->error;
    }

    echo"</br>";
}

function get_ventas($fecha) {
    global $mysqli;

    $fecha = $mysqli->real_escape_string($fecha); // Escapa la fecha para evitar SQL injection
    $query = "SELECT ventas.fecha, ventas.cantidad, productos.nombre 
              FROM ventas 
              INNER JOIN productos ON ventas.producto = productos.id 
              WHERE ventas.fecha = '$fecha'";

    $fetch_info = $mysqli->query($query);

    if ($fetch_info) {
        while ($fila = $fetch_info->fetch_assoc()) {
            echo "
            <div>
                <h3>{$fila['fecha']}</h3> 
                <h3>Producto</h3>
                {$fila['nombre']} 
                <h3>Unidades vendidas</h3>
                {$fila['cantidad']} <br/><br/>
            </div>
            ";
        }
    } else {
        echo "Error al ejecutar la consulta: " . $mysqli->error;
    }
}

function get_total(){
    global $mysqli;
    $result = $mysqli->query("SELECT COUNT(*) AS total FROM VENTAS");
    if ($result) {
        $row = $result->fetch_assoc();
        echo 'Total de ventas: ' . $row['total'];
    } else {
        echo "Error al ejecutar la consulta: " . $mysqli->error;
    }
}
function get_avg(){
    global $mysqli;
    $result = $mysqli->query("SELECT AVG(cantidad) AS avg FROM VENTAS");
    if ($result) {
        $row = $result->fetch_assoc();
        echo "Promedio de cantidad vendida: " . $row['avg'];
    } else {
        echo "Error al ejecutar la consulta: " . $mysqli->error;
    }
}

function get_min(){
    global $mysqli;
    $result = $mysqli->query("
        SELECT productos.nombre, MIN(ventas.cantidad) AS min
        FROM ventas
        INNER JOIN productos ON ventas.producto = productos.id
    ");
    if ($result) {
        $row = $result->fetch_assoc();
        echo "Producto con la menor cantidad vendida: " . $row['nombre'] . ", Cantidad: " . $row['min'];
    } else {
        echo "Error al ejecutar la consulta: " . $mysqli->error;
    }
}

function get_max(){
    global $mysqli;
    $result = $mysqli->query("
        SELECT productos.nombre, MAX(ventas.cantidad) AS max
        FROM ventas
        INNER JOIN productos ON ventas.producto = productos.id
    ");
    if ($result) {
        $row = $result->fetch_assoc();
        echo "Producto con la mayor cantidad vendida: " . $row['nombre'] . ", Cantidad: " . $row['max'];
    } else {
        echo "Error al ejecutar la consulta: " . $mysqli->error;
    }
}

function get_user(){
    global $mysqli;
    $result = $mysqli->query("SELECT correo, password, nombre, apellidos, telefono FROM usuarios WHERE id = '".$_SESSION['user_id']."' ");

    if($result){
        $row = $result->fetch_assoc();
        echo"
        <label class='primary_lbl'>{$row['nombre']} {$row['apellidos']}</label>
        <label class='primary_lbl'>Telefono {$row['telefono']}</label>
        ";
    }

}

?>
