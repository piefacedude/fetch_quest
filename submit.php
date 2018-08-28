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
        //used to switch a users items
        function modifyItemsByArray($user, $array, $items) {
          //opposes the arrays used, as it only has to and from
          if ($array == 0) {
            $other = 1;
          }
          else {
            $other = 0;
          }

          //read the user's character data into an array
          $file = new SplFileObject('data/characters/' . $user . '.csv');
          $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
          $userData = [];
          while(!$file->eof()) {
            $userData[] = $file->fgetcsv();
          }

          // open the user's character file in write mode
          $file = fopen('data/characters/' . $user . '.csv', "w");

          //set up some variables
          //the next line is the one with the items on it
          $next = false;
          //used to ensure the offer is not re-written back into the trades file
          $notThis = false;
          //the items that will be taken from the user
          $userItemsCheck = $items[$array];
          //the items that will be given
          $userItemsPush = $items[$other];
          //the new items line, now with the items removed or changed
          $newArray = [];

          //foreach of the line of the character's data
          foreach ($userData as $line) {
            //if this line is the items line and this line isnt empty
            if ($next == true && !empty($line)) {
              //for each of the items on the line
              foreach ($line as $value) {
                //check wether it matches any of the items on the removal list
                foreach ($userItemsCheck as $key => $against) {
                  //and if it is
                  if ($value == $against) {
                    //make sure its not place back into the array
                    $notThis = true;
                    //and remove this item from the removal array (allows different number of items to be traded eg 2x healing potion)
                    unset($userItemsCheck[$key]);
                  }
                }
                //if we do want this item to stay
                if ($notThis != true) {
                  //put it back on the new line
                  $newArray[] = $value;
                }
                //otherwise, reset and go again
                else {
                  $notThis = false;
                }
              }

              //and give the user all their shiney new items
              $first = true;
              //foreach of the items removed from the other player's inventory
              foreach ($userItemsPush as $value) {
                //if this isnt the identifying username
                if ($first == false) {
                  //push it into the new line
                  $newArray[] = $value;
                }
                else {
                  //otherwise, ignore it
                  $first = false;
                }
              }
              //then put the new item line into the user's file
              fputcsv($file, $newArray);
              $next = false;
            }

            //if this line has "Items:" on it, its the one before the items array
            else if ($line[0] == "Items:") {
              //so flag the next line as the items array
              $next = true;
              //and put this one back where ya found it
              fputcsv($file, $line);
            }
            else {
              //otherwise it's just a random line that needs to be replaced
              fputcsv($file, $line);
            }
          }
        }

        //this used to be just the register and login page
        //so all these are out here
        //if it aint broke dont fix it
        $username = filter_input(INPUT_POST, 'username');
        $password = filter_input(INPUT_POST, 'password');
        $email = filter_input(INPUT_POST, 'email');
        //if we have something posted in the mode slot
        if (!empty($_POST['mode'])) {
          //thats the mode
          $mode = $_POST['mode'];
        }
        else {
          //otherwise, its been put in the url, so get it from there
          $mode = $_GET['mode'];
        }

        //start with no errors assumed
        $_SESSION['error'] = false;

        //make an array from the users data
        $file = new SplFileObject("data/users.csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);\
        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }

        //if we're registering
        if ($mode == "register") {
          //seeing if the username they wanted is taken
          $count = 0;
          //while there's still records to work with
          while (isset($rows[$count])) {
            //check if the username is the same as the one they submitted
            if ($rows[$count][0] == $username) {
              //if so, error and send them home
              $_SESSION['error'] = 'Username is taken!';
              $count = 9999999999999999;
            }
            $count++;
          }

          //hash the password they gave
          $password = password_hash($password,PASSWORD_DEFAULT);

          //make an array to act as their user record
          //structure:
          //username, hashed password, email, date account created, date last logged in
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
                //take the data we're given and make it into an array so the fput wont throw a hissy
                $data = explode(',',$line);
                //puts data from line into file
                fputcsv($file,$data);
                //make it alert the person when they are returned to the index page that they are now logged in
                $_SESSION['username'] = $username;
                $_SESSION['alert'] = "username";
              }
            }
          //closes file, politely
          fclose($file);

          //also writes up a character file for them
          //no items, basic attacks and specials
          //create a new csv
          $file = fopen("data/characters/" . $username . ".csv", "w");
          //use this string
          $toAdd = "Profile for FetchQuest User-Attacks:-Jump.Bite-Items:- -Specials:-Bark.Howl";
          //explode into array using the "-"'s as the first layer
          $first = explode('-',$toAdd);
          foreach ($first as $line) {
            //and then by the dots for the second layer
            $input = explode('.', $line);
            fputcsv($file,$input);
          }
          //close the file quietly
          fclose($file);
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        elseif ($mode == "login") {
          //finding next unset line for var to go into, also acts as index number
          $count = 0;
          while (isset($rows[$count])) {
            if ($rows[$count][0] == $username) {
              // found the username
              if (hash_equals($rows[$count][1], crypt($password,$rows[$count][1]))) {
                $file = fopen("data/users.csv",'w');
                $_SESSION['username'] = $username;
                $_SESSION['alert'] = "username";
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
            $count++;
          }
          fclose($file);
        }


        elseif ($mode == "tradeOffer") {
          if (empty($_POST['to']) && empty($_POST['from'])) {
            $_SESSION['error'] = "No item selected to/from.";
            header('Location: tradingRequest.php');
          }
          $gotten = true;
          $check = 0;
          if (!empty($_POST['from'])) {
            $from = $_POST['from'];
          }
          else {
            $from = [];
          }
          if (!empty($_POST['to'])) {
            $to = $_POST['to'];
          }
          else {
            $to = [];
          }
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
          fputcsv($file, $input);
          fputcsv($file, $jnput);
          fclose($file);
        }

        elseif ($mode == "trade") {
          if (empty($_GET['accept'])) {
            $_SESSION['error'] = "No item selected to/from.";
            echo $_GET['accept'];
            echo empty($_GET['accept']);
            echo "<br />";
            echo $_GET['number'];
            echo empty($_GET['number']);
            // header('Location: offers.php');
          }
          else {
            $user = $_SESSION['username'];
            $from = $_GET['from'];
            $accept = $_GET['accept'];
            $number = $_GET['number'];
            $printNext = false;
            $file = new SplFileObject("data/trades.csv");
            $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

            $trades = [];
            while(!$file->eof()) {
              $trades[] = $file->fgetcsv();
            }
            $count = 0;
            $checked = 0;
            foreach ($trades as $check) {
              if ($check[0] == $user) {
                if ($trades[$count + 1][0] == $from) {
                  if ($number == $checked) {
                    $toRemove = $count;
                  }
                  $checked++;
                }
              }
              $count++;
            }

            $file = fopen('data/trades.csv', "w+");
            $offer = false;
            $count = 0;
            $items = [];
            echo $toRemove;
            echo "<br />";
            foreach ($trades as $line) {

              echo "<br />";
              if ($toRemove != $count && $toRemove != $count - 1) {
                echo $count;
                if ($offer == true) {
                  $offer = false;
                }
                else {
                  $offer = true;
                }

                if ($printNext == true) {
                  $printNext = false;
                }
                if ($line[0] == $user && $offer == true) {
                  $printNext = true;
                }
                fputcsv($file, $line);
              }
              else {
                $items[] = $line;
              }
              $count++;
            }
            fclose($file);
            if ($accept == "yes") {
              for ($i=0; $i < 2; $i++) {
                switch ($i) {
                  case 0:
                    modifyItemsByArray($user,0,$items);
                    break;

                    case 1:
                    modifyItemsByArray($from,1,$items);
                    break;

                  default:
                    // code...
                    break;
                }
              }
            }
          }
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