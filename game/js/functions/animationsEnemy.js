////////////////////////*
/* Javascript animations for FetchQuest
/* Created by Guy Witherow
/* Last major update: 3/7/18
/* This file handles the animations and logic processing of the general enemies
*////////////////////////

function enemyDeath(i) {
  deathTimer++;
  if (deathTimer < 100) {
    //img, pos_in_img[x,y], size_in_img[x,y],anim_speed, anim_frames, dir[hor default], anim_repeat[def once], opacity[def 1]
    enemies[i].sprite.fade = "true";
    enemies[i].sprite.facing = deathTimer / 100;
    enemies[i].pos[0] += 1;
    enemies[i].pos[1] += 1;
  }
  else {
    deathTimer = 0;
    enemies.splice(i, 1);
  }
}