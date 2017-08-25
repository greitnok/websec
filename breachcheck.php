<?php
ini_set("allow_url_fopen", 1);
include '/home/actiorwd/include/dbinfo.php';

$counter =0;

$servername = "localhost";
$dbname = "actiorwd_websec";

// Create connection
$conn = new mysqli($servername, $user, $passw, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT * FROM users";
$result = $conn->query($sql);
$ch = curl_init();



if ($result->num_rows > 0) {
    // output data of each row

    while($row = $result->fetch_assoc()) {
        $url = 'https://haveibeenpwned.com/api/v2/breachedaccount/';
        $url.= $row["email"];


        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        curl_setopt($ch, CURLOPT_URL, $url);
        $results = curl_exec($ch);

        $obj = json_decode($results, TRUE);

        $usermail = $row["email"];



        $newbreaches = count($obj);

        //run if new breaches are found
        if($row["breaches"]!==$newbreaches){


          require_once('/home/actiorwd/public_html/PHPMailer/PHPMailerAutoload.php');
          $mail = new PHPMailer;
          $mail->isSMTP();                                      // Set mailer to use SMTP
          $mail->Host = 'cpanel40.proisp.no';  // Specify main and backup SMTP servers
          $mail->SMTPAuth = true;                               // Enable SMTP authentication
          $mail->Username = 'breached@actionscript.no';                 // SMTP username
          $mail->Password = 'websec2017';                           // SMTP password
          $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
          $mail->Port = 465;                                    // TCP port to connect to

          $mail->setFrom('breached@actionscript.no', 'WebSec');
          $mail->ClearAddresses();
          $mail->addAddress($usermail);     // Add a recipient
          $mail->addReplyTo('breached@actionscript.no', 'WebSec');

          $mail->isHTML(true);                                  // Set email format to HTML

          $mail->Subject = 'Breached!!!!';
          $mail->Body    = '
<h2>kdfjdfjlsdh</h2>
          Someone hacked your account, there are now a total of : ' .$newbreaches. " breaches";
          $mail->AltBody = 'Someone hacked your account, there are now a total of : ' .$newbreaches. " breaches";

          $sent = $mail->send();

          if(!$sent) { // Check the result of the first send instead
            echo 'Message could not be sent.<br />';
            echo 'Mailer Error: ' . $mail->ErrorInfo . '<br />';
          } else {
            echo 'Message has been sent <br />';
            $counter++;
          }





          $updatebreach = "INSERT INTO users (`email`, `breaches`) VALUES ('$usermail', '$newbreaches') ON DUPLICATE KEY UPDATE `breaches` = '$newbreaches' ";
          //echo $updatebreach;

          if ($conn->query($updatebreach) === TRUE) {
              echo "New record created successfully <br />";
          } else {
              echo "Error: " . $updatebreach . "<br>" . $conn->error;
          }


        }

        sleep(2);
    }
} else {
    echo "0 results";
}
curl_close($ch);
echo $counter;


$conn->close();
?>
