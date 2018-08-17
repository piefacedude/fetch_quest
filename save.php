<?php

$mode = $_REQUEST["mode"];
if ($mode == "save") {
  // get the q parameter from URL
  $save = $_REQUEST["save"];
  $date = date('Y-m-d-h-i-s');

  //opens file in chosen mode
  $file = fopen("data/saves/" . $date . ".csv",'w');
  //records variables to csv, sepetating by recorded ","s
  //if we're editing or adding
  //  foreach ($list as $line) {

      //explode just makes the text into an array (see above)
      $data = $save;
      echo $save;
      //puts data from line into file
      fputcsv($file,$data);

    //}
  //closes file, politely
  fclose($file);
}
?>