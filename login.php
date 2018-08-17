<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Cache-control" content="no-cache">
    <meta charset="utf-8">
    <title>FetchQuest Homepage</title>
    <?php
     require 'snippets/links.php';
     session_start();
     $activePage = "login";
     ?>
     <style>
     body,html {
       height: 100%;
     }
     </style>
  </head>
  <body class="h-100">
    <div class="container-fluid h-75 w-100 text-center">
      <?php
      include 'snippets/navbar.php';
      ?>
      <div class="modal" id="login">
        <h1 class="login">Hey.</h1>
        <br>
        <form class="login">
          <input type="hidden" name="mode" value="login" />
          <div class="form-group">
            <input class="form-control form-control-lg" placeholder="Username" type="text">
          </div>
          <div class="form-group">
            <input class="form-control form-control-lg" placeholder="Password" type="text">
          </div>
          <div class="form-group">
            <button class="btn btn-info btn-lg btn-block">Sign In</button>
          </div>
        </form>
        <p>
          <a href="#" class="login" id="l2r">Don't have an account?</a>
        </p>
      </div>
      <div class="modal" id="register">
        <h1 class="register">PLAY GAME</h1>
        <br>
        <form action="submit.php" method="post" class="register" style="display: none;">
          <input type="hidden" name="mode" value="register" />
          <div class="form-group">
            <input class="form-control form-control-lg" placeholder="Username" type="text">
          </div>
          <div class="form-group">
            <input class="form-control form-control-lg" placeholder="Email" type="email">
          </div>
          <div class="form-group">
            <input class="form-control form-control-lg" placeholder="Password" type="password">
          </div>
          <div class="form-group">
            <button class="btn btn-info btn-lg btn-block">Sign In</button>
          </div>
        </form>
        <p>
          <a class="register" id="r2l" style="display: none;">Don't have an account?</a>
        </p>
      </div>
    </div>


    <script
  src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="js/loginSwitch.js" type="text/javascript"></script>
  </body>
</html>
