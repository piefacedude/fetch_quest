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
    <div class="container-fluid h-100">
    <?php require 'snippets/navbar.php'; ?>
      <?php
        $file = new SplFileObject("data/trades.csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }
        $printNext = false;
        $offer = false;
        $first = true;
        $offerCount = -1;
        foreach ($rows as $line) {
          if ($offer == false) {
            $offer = true;
          }
          else {
            $offer = false;
          }
          if ($printNext == true) {
            echo "<br />";
            $first = true;
            $printNext = false;
            foreach ($line as $value) {
              echo $value;
              if ($first == true) {
                echo " WILL GIVE YOU...";
                $userFrom = $value;
                $first = false;
              }
              echo "<br />";
            }
            echo "<br />";
            echo '<a href="submit.php?mode=trade&number=' . $offerCount . '&accept=yes&from=' . $userFrom . '" role="button" class="btn btn-success btn-sm">ACCEPT</a>';
            echo '<a href="trading.php?number=' . $offerCount . '&from=' . $userFrom . '" role="button" class="btn btn-secondary btn-sm">MODIFY</a>';
            echo '<a href="submit.php?mode=trade&number=' . $offerCount . '&accept=no&from=' . $userFrom . '" role="button" class="btn btn-danger btn-sm">DENY</a>';
            echo '</div>';
            $first = true;
          }
          if ($offer == true) {
            if ($line[0] == $_SESSION['username']) {
              $offerCount++;
              echo "<div class='jumbotron black'>";
              foreach ($line as $value) {
                if ($first == true) {
                  echo "HEY ";
                }
                echo $value;
                if ($first == true) {
                  echo ". FOR YOUR:";
                  $first = false;
                }
                echo "<br />";
              }
              $printNext = true;
            }
          }
        }
      ?>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
