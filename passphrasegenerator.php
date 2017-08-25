<?php
  $dir    = '/home/actiorwd/public_html/passphrase_icons/';
  $files1 = scandir($dir);
  echo json_encode($files1);
?>
