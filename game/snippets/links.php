<link href="https://fonts.googleapis.com/css?family=Press+Start+2P|PT+Sans|Raleway" rel="stylesheet">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
<link rel="stylesheet" href="css/homepageStyle.css" type="text/css">
<?php
if (empty($_SESSION['username'])) {
  echo '<link rel="stylesheet" href="css/slidingNav.css" type="text/css">';
}
else {
  echo '<link rel="stylesheet" href="css/slidingNavUser.css" type="text/css">';
}
?>

<link rel="icon" href="imgs/dog.ico" type="image/x-icon" />
<!-- <meta http-equiv="refresh" content="3" > -->