<?php
$to      = 'mail@mail.ru';
$subject = 'Заявка с сайта';
$message = 'Заявка.  Имя: ' . $_POST["name"] . ', Телефон: ' . $_POST["phone"] . ', Почта: ' . $_POST["email"];
$headers = 'From: mail@mail.ru' . "\r\n" .
    'Content-Type: text/plain; charset=utf8;' . "\r\n" .
    'Reply-To: mail@mail.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
?>

