<?php
session_start();
if (!isset($_SESSION['backoffice']) || $_SESSION['backoffice'] !== true) {
    http_response_code(403);
    exit('Unauthorized');
}

$path = $_POST['path'];
$content = $_POST['content'];
$realBase = realpath('..');
$realPath = realpath("../" . $path);
if ($realPath === false || strpos($realPath, $realBase) !== 0) {
    exit('Invalid path');
}
file_put_contents($realPath, $content);
echo 'Saved';
?>
