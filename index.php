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
		<link rel="stylesheet" type="text/css" href="css/default.css" />
		<link rel="stylesheet" type="text/css" href="css/component.css" />
		<script src="js/modernizr.custom.js"></script>
  </head>
  <body>
    <?php
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
          <div class="content">
            <h1>YEET</h1>
          </div>
      </section>
      <section id="fbsection2"></section>
      <section id="fbsection3"></section>
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
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>