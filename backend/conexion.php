<?php
$mysqli = new mysqli("localhost", "root", "12345678", "changarrito");
if ($mysqli->connect_errno){
    echo "Fallo la conexion con MySQL: (" . $mysqli_errno . ") " . $mysqli->connect_error;
}

?>