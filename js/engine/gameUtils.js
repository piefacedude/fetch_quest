/*
 * Generic Library of js Tools
 * Specifically for use with canvas games
 * Code is attributed where appropriate
 *
 * ARP 28/07/2014
 */
//This is for Runner Runner
function myCanvas(canvas_id){

    /*
     * Usage: var canvas = new myCanvas('id_of_canvas');
     */
    me = this;
    me.canvas = document.getElementById(canvas_id);
    me.x = me.canvas.offsetLeft;
    me.y = me.canvas.offsetTop;
    me.width = me.canvas.width;
    me.height = me.canvas.height;
    me.context = me.canvas.getContext('2d');

    me.mouse = {x:0, y:0};

    me.canvas.addEventListener('mousemove', function(event){
        var x = new Number();
        var y = new Number();
        if (event.x !== undefined && event.y !== undefined){
            x = event.x;
            y = event.y;
        }else{ // Firefox method to get the position
            x = event.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        x -= me.canvas.offsetLeft;
        y -= me.canvas.offsetTop;
        //countEl.innerHTML = x+","+y;
    });

    me.canvas.addEventListener('click', function(event){
    /*
    * http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
    * Stop default browser actions and event bubbling [includes the return false;]
    */
        event.preventDefault();

        me.mouse.x = event.pageX - me.canvas.offsetLeft;
        me.mouse.y = event.pageY - me.canvas.offsetTop;


        //console.log(me.mouse);

        //Add Custom Logic here

        /*for(var i=birds.length-1; i>=0; i--){
            if(me.mouse.x >= birds[i].pos[0] && me.mouse.x <= birds[i].pos[0] + birds[i].sprite.size[0] &&
               me.mouse.y >= birds[i].pos[1] && me.mouse.y <= birds[i].pos[1] + birds[i].sprite.size[1]){

                alert('clicked image');
                if yes, delete image

                birds[i].active = false; // cleaned from array later
                break;
            }
        }*/


        //End Custom Logic
        return false;
    });

}

myCanvas.prototype.clear = function(){
    // The following is the proven fastest way to clear the canvas
    /*
     * http://jsperf.com/getimagedata-putimagedata-small-large/4
     *
     */

    me.context.globalCompositeOperation = 'source-over';
    me.context.fillStyle = 'rgba(0,0,0,1)';
    me.context.fillRect(0, 0, 1, 1);
    me.context.clearRect(0, 0, me.width, me.height);
};

/*myCanvas.prototype.handleClick = function (event) {

    //alert('clicked canvas');
    console.log(this.mou se);

    /*
    * http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
    * Stop default browser actions and event bubbling [includes the return false;]
    *
    event.preventDefault();

    //get coords of click as object
    this.mouse.x = event.pageX - this.canvas.offsetLeft;
    this.mouse.y = event.pageY - this.canvas.offsetTop;

    //do something with mouse here
    //such as send to "handle input" function or loop through all game objects and perform hit test

    return false;
};*/


/*
* http://www.ibm.com/developerworks/web/library/wa-games/index.html?ca=drs-
*
*/
// do nothing in the event handler except canceling the event
myCanvas.prototype.ondragstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
};

// do nothing in the event handler except canceling the event
myCanvas.prototype.onselectstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
};

//prevent mobile defaults as well
document.body.ontouchstart = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
};
document.body.ontouchmove = function(e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
    return false;
};

function scrollBg(bgObj, dir, dt){

		if(dir === "R2L"){
			bgObj.pos[0] -= (bgObj.speed*dt);
			if(bgObj.pos[0] < -bgObj.sprite.size[0]*bgObj.sprite.scale.x){
				bgObj.pos[0] = 0;
			}
		}else if(dir === "L2R"){
			bgObj.pos[0] += (bgObj.speed*dt);
			if(bgObj.pos[0] > bgObj.sprite.size[0]*bgObj.sprite.scale.x){
				bgObj.pos[0] = 0;
			}
		}else if(dir === "DOWN"){
			bgObj.pos[1] += (bgObj.speed*dt);
			if(bgObj.pos[1] > bgObj.sprite.size[1]*bgObj.sprite.scale.y){
				bgObj.pos[1] = 0;
    }
		}else if(dir === "UP"){
			bgObj.pos[1] -= (bgObj.speed*dt); //scroll up
			if(bgObj.pos[1] < -bgObj.sprite.size[1]*bgObj.sprite.scale.y){
				bgObj.pos[1] = 0;
			}
		}
}



//Future exploration - can this work?
//Generic game object for all standard properties and methods
function myGameObject() {

    /*imgSrc, pos, size, speed, frames, dir, once*/
    var args = arguments.length;
    //generic properties
    me = this;

    /*
    url: the path to the image for this sprite
    pos: the x and y coordinate in the image for this sprite as array eg [16,13]
    size: size of the sprite (just one keyframe) as array eg [width,height]
    speed: speed in frames/sec for animating
    frames: an array of frame indexes for animating: [0, 1, 2, 1]
    dir: which direction to move in the sprite map when animating: 'horizontal' (default) or 'vertical'
    once: true to only run the animation once, defaults to false
    */

    me.size.width = size[0];
    me.size.height = size[1];

    if(pos === null || typeof pos === 'undefined'){
        me.pos.x = Math.floor(Math.random() * ((gameCanvas.width  - me.size.width)  + 1));
        me.pos.y = Math.floor(Math.random() * ((gameCanvas.height  - me.size.height)  + 1));
    }else{
        me.pos.x = pos[0];
        me.pos.y = pos[1];
    }
    /*me.speed = speed;
    me.frames = frames;
    me.dir = dir;
    me.once = once;*/

    me.sprite = new Sprite(imgSrc, me.pos, me.size, speed, frames, dir, once);

}

//Generic methods
myGameObject.prototype.testClick = function(mouse){
    if(mouse.x >= this.x && mouse.x <= this.x + this.width &&
       mouse.y >= this.y && mouse.y <= this.y + this.height){
       this.handleClick();
    }
};


/*
 * This is an example of using the myGameObject class
 *
 */

function enemy(/*parameters*/){
    //inherit properties
    myGameObject.call(this);

    //specific propeties
}
//inherit methods
enemy.prototype = Object.create(myGameObject.prototype);
//ensure own constructor called
enemy.prototype.constructor  = enemy;
//specific methods

/* usage
 * var enemies = [];
 * enemies.push(new enemy( 'parameters' ));
 */

// Collisions
function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function objectCollides(obj1, obj2){
	return boxCollides(	obj1.pos,
					[obj1.sprite.size[0]*obj1.sprite.scale.x, obj1.sprite.size[1]*obj1.sprite.scale.y],
						obj2.pos,
					[obj2.sprite.size[0]*obj2.sprite.scale.x, obj2.sprite.size[1]*obj2.sprite.scale.y]);
}
//Audio using HTML5 Audio Tag
/*
 * Need to ensure that there is an <audio id='XXX'><source src='url_of_file'></audio> in the HTML page somewhere
 * Suggest is is within the game div, but really doesn't matter
 */
function playSound(id){

    element = document.getElementById(id);
    if(element){
        element.load();
        element.play();
    }else{
        alert("No audio element: '"+id+"'.");
    }
}
function stopSound(id){
    element = document.getElementById(id);
    if(element){
            element.pause();
    }else{
        alert("No audio element: '"+id+"'.");
        }
    }
