<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "
        <script>
            alert('Debes iniciar sesión para acceder a esta página.');
            window.location.href = '../index.html';
        </script>
    ";
    exit();
}
?>
