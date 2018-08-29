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
        //create a rows file from the trades file
        $file = new SplFileObject("data/trades.csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);
        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }

        //setting up some variables
        //printNext shows if this line is the one with the items on it
        $printNext = false;
        //offer keeps track of which line is offered items and which is asked items
        $offer = false;
        //first is used to skip the users name at the start of the offer / request
        $first = true;
        //offercount is used to construct the get links that the submit page uses to find the right offer
        $offerCount = -1;
        //for each of the records in the file
        foreach ($rows as $line) {
          //just alternates the offer var
          if ($offer == false) {
            $offer = true;
          }
          else {
            $offer = false;
          }

          //if this line is the one with the items on
          if ($printNext == true) {
            //break
            echo "<br />";
            //the first piece of data to be read will be the name, so we want to distinguish that one
            $first = true;
            //and we don't know where the items are right now
            $printNext = false;

            //for each piece on the line
            foreach ($line as $value) {
              //echo the name of the dude
              echo $value;
              //if its the first item (the name of the user offering)
              if ($first == true) {
                //add the context
                echo " WILL GIVE YOU...";
                //and this user is the user it's from (used to ID which trade's data to use)
                $userFrom = $value;
                //all the rest of the data read is item names
                $first = false;
              }
              echo "<br />";
            }
            //break between the items and the buttons
            echo "<br />";
            //creates the links to accept, modify and deny the offers, respectivly
            echo '<a href="submit.php?mode=trade&number=' . $offerCount . '&accept=yes&from=' . $userFrom . '" role="button" class="btn btn-success btn-sm">ACCEPT</a>';
            echo '<a href="submit.php?mode=trade&number=' . $offerCount . '&accept=no&from=' . $userFrom . '" role="button" class="btn btn-danger btn-sm">DENY</a>';
            echo '</div>';
            $first = true;
          }
          //if it's an offer
          if ($offer == true) {
            //and its to me
            if ($line[0] == $_SESSION['username']) {
              //tally on another offer
              $offerCount++;
              //make a new jumbotron
              echo "<div class='jumbotron black'>";
              foreach ($line as $value) {
                //overall message looks like:
                // HEY *username*. FOR YOUR:
                // thing
                // *offered by* WILL GIVE YOU:
                // thing
                // (accept)(modify)(deny)
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
        if ($offerCount == -1) {
          $_SESSION['alert'] = "no trades";
          header('Location: profile.php');
        }
      ?>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
