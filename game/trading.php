<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Cache-control" content="no-cache">
    <meta charset="utf-8">
    <title>FetchQuest Leaderboard</title>
    <?php
      session_start();
      require 'snippets/links.php';

      //used to grab a list of all the items in a character
      function scrapeItems($user, $dir) {
        $file = new SplFileObject("data/characters/" . $user . ".csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

        //transfer user data into array to be read
        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }

        //next is used to track if this is the line with the items
        $next = false;
        foreach ($rows as $line) {
          //if this line has "Items:" on it, the next line will have the items
          if($line[0] == "Items:") {
            $next = true;
          }
          //else, if this line is the one with the items on it
          else if ($next == true) {
            //reset next
            $next = false;
            //for each item on the line
            foreach ($line as $value) {
              //make a new item line
              echo "<tr>";
              echo "<td>";
              //put the name of the item in
              echo $value;
              echo "</td>";
              echo "<td>";
              //as well as a checkbox with the item name and which way its being sent
              echo "<input type='checkbox' name='" . $dir . "[]' value='" . $value . "'/>";
              echo "</td>";
              echo "</tr>";
            }
          }
        }
      }
    ?>
  </head>
  <body>
    <div class="container-fluid h-100 black">
      <?php
        $activePage = "index";
        require 'snippets/navbar.php';
        //checks to make sure you didn't just manually put in the url without logging in
        if (empty($_SESSION['username']) || empty($_POST['offerTo'])) {
          header('Location: login.php');
        }
        //if they are logged in
        else {
          //set user to and from variables
          $userTo = $_POST['offerTo'];
          $userFrom = $_SESSION['username'];
          //if the user inputted their own username, boot them out with
          //this error: "Can't trade with yourself!"
          if ($userTo == $userFrom) {
            $_SESSION['error'] = "Can't trade with yourself!";
            header('Location: tradingRequest.php');
          }

          //and if the user they requested is also not real
          //boot back to the request page
          if (!file_exists("data/characters/" . $userTo . ".csv")) {
            $_SESSION['error'] = "username not found";
            header('Location: tradingRequest.php');
          }

          //OTHERWISE
          else {
            //make this jumbotron
            //when the user submits their request, send it to sumbit.php in tradeOffer mode
            echo "<form action='submit.php?mode=tradeOffer' method='post'>";
              echo "<div class='jumbotron black'>";

              echo "<table>";
                echo "<th>Your Items:</th>";
                //list your items
                scrapeItems($userFrom, "from");
              echo "</table>";
              echo "<br />";
              echo "<table>";
                echo "<th>Their Items:</th>";
                //list their items
                scrapeItems($userTo, "to");
                echo "<br />";
              echo "</table>";
              echo "<br />
                    <br />
                    <input type='submit' value='Send Offer' class='btn bg-dark text-light'/>";
              echo "</div>";
              //hidden extra info for submit to use, who it's from and to
              echo "<input type='hidden' name='userTo' value='" . $userTo . "' />";
              echo "<input type='hidden' name='userFrom' value='" . $userFrom . "' />";
            echo "</form>";
          }
        }
      ?>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
