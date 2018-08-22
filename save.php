<?php
session_start();
$mode = $_REQUEST["mode"];
//if saving
if ($mode == "save") {
  // get the parameters from URL
  $save = $_REQUEST['save'];
  $date = date('Y-m-d-h-i-s');

  //checks if user saves file exists, if not, create
  if (!is_dir("data/saves/" . $_SESSION['username'])) {
    mkdir("data/saves/" . $_SESSION['username']);
  }
  //new file under user's save folder, dated
  $file = fopen("data/saves/" . $_SESSION['username'] . "/" . $date . ".csv",'w');


  //breaks data by -'s, into array
  $data = explode('-',$save);
  //remove any random characters that conversion from
  //  object to string to array has created.
  $toReplace = array('"',"]","[","}","{");
    foreach($data as $key=>$value){
    $data[$key]=str_replace($toReplace,"",$value);
  }
  //put each array item into array as line
  foreach ($data as $line) {
    //creates sub-array,
    $newLine = explode('.',$line);

    fputcsv($file,$newLine);
  }
  // print_r($data);
  //closes file, politely
  fclose($file);
}


else {
  $date = date('Y-m-d-h-i-s');
  if (is_dir("data/saves/" . $_SESSION['username'])) {
    $files = scandir("data/saves/" . $_SESSION['username'], SCANDIR_SORT_DESCENDING);
    $newestFile = $files[0];
    $file = new SplFileObject("data/saves/" . $_SESSION['username'] . "/" . $newestFile);
    $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
    $rows = [];
    while(!$file->eof()) {
      $rows[] = $file->fgetcsv();
    }
    $enemiesDone = false;
    $heroDone = false;
    $done = false;
    while ($done == false) {
      for ($i=0; $i < count($rows); $i++) {

        if ($rows[$i][0] == "EnemyNo0:") {
          $done = true;
          foreach ($rows[$i + 1] as $key => $value) {
            echo $value . ",";
          }
        }
        //
        // if ($rows[$i][0] == "HeroData:") {
        //   $heroDone = true;
        //   foreach ($rows[$i + 1] as $key => $value) {
        //     echo $value . ",";
        //   }
        // }
        //
        // if ($enemiesDone == true && $heroDone == true) {
        //  $done = true;
        // }
      }
    }
  }
  else {
    echo "No saves found!";
  }
}
?>










