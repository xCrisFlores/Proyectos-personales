<?php
include "../backend/session_check.php";
?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Registro de productos</title>
        <link rel="stylesheet" href="../styles/primary_styles.css">
    </head>
    <body class="primary_body">

        <header>
            <h1 class="primary_title">Registro de productos</h1>
        </header>

        <main class="primary_box">
            <h2 class="primary_form_lbl">Registro</h2>
            <form id="registroProducto" action="../backend/altaProducto.php" method="post">

                <h3 class="primary_lbl">Nombre</h3>
                <input class ="primary_inp" type="text" name="nombre" id="nombre" required>

                <h3 class="primary_lbl" >Precio</h3>
                <input class ="primary_inp_num" type="number" name="precio" id="precio" required>

                <h3 class="primary_lbl" >Stock</h3>
                <input class ="primary_inp_num" type="number" name="stock" id="stock" required>

                <h3 class="primary_lbl">Descripcion</h3>
                <input class ="primary_inp_area" type="textarea" name="desc" id="desc" required></br> 
                <button class="primary_btn" type="submit" id="submit1">Registrar</button>

            </form>
        </main>

        <script>
            document.getElementById("registroProducto").addEventListener("submit", function(event) {
                var nombre = document.getElementByn("nombre").value;
                var precio = document.getElementById("precio").value;
                var stock = document.getElementById("stock").value;
                var descripcion = document.getElementById("desc").value;

                if (nombre === "" || precio === "" || stock === "" || descripcion === "") {
                    alert("Todos los campos son obligatorios.");
                    event.preventDefault();
                }
                
            });
        </script>
    </body>
</html>
