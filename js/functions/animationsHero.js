////////////////////////*
/* Javascript animations for FetchQuest
/* Created by Guy Witherow
/* Last major update: 21/6/18
/* This file handles the mathmatical mapping of the hero character
*////////////////////////
function stdJumpAnimfunction(dt) {
  stdJumpAnim = true;
  if (stdJumpAnim == true) {
  //run forward
    if (stdJumpAnimTimer == 1) {
      //make sure the player is in the right spot (the animation is reletive to starting position)
      hero.pos[0] = 100;
      hero.pos[1] = 500;
      indicator.pos[0] = 700;
      indicator.pos[1] = 300;
      changeY = hero.pos[1] - enemies[0].pos[1];
      modY = (Math.pow((changeY-400)/-0.001024,1/4)) + 25;
      modY = modY / 50;
    }
    if (stdJumpAnimTimer <= 50) {
      //stdJumpAnimTimeRef is the reletive time within each "chunk" of the animation.
      stdJumpAnimTimeRef = stdJumpAnimTimer;
      //move character relative to an equation (anti-derivative plus starting position x/y)
      //i need to try and make the equations work with the "dt" function for lateny reasons
      //will fix at some point??? we'll see
      hero.pos[0] += (-.75*(Math.pow(stdJumpAnimTimeRef, 2) - (50 * stdJumpAnimTimeRef))) * dt;
    }
    //wait
    else if (stdJumpAnimTimer <= 100) {
      stdJumpAnimTimeRef = stdJumpAnimTimer - 50;
    }
    //jump
    else if (stdJumpAnimTimer <= 150) {
      indicator.sprite = new Sprite("images/Misc/coin_red.png", [0, 0], [26, 30]);
      //most complex bit yet
      stdJumpAnimTimeRef = stdJumpAnimTimer - 100;
      stdJumpAnimTimeRef = stdJumpAnimTimeRef * modY;
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
      hero.pos[1] += 0.004096*(Math.pow(stdJumpAnimTimeRef - 25, 3));
      //if the player hits "a" during the part where the hero bounces, bounce again
      if (stdJumpAnimTimer <= 100 && input.isDown('A')) {
        hero.bounce = false;
      }
      else if (input.isDown('A') && hero.bounce == "unset") {
        hero.bounce = true;
      }
      if (stdJumpAnimTimer == 150) {
        enemies[0].currentHp -= hero.jmpDmg;
      }
    }
    //bounce1
    else if (stdJumpAnimTimer <= 200) {
      if (input.isDown('A') || hero.bounce == true) {
        hero.bounce = true;
        stdJumpAnimTimeRef = stdJumpAnimTimer - 150;
        hero.pos[1] += .001 * (Math.pow(stdJumpAnimTimeRef - 25, 3));
      }
      else {
        stdJumpAnimTimer = 250;
      }
    }
  //bounce2
    else if (stdJumpAnimTimer <= 250) {
      stdJumpAnimTimeRef = stdJumpAnimTimer - 200;
      hero.pos[1] += .001 * (Math.pow(stdJumpAnimTimeRef - 25, 3));
    }
  //bounce back
    else if (stdJumpAnimTimer <= 300) {
      indicator.sprite = new Sprite("images/Misc/coin_green.png", [0, 0], [26, 30]);
      hero.bounce = "unset";
      stdJumpAnimTimeRef = stdJumpAnimTimer - 250;
      stdJumpAnimTimeRef = 51 - stdJumpAnimTimeRef;
      stdJumpAnimTimeRef = stdJumpAnimTimeRef * modY;
      hero.pos[0] -= (100 / 50);
      hero.pos[1] -= 0.004096*(Math.pow(stdJumpAnimTimeRef - 25, 3));
      if (stdJumpAnimTimer == 300) {
        hero.pos[1] = 500;
      }
    }
  //wait
    else if (stdJumpAnimTimer <= 350) {
      stdJumpAnimTimeRef = stdJumpAnimTimer - 300;
    }
  //run back
    else if (stdJumpAnimTimer <= 400) {
      stdJumpAnimTimeRef = stdJumpAnimTimer - 350;
      hero.pos[0] -= (-.75*(Math.pow(stdJumpAnimTimeRef, 2) - (50 * stdJumpAnimTimeRef))) * dt;
    }
    else {
      hero.pos[0] = 100;
      hero.run = false;
      hero.bounce = "unset";
      hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
      stdJumpAnim = false;
    }
    stdJumpAnimTimer++;

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
    stdJumpAnimTimer = 0;
    indicator.pos[0] = 800;
    indicator.pos[1] = 600;
  }
  hero.shadow.pos[0] = hero.pos[0] - 3;
  hero.shadow.pos[1] = 554;
}