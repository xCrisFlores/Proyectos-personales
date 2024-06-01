<?php
include "../backend/session_check.php";
include "../backend/get_data.php";
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Productos</title>
    <link rel="stylesheet" href="../styles/products_styles.css">
</head>
<body>

    <header>
        <h1 class="primary_title">Estos son tus productos</h1>
    </header>

    <main>

        <?php
           get_productos();
        ?>

        <div class='producto'>
            <h3 class="primary_lbl">Aqui puedes registrar tus productos</h3>
            <input class="primary_btn" type="button" role="link" value="Agrega un producto" onclick="location.href='registro_producto.php'">
        </div>

        <button class='return_btn' onclick='goback()' id='return'>Regresar</button>

            <script>
                function goback(){
                    window.location.href = 'dashboard.php'; 
                }
            </script>
    </main>
    
</body>
</html>
