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
    <div class="jumbotron black">
      <?php
        $file = new SplFileObject("data/trades.csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }
        $printNext = false;
        $offer = false;
        foreach ($rows as $line) {
          if ($offer == false) {
            $offer = true;
          }
          else {
            $offer = false;
          }
          if ($offer == true) {
            if ($line[0] == $_SESSION['username']) {
              foreach ($line as $value) {
                echo $value;
              }
              $printNext = true;
            }
          }
          if ($printNext == true) {
            $printNext = false;
            print_r($line);
          }
        }
      ?>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>