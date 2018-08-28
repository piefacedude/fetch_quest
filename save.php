<?php
session_start();
$mode = $_REQUEST["mode"];
//if saving
if ($mode == "save") {
  // get the parameters from URL
  $save = $_REQUEST['save'];
  $date = date('Y-m-d-h-i-s');

  //saving the battle
  //////////////////////////////////////////////////////////////////////////////////////////
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
    //puts it in the file
    fputcsv($file,$newLine);
  }
  // print_r($data);
  //closes file, politely
  fclose($file);

  //profile saving
  ///////////////////////////////////////////////////////////////////////////

  // $file = new SplFileObject("data/characters/" . $_SESSION['username'] . ".csv");
  // $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
  //
  // //transfer user data into array to be read
  // $rows = [];
  // while(!$file->eof()) {
  //   $rows[] = $file->fgetcsv();
  // }

  $profile = $_REQUEST['profile'];
  $file = fopen("data/characters/" . $_SESSION['username'] . ".csv",'w+');

  //breaks data by -'s, into array
  $data = explode('-',$profile);
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

//loading
else {
  //if we want a specific file, make that the request
  $request = $_REQUEST['file'];
  //find the date
  $date = date('Y-m-d-h-i-s');
  //check if a directory exists for the user
  //if there is one, load the files
  if (is_dir("data/saves/" . $_SESSION['username'])) {
    // get all the files
    $files = scandir("data/saves/" . $_SESSION['username'], SCANDIR_SORT_DESCENDING);
    //choose a save
    //if theres a request load that one
    if (!empty($request)) {
      $newestFile = $request;
    }
    //otherwise, load the latest file
    else {
      $newestFile = $files[0];
    }

    //load the file path
    $file = new SplFileObject("data/saves/" . $_SESSION['username'] . "/" . $newestFile);
    //set up file
    $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
    //make an array from the file
    $rows = [];
    while(!$file->eof()) {
      $rows[] = $file->fgetcsv();
    }
    //this file is only for the current adventure, as the character can be reused
    //while all the data isnt read
    $done = false;
    while ($done == false) {
      //keep looking through the data array
      for ($i=0; $i < count($rows); $i++) {
        //until we find an enemy
        if ($rows[$i][0] == "EnemyNo0:") {
          //then echo out the data for that enemy
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
  //if there are no saves, echo failure
  else {
    echo "No saves found!";
  }
}
?>










