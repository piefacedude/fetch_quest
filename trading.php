<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Cache-control" content="no-cache">
    <meta charset="utf-8">
    <title>FetchQuest Leaderboard</title>
    <?php
      session_start();
      require 'snippets/links.php';

      function scrapeItems($user, $dir) {
        $file = new SplFileObject("data/characters/" . $user . ".csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

        //transfer user data into array to be read
        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }


        $next = false;
        foreach ($rows as $line) {
          if($line[0] == "Items:") {
            $next = true;
          }
          else if ($next == true) {
            $next = false;
            $count = 0;
            foreach ($line as $value) {
              echo "<tr>";
              echo "<td>";
              echo $value;
              echo "</td>";
              echo "<td>";
              echo "<input type='checkbox' name='" . $dir . "[]' value='" . $value . "'/>";
              echo "</td>";
              echo "</tr>";
              $count++;
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
        if (empty($_SESSION['username'])) {
          header('Location: login.php');
        }
        else {
          $userTo = $_POST['offerTo'];
          $userFrom = $_SESSION['username'];
          if ($userTo == $userFrom) {
            $_SESSION['error'] = "Can't trade with yourself!";
            header('Location: tradingRequest.php');
          }

          if (!file_exists("data/characters/" . $userTo . ".csv")) {
            $_SESSION['error'] = "username not found";
            header('Location: tradingRequest.php');
          }
          else {
            echo "<form action='submit.php?mode=tradeOffer' method='post'>";
            echo "<div class='jumbotron black'>";

            echo "<table>";
            echo "<th>
            FROM:
            </th>";
            scrapeItems($userFrom, "from");

            echo "</table>";
            echo "<br />";
            echo "<table>";
            echo "<th>
            TO:
            </th>";
            scrapeItems($userTo, "to");
            echo "<tr><td></td></tr>";
            echo "<tr><td>";
            echo "<input type='submit' value='Send Offer'/>";
            echo "</td></tr>";

            echo "</table>";

            echo "</div>";
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
