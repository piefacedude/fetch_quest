<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Cache-control" content="no-cache">
    <meta charset="utf-8">
    <title>FetchQuest Homepage</title>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P|PT+Sans|Raleway" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css?3" type="text/css">
    <link rel="icon" href="dog.ico" type="image/x-icon" />
    <?php
      $data = [];
      $error = "";
      if (isset($_POST['submit'])) {
        $data['username'] = filter_input(INPUT_POST, 'username');
        $data['password'] = filter_input(INPUT_POST, 'password');
        $data['email'] = filter_input(INPUT_POST, 'email');

        $file = new SplFileObject("users.csv", "a+");
        $file->setFlags(SplFileObject::READ_CSV|SplFileObject::SKIP_EMPTY|SplFileObject::READ_AHEAD);

        foreach ($file as $user) {
          if(strcasecmp($user[2], $data['email'])==0) {
            $error = "BROKEYEN";
            break;
          }
        }

        if (empty($error)) {
          $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
          $data['username'] = "BIG MEME";
          $data['email'] = "ASDASDDA";
          $file->fputcsv($data);
        }
      }

     ?>
  </head>
  <body>
    <div class="container-fluid">
      <?php
      include 'snippets/navbar.php';
      ?>
      <div id="body" class="pt-5">
        <form action="register.php" method="post">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="username" class="form-control" id="username" placeholder="Enter username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter password">
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email">
          </div>
          <input type="hidden" name="submit" value="YEAH">
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
