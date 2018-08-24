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
      $activePage = "profile";
      require 'snippets/navbar.php';
      if (empty($_SESSION['username'])) {
        header('Location: login.php');
      }
      else {
        //load users file for reading
        $file = new SplFileObject("data/users.csv");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

        //transfer user data into array to be read
        $rows = [];
        while(!$file->eof()) {
          $rows[] = $file->fgetcsv();
        }

        foreach ($rows as $key) {
          if ($key[0] == $_SESSION['username']) {
            $username = $key[0];
          }
        }
      }
      ?>
      <div id="body" class="pt-5" style="height: 1000px;">
        <div class="buffer"></div>
        <div class="across">
          <div class="down">
            <div class="profilePic"><img src="images/HeroStuff/dog_still_large.png" /></div>
            <div class="h-25">DATE CREATED</div>
            <div class="h-25">
              <?php
              $saveDirectory = "data/saves/" . $username;
              $fi = new FilesystemIterator($saveDirectory, FilesystemIterator::SKIP_DOTS);
              printf("%d saves made", iterator_count($fi));
              $count = count(scandir($saveDirectory)) - 2;
              $saves = scandir($saveDirectory);
              $find = array(".csv");
              ?>
            </div>
          </div>
          <div class="down">
            <div class="infoTop">Username: <?php echo $username; ?></div>
            <div class="info">SCORE</div>
            <div class="info">DATE LAST LOGGED IN</div>
            <div class="info">TRADE LINK</div>
          </div>
          <div class="down">
            <div class="saves h-25">SAVES</div>
            <div class="savesTable h-75">
              <table class="w-100 h-75 saves">
                 <?php
                  for ($i=0; $i < $count; $i++) {
                    echo "<tr>";
                    echo "<td>";
                    $name = $saves[$i + 2];
                    $name = str_replace($find,"",$name);
                    echo $name;
                    echo "</td>";
                    echo "</tr>";
                  }

                ?>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>