<?php
session_start();
if (!isset($_SESSION['backoffice']) || $_SESSION['backoffice'] !== true) {
    http_response_code(403);
    exit('Unauthorized');
}

$pages = [];
$dir = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('..', FilesystemIterator::SKIP_DOTS));
foreach ($dir as $file) {
    if ($file->getFilename() === 'index.html') {
        $path = substr($file->getPathname(), 3); // remove '../'
        if (strpos($path, 'backoffice') === 0 || strpos($path, 'data') === 0) {
            continue;
        }
        $pages[] = $path;
    }
}
header('Content-Type: application/json');
echo json_encode($pages);
?>
