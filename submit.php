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
        if (!empty($_POST['mode'])) {
          $mode = $_POST['mode'];
        }
        else {
          $mode = $_GET['mode'];
        }

        $_SESSION['error'] = false;

        //creating rows 2d array of csv file
        $file = new SplFileObject("data/users.csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }

        //creating csv line
        //index is the next blank line
        //array is index,date,height,weight,bmi (previously calculated)
        if ($mode == "register") {
          //finding next unset line for var to go into, also acts as index number
          $count = 0;
          while (isset($rows[$count])) {
            if ($rows[$count][0] == $username) {
              $_SESSION['error'] = 'Username is taken!';
              $count = 9999999999999999;
            }
            $count++;
          }

          $password = password_hash($password,PASSWORD_DEFAULT);

          $list = array
          (
            $username . "," . $password . "," . $email . "," . date('Y/m/d') . "," . date('Y/m/d')
          );


          //opens file in chosen mode
          $file = fopen("data/users.csv",'a');

          //records variables to csv, sepetating by recorded ","s
          //if we're editing or adding
            foreach ($list as $line) {
              //and the line isnt empty
              if ($line != null && $_SESSION['error'] == false) {
                //explode just makes the text into an array (see above)
                $data = explode(',',$line);
                //puts data from line into file
                fputcsv($file,$data);
                $_SESSION['username'] = $username;
              }
            }
          //closes file, politely
          fclose($file);

          $file = fopen("data/characters/" . $username . ".csv", "w");

          $toAdd = "Profile for FetchQuest User-Attacks:-Jump.Bite-Items:- -Specials:-Bark.Howl";
          $first = explode('-',$toAdd);
          foreach ($first as $line) {
            $input = explode('.', $line);
            fputcsv($file,$input);
          }

          fclose($file);
        }


        elseif ($mode == "login") {
          $_SESSION['test'] = "yes";
          //finding next unset line for var to go into, also acts as index number
          $count = 0;
          while (isset($rows[$count])) {
            $count++;
            if ($rows[$count][0] == $username) {
              //found the username
              if (hash_equals($rows[$count][1], crypt($password,$rows[$count][1]))) {
                $file = fopen("data/users.csv",'w');
                $_SESSION['username'] = $username;
                $fileRedo = $rows;
                $fileRedo[$count][4] = date('Y/m/d');

                foreach ($fileRedo as $line) {
                  fputcsv($file,$line);
                }
              }
              else {
                $_SESSION['error'] = 'Username or password was incorrect';
              }
            }
          }
          fclose($file);
        }


        elseif ($mode == "trade") {
          if (empty($_POST['to']) || empty($_POST['from'])) {
            $_SESSION['error'] = "No item selected to/from.";
            header('Location: tradingRequest.php');
          }
          $gotten = true;
          $check = 0;
          $from = $_POST['from'];
          $to = $_POST['to'];
          //
          // $file = new SplFileObject("data/trades.csv");
          // $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
          //
          // $rows = [];
          // while(!$file->eof()) {
          //   $rows[] = $file->fgetcsv();
          // }

          $file = fopen("data/trades.csv",'a');
          $input = [];
          $jnput = [];

          for ($i=0; $i < 4; $i++) {
            switch ($i) {
              case 0:
                $input[] = $_POST['userTo'];
                break;

              case 1:
                foreach ($_POST['to'] as $value) {
                  $input[] = $value;
                }
                break;

              case 2:
                $jnput[] = $_POST['userFrom'];
                break;


              case 3:
              foreach ($_POST['from'] as $value) {
                $jnput[] = $value;
              }
                break;
            }
          }
          print_r($input);
          print_r($jnput);
          fputcsv($file, $input);
          fputcsv($file, $jnput);
          fclose($file);

        }

        if ($_SESSION['error'] == false) {
          header('Location: index.php');
        }

        else {
          header('Location: login.php');
        }
     ?>
     </h1>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>