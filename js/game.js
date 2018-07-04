/*
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
  'images/Backgrounds/greenBums.png',
  'images/HeroStuff/heroStand.png',
  'images/Obstacles/batFlying.png',
  'images/Misc/coin_red.png',
  'images/Misc/coin_yellow.png',
  'images/Misc/coin_blue.png',
  'images/Misc/coin_green.png',
  'images/HeroStuff/dog_still_large.png',
  'images/Prompts/attack.png',
  'images/Prompts/items.png',
  'images/Prompts/special.png',
  'images/Prompts/flee.png',
  'images/Prompts/shade.png',
  'images/Misc/shadowHero.png',
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
  attacks: [{name: "jump", action: "stdJumpAnim"}, {name: "bite", action: "stdBiteAnim"}],
  ground: {slide: "slippery"},
  jump: 'NO',
  run: false,
  bounce: false,
  sprite: new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]),
  shadow: {
            pos: [100,554],
            sprite: new Sprite('images/Misc/shadowHero.png', [0, 0], [64, 64])
          }
}

background = {
  pos: [0, 0],
  speed: 0,
  sprite: new Sprite('images/Backgrounds/greenBums.png', [0, 0], [800, 600])
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
var shade = [];
var enemies = [];
var list = [];


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
  gameState = "playerSelect";
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
          sprite = new Sprite('images/Prompts/flee.png', [0, 0], [121, 19]);
        break;
        case 1:
          X = (800 / 4) - (26 * 3);
          Y = (600 / 2) - 30;
          action = "special";
          sprite = new Sprite('images/Prompts/special.png', [0, 0], [121, 19]);
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
          sprite = new Sprite('images/Prompts/items.png', [0, 0], [121, 19]);
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
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        X = (800 / 4) + (26 * 3);
        Y = (600 / 2) - 30;
        sprite = new Sprite('images/Prompts/shade.png', [0, 0], [121, 19]);
      break;
      case 1:
        X = (800 / 4) - (26 * 3);
        Y = (600 / 2) - 30;
        sprite = new Sprite('images/Prompts/shade.png', [0, 0], [121, 19]);
      break;
      case 2:
        X = (800 / 4);
        Y = (600 / 2) - 60;
        sprite = new Sprite('images/Prompts/shade.png', [0, 0], [121, 19]);
      break;
    }
    shade.push({
      pos: [X, Y],
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
  if (gameState == "playerSelect") {
    renderEntities(menu);
    if (menuLeft != true && menuRight != true) {
      renderEntities(shade);
    }
  }
  if (gameState == "attackSelect") {
    renderEntities(list);
  }
  renderEntity(indicator);
  renderEntity(hero);
  renderEntity(hero.shadow);
  renderEntities(enemies);
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].currentHp > 0) {
      renderHPBar(enemies[i]);
    }
  }
}


var stdJumpAnim = false;
var stdJumpAnimTimer = 0;
var stdJumpAnimTimeRef;
var rightPressTimer = 0;
var leftPressTimer = 0;
var upPressTimer = 0;
var downPressTimer = 0;
var menuLeft = false;
var menuRight = false;
var menuTimer = 0;
var yRef;
var changeY;
var gameState;
var listTimer = 0;
var selected = 0;

function handleInput(dt) {
  if (gameState == "playerSelect") {
    playerSelect(dt);
  }
  else if (gameState == "attackSelect") {
    attackSelect();
  }

  //attack animation
  if (stdJumpAnim == true) {
    stdJumpAnimfunction(dt);
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