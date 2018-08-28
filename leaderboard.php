<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Cache-control" content="no-cache">
    <meta charset="utf-8">
    <title>FetchQuest Leaderboard</title>
    <?php
    session_start();
     require 'snippets/links.php';
     ?>
  </head>
  <body>
    <div class="container-fluid">
      <?php
      $activePage = "leaderboard";
      require 'snippets/navbar.php';
      ?>
      <div id="body" class="pt-5">
        <img src="imgs/leaderboard.png" alt="Cave Background Feature Image" style="width:50%; margin-left:25%">
        <div class="content">
          <?php
          //create an array called $rows from the leaderboard file
          $file = new SplFileObject("data/leaderboard.csv");
          $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
          $rows = [];
          while(!$file->eof()) {
            $rows[] = $file->fgetcsv();
          }

          //linear sort by g witherow
          //start with assumed failure
          $sorted = false;
          while ($sorted == false) {
            //if no number is out of place, sorting is done
            $sorted = true;
            //run through the list
            for ($i=0; $i < count($rows) - 1; $i++) {
              //if the before value is lower than the after, swap em
              if ($rows[$i][1] < $rows[$i + 1][1]) {
                $temp = $rows[$i + 1];
                $rows[$i + 1] = $rows[$i];
                $rows[$i] = $temp;
                //and tell the program more sorting needs to happen
                $sorted = false;
              }
            }
          }

          //header of table
          echo "<table class='w-100 table' border='1'>";
          echo "<tr>
                <td><b>Rank</b></td>
                <td><b>Username</b></td>
                <td><b>Score</b></td>
                </tr>";
          //for number of records
          for ($i=0; $i <= count($rows) - 1; $i++) {
            echo "<tr>";
            //for number of items in row
            for ($j=0; $j < 3; $j++) {
              //make a table data
              echo "<td>";
              //as the first run echos the position, everything is offset
              //leaderboard file follows (name, score)
              //so ref is used to find the data we need
              $ref = $j - 1;
              //echoing position on leaderboard
              if ($j == 0) {
                echo $i + 1;
              }
              //echos the username
              elseif ($j == 1) {
                echo $rows[$i][$ref];
              }
              //echos the score
              else {
                //rounding for safety
                echo round($rows[$i][$ref],2);
              }
              //end item
              echo"</td>";
            }
            //end record
            echo "</tr>";
          }
          //end table
          echo "</table>";
          ?>

        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
