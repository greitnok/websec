<?php
  $FromEmail = $_POST["FromEmail"];
  $FromName = $_POST["FromName"];
  $RecipientEmail = $_POST["RecipientEmail"];
  $Subject = $_POST["Subject"];
  $Content ='This email was sent using a spoofing tool from '.'<a href="https://actionscript.no">WebSec.</a>'.'<strong> Do not trust the content of this email</strong><br><br><br>';
  $Content .= $_POST["Content"];
  $Content .='<br><br><br><a style="display: flex; justify-content: center" href="https://actionscript.no"> <img src="https://actionscript.no/icons/logoblackbackground.png" /> </a>';


  require_once('/home/actiorwd/public_html/PHPMailer/PHPMailerAutoload.php');
  $mail = new PHPMailer;
  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'cpanel40.proisp.no';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'breached@actionscript.no';                 // SMTP username
  $mail->Password = 'websec2017';                           // SMTP password
  $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 465;                                    // TCP port to connect to

  $mail->setFrom($FromEmail, $FromName);
  $mail->ClearAddresses();
  $mail->addAddress($RecipientEmail);     // Add a recipient
  $mail->addReplyTo(' ', ' ');

  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = $Subject;
  $mail->Body    =$Content;
  $mail->AltBody =$Content;
  //"This email was sent from ".'<a href="https://actionscript.no">WebSec</a>';

//'<img src="https://actionscript.no/icons/logo.png" />';


  $sent = $mail->send();

  if(!$sent) { // Check the result of the first send instead
    echo 'Message could not be sent.<br />';
    echo 'Mailer Error: ' . $mail->ErrorInfo . '<br />';
  } else {
    echo '<script type="text/javascript">alert("The message has been sent!");</script>';
    echo "<meta http-equiv='refresh' content='0; url=https://actionscript.no/email#SPOOF'>";
    die();
  }


?>
