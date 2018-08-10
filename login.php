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
      <div class="d-flex align-items-center flex-column justify-content-center w-100 h-100 text-white" id="header">
        <h1>Hey.</h1>
        <br>
        <form>
          <div class="form-group">
            <input class="form-control form-control-lg" placeholder="Email" type="text">
          </div>
          <div class="form-group">
            <input class="form-control form-control-lg" placeholder="Password" type="text">
          </div>
          <div class="form-group">
            <button class="btn btn-info btn-lg btn-block">Sign In</button>
          </div>
        </form>
        <p>
          <a href="index.php">Don't have an account?</a>
        </p>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
