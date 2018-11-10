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
    <!-- simple jumbotron used to make request to create a trade offer -->
    <div class="jumbotron">
      <h2>Who do you want to trade with?</h2>
      <p class="black">
        <?php if (!empty($_SESSION['error'])) {
          echo $_SESSION['error'];
        };?>
      </p>
      <br />
      <!-- trading form -->
      <form method="post" action="trading.php">
        <input type="text" name="offerTo"/>
        <br />
        <br />
        <input type="submit" class="btn bg-dark text-light" />
      </form>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
