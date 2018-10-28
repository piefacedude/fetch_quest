////////////////////////*
/* Javascript animations for FetchQuest
/* Created by Guy Witherow
/* Last major update: 21/6/18
/* This file handles the mathmatical mapping of the some generic animations
*////////////////////////
function genericRunToFunction(spriteRunning, spriteTarget, percent) {
  if (genericRunTo == true) {
    //walk
    if (timer.runTimer == 0) {
      distanceMod = (spriteRunning.pos[0] - spriteTarget.pos[0]) / (62500 / 3);
    }

    if (timer.runTimer < 50) {
      spriteRunning.pos[0] -= percent * (distanceMod * (-1 * timer.runTimer) * (timer.runTimer - 50));
    }
    if (timer.runTimer == 50) {
      genericRunTo = false;
      timer.runTimer = -1;
    }
  }
  timer.runTimer++;
}

function genericJumpFunction(spriteJumping, spriteJumped) {
  if (genericJump == true) {
    if (timer.jumpTimer == 0) {
      timer.reverseTimer = 0;
      bounceBack = false;
      diffX = spriteJumped.pos[0] - spriteJumping.pos[0] + (spriteJumped.sprite.size[0] * spriteJumped.sprite.scale["x"] / 2);
      spriteJumpingInitX = spriteJumping.pos[0];
      spriteJumpingInitY = spriteJumping.pos[1];
    }
    if (timer.jumpTimer <= 200 && bounceBack == false) {
      if (timer.jumpTimer < 100) {
        spriteJumping.pos[0] += diffX / 100;
      }
      spriteJumping.pos[1] += .000016 * Math.pow(timer.jumpTimer - 100,3);
      if (spriteJumping.pos[1] >= spriteJumped.pos[1] && timer.jumpTimer > 100) {
        bounceBack = true;
        timer.reverseTimer = timer.jumpTimer;
      }
    }
    if (timer.jumpTimer <= 200 && bounceBack == true) {

    }
    if (timer.jumpTimer > 200 && timer.jumpTimer < 200 + timer.reverseTimer) {
      spriteJumping.pos[1] -= .000016 * Math.pow((timer.reverseTimer - 100) - (timer.jumpTimer - 200),3);
      if (spriteJumping.sprite.facing != -2 * Math.PI) {
        spriteJumping.sprite.facing += (-2 * Math.PI) / timer.reverseTimer;
      }
      spriteJumping.pos[0] -= diffX / timer.reverseTimer;
    }
    if (timer.jumpTimer >= 200 + timer.reverseTimer) {
      genericJump = false;
      timer.jumpTimer = -1;
      spriteJumping.pos[0] = spriteJumpingInitX;
      spriteJumping.pos[1] = spriteJumpingInitY;
      spriteJumping.sprite.facing = 0;
    }
    timer.jumpTimer++;
  }
}


function ParticleGenerator(x, y, particleImage, particleNumber, particleMaxLife, particleMinLife, particleGravity, particleGroundY, srcImage, srcGravity, srcGroundY) {
  this.x = x;
  this.y = y;
  this.number = particleNumber;
  this.srcImage = srcImage;
  this.sprite = new Sprite("images/Misc/coins.png", [16, 0], [16, 23]);
  this.gravity = srcGravity;
  this.ground = srcGroundY;
  this.particles = this.particles || [];

  this.draw = function() {
    renderEntity(this);
  }

  this.update = function() {
    while (this.particles.length < this.number) {
      this.particles.push(
        new Particle("this.x, this.y, particleImage, particleMaxLife, particleMinLife, particleGravity, particleGroundY;")
      )
    }

    this.x += this.dx;
    if (this.y > this.ground) {
      this.y += this.dy;
      this.dy += this.gravity;
    }
    else {
      this.y = this.ground;
    }

  this.draw()
  }
}


function Particle(x, y, image, maxLife, minLife, gravity, groundY) {
  this.x = x;
  this.y = y;
  this.sprite = new Sprite("images/Misc/coins.png", [16, 0], [16, 23]);
  this.maxLife = maxLife;
  this.minLife = minLife;
  this.gravity = gravity;
  this.groundY = groundY;

  this.draw = function() {
    renderEntity(this);
  }

  this.update = function() {

  this.draw()
  }
}




