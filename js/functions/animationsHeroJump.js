////////////////////////*
/* Javascript animations for FetchQuest
/* Created by Guy Witherow
/* Last major update: 21/6/18
/* This file handles the mathmatical mapping of the hero character's jumps
*////////////////////////
function stdJumpAnimfunction(dt) {
  stdJumpAnim = true;
  if (stdJumpAnim == true) {
  //run forward
    if (animTimer == 1) {
      //make sure the player is in the right spot (the animation is reletive to starting position)
      hero.pos[0] = 100;
      hero.pos[1] = 500;
      indicator.pos[0] = 700;
      indicator.pos[1] = 300;
      changeY = hero.pos[1] - enemies[0].pos[1];
      modY = (Math.pow((changeY-400)/-0.001024,1/4)) + 25;
      modY = modY / 50;
    }
    if (animTimer <= 50) {
      //animTimeRef is the reletive time within each "chunk" of the animation.
      animTimeRef = animTimer;
      //move character relative to an equation (anti-derivative plus starting position x/y)
      //i need to try and make the equations work with the "dt" function for lateny reasons
      //will fix at some point??? we'll see
      hero.pos[0] += (-.75*(Math.pow(animTimeRef, 2) - (50 * animTimeRef))) * dt;
    }
    //wait
    else if (animTimer <= 100) {
      animTimeRef = animTimer - 50;
    }
    //jump
    else if (animTimer <= 150) {
      indicator.sprite = new Sprite("images/Misc/coins.png", [0, 0], [15, 23]);
      //most complex bit yet
      animTimeRef = animTimer - 100;
      animTimeRef = animTimeRef * modY;
      //his horizontal speed won't change
      hero.pos[0] += (100 / 50);
      //his vertical jump is mapped by a -x^3 graph
      /*
            \
             \     //moving up
      --------\__------------- //flattens as he peaks
                 \  //moves down
                  \
      */
      hero.pos[1] += 0.004096*(Math.pow(animTimeRef - 25, 3));
      //if the player hits "a" during the part where the hero bounces, bounce again
      if (animTimer <= 100 && input.isDown('A')) {
        hero.bounce = false;
      }
      else if (input.isDown('A') && hero.bounce == "unset") {
        hero.bounce = true;
      }
      if (animTimer == 150) {
        enemies[0].currentHp -= hero.jmpDmg;
      }
    }
    //bounce1
    else if (animTimer <= 200) {
      if (input.isDown('A') || hero.bounce == true) {
        //if the person presses "a" while the indicator was green, bounce again
        hero.bounce = true;
        animTimeRef = animTimer - 150;
        hero.pos[1] += .001 * (Math.pow(animTimeRef - 25, 3));
      }
      else {
        animTimer = 250;
      }
      if (animTimer == 200) {
        enemies[0].currentHp -= hero.jmpDmg;
      }
    }
  //bounce2
    else if (animTimer <= 250) {
      animTimeRef = animTimer - 200;
      hero.pos[1] += .001 * (Math.pow(animTimeRef - 25, 3));
      if (animTimer == 250) {
        enemies[0].currentHp -= hero.jmpDmg;
      }
    }
  //bounce back
    else if (animTimer <= 300) {
      //change indicator sprite
      indicator.sprite = new Sprite("images/Misc/coins.png", [15, 0], [26, 30]);
      //reset the bounce state
      hero.bounce = "unset";
      //mod the standard
      animTimeRef = animTimer - 250;
      animTimeRef = 51 - animTimeRef;
      animTimeRef = animTimeRef * modY;
      //jump function
      hero.pos[0] -= (100 / 50);
      hero.pos[1] -= 0.004096*(Math.pow(animTimeRef - 25, 3));
      if (animTimer == 300) {
        hero.pos[1] = 500;
      }
    }
  //wait
    else if (animTimer <= 350) {
      animTimeRef = animTimer - 300;
    }
  //run back
    else if (animTimer <= 400) {
      animTimeRef = animTimer - 350;
      hero.pos[0] -= (-.75*(Math.pow(animTimeRef, 2) - (50 * animTimeRef))) * dt;
    }
    else {
      hero.pos[0] = 100;
      hero.run = false;
      hero.bounce = "unset";
      hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
      stdJumpAnim = false;
    }
    animTimer++;

    if (hero.run == false) {
      hero.sprite = new Sprite('images/HeroStuff/heromain.png', [0, 0], [64, 64], 10, [0, 1], 'vertical')
      hero.run = true;
    }
    else {
      hero.run = true;
    }
  }
  if (stdJumpAnim == false) {
    hero.run = false;
    hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
    animTimer = 0;
    indicator.pos[0] = 800;
    indicator.pos[1] = 600;
    gameState = "playerSelect";
  }
  hero.shadow.pos[0] = hero.pos[0] - 3;
  hero.shadow.pos[1] = 554;
}

function playerWin() {
  gameState = "win";
}



