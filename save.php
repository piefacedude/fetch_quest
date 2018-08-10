<?php
// get the q parameter from URL
$save = $_REQUEST["save"];

$username = filter_input(INPUT_POST, 'username');
$password = filter_input(INPUT_POST, 'password');
$email = filter_input(INPUT_POST, 'email');
$_SESSION['error'] = false;

//creating rows 2d array of csv file
$file = new SplFileObject("users.csv");
$file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

$rows = [];
while(!$file->eof()) {
  $rows[] = $file->fgetcsv();
}

//finding next unset line for var to go into, also acts as index number
$count = 0;
while (isset($rows[$count])) {
  $count++;
  if ($rows[$count][0] == $username) {
    $_SESSION['error'] = true;
  }
}

//creating csv line
//index is the next blank line
//array is index,date,height,weight,bmi (previously calculated)

$password = password_hash($password,PASSWORD_DEFAULT);

$list = array
(
  $username . "," . $password . "," . $email
);


//opens file in chosen mode
$file = fopen("users.csv",'a');

//records variables to csv, sepetating by recorded ","s
//if we're editing or adding
  foreach ($list as $line) {
    //and the line isnt empty
    if ($line != null && $_SESSION['error'] == false) {
      //explode just makes the text into an array (see above)
      $data = explode(',',$line);
      //puts data from line into file
      fputcsv($file,$data);
    }
  }
//closes file, politely
fclose($file);


?>