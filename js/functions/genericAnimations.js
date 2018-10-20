////////////////////////*
/* Javascript animations for FetchQuest
/* Created by Guy Witherow
/* Last major update: 21/6/18
/* This file handles the mathmatical mapping of the some generic animations
*////////////////////////
function genericRunToFunction(spriteRunning, spriteTarget, percent) {
  if (genericRunTo == true) {
    //walk
    if (animTimer == 0) {
      distanceMod = (spriteRunning.pos[0] - spriteTarget.pos[0]) / (62500 / 3);
    }

    if (animTimer <= 50) {
      spriteRunning.pos[0] -= percent * (distanceMod * (-1 * animTimer) * (animTimer - 50));
    }
    if (animTimer > 50) {
      genericRunTo = false;
      animTimer = -1;
    }
  }
  animTimer++;
}

function genericJumpFunction(spriteJumping, spriteJumped, percent) {
  if (genericJump == true) {
    if (animTimer == 0) {
      reverseTimer = 0;
      bounceBack = false;
      diffX = spriteJumped.pos[0] - spriteJumping.pos[0] + (spriteJumped.sprite.size[0] / 2);
      spriteJumpingInitX = spriteJumping.pos[0];
      spriteJumpingInitY = spriteJumping.pos[1];
    }
    if (animTimer <= 200 && bounceBack == false) {
      if (animTimer < 100) {
        spriteJumping.pos[0] += diffX / 100;
      }
      spriteJumping.pos[1] += .000016 * Math.pow(animTimer - 100,3);
      if (spriteJumping.pos[1] >= spriteJumped.pos[1] && animTimer > 100) {
        bounceBack = true;
        reverseTimer = animTimer;
      }
    }
    if (animTimer <= 200 && bounceBack == true) {

    }
    if (animTimer > 200 && animTimer < 200 + reverseTimer) {
      spriteJumping.pos[1] -= .000016 * Math.pow((reverseTimer - 100) - (animTimer - 200),3);
      if (spriteJumping.sprite.facing != -2 * Math.PI) {
        spriteJumping.sprite.facing += (-2 * Math.PI) / reverseTimer;
      }
      spriteJumping.pos[0] -= diffX / reverseTimer;
    }
    if (animTimer >= 200 + reverseTimer) {
      genericJump = false;
      animTimer = -1;
      spriteJumping.pos[0] = spriteJumpingInitX;
      spriteJumping.pos[1] = spriteJumpingInitY;
      spriteJumping.sprite.facing = 0;
    }
    animTimer++;
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




