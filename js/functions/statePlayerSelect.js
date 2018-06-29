////////////////////////*
/* FetchQuest
/* Created by Guy Witherow
/* Last major update: 27/6/18
/* This file handles the user selection stage of the battle screen
*////////////////////////

function playerSelect() {
  //left key menu handling
    if (input.isDown('LEFT') || menuLeft == true) {
    //for each menu icon
    for (var i = 0; i < menu.length; i++) {

      //find start & end point
      switch (menu[i].renderOrder) {
        case 0:
          presetX = (800 / 4);
          presetY = (600 / 2) - (30 * 2);
          endX = (800 / 4) + (26 * 3);
          endY = (600 / 2) - (30);
          break;
        case 1:
          presetX = (800 / 4) - (26 * 3);
          presetY = (600 / 2) - (30);
          endX = (800 / 4);
          endY = (600 / 2) - (30 * 2);
          break;
        case 2:
          presetX = (800 / 4);
          presetY = (600 / 2);
          endX = (800 / 4) - (26 * 3);
          endY = (600 / 2) - (30);
          break;
        case 3:
          presetX = (800 / 4) + (26 * 3);
          presetY = (600 / 2) - (30);
          endX = (800 / 4);
          endY = (600 / 2);
          break;
        default:
      }

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

      //if the menu items are at the end of their movement
      if (menuTimer == -1) {
        //make sure they're in the right spots
        menu[i].pos[0] = endX;
        menu[i].pos[1] = endY;
        //set acel to 0
        menu[i].dx = 0;
        menu[i].dy = 0;
        //and change the relevent position values
        menu[i].renderOrder -= 1;
        //make sure non of the values are invalid, if they are icons will act erraticly
        if (menu[i].renderOrder == -1) {
          menu[i].renderOrder = 3
        }
      }
      //else if the movement is still running
      else if (menuTimer < 12) {
        //keep the check for the movement true
        menuLeft = true;
        //and set the positions to move by their acel values
        menu[i].pos[0] += menu[i].dx;
        menu[i].pos[1] += menu[i].dy;
      }
      else {
        //same shit as above, but for the first to run through
        //this is because timer is not set to -1 till its been run through once
        //can be fixed, will do so before any release (optimization)
        menuTimer = -1;
        menu[i].dx = 0;
        menu[i].dy = 0;
        menu[i].pos[0] = endX;
        menu[i].pos[1] = endY;
        menu[i].renderOrder -= 1;
        if (menu[i].renderOrder == -1) {
          menu[i].renderOrder = 3
        }
      }
    }
    if (menuTimer == -1) {
      menuLeft = false;
    }
    //increment the timer
    menuTimer++;
  }

  //this code is the exact same as above, but reversed. see (input.isDown("LEFT")) for details
  if (input.isDown('RIGHT') || menuRight == true) {
    for (var i = 0; i < menu.length; i++) {

      switch (menu[i].renderOrder) {
        case 0:
          presetX = (800 / 4);
          presetY = (600 / 2) - (30 * 2);
          endX = (800 / 4) - (26 * 3);
          endY = (600 / 2) - (30);
          break;
        case 1:
          presetX = (800 / 4) - (26 * 3);
          presetY = (600 / 2) - (30);
          endX = (800 / 4);
          endY = (600 / 2);
          break;
        case 2:
          presetX = (800 / 4);
          presetY = (600 / 2);
          endX = (800 / 4) + (26 * 3);
          endY = (600 / 2) - (30);
          break;
        case 3:
          presetX = (800 / 4) + (26 * 3);
          presetY = (600 / 2) - (30);
          endX = (800 / 4);
          endY = (600 / 2) - (30 * 2);
          break;
        default:
      }
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

      if (menuTimer == -1) {
        menu[i].pos[0] = endX;
        menu[i].pos[1] = endY;
        menu[i].dx = 0;
        menu[i].dy = 0;
        menu[i].renderOrder += 1;
        if (menu[i].renderOrder >= 4) {
          menu[i].renderOrder = 0
        }
      }
      else if (menuTimer < 12) {
        menuRight = true;
        menu[i].pos[0] += menu[i].dx;
        menu[i].pos[1] += menu[i].dy;
      }
      else {
        menuTimer = -1;
        menu[i].dx = 0;
        menu[i].dy = 0;
        menu[i].pos[0] = endX;
        menu[i].pos[1] = endY;
        menu[i].renderOrder += 1;
        if (menu[i].renderOrder == 4) {
          menu[i].renderOrder = 0
        }
      }
    }
    if (menuTimer == -1) {
      menuRight = false;
    }
    menuTimer++;
  }

  //if the user chooses an option
  if (input.isDown('ENTER')) {
    //find which menu item is selected
    for (var i = 0; i < menu.length; i++) {
      //if the left button has just been pressed (bugfix where you could press left and enter quickly and end up with the previous option)
      if (menuLeft == true) {
        //use the option that is rotating towards the "selected" position (limits waiting)
        if (menu[i].lastPos == 2) {
          action = menu[i].action;
        }
      }
      //same as above for right
      else if (menuRight == true) {
        if (menu[i].nextPos == 2) {
          action = menu[i].action;
        }
      }
      //otherwise if the menu is sitting still
      else {
        if (menu[i].renderOrder == 2) {
          action = menu[i].action;
        }
      }
    }
    //if the selected action is "attack"
    if (action == "attack" && stdJumpAnim != true) {
      //activate the "attack" animation
      stdJumpAnim = true;
      hero.currentPawPower -= 2;
    }
  }
  hero.shadow.pos[0] = hero.pos[0] - 3;
  hero.shadow.pos[1] = 554;
}