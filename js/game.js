/*
 * Game.js
 * core file of game
 * This version uses the gameUtils.js file
 * This version uses the input.js, resources.js and sprite.js
 * from http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 * original edits by Andrew Pate
 * edits for FetchQuest Game made by Guy Witherow
 */

//Global vars so we can use them within functions
var gameCanvas = new myCanvas('game_canvas');
var lastTime = 0; //game clock

//file loading
// if (document.getElementById("fileLoad") != null) {
//   var loadFile = document.getElementById("fileLoad").value;
//   var savedFile = true;
// }

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
  'images/Prompts/shadeBig.png',
  'images/Prompts/hp.png',
  'images/Prompts/pp.png',
  'images/HeroStuff/dog_still.png',
]);
resources.onReady(init); //callback function which halts progress until all the images are ready

//variable declaration
//arrays
var menu = [];
var shade = [];
var enemies = [];
var list = [];
var particles = [];
var hud = [];

//vars
var stdJumpAnim = false;
var animTimer = 0;
var animTimeRef;
var stdBiteAnim = false;
var rightPressTimer = 0;
var leftPressTimer = 0;
var upPressTimer = 0;
var downPressTimer = 0;
var enemyAttackTimer = -1;
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
var genericRunTo = false;
var particleTimer = 0;
var currentGameLevel = 1;
var totalDamageDone = 0;
var saveAlert = false;
var saveTimer = 201;
var healingPotion = false;
var percent = 1;
// var loaded = false;

//objects
hero = {
  pos: [100, 500],
  speed: 10,
  dx: 0,
  dy: 0,
  maxHp: 20,
  currentHp: 20,
  currentPawPower: 10,
  maxPawPower: 10,
  jmpDmg: 5,
  attacks: [{name: "Jump", action: "stdJumpAnim"}, {name: "Bite", action: "stdBiteAnim"}],
  items: [{name: "Healing Potion", action: "healingPotion"}, {name: "Fright Mask", action: "frightMask"}],
  special: [{name: "Bark", action: "stdJumpAnim"}, {name: "Howl", action: "stdBiteAnim"}],
  ground: {slide: "slippery"},
  jump: 'NO',
  run: false,
  bounce: "unset",
  sprite: new Sprite('images/HeroStuff/heromain.png', [0, 0], [64, 64]),
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
  battleAreaWidth: 600,
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
  sprite: new Sprite('images/Misc/coins.png', [0, 0], [16, 23])
}

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
    generateMenu(i);
  }
  for (var i = 0; i < 2; i++) {
    generateHUD(i);
  }
  for (var i = 0; i < 3; i++) {
    generateShade(i);
  }
  var numOfEnemies = Math.floor(Math.random() * 0) + 2;
  for (var i = 0; i < numOfEnemies; i++) {
    generateMonster(i, numOfEnemies);
  }
  // if (savedFile == true && loaded == false) {
  //   loadGame(loadFile);
  //   loaded = true;
  // }
  // else {
  //   loadGame();
  // }
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
  //start by clearing the old stuff
  gameCanvas.clear();
  //then add background first
  renderEntity(background);
  renderEntities(hud);
  renderHUD();

  if (saveTimer < 50) {
    gameCanvas.context.fillStyle="rgba(0, 0, 255, 1)";
    gameCanvas.context.font = "24px 'Press Start 2P'";
    gameCanvas.context.fillText("Save Made!", 300, 100);
    saveTimer++;
  }
  else if (saveTimer < 100) {
    gameCanvas.context.fillStyle="rgba(0, 0, 255, " + (1 / (saveTimer - 50)) +")";
    gameCanvas.context.font = "24px 'Press Start 2P'";
    gameCanvas.context.fillText("Save Made!", 300, 100);
    saveTimer++;
  }
  else if (saveTimer < 150) {
    saveTimer++;
  }
  //then the rest in order
  //if the player's selecting their action
  if (gameState == "playerSelect") {
    renderEntities(menu);
    if (menuLeft != true && menuRight != true) {
      renderEntities(shade);
    }
  }

  //if the player's selecting an attack
  if (gameState == "attackSelect") {
    renderEntities(list);
    for (var i = 0; i < list.length; i++) {
      if (selected != i) {
        renderEntity(list[i].shade);
      }
    }
    if (input.isDown("ESCAPE")) {
      gameState = "playerSelect";
      listTimer = -1;
      list = [];
    }
  }

  //particle system test
  if (input.isDown('D') && particleTimer == 0) {

  }

  //other
  renderEntity(selector);
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

function handleInput(dt) {

  //user presses 9, save the game (will tie to button on screen)
  // if (input.isDown("9")) {
  //   saveGame();
  // }

  //user presses 8, load the game (maybe make a load screen?)
  // if (input.isDown("8")) {
  //   loadGame();
  // }

  if (input.isDown("1")) {
    gameState = "playerSelect";
    hero.currentHp = 20;
    hero.currentPawPower = 10;
    enemies[0].currentHp = 20;
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
    for (i=0;i<4;i++) {
      genericJumpFunction(hero,enemies[0],percent);
    }
  }

  //generic move to (eased)
  if (genericRunTo == true) {
    genericRunToFunction(hero,enemies[0],percent);
  }

  if (healingPotion == true) {
    healingPotionEffect();
    healingPotion = false;
  }

  else if (gameState == "playerSelect") {
    playerSelect(dt);
  }
  else if (gameState == "attackSelect") {
    attackSelect(selectMode);
  }

  else if (gameState == "enemySelect") {
    renderSelector();
  }

  else if (gameState == "enemyAttack") {
    for (var i = 0; i < enemies.length; i++) {
      //inital attack selection
      if (enemyAttackTimer == -1) {
        var attacks = enemies[i].attacks;
        var totalChance = 0;
        for (var j = 0; j < attacks.length / 2; j++) {
          totalChance += attacks[(2 * j) + 1];
        }
        var chosenChance = Math.random() * totalChance;
        var scaleCheck = 0;
        var attackChosen;
        for (var j = 0; j < attacks.length / 2; j++) {
          scaleCheck += attacks[2*j + 1];
          if (chosenChance <= scaleCheck) {
            attackChosen = attacks[2*j];
            j = attacks.length;
          }
        }
        enemyAttackTimer++;
      }

      //for attack
      else if (enemyAttackTimer >= 0) {
        hero.currentHp -= 2;
        enemyAttackTimer = -1;
        gameState = "playerSelect";
      }
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
}








