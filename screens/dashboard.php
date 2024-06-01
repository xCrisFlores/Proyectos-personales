<?php

include "../backend/session_check.php";

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../styles/primary_styles.css">
</head>
<body>

    <header>
        <h1 class="primary_title">Bienvenido a tu changarrito web</h1>
    </header>

    <nav class="primary_nav">
        <div class="primary_nav_item">
            <h3 class="primary_lbl">Aquí puedes ver tus productos</h3>
            <input class="primary_btn" type="button" role="link" value="Ver mis productos" onclick="location.href='productos.php'">
        </div>

        <div class="primary_nav_item">
            <h3 class="primary_lbl">Aquí puedes ver tus ventas</h3>
            <input class="primary_btn" type="button" role="link" value="Ver mis ventas" onclick="location.href='ventas.php'">
        </div>

        <div class="primary_nav_item">
            <h3 class="primary_lbl">Aquí puedes ver tu perfil</h3>
            <input class="primary_btn" type="button" role="link" value="Ver mi perfil" onclick="location.href='perfil.php'">
        </div>
    </nav>

    <button class="logout_btn" id="logoutButton">Cerrar sesión</button>

    <script>
        document.getElementById("logoutButton").addEventListener("click", function() {
            window.location.href = '../backend/logout.php';
        });
    </script>
    
</body>
</html>
