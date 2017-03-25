<?php

require 'vendor/autoload.php';

use Mailgun\Mailgun;

$name = isset($_POST['name'])?strip_tags(htmlspecialchars($_POST['name'])):"";
$phone = isset($_POST['phone'])?strip_tags(htmlspecialchars($_POST['phone'])):"";
$email = isset($_POST['email'])?strip_tags(htmlspecialchars($_POST['email'])):"";
$date_from = isset($_POST['date_from'])?strip_tags(htmlspecialchars($_POST['date_from'])):"";
$date_to = isset($_POST['date_to'])?strip_tags(htmlspecialchars($_POST['date_to'])):"";
$message = isset($_POST['message'])?strip_tags(htmlspecialchars($_POST['message'])):"";

# Instantiate the client.
$mgClient = new Mailgun('key-63d0b6aef11b3fcc4a36eca5f6dc3b53');
$domain = "sandbox46b7045d6ea84773af74eb1cb68261d6.mailgun.org";

$txt = '<html>'
        . '<head>'
        . '<meta charset="UTF-8">'
        . '</head>'
        . '<body>'
        . '<h1 style="font-size:16px;">Wiadomość ze strony www</h1>'
        . '<ul>'
        . "<li>Imię:$name</li>"
        . "<li>Telefon:$phone</li>"
        . "<li>Email:$email</li>"
        . "<li>Data przyjazdu:$date_from</li>"
        . "<li>Data odjazdu:$date_to</li>";
        if(strlen($message)>0){
            $txt .= "<li>Wiadomość:$message</li>";
        }
        $txt .= '</ul>'
        . '</body>'
        . '</html>';



# Make the call to the client.
$result = $mgClient->sendMessage("$domain", array('from' => 'Mailgun Sandbox <postmaster@sandbox46b7045d6ea84773af74eb1cb68261d6.mailgun.org>',
    'to' => 'Marta <m.tarajkowicz@gmail.com>',
    'subject' => 'Wiadomość ze strony Sandhotel - rezerwacja',
    'html' => $txt));
