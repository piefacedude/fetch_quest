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
    'images/Obstacles/Rock.png'
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

var enemies = [];
var coins = [];
var background;
var hero;
var rocktest;

//('images/player.png', [0, 0], [64, 123], 10, [0, 1, 2, 1])
//img, pos_in_img[x,y], size_in_img[x,y],anim_speed, anim_frames, dir[hor default], anim_repeat[def once], opacity[def 1]
background = {
  pos: [0, 0],
  speed: 600,
  sprite: new Sprite('images/Backgrounds/CaveBackground.png', [0, 0], [800, 600], 16, [0, 1])
}
hero = {
  pos: [200, 500],
  speed: jspeed,
  jump: 'NO',
  sprite: new Sprite('images/HeroStuff/heromain.png', [0, 0], [64, 64], 10, [0, 1], 'vertical')
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


//all the other objects in arrays if there will be lots, single vars if a few
 //create an empty array


//settings for game logic
    //var isGameOver;

//other defaults such as speeds (px/sec), directions?
    //var playerSpeed = 100;

//score and lives status
    //var score = 0;
    //var scoreEl = document.getElementById('score'); //allows us to easily update HTML


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

playSound("DesertThemeMusic");
playSound("CaveRunning");

}

function gameLoop() {

    var now = Date.now();
    //delta: time since last loop
    var dt = (now - lastTime) / 1000.0;
    if(dt>0.15){dt = 0.15;} //ensure not too much lag if browser freezes b/w refreshes



    //Here is where all the work is done
    //Re-calc pos of everything (according to change in time)
    scrollBg(background, "R2L", dt)


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

    for(var i = 0; i < enemies.length; i++){
      enemies[i].pos[0] -= enemies[i].speed *dt;
    }

    var maxJump = 150;
    var ground = 500; //ground+height
    var acceleration = acel;

    if (hero.jump == "NO") {
      hero.sprite.update(dt);
    }



    if(hero.jump == 'UP'){
      if(hero.pos[1] <= ground-maxJump){ //height is negative
        hero.jump = 'DN';
      }else{
    //			hero.pos[1] -= 1;
        hero.pos[1] -= hero.speed * dt;
        hero.speed -= acceleration * dt;

        if(hero.speed < 0){
          hero.speed = 0;
          hero.jump = 'DN';
        }
      }
      console.log(hero.pos[1]);
    }else if(hero.jump == 'DN'){
      if(hero.pos[1] >= ground){
        hero.pos[1] = ground;
        hero.jump = 'NO';
        hero.speed = jspeed;

      }else{
    //			hero.pos[1] += 1;
        hero.pos[1] += hero.speed * dt;
        hero.speed += acceleration * dt;
      }
      console.log(hero.pos[1]);
    }
    //check collisions
    // - in here you would then fire up explosions etc...just other objects!
    // - you would also remove old objects here





  /*
   * Custom Logic
   */
   if (dt > 0) {
     var spawnCheck = 0;
     spawnCheck = Math.random()
     if (spawnCheck > .995) {
       enemies.push({
         pos: [900, 500],
         speed: 600,
         sprite: new Sprite('images/Obstacles/Rock.png', [0, 0], [137, 137])
       });
     }
   }
   /*for(var i=0;i<traffic3.length;i++){
    if (enemies[i] < 0) {
      if(enemies[i].pos[0] < 0){
        enemies.splice(i, 1);
              i--;
            }
          }
        }*/
}

function render(){
    gameCanvas.clear();
    renderEntity(background, 'R2L');
    renderEntity(hero);
    //renderEntity(rocktest);
    renderEntities(enemies);

    document.getElementById('lives').innerHTML = lives;
}


function loseLife(){

	//take a life away
	lives--;

	if(lives == 0){
		gameOver = true;

		//do end of game stuff
		stopSound("DesertThemeMusic");
    }
}
//Custom Classes - you can put them here, or create a new file for each one and load them into the HTML file separately
//function myBird(){
function handleInput(dt) {

	if(input.isDown('SPACE')){
		if(hero.jump == 'NO'){
			hero.jump = 'UP';
      //playSound("CaveRunning");
      playSound("JumpSound");
      stopSound("CaveRunning");


		}
    curKey = 'SPACE';
	}
}



    //how many args passed in?
  //  var args = arguments.length;


    //inherit properties
  //  myGameObject.call(this, arguments);

    //specific propeties
//}
//inherit methods
enemy.prototype = Object.create(myGameObject.prototype);
//ensure own constructor called
enemy.prototype.constructor  = enemy;
//specific methods

/* usage
 * var enemies = [];
 * enemies.push(new enemy( 'parameters' ));
 */
