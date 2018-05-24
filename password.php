<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link href="style.css" rel="stylesheet" type="text/css">
    <title>password test</title>
  </head>
  <body>
    <?php
    $password = $_POST['password'];
    error_reporting(0);
    $encrypted = crypt($password);
    error_reporting(E_ALL);
    echo $password;
    echo "<br>";
    echo $encrypted;

    if (hash_equals($encrypted, crypt('themorethemerrier', $encrypted))) {
      echo "<br>";
      echo "true!";
    }
    else {
      echo "<br>";
      echo "false";
    }

     ?>
  </body>
</html>
