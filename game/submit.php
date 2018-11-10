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
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
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
          if ($_SESSION['error'] == false) {
            //create a folder for their saves to be saved in
            mkdir("data/saves/" . $_SESSION['username']);
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
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        elseif ($mode == "login") {
          //finding next unset line for var to go into, also acts as index number
          $count = 0;
          //if we've still got records to look through
          while (isset($rows[$count])) {
            //look for the username
            if ($rows[$count][0] == $username) {
              // found the username
              //and if the password is the same as the hashed password
              if (hash_equals($rows[$count][1], crypt($password,$rows[$count][1]))) {
                //time for a quick modification, open user file in write
                $file = fopen("data/users.csv",'w');
                //change the session's username to whatever they logged in to
                $_SESSION['username'] = $username;
                //set up an alert so they know they've logged in
                $_SESSION['alert'] = "username";
                //make a new line for them
                $fileRedo = $rows;
                //change the date they last logged in on to today
                $fileRedo[$count][4] = date('Y/m/d');
                //then put all the records back
                foreach ($fileRedo as $line) {
                  fputcsv($file,$line);
                }
              }
            }
            //otherwise, they either put in the wrong username or password
            $count++;
          }
          //close the file without waking the baby
          fclose($file);
          if (empty($_SESSION['username'])) {
            $_SESSION['alert'] = "unpw";
            $_SESSION['error'] = true;
          }
        }


        //making a trade offer
        elseif ($mode == "tradeOffer") {
          //if they pressed submit without actually asking for anything
          if (empty($_POST['to']) && empty($_POST['from'])) {
            //boot them back to the request page with an error
            $_SESSION['error'] = "No item selected to/from.";
            header('Location: tradingRequest.php');
          }

          //gotten is used to
          $gotten = true;
          //check is used to
          $check = 0;
          //if they are giving something
          if (!empty($_POST['from'])) {
            //list the things being given
            $from = $_POST['from'];
          }
          //otherwise
          else {
            //create the variable, but have nothing being given
            $from = [];
          }
          //same as for requesting
          //allows users to either ask or give something for free
          if (!empty($_POST['to'])) {
            $to = $_POST['to'];
          }
          else {
            $to = [];
          }

          //open the trades file in append mode
          $file = fopen("data/trades.csv",'a');
          //lines for the trade file:
          //input = *username of user for*,*item list*
          //jnput = *username of user from*,*item list*
          $input = [];
          $jnput = [];

          //two distinct data types to be added
          for ($i=0; $i < 2; $i++) {
            switch ($i) {
              //first data piece is the username as above
              case 0:
                //user it's being given to
                $input[] = $_POST['userTo'];
                //user it's being offered from
                $jnput[] = $_POST['userFrom'];
                break;

              //item lists
              case 1:
                //items being asked
                foreach ($_POST['to'] as $value) {
                  $input[] = $value;
                }
                //items being given
                foreach ($_POST['from'] as $value) {
                  $jnput[] = $value;
                }
                break;
            }
          }
          //then, put the items into their respective lines
          //trades file is alternating wanted items and offered items
          fputcsv($file, $input);
          fputcsv($file, $jnput);
          //close the file with the finesse of a super spy
          fclose($file);
        }


        //if the person has accepted the trade
        elseif ($mode == "trade") {
          //if the user somehow gets here without the needed vars
          if (empty($_GET['accept'])) {
            //send back to the offers page
            $_SESSION['error'] = "Error occured, please try again later.";
            header('Location: offers.php');
          }
          //otherwise
          else {
            //the user is the logged in user, ensures you can't just
            //force accept an offer using the "get" variables in the url
            $user = $_SESSION['username'];
            //who the offer came from
            $from = $_GET['from'];
            //if they are accepting or denying
            $accept = $_GET['accept'];
            //which number offer this is from the person
            //as people may send the same person multiple requests
            $number = $_GET['number'];
            //and if this line has the second part of the request on it
            $printNext = false;

            //making an array from the trades file
            $file = new SplFileObject("data/trades.csv");
            $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
            $trades = [];
            while(!$file->eof()) {
              $trades[] = $file->fgetcsv();
            }

            //just used to find the next line, and the username on it
            $count = 0;
            //counts how many offers between the same people there are
            $checked = 0;
            //for each of the trades
            foreach ($trades as $check) {
              //if the person it's offered to it the current user
              //AND the person it was offered from is the person who's
              //offer we're accepting
              if ($check[0] == $user && $trades[$count + 1][0] == $from) {
                //see if this is the right one (if there are two trades offers from
                //the same user, we need to make sure it's the right one)
                if ($number == $checked) {
                  //and if it is, this is the one we want to remove
                  //(record gets removed reguardless of if they are accepting
                  //or denying)
                  $toRemove = $count;
                }
                //if it's not the right one, increment the count and move on
                $checked++;
              }
              //another record checked
              $count++;
            }

            //added after formal testing
            //we're looking for invaidated offers
            //grab a list of the items given
            $itemsGiven = $trades[$toRemove + 1];
            //and taken away
            $itemsTaken = $trades[$toRemove];
            //also create an array of the caught invalid records
            $toRemoveArray = [];
            //and the first record is an offer
            $offer = false;
            //for each line of the offers file
            foreach ($trades as $key => $value) {
              //if the last line was an offer, this one isnt
              if ($offer == true) {
                $offer = false;
              }
              //and vice versa
              else {
                $offer = true;
              }
              //if the username is equal to the one offering the items
              if ($value[0] == $from) {
                //use their array of given items to check
                for ($i=0; $i < count($itemsGiven) - 1; $i++) {
                  //and check it against the items in that offer
                  for ($j=0; $j < count($value) - 1; $j++) {
                    //if any of the items overlap, the user will (probably), no longer have that item
                    //also checks if the key is already being removed, to avoid doubles
                    if ($itemsGiven[$i + 1] == $value[$j + 1] && !in_array($key,$toRemoveArray)) {
                      //and if it's an offer, the next one needs to go as well
                      if ($offer == true) {
                        //add their indexs to the removal array
                        $toRemoveArray[] = $key;
                        $toRemoveArray[] = $key + 1;
                      }
                      //or if it's a request, it's now invalid as they cannot give it
                      else {
                        $toRemoveArray[] = $key;
                        $toRemoveArray[] = $key - 1;
                      }
                    }
                  }
                }
              }
              //same as but it's for the other user
              elseif ($value[0] == $user) {
                for ($i=0; $i < count($itemsTaken) - 1; $i++) {
                  for ($j=0; $j < count($value) - 1; $j++) {
                    if ($itemsTaken[$i + 1] == $value[$j + 1] && !in_array($key,$toRemoveArray)) {
                      if ($offer == true) {
                        $toRemoveArray[] = $key;
                        $toRemoveArray[] = $key + 1;
                      }
                      else {
                        $toRemoveArray[] = $key;
                        $toRemoveArray[] = $key - 1;
                      }
                    }
                  }
                }
              }
            }
            //now we open the trades file in write mode`
            //this deletes the file, but we have all the data in the trades array
            $file = fopen('data/trades.csv', "w");
            //the first line IS an offer, but we toggle at the start
            $offer = false;
            //counter for reference
            $count = 0;
            //finds the items that are asked for
            $items = [];
            //for each line of the trade file
            foreach ($trades as $key => $line) {
              //if this isnt the line to remove, OR the line after it
              if ($toRemove != $count && $toRemove != $count - 1) {
                //if the last line was an offer, this one isnt
                if ($offer == true) {
                  $offer = false;
                }
                //and vice versa
                else {
                  $offer = true;
                }

                //and if the key is not in the list of invalid records
                if (!in_array($key, $toRemoveArray)) {
                  //and now put this line into the file
                  fputcsv($file, $line);
                }
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