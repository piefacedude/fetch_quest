////////////////////////*
/* Javascript animations for FetchQuest
/* Created by Guy Witherow
/* Last major update: 21/6/18
/* This file handles the mathmatical mapping of the some generic animations
*////////////////////////
function genericJumpFunction(spriteJumping, spriteJumped) {
  spriteJumping.jump = true;
  if (spriteJumping.jump == true) {
  //run forward
    if (animTimer == 1) {
      console.log(spriteJumping.pos[1]);
      console.log(spriteJumped.pos[1]);
      changeY = spriteJumping.pos[1] - spriteJumped.pos[1];
      modY = (Math.pow((changeY-400)/-0.001024,1/4)) + 25;
      modY = modY / 50;
      changeX = spriteJumping.pos[0] - spriteJumped.pos[0];
    }
    //jump
    else if (animTimer <= 150) {
      //most complex bit yet
      animTimeRef = animTimer - 100;
      animTimeRef = animTimeRef * modY;
      //his horizontal speed won't change
      spriteJumping.pos[0] += (100 / 50);
      //his vertical jump is mapped by a -x^3 graph
      spriteJumping.pos[1] += 0.004096*(Math.pow(animTimeRef - 25, 3));
      if (animTimer == 150) {
        spriteJumped.currentHp -= spriteJumping.jmpDmg;
      }
    }
    //bounce back
    else if (animTimer <= 300) {
      //mod the standard
      animTimeRef = animTimer - 250;
      animTimeRef = 51 - animTimeRef;
      animTimeRef = animTimeRef * modY;
      //jump function
      spriteJumping.pos[0] -= (100 / 50);
      spriteJumping.pos[1] -= 0.004096*(Math.pow(animTimeRef - 25, 3));
      if (animTimer == 300) {
        spriteJumping.pos[1] = 500;
      }
    }
    else {
      spriteJumping.pos[0] = 100;
      spriteJumping.run = false;
      spriteJumping.bounce = "unset";
      spriteJumping.sprite = new Sprite('images/spriteJumpingStuff/spriteJumpingStand.png', [0, 0], [64, 64]);
      spriteJumping.jump = false;
    }
    animTimer++;

    if (spriteJumping.run == false) {
      spriteJumping.sprite = new Sprite('images/spriteJumpingStuff/spriteJumpingmain.png', [0, 0], [64, 64], 10, [0, 1], 'vertical')
      spriteJumping.run = true;
    }
    else {
      spriteJumping.run = true;
    }
  }
  if (spriteJumping.jump == false) {
    spriteJumping.run = false;
    spriteJumping.sprite = new Sprite('images/spriteJumpingStuff/spriteJumpingStand.png', [0, 0], [64, 64]);
    animTimer = 0;
    indicator.pos[0] = 800;
    indicator.pos[1] = 600;
    gameState = "playerSelect";
  }
  spriteJumping.shadow.pos[0] = spriteJumping.pos[0] - 3;
  spriteJumping.shadow.pos[1] = 554;
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




