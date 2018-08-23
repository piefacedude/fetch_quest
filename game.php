<html>
  <head>
    <title>Fetch Quest - A dog's game</title>
    <link href="css/gameStyle.css?1" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans" rel="stylesheet">
    <!--Font does not work offline-->
    <link rel="icon" href="imgs/dog.ico" type="image/x-icon" />

  </head>
  <body>
    <?php
      if (!empty($_SESSION['username'])) {
        header('Location: login.php');
      }
    ?>
    <div id="container">
      <!-- game canvas container -->
      <div id="game">
          <canvas id="game_canvas" width="800" height="600">
          </canvas>
      </div>

      <div id="stats">
        <a href="index.php">homepage</a>
      </div>

      <!-- profile link -->
      <div id="profile">
        <a href="profile.php">profile</a>
      </div>

      <!-- sounds for game -->
      <div id="sounds">
          <!-- <audio id="DesertThemeMusic" preload="auto">
              <source src="audio/desertMusic.mp3" type="audio/mp3">
          </audio> -->
      </div>

      <!-- links for javascript -->
      <!-- engine links -->
      <script src="js/engine/resources.js"></script>
      <script src="js/engine/input.js"></script>
      <script src="js/engine/sprite.js"></script>
      <script src="js/engine/gameUtils.js"></script>
      <script src="js/engine/webAudio.js"></script>
      <!-- animations -->
      <script src="js/functions/animationsHeroJump.js"></script>
      <script src="js/functions/genericAnimations.js"></script>
      <script src="js/functions/animationsHeroBite.js"></script>
      <script src="js/functions/animationsEnemy.js"></script>
      <!-- functionality -->
      <script src="js/functions/statePlayerSelect.js"></script>
      <script src="js/functions/uiFunctions.js"></script>
      <script src="js/functions/battleFunctions.js"></script>
      <!-- game must be loaded last, otherwise it has reference errors -->
      <script src="js/game.js"></script>
    </div>
  </body>
</html>
