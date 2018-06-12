anim1TimeRef/*
 * Game.js
 * script file for game tutorial
 * This version uses the gameUtils.js file
 * This version uses the input.js, resources.js and sprite.js
 *  from http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 */

//Global vars so we can use them within functions
var gameCanvas = new myCanvas('game_canvas');
var lastTime = 0; //game clock

//Load the sprite sheets and images
resources.load([
  //comma separated array
  'images/HeroStuff/heromain.png',
  'images/Backgrounds/CaveBackground.png',
  'images/HeroStuff/heroStand.png',
  'images/Obstacles/batFlying.png',
  'images/Misc/coin_red.png',
  'images/Misc/coin_yellow.png',
  'images/Misc/coin_blue.png',
  'images/Misc/coin_green.png',
  'images/HeroStuff/dog_still_large.png',
  'images/Prompts/attack.png'
]);
resources.onReady(init); //callback function which halts progress until all the images are ready

//Game state - include player objects, arrays for enemies, enemies, explosions etc...
/*
var player = {
    pos: [0, 0],
    sprite: new Sprite('img/sprites.png', [0, 0], [39, 39], 16, [0, 1])
};
*/

//('images/player.png', [0, 0], [64, 123], 10, [0, 1, 2, 1])
//img, pos_in_img[x,y], size_in_img[x,y],anim_speed, anim_frames, dir[hor default], anim_repeat[def once], opacity[def 1]
hero = {
  pos: [100, 500],
  speed: 10,
  dx: 0,
  dy: 0,
  maxHp: 20,
  currentHp: 20,
  currentPawPower: 20,
  maxPawPower: 20,
  jmpDmg: 5,
  ground: {slide: "slippery"},
  jump: 'NO',
  run: false,
  bounce: false,
  sprite: new Sprite('images/HeroStuff/heromain.png', [0, 0], [64, 64])
}

background = {
  pos: [0, 0],
  speed: 0,
  sprite: new Sprite('images/Backgrounds/CaveBackground.png', [0, 0], [800, 600])
}

battle = {
  possibleEnemies: ["bat", 200, "dp", 1],
  battleAreaWidth: 800,
}

indicator = {
  pos: [800,600],
  key: "null",
  sprite: new Sprite('images/Prompts/attack.png', [0, 0], [106, 14]),
}

selector = {
  pos: [800, 600],
  selectedEnemy: 0,
  attackType: "any",
  sprite: new Sprite('images/Misc/coin_red.png', [0, 0], [26, 30])
}

var menu = [];
var enemies = [];


function init() {

  //setup all the things we will start/re-start with each game
  reset();


  //reset the clock
  lastTime = Date.now();

  //now, let's get the game going
  gameLoop();
}

function reset() {
  //function runs once at the start of each game
  for (var i = 0; i < 4; i++) {
      //x display location (top left pixel)
      var X = 0;
      //y display
      var Y = 0;
      //action taken when button is selected
      var action = 0;
      //sprite used for button
      var sprite;
      switch (i) {
        case 0:
          X = (800 / 4);
          Y = (600 / 2) - 60;
          action = "flee";
          sprite = new Sprite('images/Misc/coin_green.png', [0, 0], [26, 30]);
        break;
        case 1:
          X = (800 / 4) - (26 * 3);
          Y = (600 / 2) - 30;
          action = "special";
          sprite = new Sprite('images/Misc/coin_blue.png', [0, 0], [26, 30]);
        break;
        case 2:
          X = (800 / 4);
          Y = (600 / 2);
          action = "attack";
          sprite = new Sprite('images/Prompts/attack.png', [0, 0], [121, 19]);
        break;
        case 3:
          X = (800 / 4) + (26 * 3);
          Y = (600 / 2) - 30;
          action = "items";
          sprite = new Sprite('images/Misc/coin_red.png', [0, 0], [26, 30]);
        break;
      }
      menu.push({
      pos: [X, Y],
      dx: 0,
      dy: 0,
      speed: 12,
      renderOrder:i,
      action: action,
      sprite: sprite
    });
  }
  var numOfEnemies = Math.floor(Math.random() * 0) + 1;
  for (var i = 0; i < numOfEnemies; i++) {
    var potEnem = battle.possibleEnemies;
    var totalChance = 0;
    for (var j = 0; j < potEnem.length / 2; j++) {
      totalChance += potEnem[(2 * j) + 1];
    }
    var monsterCheck = Math.random() * totalChance;
    var scaleCheck = 0;
    var enemyType;
    for (var j = 0; j < potEnem.length / 2; j++) {
      scaleCheck += potEnem[2*j + 1];
      if (monsterCheck <= scaleCheck) {
        enemyType = potEnem[2*j];
        j = potEnem.length;
      }
    }

    var enemyType = "esch";
    var xPos = battle.battleAreaWidth / (numOfEnemies + 1);
    enemies.push({
      id: enemies.length,
      pos: [xPos * (i+1),200],
      speed: 0,
      maxHp: 20,
      currentHp: 20,
      sprite: new Sprite('images/Obstacles/batFlying.png', [0, 0], [256, 192], 10, [0, 1, 2, 3, 4, 5], 'vertical', false, 0),
    })
  }
}

function gameLoop() {

  var now = Date.now();
  //delta: time since last loop
  var dt = (now - lastTime) / 1000.0;

  update(dt);
  //Clear and re-draw canvas

  render();

  //Update time for next loop
  lastTime = now;
  requestAnimationFrame(gameLoop); //call itself each time
};

function update(dt) {
  hero.sprite.update(dt);
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].sprite.update(dt);
  }
  //handle inputs
  // - apart from click which comes elsewhere
  handleInput(dt);
}

//what to render
function render() {
  //start by clearing the old stuff
  gameCanvas.clear();
  //then add background first
  renderEntity(background);
  //then the rest in order
  renderEntities(menu);
  renderEntity(indicator);
  renderEntity(hero);
  renderEntities(enemies);
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].currentHp > 0) {
      gameCanvas.context.fillStyle="#FF0000";
      gameCanvas.context.fillRect(enemies[i].pos[0] + ((enemies[i].sprite.size[0] * enemies[i].sprite.scale.x) / 2) - 50, enemies[i].pos[1] + (enemies[i].sprite.size[1] * enemies[i].sprite.scale.y), 100, 10);
      gameCanvas.context.fillStyle="#00FF00";
      gameCanvas.context.fillRect(enemies[i].pos[0] + ((enemies[i].sprite.size[0] * enemies[i].sprite.scale.x) / 2) - 50, enemies[i].pos[1] + (enemies[i].sprite.size[1] * enemies[i].sprite.scale.y), 100 * (enemies[i].currentHp/enemies[i].maxHp), 10)
    }
  }
}


var anim1 = false;
var anim1Timer = 0;
var anim1TimeRef;
var rightPressTimer = 0;
var leftPressTimer = 0;
var upPressTimer = 0;
var downPressTimer = 0;
var menuLeft = false;
var menuRight = false;
var menuTimer = 0;
var yRef;
var changeY;

function handleInput(dt) {


  // if (input.isDown('RIGHT')) {
  //   rightPressTimer++;
  //   if (rightPressTimer < 100) {
  //     hero.dx = Math.sqrt(7000*Math.sqrt(rightPressTimer * 100)) * dt;
  //   }
  //   else {
  //     hero.dx = Math.sqrt(7000*Math.sqrt(10000)) * dt;
  //   }
  //   console.log(hero.dx);
  //   hero.pos[0] += hero.dx;
  // }
  // else {
  //   rightPressTimer = 0;
  //   if (hero.ground['slide'] == "slippery") {
  //     if (hero.dx > 0) {
  //       hero.dx -= 20 * dt;
  //     }
  //     if (hero.dx < 0) {
  //       hero.dx = 0;
  //     }
  //   }
  //   else {
  //     hero.dx = 0;
  //   }
  //
  //   hero.pos[0] += hero.dx;
  // }


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
    } else {

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
      if (menu[i].dx == 0 && menu[i].dy == 0) {
        difX = endX - presetX;
        difY = endY - presetY;
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
      } else if (menuTimer < 12) {
        menuRight = true;
        menu[i].pos[0] += menu[i].dx;
        menu[i].pos[1] += menu[i].dy;
      } else {
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
  if (input.isDown('ENTER')) {

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
    if (action == "attack" && anim1 != true) {
      //activate the "attack" animation
      anim1 = true;
      hero.currentPawPower -= 2;
    }
  }

  //attack animation
  if (anim1 == true) {
    anim1 = true;
    if (anim1 == true) {
    //run forward
      if (anim1Timer == 1) {
        //make sure the player is in the right spot (the animation is reletive to starting position)
        hero.pos[0] = 100;
        hero.pos[1] = 500;
        indicator.pos[0] = 700;
        indicator.pos[1] = 300;
        changeY = hero.pos[1] - enemies[0].pos[1];
        modY = (Math.pow((changeY-400)/-0.001024,1/4)) + 25;
        modY = modY / 50;
      }
      if (anim1Timer <= 50) {
        //anim1TimeRef is the reletive time within each "chunk" of the animation.
        anim1TimeRef = anim1Timer;
        //move character relative to an equation (anti-derivative plus starting position x/y)
        //i need to try and make the equations work with the "dt" function for lateny reasons
        //will fix at some point??? we'll see
        hero.pos[0] += (-.75*(Math.pow(anim1TimeRef, 2) - (50 * anim1TimeRef))) * dt;
      }
    //wait
      else if (anim1Timer <= 100) {
        anim1TimeRef = anim1Timer - 50;
      }
    //jump
      else if (anim1Timer <= 150) {
        indicator.sprite = new Sprite("images/Misc/coin_red.png", [0, 0], [26, 30]);
        //most complex bit yet
        anim1TimeRef = anim1Timer - 100;
        anim1TimeRef = anim1TimeRef * modY;
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
        hero.pos[1] += 0.004096*(Math.pow(anim1TimeRef - 25, 3));
        //if the player hits "a" during the part where the hero bounces, bounce again
        if (anim1Timer <= 100 && input.isDown('A')) {
          hero.bounce = false;
        }
        else if (input.isDown('A') && hero.bounce == "unset") {
          hero.bounce = true;
        }
        if (anim1Timer == 150) {
          enemies[0].currentHp -= hero.jmpDmg;
        }
      }
    //bounce1
      else if (anim1Timer <= 200) {
        if (input.isDown('A') || hero.bounce == true) {
          hero.bounce = true;
          anim1TimeRef = anim1Timer - 150;
          hero.pos[1] += .001 * (Math.pow(anim1TimeRef - 25, 3));
        }
        else {
          anim1Timer = 250;
        }
      }
    //bounce2
      else if (anim1Timer <= 250) {
        anim1TimeRef = anim1Timer - 200;
        hero.pos[1] += .001 * (Math.pow(anim1TimeRef - 25, 3));
      }
    //bounce back
      else if (anim1Timer <= 300) {
        indicator.sprite = new Sprite("images/Misc/coin_green.png", [0, 0], [26, 30]);
        hero.bounce = "unset";
        anim1TimeRef = anim1Timer - 250;
        anim1TimeRef = 51 - anim1TimeRef;
        anim1TimeRef = anim1TimeRef * modY;
        hero.pos[0] -= (10000 / 50) * dt;
        hero.pos[1] -= 0.004096*(Math.pow(anim1TimeRef - 25, 3));
        if (anim1Timer == 300) {
          hero.pos[1] = 500;
        }
      }
    //wait
      else if (anim1Timer <= 350) {
        anim1TimeRef = anim1Timer - 300;
      }
    //run back
      else if (anim1Timer <= 400) {
        anim1TimeRef = anim1Timer - 350;
        hero.pos[0] -= (-.75*(Math.pow(anim1TimeRef, 2) - (50 * anim1TimeRef))) * dt;
      }
      else if (anim1Timer <= 450) {
        anim1TimeRef = anim1Timer - 400;
        indicator.pos[0] = 800;
        indicator.pos[1] = 600;
        hero.run = false;
        hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
      }
      else {
        hero.pos[0] = 100;
        hero.run = false;
        hero.bounce = "unset";
        hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
        anim1 = false;
      }
      anim1Timer++;

      if (hero.run == false) {
        hero.sprite = new Sprite('images/HeroStuff/heromain.png', [0, 0], [64, 64], 10, [0, 1], 'vertical')
        hero.run = true;
      }
      else {
        hero.run = true;
      }
    }
    if (anim1 == false) {
      hero.run = false;
      hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
      anim1Timer = 0;
    }
  }
  handleEnemy();
}

function handleEnemy() {
  for (var i = 0; i < enemies.length; i++) {
    if(enemies[i].currentHp <= 0) {
      enemyDeath(i);
    }
  }
};
var deathTimer = 0;
function enemyDeath(i) {
  deathTimer++;
  if (deathTimer < 100) {
    //img, pos_in_img[x,y], size_in_img[x,y],anim_speed, anim_frames, dir[hor default], anim_repeat[def once], opacity[def 1]
    enemies[i].sprite.fade = "true";
    enemies[i].sprite.facing = deathTimer / 100;
    enemies[i].pos[0] += 1;
    enemies[i].pos[1] += 1;
  }
}