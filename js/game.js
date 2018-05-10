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
  pos: [200, 500],
  speed: 10,
  jump: 'NO',
  sprite: new Sprite('images/HeroStuff/heromain.png', [0, 0], [64, 64], 10, [0, 1], 'vertical')
}


function init(){

    //setup all the things we will start/re-start with each game
    reset();


    //reset the clock
    lastTime = Date.now();

    //now, let's get the game going
    gameLoop();
  }

  function reset() {
  }

  function gameLoop() {

    var now = Date.now();
    //delta: time since last loop
    var dt = (now - lastTime) / 1000.0;
    if(dt>0.15){dt = 0.15;} //ensure not too much lag if browser freezes b/w refreshes

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
	}

	//what to render
	function render(){
		gameCanvas.clear();
	}

  function handleInput(dt) {
  	if(input.isDown('SPACE')){
    }
  }
