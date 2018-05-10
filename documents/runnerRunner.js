/*
 * Game.js
 * script file for game tutorial
 * This version uses the gameUtils.js file
 * This version uses the input.js, resources.js and sprite.js
 *  from http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 */

//Global vars so we can use them within functions
var gameCanvas = new myCanvas('game_canvas');
var lastTime = 0;; //game clock
var timeSinceLastDraw = 0; //for our bird

//Load the sprite sheets and images
resources.load([
    //comma separated array
    'images/HeroStuff/heromain.png',
    'images/Backgrounds/CaveBackground.png',
    'images/Obstacles/Rock.png',
    'images/Chasers/prospectorSprite.png',
    'images/Obstacles/batFlying.png',
    'images/Misc/coin.png',
    'images/Backgrounds/DesertBackground2.png',
    'images/Backgrounds/gameOver.png'
]);
resources.onReady(init); //callback function which halts progress until all the images are ready

//Game state - include player objects, arrays for enemies, enemies, explosions etc...
/*
var player = {
    pos: [0, 0],
    sprite: new Sprite('img/sprites.png', [0, 0], [39, 39], 16, [0, 1])
};
*/

var jspeed = 400;
var acel = 600;
var deathspeed = 600;
var timer = 0;
var timecount = 0;
var minutes = "";
var minmark = "";
var jumpOnce = 0;
var points = 0;
var rockChance = .995;
var coinChance = .01;
var lastCount = 0;
var lifeGive = 0;
var bgSource = 'images/Backgrounds/CaveBackground.png';
var level = 0;
var doOnce = 0;


var enemies = [];
var coins = [];
var background;
var hero;
var miner;
var rocktest;
var endScreen;

//('images/player.png', [0, 0], [64, 123], 10, [0, 1, 2, 1])
//img, pos_in_img[x,y], size_in_img[x,y],anim_speed, anim_frames, dir[hor default], anim_repeat[def once], opacity[def 1]
background = {
  pos: [0, 0],
  speed: 600,
  sprite: new Sprite(bgSource, [0, 0], [800, 600], 16, [0, 1])
}
hero = {
  pos: [200, 500],
  speed: jspeed,
  jump: 'NO',
  sprite: new Sprite('images/HeroStuff/heromain.png', [0, 0], [64, 64], 10, [0, 1], 'vertical')
}

miner = {
  pos: [75, 500],
  speed: jspeed,
  jump: 'NO',
  sprite: new Sprite('images/Chasers/prospectorSprite.png', [0, 0], [64, 64], 17, [0, 1], 'vertical')
}

endScreen = {
  pos:[0, 0],
  speed: 0,
  sprite: new Sprite('images/Backgrounds/gameOver.png', [0, 0], [800, 600], 10, [0, 1])
}

viewPoint = {
  pos:[75, 500],
  speed: 0,
  sprite: new Sprite('images/Backgrounds/gameOver.png', [0, 0], [800, 600], 10, [0, 1])
}

//settings for game logic
    var gameOver = false;

    var lives = 3;
/*
rocktest = {
  pos: [400, 500],
  speed: 0,
  sprite: new Sprite('images/Obstacles/Rock.png', [0, 0], [137, 137])
}
*/
enemies = [];
coins = [];

function init(){
    //set up background


    //attach event listeners to html objects (outside the canvas)
        //restart
        //pause/resume
        //other?

    //setup all the things we will start/re-start with each game
    reset();


    //reset the clock
    lastTime = Date.now();

    //now, let's get the game going
    gameLoop();
}

function reset() {


if (gameOver == 0) {
playSound("DesertThemeMusic");
playSound("CaveRunning");
}
}

function gameLoop() {

    var now = Date.now();
    //delta: time since last loop
    var dt = (now - lastTime) / 1000.0;
    if(dt>0.15){dt = 0.15;} //ensure not too much lag if browser freezes b/w refreshes



    //Here is where all the work is done
    //Re-calc pos of everything (according to change in time)
    scrollBg(background, "R2L", dt);


    update(dt);
    //Clear and re-draw canvas

    render();

    //Update time for next loop
    lastTime = now;
    requestAnimationFrame(gameLoop); //call itself each time
};

function update(dt){

    //handle inputs
    // - apart from click which comes elsewhere
    handleInput(dt);

    if (gameOver == 0) {
    if (hero.jump == "UP") {
      if (jumpOnce == 0) {
      playSound("JumpSound");
    }
      stopSound("CaveRunning");
      stopSound("jumpToStep");
      jumpOnce++;
    }
  }

	//level switch test
    if (level == 0) {
      bgSource = 'images/Backgrounds/CaveBackground.png';
    }
    /*if (level == 1) {
      bgSource = 'images/Backgrounds/DesertBackground2.png';
      background = {
        pos: [0, 0],
        speed: 600,
        sprite: new Sprite(bgSource, [0, 0], [800, 600], 16, [0, 1])
      };
    }*/


	//entity movement
    for(var i = 0; i < enemies.length; i++){
      enemies[i].pos[0] -= enemies[i].speed *dt;
    }
    for(var i = 0; i < coins.length; i++){
      coins[i].pos[0] -= coins[i].speed *dt;
    }


	//sprite pause during jump

    var acceleration = acel;
    var mineracceleration = acceleration - 100;

     if (hero.jump == "NO") {
      hero.sprite.update(dt);
    }
    if (miner.jump == "NO") {
        miner.sprite.update(dt);
    }

	//timer update
    if (gameOver == 0){
      if (dt > 0) {
        timecount++;
        if (timecount > 60) {
          timer = timer + 1;
          timecount = 0;
          if (timer == 60) {
            minutes++;
            minmark = "m";
            timer = 0;
          }
        }
      }
  }


	//jump mechanics
	var acceleration = acel;
    var mineracceleration = acceleration - 100;
	var maxJump = 150;
    var ground = 500;

    if(hero.jump == 'UP'){
      if(hero.pos[1] <= ground-maxJump){
        hero.jump = 'DN';
      }else{

        hero.pos[1] -= hero.speed * dt;
        hero.speed -= acceleration * dt;

        if(hero.speed < 0){
          hero.speed = 0;
          hero.jump = 'DN';
        }
      }

    }else if(hero.jump == 'DN'){
      if (gameOver == 0) {
      playSound("jumpToStep");
    }
      if(hero.pos[1] >= ground){
        hero.pos[1] = ground;
        hero.jump = 'NO';
        hero.speed = jspeed;

      }else{

        hero.pos[1] += hero.speed * dt;
        hero.speed += acceleration * dt;
      }

    }

    if(miner.jump == 'UP'){
      if(miner.pos[1] <= ground-maxJump){
        miner.jump = 'DN';
      }else{

        miner.pos[1] -= miner.speed * dt;
        miner.speed -= mineracceleration * dt;

        if(miner.speed < 0){
          miner.speed = 0;
          miner.jump = 'DN';
        }
      }
      ;
    }else if(miner.jump == 'DN'){
      if(miner.pos[1] >= ground){
        miner.pos[1] = ground;
        miner.jump = 'NO';
        miner.speed = jspeed - 100;

      }else{

        miner.pos[1] += miner.speed * dt;
        miner.speed += mineracceleration * dt;
      }

    }




  /*
   * Custom Logic
   */

   //spawning of coins & enemies
   if (dt > 0) {
     var spawnCheck = 0;
     spawnCheck = Math.random()
     if (spawnCheck > .995) {
       enemies.push({
         pos: [900, 500],
         speed: deathspeed,
         sprite: new Sprite('images/Obstacles/Rock.png', [0, 0], [137, 137])
       });
     }

     if (spawnCheck < coinChance) {
       coins.push({
         pos: [900, 400],
         speed: deathspeed,
         sprite: new Sprite('images/Misc/coin.png', [0, 0], [16, 23])
       });
     }
   }

	if (coins[i] < 0) {
	   if(coins[i].pos[0] < 0 ){
		 coins.splice(i, 1);
			   i--;
	   }
	 }

	if (enemies[i] < 0) {
	   if(enemies[i].pos[0] < 0){
		 enemies.splice(i, 1);
				i--;
	   }
	}

	//coin collision
   if(i>=0){
     for(var j=0; j<coins.length; j++){
       if(objectCollides(hero, coins[j])){
         coins.splice(j, 1);
         playSound('coinCollection');
         j--;
         points++;
         if (lifeGive == 1){
         lifeGive--;
       }
         break;
       }
     }
   }

   //points and lives
	var pointsmod = points % 5;
	if (pointsmod == 0) {
	  if (points > 0){

		if (lifeGive == 0){
		  lifeGive++;
		  lives++;
		}
	  }
	}


	//life lost
	if(i>=0){
	  for(var j=0; j<enemies.length; j++){
		if(objectCollides(hero, enemies[j])){
		  gameCanvas.clear();
		  enemies = [];
		  coins = [];
		  setTimeout(blank, 3000);
		  lifeDown();
		}
	  }
	}

	//difficulty increase
	if (timer == 30) {
	  if (doOnce == 0) {
	  rockChance = rockChance - .005;
	  coinChance = coinChance + .005;
	  lastCount++;
	  doOnce++;
	}
	}

	var timermod = minutes % 1;
	if (timermod == 0) {
	  if (doOnce == 0) {
	  rockChance = rockChance - .005;
	  coinChance = coinChance + .005;
	  lastCount++;
	  doOnce++;
	}
	}
	}


	function blank() {

	}

	//life loss func
	function lifeDown() {
	  loseLife();
	  background.pos[0] = 0;
	  hero.pos[1] = 500;
	  hero.jump = "NO";
	  if (gameOver == 0) {
	  playSound("grunt");
	  stopSound("CaveRunning");
	}
	}

	//what to render
	function render(){
		gameCanvas.clear();
		if (gameOver == 0) {
		renderEntity(background, 'R2L');
		renderEntity(hero);
		//renderEntity(rocktest);
		renderEntity(miner);
		renderEntities(enemies);
		renderEntities(coins);

	  }
	  //stop rendering if dead
	  if (lives == 0){
		renderEntity(endScreen);
		deathspeed = 0;
	}
		document.getElementById('lives').innerHTML = lives;
		document.getElementById('timer').innerHTML = timer;
		document.getElementById('minutes').innerHTML = minutes;
		document.getElementById('minmark').innerHTML = minmark;
		document.getElementById('points').innerHTML = points;
	}


	//game over function
	function loseLife(){

	//take a life away
	lives--;

	if(lives == 0){
    hero.jump == 'UP';
  	gameOver = true;
    playSound('gameOverNoise');
		//do end of game stuff
		stopSound("DesertThemeMusic");
    stopSound("CaveRunning");
    stopSound("jumpToStep");
    }
}
//Custom Classes - you can put them here, or create a new file for each one and load them into the HTML file separately
//function myBird()
function handleInput(dt) {

	if(input.isDown('SPACE')){
		if(hero.jump == 'NO'){
      if (gameOver == 0) {
      playSound('JumpSound'); //are you here Guy?
    }
      hero.jump = 'UP';
    }
    if(miner.jump == 'NO'){
      miner.jump = 'UP';
    }

		}
    curKey = 'SPACE';

}


    //how many args passed in?
  //  var args = arguments.length;

    //inherit properties
  //  myGameObject.call(this, arguments);

    //specific propeties
//}
//inherit methods
//enemy.prototype = Object.create(myGameObject.prototype);
//ensure own constructor called
//enemy.prototype.constructor  = enemy;
//specific methods

/* usage
 * var enemies = [];
 * enemies.push(new enemy( 'parameters' ));
 */
