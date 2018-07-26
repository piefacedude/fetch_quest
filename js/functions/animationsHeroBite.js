////////////////////////*
/* Javascript animations for FetchQuest
/* Created by Guy Witherow
/* Last major update: 21/6/18
/* This file handles the mathmatical mapping of the hero character's bites
*////////////////////////

function stdBiteAnimFunction() {
  stdBiteAnim = true;
  if (stdBiteAnim == true) {
    if (animTimer == 1) {
      changeX = hero.pos[0] - enemies[0].pos[0];
      changeY = hero.pos[1] - enemies[0].pos[1];
      hero.pos[0] = 100;
      hero.pos[1] = 500;
    }
    animTimer++;
  }
}
