////////////////////////*
/* FetchQuest
/* Created by Guy Witherow
/* Last major update: 27/6/18
/* This file handles the various parts of the UI that are either interactive or need updating
/* (this doesn't include the player's action menu, which is included in the statePlayerSelect.js file)
*////////////////////////

function renderHPBar(currentEnemy) {
  gameCanvas.context.fillStyle="#FF0000";
  gameCanvas.context.fillRect(currentEnemy.pos[0] + ((currentEnemy.sprite.size[0] * currentEnemy.sprite.scale.x) / 2) - 50, currentEnemy.pos[1] + (currentEnemy.sprite.size[1] * currentEnemy.sprite.scale.y), 100, 10);
  gameCanvas.context.fillStyle="#00FF00";
  gameCanvas.context.fillRect(currentEnemy.pos[0] + ((currentEnemy.sprite.size[0] * currentEnemy.sprite.scale.x) / 2) - 50, currentEnemy.pos[1] + (currentEnemy.sprite.size[1] * currentEnemy.sprite.scale.y), 100 * (currentEnemy.currentHp/currentEnemy.maxHp), 10);
  gameCanvas.context.fillStyle="#0000FF";
  gameCanvas.context.font = "24px 'Press Start 2P'";
  gameCanvas.context.fillText(currentEnemy.currentHp,currentEnemy.pos[0] + ((currentEnemy.sprite.size[0] * currentEnemy.sprite.scale.x) / 2) + 5, currentEnemy.pos[1] + (currentEnemy.sprite.size[1] * currentEnemy.sprite.scale.y) + 40);
}

function renderHUD() {
  gameCanvas.context.fillStyle="#FF0000";
  gameCanvas.context.font = "24px 'Press Start 2P'";
  text = hero.currentHp + "/" + hero.maxHp;
  gameCanvas.context.fillText(text,140,34);
  gameCanvas.context.fillStyle="#FF00FF";
  gameCanvas.context.font = "24px 'Press Start 2P'";
  text = hero.currentPawPower + "/" + hero.maxPawPower;
  gameCanvas.context.fillText(text,390,34);
}

function menuX(i) {
  var centralXAxis = (800 / 6);
  var xShift = (182 * .55);
  switch (i) {
    case 0:
      X = centralXAxis;
      break;
    case 1:
      X = centralXAxis - xShift;
      break;
    case 2:
      X = centralXAxis;
      break;
    case 3:
      X = centralXAxis + xShift;
      break;
  }
  return X;
}

function menuY(i) {
  var centralYAxis = (600 / 2);
  var yShift = (29 * 1.1);
  switch (i) {
    case 0:
      Y = centralYAxis - yShift;
      break;
    case 1:
      Y = centralYAxis;
      break;
    case 2:
      Y = centralYAxis + yShift;
      break;
    case 3:
      Y = centralYAxis;
      break;
  }
  return Y;
}

function generateMenu(i) {
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
      X = menuX(i);
      Y = menuY(i);
      action = "flee";
      sprite = new Sprite('images/Prompts/flee.png', [0, 0], [182, 29]);
    break;
    case 1:
      X = menuX(i);
      Y = menuY(i);
      action = "special";
      sprite = new Sprite('images/Prompts/special.png', [0, 0], [182, 29]);
    break;
    case 2:
      X = menuX(i);
      Y = menuY(i);
      action = "attack";
      sprite = new Sprite('images/Prompts/attack.png', [0, 0], [182, 29]);
    break;
    case 3:
      X = menuX(i);
      Y = menuY(i);
      action = "items";
      sprite = new Sprite('images/Prompts/items.png', [0, 0], [182, 29]);
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

function generateHUD(i) {
    //x display location (top left pixel)
    var X = 0;
    //y display
    var Y = 0;
    //sprite used for button
    var sprite;
    switch (i) {
      case 0:
        X = 50;
        Y = 0;
        sprite = new Sprite('images/Prompts/hp.png', [0, 0], [60, 40]);
      break;
      case 1:
        X = 300;
        Y = 0;
        sprite = new Sprite('images/Prompts/pp.png', [0, 0], [60, 40]);
      break;
    }
    hud.push({
    pos: [X, Y],
    sprite: sprite
  });
}

function generateShade(i) {
  switch (i) {
    case 0:
      X = menuX(i);
      Y = menuY(i);
    break;
    case 1:
      X = menuX(i);
      Y = menuY(i);
    break;
    case 2:
      X = menuX(i + 1);
      Y = menuY(i + 1);
    break;
  }
  shade.push({
    pos: [X, Y],
    sprite: new Sprite('images/Prompts/shadeBig.png', [0, 0], [185, 29])
  });
}