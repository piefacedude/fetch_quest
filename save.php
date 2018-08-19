<?php
session_start();
$mode = $_REQUEST["mode"];
if ($mode == "save") {
  // get the q parameter from URL
  $save = $_REQUEST["save"];
  $date = date('Y-m-d-h-i-s');

  //opens file in chosen mode
  if (is_dir("data/saves/" . $_SESSION['username'])) {
    $file = fopen("data/saves/" . $_SESSION['username'] . "/" . $date . ".csv",'w');
  }
  else {
    mkdir("data/saves/" . $_SESSION['username']);
    $file = fopen("data/saves/" . $_SESSION['username'] . "/" . $date . ".csv",'w');
  }


  $toReplace = array('"',"]","[","}","{");
  str_replace($toReplace,"",$save);
  echo $save;
  $data = explode(',',$save);

  foreach ($data as $line) {
    $newLine = explode('.',$line);
    fputcsv($file,$newLine);
  }

  //closes file, politely
  fclose($file);
}
?>