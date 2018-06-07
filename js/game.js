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
  'images/Backgrounds/CaveBackground.png',
  'images/HeroStuff/heroStand.png',
  'images/Obstacles/batFlying.png',
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
  jump: 'NO',
  run: false,
  bounce: false,
  sprite: new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64])
}

background = {
  pos: [0, 0],
  speed: 0,
  sprite: new Sprite('images/Backgrounds/CaveBackground.png', [0, 0], [800, 600])
}

enemy = {
  pos: [450, 354],
  speed: 0,
  sprite: new Sprite('images/Obstacles/batFlying.png', [0, 0], [256, 192], 10, [0, 1, 2, 3, 4, 5], 'vertical', false, 0)
}

function init() {

  //setup all the things we will start/re-start with each game
  reset();


  //reset the clock
  lastTime = Date.now();

  //now, let's get the game going
  gameLoop();
}

function reset() {}

function gameLoop() {

  var now = Date.now();
  //delta: time since last loop
  var dt = (now - lastTime) / 1000.0;
  if (dt > 0.15) {
    dt = 0.15;
  } //ensure not too much lag if browser freezes b/w refreshes

  update(dt);
  //Clear and re-draw canvas

  render();

  //Update time for next loop
  lastTime = now;
  requestAnimationFrame(gameLoop); //call itself each time
};

function update(dt) {
  hero.sprite.update(dt);
  enemy.sprite.update(dt);
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
  renderEntity(hero);
  renderEntity(enemy);

  

  gameCanvas.context.font = "30px Arial";
  gameCanvas.context.fillText("Hello World",10,50);
}
var anim1 = false;
var timer = 0;
var sum = 0;
var timeRef;

function handleInput(dt) {
  if (input.isDown('RIGHT') || anim1 == true) {
    anim1 = true;
    if (anim1 == true) {
    //run forward
      if (timer <= 50) {
        timeRef = timer;
        hero.pos[0] += (-.75*(Math.pow(timer, 2) - (50 * timeRef))) * dt;
      }
    //wait
      else if (timer <= 100) {
        timeRef = timer - 50;
      }
    //jump
      else if (timer <= 150) {
        timeRef = timer - 100;
        timeRef = timeRef * .95
        hero.pos[0] += (10000 / 50) * dt;
        hero.pos[1] += .005 * (Math.pow(timeRef - 25, 3));
        console.log()
        if (timer >= 180 && input.isDown('LEFT')) {
          hero.bounce = true;
        }
      }
    //bounce1
      else if (timer <= 200) {
        if (input.isDown('LEFT') || hero.bounce == true) {
          hero.bounce = true;
          timeRef = timer - 150;
          hero.pos[1] += .001 * (Math.pow(timeRef - 25, 3));
        }
        else {
          timer = 250;
        }
      }
    //bounce2
      else if (timer <= 250) {
        timeRef = timer - 200;
        hero.pos[1] += .001 * (Math.pow(timeRef - 25, 3));
      }
    //bounce back
      else if (timer <= 300) {
        timeRef = timer - 250;
        timeRef = timeRef * .85
        hero.pos[0] -= (10000 / 50) * dt;
        hero.pos[1] += .0027 * (Math.pow(timeRef - 20, 3));
        if (timer == 300) {
          hero.pos[1] = 500;
        }
      }
    //wait
      else if (timer <= 350) {
        timeRef = timer - 300;
      }
    //run back
      else if (timer <= 400) {
        timeRef = timer - 350;
        hero.pos[0] -= (-.75*(Math.pow(timeRef, 2) - (50 * timeRef))) * dt;
      }
      else if (timer <= 450) {
        timeRef = timer - 400;
        hero.run = false;
        hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
      }
      else {
        hero.pos[0] = 100;
        hero.run = false;
        hero.bounce = false;
        hero.sprite = new Sprite('images/HeroStuff/heroStand.png', [0, 0], [64, 64]);
        anim1 = false;
      }
      timer++;


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
      timer = 0;
    }
  }
}