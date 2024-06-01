<?php
include 'conexion.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $mysqli->real_escape_string($_POST['correo']);
    $contraseña = $mysqli->real_escape_string($_POST['contraseña']);

    // Preparar la declaración SQL para evitar inyecciones
    $stmt = $mysqli->prepare("SELECT * FROM usuarios WHERE correo = ? AND password = ?");
    $stmt->bind_param("ss", $correo, $contraseña);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['correo'] = $user['correo'];

        echo "
        <script>
            window.location.href = '../screens/dashboard.php';
        </script>
        ";
    } else {
        echo "
        <script>
            alert('Credenciales incorrectas');
            window.location.href = '../index.html';
        </script>
        ";
    }

    $stmt->close();
}

$mysqli->close();
?>
