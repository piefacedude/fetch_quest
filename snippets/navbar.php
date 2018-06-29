<?php
function makeLinkActive($page) {
  global $pageReader, $activePage;
  if ($activePage == $page) {
    $pageReader = "<span class='sr-only'>(current)</span>";
    echo "'nav-item active'";
  }
  else {
      $pageReader = " ";
      echo "nav-item";
  }
}
 ?>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <img src="imgs/dog.ico" class="navbar-brand pr-3">
  <a class="navbar-brand" href="#"><h1 class="feature-text">FetchQuest</h1></a>
  <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="navbar-collapse collapse" id="navbarColor01" style="">
    <ul class="navbar-nav mr-auto">
      <li class=<?php makeLinkActive("home");?> >
        <a class="nav-link" href="#">Home<?php echo $pageReader?></a>
      </li>
      <li class=<?php makeLinkActive("leaderboard");?>>
        <a class="nav-link" href="leaderboard.php">Leaderboard<?php echo $pageReader?></a>
      </li>
      <li class=<?php makeLinkActive("signup");?>>
        <a class="nav-link" href="signup.php">Sign Up<?php echo $pageReader?></a>
      </li>
      <li class=<?php makeLinkActive("login");?>>
        <a class="nav-link" href="login.php">Sign In<?php echo $pageReader?></a>
      </li>
    </ul>
  </div>
</nav>