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
      hero.currentPawPower -= 2;
      genericRunTo = true;
    }
    if (animTimer <= 50) {
      genericRunTo = true;
      genericRunToFunction(hero, enemies[selected], .75);
    }
    //wait
    else if (animTimer <= 100) {
      genericRunTo = false;
    }
    //jump
    else if (animTimer <= 300) {
      if (animTimer == 101) {
        genericJump = true;
      }
      else {
        if (genericJump == false) {
          animTimer = 350;
        }
      }
      genericJumpFunction(hero, enemies[selected]);

    }
  //wait
    else if (animTimer <= 350) {

    }
  //run back
    else if (animTimer <= 400) {
      var home = {
        pos:[100,200]
      }
      genericRunTo = true;
      genericRunToFunction(hero,home,1);
    }
    else {
      hero.pos[0] = 100;
      hero.run = false;
      hero.bounce = "unset";
      hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
      stdJumpAnim = false;
      gameState = "enemyAttack";
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
  }
  hero.shadow.pos[0] = hero.pos[0] - 3;
  hero.shadow.pos[1] = 554;
}

function playerWin() {
  gameState = "win";
}



