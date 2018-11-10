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
