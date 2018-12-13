////////////////////////*
/* FetchQuest
/* Created by Guy Witherow
/* Last major update: 27/6/18
/* This file handles the user selection stage of the battle screen
*////////////////////////

function playerSelect() {
  //right key menu handling
  if (input.isDown('LEFT') || menuRight == true) {
    if (menuLeft != true) {
      //for each menu icon
      for (var i = 0; i < menu.length; i++) {
        if (menuTimer != -1) {

          var inc = menu[i].menuPos - 1;
          if (inc == -1) {
            inc = 3;
          }

          //find start & end point
          presetX = menuX(menu[i].menuPos);
          presetY = menuY(menu[i].menuPos);
          endX = menuX(inc);
          endY = menuY(inc);

          //find start & end scale
          startScale = menuScale(menu[i].menuPos);
          endScale = menuScale(inc);
          scaleDiff = endScale - startScale;

          menu[i].sprite.scale['x'] += scaleDiff / 12;
          menu[i].sprite.scale['y'] += scaleDiff / 12;

          //find difference
          var difX = 0;
          var difY = 0;
          if (menu[i].dx == 0 && menu[i].dy == 0) {
            //set acel for x & y to the diff over the speed
            difX = endX - presetX;
            difY = endY - presetY;
            menu[i].dx = difX / menu[i].speed;
            menu[i].dy = difY / menu[i].speed;
          }

          //else if the movement is still running
          else if (menuTimer < 12) {
            //keep the check for the movement true
            menuRight = true;
            //and set the positions to move by their acel values
            menu[i].pos[0] += menu[i].dx;
            menu[i].pos[1] += menu[i].dy;
          }
          else {
            for (var j = 0; j < menu.length; j++) {
              var inc = menu[j].menuPos - 1;
              if (inc == -1) {
                inc = 3;
              }
              endX = menuX(inc);
              endY = menuY(inc);
              menuTimer = -1;
              menu[j].dx = 0;
              menu[j].dy = 0;
              menu[j].pos[0] = endX;
              menu[j].pos[1] = endY;
              menu[j].menuPos -= 1;
              if (menu[j].menuPos == -1) {
                menu[j].menuPos = 3;
              }
              findRenderOrder(j,menu[j].menuPos);
            }
          }
        }
      }
      if (menuTimer == -1) {
        menuRight = false;
      }
      //increment the timer
      menuTimer++;
    }
  }

  //this code is the exact same as above, but reversed. see (input.isDown("RIGHT")) for details
  if (input.isDown('RIGHT') || menuLeft == true) {
    if (menuRight != true) {
      for (var i = 0; i < menu.length; i++) {
        if (menuTimer != -1) {
          var inc = menu[i].menuPos + 1;
          if (inc == 4) {
            inc = 0;
          }

          //find start & end point
          presetX = menuX(menu[i].menuPos);
          presetY = menuY(menu[i].menuPos);
          endX = menuX(inc);
          endY = menuY(inc);

          startScale = menuScale(menu[i].menuPos);
          endScale = menuScale(inc);
          scaleDiff = endScale - startScale;

          menu[i].sprite.scale['x'] += scaleDiff / 12;
          menu[i].sprite.scale['y'] += scaleDiff / 12;

          var difX = 0;
          var difY = 0;
          //find path function
          if (menu[i].dx == 0 && menu[i].dy == 0) {
            //find the difference in x & y between current and end
            difX = endX - presetX;
            difY = endY - presetY;
            //move however fast it takes to get to that point in a sum of time
            menu[i].dx = difX / menu[i].speed;
            menu[i].dy = difY / menu[i].speed;
          }

          else if (menuTimer < 12) {
            menuLeft = true;
            menu[i].pos[0] += menu[i].dx;
            menu[i].pos[1] += menu[i].dy;
          }

          else {
            menuTimer = -1;
            for (var j = 0; j < menu.length; j++) {
              var inc = menu[j].menuPos + 1;
              if (inc == 4) {
                inc = 0;
              }
              endX = menuX(inc);
              endY = menuY(inc);
              menu[j].pos[0] = endX;
              menu[j].pos[1] = endY;
              menu[j].dx = 0;
              menu[j].dy = 0;
              menu[j].menuPos += 1;
              if (menu[j].menuPos >= 4) {
                menu[j].menuPos = 0
              }
              findRenderOrder(j, menu[j].menuPos);
            }
          }
        }
      }
      if (menuTimer == -1) {
        menuLeft = false;
      }
      menuTimer++;
    }
  }

  //if the user chooses an option
  if (input.isDown('ENTER')) {
    //find which menu item is selected
    for (var i = 0; i < menu.length; i++) {
      //if the right button has just been pressed (bugfix where you could press right and enter quickly and end up with the previous option)
      if (menuRight == true) {
        //use the option that is rotating towards the "selected" position (limits waiting)
        if (menu[i].lastPos == 2) {
          action = menu[i].action;
        }
      }
      //same as above for left
      else if (menuLeft == true) {
        if (menu[i].nextPos == 2) {
          action = menu[i].action;
        }
      }
      //otherwise if the menu is sitting still
      else {
        if (menu[i].menuPos == 2) {
          action = menu[i].action;
        }
      }
    }

    if (action == "attack" && gameState == "playerSelect") {
      //activate the "attack" menu
      gameState = "attackSelect";
      selectMode = "attack";
    }
    else if (action == "items" && gameState == "playerSelect") {
      //activate the "item" menu
      gameState = "attackSelect";
      selectMode = "items";
    }
    if (action == "special" && gameState == "playerSelect") {
      //activate the "special" menu
      gameState = "attackSelect";
      selectMode = "special";
    }
  }
  hero.shadow.pos[0] = hero.pos[0] - 3;
  hero.shadow.pos[1] = 554;
}




