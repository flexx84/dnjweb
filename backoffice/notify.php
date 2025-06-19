<?php
session_start();
if (!isset($_SESSION['backoffice']) || $_SESSION['backoffice'] !== true) {
    http_response_code(403);
    exit('Unauthorized');
}

$subject = $_POST['subject'];
$message = $_POST['message'];
$employees = file('../data/employees.csv', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$to = [];
foreach ($employees as $emp) {
    list($name, $email) = explode(',', $emp);
    $to[] = $email;
}
$headers = "From: webmaster@example.com";
foreach ($to as $email) {
    mail($email, $subject, $message, $headers);
}
echo 'Mail sent to ' . count($to) . ' employees';
?>
