
/*
canvas code for guy witherow's portfolio
*/

/*start up js file confirmation*/
console.log('canvas.js is now running');
//

/*set up canvas*/
var canvas = document.querySelector('canvas');

//canvas.width is the same as the window width and same for height
canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext('2d');


/*creation of circle function*/
function Circle(x, y, dx, dy, rgb, index, radius, nextPos, lastPos, drawOrder) {
  //x and y pos
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.rgb = rgb;
  this.index = index;
  this.nextPos = nextPos;
  this.lastPos = lastPos;
  this.drawOrder = drawOrder;

  //draw this circle
  this.draw = function() {

    //if its radius means it'll break everything, get rid of it.
    if (this.radius < 0) {
      circleArray.splice(this.index, 1);
    }

    //otherwise draw that mf
    else {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = rgb;
      c.fill();

    }

  }

  //update variables
  this.update = function() {

    handleInput();


    /*bounce off walls*/
    //x
    if (this.x + this.radius > innerWidth || this.x < this.radius) {

      if (this.x > innerWidth - this.radius) {
        this.x = innerWidth - this.radius;
      }

      this.dx = -this.dx;
    }

    //y
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {

      if (this.y > innerHeight - this.radius) {
        this.y = innerHeight - this.radius;
      }

      this.dy = -this.dy;
    }

    //acel
    this.x += this.dx;
    this.y += this.dy;
    //
    var endX = findX(this.nextPos);
    var endY = findY(this.nextPos);
    if (this.x < endX + .1 && this.x > endX - .1) {
      this.dx = 0;
      this.dy = 0;
      if (direction == "LEFT") {
        this.nextPos++;
        this.lastPos++;
        if (this.nextPos > 3) {
          this.nextPos = 0;
        }
        if (this.lastPos > 3) {
          this.lastPos = 0;
        }
      }
      else if (direction == "RIGHT") {
        this.nextPos--;
        this.lastPos--;
        if (this.nextPos < 0) {
          this.nextPos = 3;
        }
        if (this.lastPos < 0) {
          this.lastPos = 3;
        }
      }
      if (this.index == 3) {
        onTheMove = "NO";
      }

    }
    else if (this.y < endY + .1 && this.y > endY - .1) {
      this.dx = 0;
      this.dy = 0;
      if (direction == "LEFT") {
        this.nextPos++;
        this.lastPos++;
        if (this.nextPos > 3) {
          this.nextPos = 0;
        }
        if (this.lastPos > 3) {
          this.lastPos = 0;
        }
      }
      else if (direction == "RIGHT") {
        this.nextPos--;
        this.lastPos--;
        if (this.nextPos < 0) {
          this.nextPos = 3;
        }
        if (this.lastPos < 0) {
          this.lastPos = 3;
        }
      }
      if (this.index == 3) {
        onTheMove = "NO";
      }
    }
  }
}

function findPath(url) {
  var path = "nul";
  switch (url) {
    case 0:
      path = "./img/krabs.jpg";
      return path;
      break;

    case 1:
      path = "./img/patrick.png";
      return path;
      break;

    case 2:
      path = "./img/skidward.PNG";
      return path;
      break;

    case 3:
      path = "./img/spongebob.jpg";
      return path;
      break;
    default:

  }
}


var keydown = "NO";
var onTheMove = "NO";
var direction = "INVAL";

function handleInput() {
  if (input.isDown('LEFT')) {
    if (keydown == "NO") {
      direction = "LEFT";
      for (var i = 0; i < 4; i++) {
        var endX = findX(circleArray[i].nextPos);
        var endY = findY(circleArray[i].nextPos);
        if (onTheMove == "NO") {
          move2(i, endX, endY, 20);
          circleArray[i].drawOrder = circleArray[i].nextPos;

        }
      }
      keydown = "YES";
      onTheMove = "YES";

    }
    else {
      keydown = "YES";
    }
  }
  else if(input.isDown('RIGHT')) {
    if (keydown == "NO") {
      direction = "RIGHT";
      for (var i = 0; i < 4; i++) {
        var endX = findX(circleArray[i].lastPos);
        var endY = findY(circleArray[i].lastPos);
        if (onTheMove == "NO") {
          move2(i, endX, endY, 20);
          circleArray[i].drawOrder = circleArray[i].lastPos + 1;
          if (circleArray[i].drawOrder == 4) {
            circleArray[i].drawOrder = 0;
          }
        }
      }
      keydown = "YES";
      onTheMove = "YES";
    }
    else {
      keydown = "YES";
    }
  }
  else{
    keydown = "NO";
  }
}

function move2(i, endX, endY, speed) {
  var difX = 0;
  var difY = 0;
  difX = endX - circleArray[i].x;
  difY = endY - circleArray[i].y;
  circleArray[i].dx = difX / speed;
  circleArray[i].dy = difY / speed;
}


function findX(i) {
  var X = 0;
  switch (i) {
    case 0:
      X = (innerWidth / 2);
      return X;
    break;
    case 1:
      X = (innerWidth / 2) - (circleArray[i].radius * 3);
      return X;
    break;
    case 2:
      X = (innerWidth / 2);
      return X;
    break;
    case 3:
      X = (innerWidth / 2) + (circleArray[i].radius * 3);
      return X;
    break;

  }
}

function findY(i) {
  var Y = 0;
  switch (i) {
    case 0:
      Y = (innerHeight / 2) - (circleArray[i].radius * 1.5);
      return Y;
    break;
    case 1:
      Y = (innerHeight / 2) - (circleArray[i].radius);
      return Y;
    break;
    case 2:
      Y = (innerHeight / 2);
      return Y;
    break;
    case 3:
      Y = (innerHeight / 2) - (circleArray[i].radius);
      return Y;
    break;

  }
}

//vars
var circleArray = [];
var gravity = 1;

for (var i = 0; i < 4; i++) {
  var radius = 30;
  switch (i) {
    case 0:
      presetX = (innerWidth / 2);
      presetY = (innerHeight / 2) - (radius * 1.5);
    break;
    case 1:
      presetX = (innerWidth / 2) - (radius * 3);
      presetY = (innerHeight / 2) - (radius);

    break;
    case 2:
      presetX = (innerWidth / 2);
      presetY = (innerHeight / 2);

    break;
    case 3:
      presetX = (innerWidth / 2) + (radius * 3);
      presetY = (innerHeight / 2) - (radius);

    break;
    default:

  }

  //basic
  var x = presetX;
  var y = presetY;
  //velocity
  var dx = 0;
  var dy = 0;
  //index
  var index = i;

  var nextPos = i + 1;
  var lastPos = i - 1;
  if (nextPos > 3) {
    nextPos = 0;
  }
  if (lastPos < 0) {
    lastPos = 3;
  }

  function rgba() {
    var rgb = "rgba("+Math.floor(Math.random() * 256)+", "+Math.floor(Math.random() * 256)+", "+Math.floor(Math.random() * 256)+", 1)";
    return rgb;
  }

  var rgb = rgba();

  var drawOrder = index;

  //
  circleArray.push(new Circle(x, y, dx, dy, rgb, index, radius, nextPos, lastPos, drawOrder));
}

//animate it good
function animate() {
  //shit i dunno but it works
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);

  //for each of the circles, change the variables

  for (var i = 0; i < circleArray.length; i++) {
    for (var a = 0; a < circleArray.length; a++) {
      if (circleArray[a].drawOrder == i) {
        circleArray[a].draw();
      }
    }
  }
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }


}

animate();
































/*i am a comment to provide whitespace*/
