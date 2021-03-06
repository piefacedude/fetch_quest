<?php
function makeLinkActive($page) {
  global $pageReader, $activePage;
  if ($activePage == $page) {
    $pageReader = "<span class='sr-only'>(current)</span>";
    echo "'Nav-item is-active'";
  }
  else {
      $pageReader = " ";
      echo "Nav-item";
  }
}
 ?>
<div class="sticky-top top-nav">
  <ul>
    <li>
      <div class="title h-100">
        <div class="title-holder feature-text">
          <a href="index.php">FetchQuest</a>
        </div>
      </div>
    </li>
    <li>
      <ul class="primaryNav with-indicator">
        <li class=<?php makeLinkActive("home");?> >
          <a class="nav-link" href="index.php">Home<?php echo $pageReader?></a>
        </li>
        <li class=<?php makeLinkActive("leaderboard");?>>
          <a class="nav-link" href="leaderboard.php">Leaderboard<?php echo $pageReader?></a>
        </li>
        <?php
        if (!empty($_SESSION['username'])) {
          echo '<li class=';
          echo makeLinkActive("play");
          echo '><a class="nav-link" href="game.php">Play' . $pageReader . '</a></li>';
          echo '<li class=';
          echo makeLinkActive("profile");
          echo '><a class="nav-link" href="profile.php">Profile' . $pageReader . '</a></li>';
          echo '<li class=';
          echo makeLinkActive("logOut");
          echo '><a class="nav-link" href="login.php">Log Out' . $pageReader . '</a></li>';
        }
        else {
          echo '<li class=';
          echo makeLinkActive("login");
          echo '><a class="nav-link" href="login.php">Log In and Play!' . $pageReader . '</a></li>';
        }
         ?>
      </ul>
    </li>
  </ul>
</div>