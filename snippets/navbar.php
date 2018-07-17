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
<div>

</div>
<div class="sticky-top top-nav">
  <ul>
    <li>
      <div class="title">
        <div class="titleHolder featureText">
          FetchQuest
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
        <li class=<?php makeLinkActive("signup");?>>
          <a class="nav-link" href="register.php">Sign Up<?php echo $pageReader?></a>
        </li>
        <li class=<?php makeLinkActive("login");?>>
          <a class="nav-link" href="login.php">Sign In<?php echo $pageReader?></a>
        </li>
      </ul>
    </li>
  </ul>
</div>