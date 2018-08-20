/*
 * Game.js
 * core file of game
 * This version uses the gameUtils.js file
 * This version uses the input.js, resources.js and sprite.js
 *  from http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 * edits for FetchQuest Game made by Guy Witherow
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
  'images/Misc/coins.png',
  'images/HeroStuff/dog_still_large.png',
  'images/Prompts/attack.png',
  'images/Prompts/items.png',
  'images/Prompts/special.png',
  'images/Prompts/flee.png',
  'images/Prompts/shade.png',
  'images/Misc/shadowHero.png',
  'images/Prompts/bite.png',
  'images/Prompts/jump.png',
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
  attacks: [{name: "Jump", action: "stdJumpAnim"}, {name: "Bite", action: "stdBiteAnim"}],
  items: [{name: "Healing Potion", action: "healingPotion"}, {name: "Fright Mask", action: "frightMask"}],
  special: [{name: "Bark", action: "stdJumpAnim"}, {name: "Howl", action: "stdBiteAnim"}],
  ground: {slide: "slippery"},
  jump: 'NO',
  run: false,
  bounce: "unset",
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
var particles = [];


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
          sprite = new Sprite('images/Prompts/flee.png', [0, 0], [182, 29]);
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
          sprite = new Sprite('images/Prompts/attack.png', [0, 0], [182, 29]);
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
      break;
      case 1:
        X = (800 / 4) - (26 * 3);
        Y = (600 / 2) - 30;
      break;
      case 2:
        X = (800 / 4);
        Y = (600 / 2) - 60;
      break;
    }
    shade.push({
      pos: [X, Y],
      sprite: new Sprite('images/Prompts/shade.png', [0, 0], [121, 19])
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
      sprite: new Sprite('images/Obstacles/batFlying.png', [0, 0], [256, 192], 12, [0, 1, 2, 3, 4, 5], 'vertical', false, 0, {x: 1, y: 1}),
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
  if (enemies.length <= 0) {
    playerWin();
  }
  else if (hero.currentHp <= 0) {
    playerLose();
  }
}

//what to render
function render() {
  if (input.isDown('D') && particleTimer == 0) {

  }
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
    for (var i = 0; i < list.length; i++) {
      if (selected != i) {
        renderEntity(list[i].shade);
      }
    }
    if (input.isDown("ESCAPE")) {
      gameState = "playerSelect";
    }
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
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    for (var j = 0; j < particles[i].length; i++) {
      particles[i][j].update();
    }
  }
}


var stdJumpAnim = false;
var animTimer = 0;
var animTimeRef;
var stdBiteAnim = false;
var rightPressTimer = 0;
var leftPressTimer = 0;
var upPressTimer = 0;
var downPressTimer = 0;
var menuLeft = false;
var menuRight = false;
var menuTimer = 0;
var yRef;
var changeY;
var xRef;
var changeX;
var gameState;
var listTimer = 0;
var selected = 0;
var deathTimer = 0;
var numOfEnemies = enemies.length;
var selectMode;
var genericJump = false;
var particleTimer = 0;

function handleInput(dt) {

  //user presses 9, save the game (will tie to button on screen)
  if (input.isDown("9")) {
    saveGame();
  }

  //user presses 8, load the game (maybe make a load screen?)
  if (input.isDown("8")) {
    loadGame();
  }
  //attack animation
  if (stdJumpAnim == true) {
    stdJumpAnimfunction(dt);
  }
  //bite anim
  if (stdBiteAnim == true) {
    stdBiteAnimFunction();
  }
  //generic jump ((((TEST))))
  if (genericJump == true) {
    genericJumpFunction(hero, enemies[0]);
  }

  else if (gameState == "playerSelect") {
    playerSelect(dt);

  }
  else if (gameState == "attackSelect") {
    attackSelect(selectMode);
  }

  handleEnemy();
}

function handleEnemy() {
  for (var i = 0; i < enemies.length; i++) {
    if(enemies[i].currentHp <= 0) {
      enemyDeath(i);
    }
  }
}

//csv game file export
function saveGame() {
  //ajax request setup
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //whatever gets echo'd in the php shows in the console
      console.log(this.responseText);
    }
  };
  //prepare save
  //sends as a long string, "-" seperates lines, "." seperates values
  //initial blah for context
  var toSend = "Save file from FetchQuest-Hero data follows structure of:-MaxHp.CurrentHp.MaxPP.CurrentPP-Attacks:*attacks*-Items:*items*-Specials:*specials*-"

  //add hero's data
  toSend += "HeroData:-" + hero.maxHp + "." + hero.currentHp + "." + hero.maxPawPower + "." + hero.currentPawPower + "-";
  //create list to be added to file var
  var listCheck;
  //for attacks, items and specials
  for (var i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        //add a title (used to ID the list below)
        toSend += "Attacks:-";
        //set list to relevent
        listCheck = hero.attacks;
        break;
      case 1:
        listCheck = hero.items;
        toSend += "Items:-";
        break;
      case 2:
        listCheck = hero.special;
        toSend += "Specials:-";
        break;
    }
    //while there's more in the list
    for (var j = 0; j < listCheck.length; j++) {
      //add the name of the thing to the string
      //on load, the name is used to find stats
      toSend += listCheck[j].name;
      //if its not the last, seperate value
      if (j !== listCheck.length - 1) {
        toSend += ".";
      }
    }
    //break to next line
    toSend += "-";
  }

  //enemies stats
  for (var i = 0; i < enemies.length; i++) {
    //for each enemy, add ID, name, and current HP
    var workingData = "EnemyNo" + i + ":-" + enemies[i].id + "." + enemies[i].maxHp + "." + enemies[i].currentHp;
    //break for next enemy
    toSend += workingData + "-";
  }

  //turns the object into a long string
  save = JSON.stringify(toSend);
  //send to "save.php", with mode set to "save", and with the save data
  xmlhttp.open("GET", "save.php?mode=save&save=" + save, true);
  xmlhttp.send();
}

//game loading
function loadGame() {
  //ajax request
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var array = this.responseText;
      array = array.split(",");
      array.splice(-1,1)
      console.log(array);
      enemies[array[0]].maxHp = array[1];
      enemies[array[0]].currentHp = array[2];
    }
  }
  //mode set to "load", currently pulls most recent file
  xmlhttp.open("GET", "save.php?mode=load", true);
  xmlhttp.send();
}








