/* 
 * This file is used from
 * http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 * Please do not re-distribute without permission
 * 
 * ARP 28/07/2014
 * 
 */

var context = null;

(function() {
    function Sprite(url, pos, size, speed, frames, dir, once, facing, scale, opacity) {
        this.pos = pos; //[x,y] of sprite in file
        this.size = size; //[w,h] of sprite
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;

		//Change the direction of sprite
		this.facing = facing || 0; //0 = same as ORIGINAL image in radians
		//Change the size of the sprite
		this.scale = scale || {x:1, y:1}; //factor Eg 2=twice as big, 0.2=half size
        
        //added optional functionality to fade out sprites - set to done once faded, so can be removed
        this.opacity = opacity || 1;
        this.fade = false;
		}

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },

        render: function(ctx, bgScroll) {
            if(this.done) return;
            
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                frame = 0;
            }

            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir === 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            if(this.fade){
                if(this.opacity <= 0){
                    this.done = true;
                    return;
                }else{
                    this.opacity -= 0.01;
                    if(this.opacity < 0) this.opacity = 0;
                    gameCanvas.context.globalAlpha = this.opacity;
                }
            }

			//Rotate sprite based on this.facing
			//gameCanvas.context.translate(this.size[0]/2, this.size[1]/2);
			gameCanvas.context.translate((this.size[0]*this.scale.x)/2, (this.size[1]*this.scale.y)/2); //now takes scale into account
			gameCanvas.context.rotate(this.facing);// * Math.PI/180);

            ctx.drawImage(resources.get(this.url),
                          x, y,
                          this.size[0], this.size[1],
                          -this.size[0]*this.scale.x/2, -this.size[1]*this.scale.y/2,	//move half way back and up
                          this.size[0]*this.scale.x, this.size[1]*this.scale.y);		//shrink.enlarged size

            if(typeof bgScroll !== 'undefined'){
                
                var xPos = this.size[0]*this.scale.x/2;
                var yPos = this.size[1]*this.scale.y/2;
                //one pixel overlap
                if(bgScroll === 'R2L'){ 
					xPos = this.size[0]*this.scale.x/2-1;
					yPos *= -1;
				}else if(bgScroll === 'L2R'){
					xPos = -this.size[0]*this.scale.x*1.5+1;
					yPos *= -1;
				}else if(bgScroll === 'DOWN'){
					yPos = -this.size[1]*this.scale.y*1.5-1;
					xPos *= -1;
				}else if(bgScroll === 'UP'){
					yPos = this.size[1]*this.scale.y/2+1;
					xPos *= -1;
				}

				ctx.drawImage(resources.get(this.url),
                          x, y,
                          this.size[0], this.size[1],
                          xPos, yPos,
                          this.size[0]*this.scale.x, this.size[1]*this.scale.y);
            }
        }
    };

    window.Sprite = Sprite;
})();

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }    
}

function renderEntity(entity, bgScroll) {
    gameCanvas.context.save();
    gameCanvas.context.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(gameCanvas.context, bgScroll);
    gameCanvas.context.restore();
}

