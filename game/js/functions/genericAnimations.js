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
    if (timer.runTimer >= 50) {
      genericRunTo = false;
      timer.runTimer = -1;
    }
  }
  timer.runTimer++;
}

//generic working jump function (works on all sprites but is quite slow)
function genericJumpFunction(spriteJumping, spriteJumped) {
  //make sure that the jump has not ended
  if (genericJump == true) {
    //begin the fuckery
    //on init, make some checks and store some data
    if (timer.jumpTimer == 0) {
      //the amount of time taken to get to the attacked's head
      timer.reverseTimer = 0;
      //is it time to bounce?
      bounceBack = false;
      //whats the x diff, and make sure it scales to the jumped party
      diffX = spriteJumped.pos[0] - spriteJumping.pos[0] + (spriteJumped.sprite.size[0] * spriteJumped.sprite.scale["x"] / 2);
      //whats the inital x and y, so we know where to put this boi back
      spriteJumpingInitX = spriteJumping.pos[0];
      spriteJumpingInitY = spriteJumping.pos[1];
    }
    //first part, the jump there
    //make sure that the timer is corrct, and that its not bounceback time
    if (timer.jumpTimer <= 70 && bounceBack == false) {

      //move on the x towards the bounced boi
      if (timer.jumpTimer < 35) {
        //changing x over a period of 70 ticks
        spriteJumping.pos[0] += diffX / 35;
      }

      //follow a general x^3 graph, with max height at (+600?)
      spriteJumping.pos[1] += .001066 * Math.pow(timer.jumpTimer - 35,3);

      //if the jump is past halfway, and the jumper is on the top of the jumped
      if (spriteJumping.pos[1] >= spriteJumped.pos[1] - 20 && timer.jumpTimer > 35) {
        //time to bounce
        bounceBack = true;
        //and the time it will take to jump back, is equal to the time it took the character to jump there.
        timer.reverseTimer = timer.jumpTimer;

      }
    }
    if (timer.jumpTimer <= 70 && bounceBack == true) {

    }
    if (timer.jumpTimer > 70 && timer.jumpTimer < 70 + timer.reverseTimer) {
      spriteJumping.pos[1] -= .001066 * Math.pow((timer.reverseTimer - 35) - (timer.jumpTimer - 70),3);
      if (spriteJumping.sprite.facing != -2 * Math.PI) {
        spriteJumping.sprite.facing += (-20 * Math.PI) / (timer.reverseTimer);
      }
      spriteJumping.pos[0] -= diffX / timer.reverseTimer;
    }
    if (timer.jumpTimer >= 70 + timer.reverseTimer) {
      genericJump = false;
      timer.jumpTimer = -1;
      spriteJumping.pos[0] = spriteJumpingInitX;
      spriteJumping.pos[1] = spriteJumpingInitY;
      spriteJumping.sprite.facing = 0;
    }
    timer.jumpTimer++;
    console.log(timer.jumpTimer);
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




