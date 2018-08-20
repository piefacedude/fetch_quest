<?php
session_start();
$mode = $_REQUEST["mode"];
if ($mode == "save") {
  // get the q parameter from URL
  $save = $_REQUEST['save'];
  $date = date('Y-m-d-h-i-s');
  echo $save;

  //opens file in chosen mode
  if (!is_dir("data/saves/" . $_SESSION['username'])) {
    mkdir("data/saves/" . $_SESSION['username']);
  }
  $file = fopen("data/saves/" . $_SESSION['username'] . "/" . $date . ".csv",'w');



  $data = explode('-',$save);
  $toReplace = array('"',"]","[","}","{");
    foreach($data as $key=>$value){
    $data[$key]=str_replace($toReplace,"",$value);
  }
  foreach ($data as $line) {
    $newLine = explode('.',$line);
    fputcsv($file,$newLine);
  }
  print_r($data);
  //closes file, politely
  fclose($file);
}


else if ($mode == "load") {
  $date = date('Y-m-d-h-i-s');
  if (!is_dir("data/saves/" . $_SESSION['username'])) {
    while () {

    }
    $latestDate =
    $file = fopen("data/saves/" . $_SESSION['username'] . "/" . $date . ".csv",'r');

  }
  else {
    echo "No saves found!";
  }
}
?>