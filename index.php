<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>FetchQuest Home</title>
    <?php
      session_start();
      include 'snippets/links.php';
    ?>
    <link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/component.css" />
		<script src="js/modernizr.custom.js"></script>
  </head>
  <body>
    <?php
    $activePage = "index";
    include 'snippets/navbar.php';
    include 'snippets/featureImage.php';
    $_SESSION['error'] = false;
    ?>
    <div id="cbp-fbscroller" class="cbp-fbscroller">
      <nav>
        <a href="#fbsection1" class="cbp-fbcurrent">Section 1</a>
        <a href="#fbsection2">Section 2</a>
        <a href="#fbsection3">Section 3</a>
      </nav>
      <section id="fbsection1">
          <div class="content p-5">
            <br />
            <h1>A dog's game.</h1>
            <br />
            <img class="float-left pr-3" src="images/HeroStuff/dog_still_large.png"/>
            <br />
            <br />
            <p class="float-left text-light">
              FetchQuest is simply a game about you - a dog - and your owner.
            </p>
            <br />
            <br />
            <p>
              When your owner is taken from you by a mysterious man, what will you do to get your owner back home?
            </p>
            <br />
            <p>
              And how can you know until you try?
            </p>
          </div>
      </section>
      <section id="fbsection2">
        <div class="content p-5 bg-dark text-right">
          <br />
          <br />
          <h1>A whole new world.</h1>
          <br />
          <img class="float-right pl-3" src="images/Obstacles/GangsterObstacle.png"/>
          <br />
          <p class="float-right text-light">
            Chase the growing threat through an increasingly hostile and unfamiliar world.
          </p>
          <br />
          <br />
          <p>
            Uncover more of the mystery, by gathering clues with your eyes and nose.
          </p>
          <br />
          <p>
            Discover where you need to go, and a whole lot more on the way.
          </p>
        </div>
      </section>
      <section id="fbsection3">
        <div class="content p-5">
          <br />
          <br />
          <h1>An amazing adventure.</h1>
          <br />
          <img class="float-left pr-3" src="images/Goodies/goldBricks.png"/>
          <br />
          <p class="float-left text-light">
            Gain abilites that a dog could never dream of.
          </p>
          <br />
          <br />
          <p>
            Collect items to increase your abilites, and aid you in battle.
          </p>
          <br />
          <p>
            Become strong enough to beat the bad guys!
          </p>
        </div>
      </section>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <!-- jquery.easing by http://gsgd.co.uk/ : http://gsgd.co.uk/sandbox/jquery/easing/ -->
    <script src="js/jquery.easing.min.js"></script>
    <!-- waypoints jQuery plugin by http://imakewebthings.com/ : http://imakewebthings.com/jquery-waypoints/ -->
    <script src="js/waypoints.min.js"></script>
    <!-- jquery-smartresize by @louis_remi : https://github.com/louisremi/jquery-smartresize -->
    <script src="js/jquery.debouncedresize.js"></script>
    <script src="js/cbpFixedScrollLayout.min.js"></script>
    <script>
      $(function() {
        cbpFixedScrollLayout.init();
      });
    </script>
    <?php
    if (!empty($_SESSION['alert'])) {
      if ($_SESSION['alert'] == "username") {
        //if the user just logged in, tell them with an alert
        echo "<script type='text/javascript'>alert('Success! Logged in as " . $_SESSION['username'] . "');</script>";
        $_SESSION['alert'] = null;
      }
    }
     ?>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>