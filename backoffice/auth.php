<?php
session_start();
$config = include __DIR__.'/config.php';

if (isset($_POST['password'])) {
    if (hash('sha256', $_POST['password']) === $config['password_hash']) {
        $_SESSION['backoffice'] = true;
        exit('OK');
    } else {
        http_response_code(401);
        exit('Invalid');
    }
}

if (isset($_GET['check'])) {
    exit(isset($_SESSION['backoffice']) ? '1' : '0');
}
?>
