<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ventas</title>
</head>
<body>

    <header>
        <h1>Ventas</h1>
    </header>

    <main>
        <?php include "../backend/get_data.php"; ?>
        <h3> <?php get_total(); ?></h3>
        <h3> <?php get_avg(); ?></h3>
        <h3> <?php get_min(); ?></h3>
        <h3> <?php get_max(); ?></h3>

        <form method="POST" action="">
            <input type="date" id="fecha" name="fecha" required>
            <button type="submit">Ver Ventas</button>
        </form>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['fecha'])) {
            $fecha = $_POST['fecha'];
            get_ventas($fecha);
        }
        ?>

<button class='return_btn' onclick='goback()' id='return'>Regresar</button>

<script>
    function goback(){
        window.location.href = 'dashboard.php'; 
    }
</script>
    </main>
    
</body>
</html>
