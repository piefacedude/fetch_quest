<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php
      session_start();
      $activePage = "profile";
      require 'snippets/links.php';
    ?>
    <meta http-equiv="Cache-control" content="no-cache">
    <meta charset="utf-8">
    <title>FetchQuest | <?php echo $_SESSION['username'] ?></title>
  </head>
  <body class="h-100">
    <?php require 'snippets/navbar.php'; ?>
    <div class="container-fluid h-75">
      <?php
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
            $dateMade = $key[3];
            $lastLoggedIn = $key[4];
          }
        }
      }
      ?>
      <div id="body" class="h-100">
        <div class="h-100 p-1 jumbotron bg-dark">
          <div class="down first">
            <div class="profilePic p-1 black"><img src="images/HeroStuff/dog_still_large.png" class="PPImage rounded mx-auto d-block"/></div>
            <div class="info p-1 black username"><h3><?php echo $username; ?></h3></div>
            <div class="info p-3 black">DATE CREATED <?php echo $dateMade; ?></div>
            <div class="info p-3 black">DATE LAST LOGGED IN <?php echo $lastLoggedIn ?> </div>
            <div class="info p-3 black mx-auto"><a href='tradingRequest.php?from=<?php echo $_SESSION['username']; ?>' role='button' class='btn btn-light btn-md p-2'>Offer a trade!</a></div>
            <div class="info p-3 black mx-auto"><a href='offers.php' role='button' class='btn btn-light btn-md p-2'>Check Offers</a></div>
          </div>
          <div class="down">
            <div class="h-25 p-1 black text-center">
              <img src="imgs/saves.jpg" class="rounded mx-auto h-75" /><br />
              <?php
                $saveDirectory = "data/saves/" . $username;
                $fi = new FilesystemIterator($saveDirectory, FilesystemIterator::SKIP_DOTS);
                printf("%d saves made", iterator_count($fi));
                $count = count(scandir($saveDirectory)) - 2;
                $saves = scandir($saveDirectory);
                $find = array(".csv");
              ?></div>
            <div class="h-75">
              <table class="w-100 h-100 table table-striped table-dark table-hover table-sm">
                <tbody>
                 <?php
                  for ($i=0; $i < 8; $i++) {
                    echo "<tr>";
                    echo "<td class='p-1 align-middle'>";
                    if (!empty($saves[$i + 2])) {
                      $file = $saves[$i + 2];
                    }
                    else {
                      $file = '';
                      $i = 9;
                    }
                    $name = str_replace($find,"",$file);

                    echo $name;
                    echo "</td>";

                    echo "<td class='align-middle'>";
                    if ($file != '') {
                      echo "<a href='game.php?toLoad=" . $file . "' role='button' class='btn btn-light btn-lg btn-block'>Load Game</a>";
                    }
                    echo "</td>";
                    echo "</tr>";
                  }
                ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <?php if ($_SESSION['alert'] == "no trades") {
        echo "<script type='text/javascript'>alert('Sorry! You have no offers right now.');</script>";
        $_SESSION['alert'] = null;
      } ?>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
