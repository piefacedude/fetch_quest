<div class="feature-image">
  <img src="imgs/2.jpg" alt="Cave Background Feature Image">
  <div class="centered jumbotron">
    <h1><?php echo $_SESSION['username']; ?></h1>
    <br />
    <?php if (!empty($_SESSION['username'])) {
      echo '<a href="game.php" role="button" class="btn btn-light btn-lg btn-block">PLAY NOW!</a>';
    }
    else {
      echo '<a href="login.php" role="button" class="btn btn-light btn-lg btn-block">SIGN UP!</a>';
    }

     ?>

  </div>
</div>