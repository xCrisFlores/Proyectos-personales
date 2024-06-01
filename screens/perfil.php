<?php

include "../backend/session_check.php";
include "../backend/get_data.php";
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Perfil</title>
</head>
<body>

    <?php   
        get_user();
    ?>

    <button class='return_btn' onclick='goback()' id='return'>Regresar</button>

    <script>
        function goback(){
            window.location.href = 'dashboard.php'; 
        }
    </script>
    
</body>
</html>
