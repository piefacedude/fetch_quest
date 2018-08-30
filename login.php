<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Cache-control" content="no-cache">
    <meta charset="utf-8">
    <title>FetchQuest Homepage</title>
    <?php
     session_start();
     //login page acts as both log in, and out.
     //as such, logged in users see the link to the login page as "log out"
     //so if they're logged in, log them out
     if (!empty($_SESSION['username'])) {
       unset($_SESSION['username']);
     }
     require 'snippets/links.php';
     $activePage = "login";
     ?>
  </head>
  <body class="h-100">
    <div class="container-fluid h-75">
      <div id="body" class="h-100">
      <?php
      include 'snippets/navbar.php';
      ?>
      <div class="jumbotron" id="login">
        <h2 class="login">Log In.</h2>
        <br>
        <form action="submit.php" method="post" class="login">
          <input type="hidden" name="mode" value="login" />
          <div class="form-group">
            <input name="username" required class="form-control form-control-lg" placeholder="Username" type="text">
          </div>
          <div class="form-group">
            <input name="password" required class="form-control form-control-lg" placeholder="Password" type="text">
          </div>
          <div class="form-group">
            <button class="btn btn-info btn-lg btn-block">Log In</button>
          </div>
        </form>
      </div>
      <div class="jumbotron" id="register">
        <h2 class="register">Register</h2>
        <br>
        <form action="submit.php?mode=login" method="post" class="register">
          <input type="hidden" name="mode" value="register" />
          <div class="form-group">
            <input name="username" required class="form-control form-control-lg" placeholder="Username" type="text">
          </div>
          <div class="form-group">
            <input name="email" required class="form-control form-control-lg" placeholder="Email" type="email">
          </div>
          <div class="form-group">
            <input name="password" required class="form-control form-control-lg" placeholder="Password" type="password">
          </div>
          <div class="form-group">
            <button class="btn btn-info btn-lg btn-block">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>

    <?php
    if (!empty($_SESSION['alert'])) {
      if ($_SESSION['alert'] == "unpw") {
        //if the user just logged in, tell them with an alert
        echo "<script type='text/javascript'>alert('Error! Username or Password is incorrect!');</script>";
        $_SESSION['alert'] = null;
        $_SESSION['error'] = false;
      }
      elseif ($_SESSION['alert'] == "nametaken") {
        //if the user just logged in, tell them with an alert
        echo "<script type='text/javascript'>alert('Error! Username is taken. Try a different one.');</script>";
        $_SESSION['alert'] = null;
        $_SESSION['error'] = false;
      }
    }
     ?>

    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="js/loginSwitch.js" type="text/javascript"></script>
  </body>
</html>
