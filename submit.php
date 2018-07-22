<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Submitted!</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body>
    <div class="jumbotron">
      <h1>
      <?php
      //gets vars posted on last page
      session_start();
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

      if ($_SESSION['error'] == false) {
        header('Location: index.php');
      }
      else {
        header('Location: register.php');
      }
       ?>
       </h1>
    </div>
    <a href="pep_1_3.php">Return to PEP</a>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>