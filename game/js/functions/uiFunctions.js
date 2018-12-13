////////////////////////*
/* FetchQuest
/* Created by Guy Witherow
/* Last major update: 27/6/18
/* This file handles the various parts of the UI that are either interactive or need updating
/* (this doesn't include the player's action menu, which is included in the statePlayerSelect.js file)
*////////////////////////

function renderHPBar(currentEnemy) {
  //underbar, revealed when health is lost
  gameCanvas.context.fillStyle="#FF0000";
  gameCanvas.context.fillRect(currentEnemy.pos[0] + ((currentEnemy.sprite.size[0] * currentEnemy.sprite.scale.x) / 2) - 50, currentEnemy.pos[1] + (currentEnemy.sprite.size[1] * currentEnemy.sprite.scale.y), 100, 10);
  //overlay, starts all green
  gameCanvas.context.fillStyle="#00FF00";
  gameCanvas.context.fillRect(currentEnemy.pos[0] + ((currentEnemy.sprite.size[0] * currentEnemy.sprite.scale.x) / 2) - 50, currentEnemy.pos[1] + (currentEnemy.sprite.size[1] * currentEnemy.sprite.scale.y), 100 * (currentEnemy.currentHp/currentEnemy.maxHp), 10);
  //text underneath with drop shadow, for more literal reading
  gameCanvas.context.fillStyle="#0000FF";
  gameCanvas.context.shadowOffsetX = 2.5;
  gameCanvas.context.shadowOffsetY = 2.5;
  gameCanvas.context.shadowColor = "rgba(0,0,0,1)";
  gameCanvas.context.font = "30px 'Press Start 2P'";
  gameCanvas.context.fillText(currentEnemy.currentHp,currentEnemy.pos[0] + ((currentEnemy.sprite.size[0] * currentEnemy.sprite.scale.x) / 2) + 7, currentEnemy.pos[1] + (currentEnemy.sprite.size[1] * currentEnemy.sprite.scale.y) + 45);
  //resetting drop shadow settings
  gameCanvas.context.shadowOffsetX = 0;
  gameCanvas.context.shadowOffsetY = 0;
  gameCanvas.context.shadowColor = "rgba(0,0,0,0)";
}

function renderHUD() {
  //current hero HP
  gameCanvas.context.shadowOffsetX = 2.5;
  gameCanvas.context.shadowOffsetY = 2.5;
  gameCanvas.context.shadowColor = "rgba(0,0,0,1)";
  gameCanvas.context.fillStyle="#FF0000";
  gameCanvas.context.font = "24px 'Press Start 2P'";
  text = hero.currentHp + "/" + hero.maxHp;
  gameCanvas.context.fillText(text,140,34);
  //current hero PP
  gameCanvas.context.fillStyle="#FF00FF";
  gameCanvas.context.font = "24px 'Press Start 2P'";
  text = hero.currentPawPower + "/" + hero.maxPawPower;
  gameCanvas.context.fillText(text,390,34);
  gameCanvas.context.shadowOffsetX = 0;
  gameCanvas.context.shadowOffsetY = 0;
  gameCanvas.context.shadowColor = "rgba(0,0,0,0)";
}

function menuX(i) {
  var centralXAxis = (1000 / 6);
  var xShift = (182 * .55);
  switch (i) {
    case 0:
      scale = menuScale(i);
      X = centralXAxis + (((1 - scale) * 182) / 2);
      break;
    case 1:
      scale = menuScale(i);
      X = centralXAxis - xShift + (((1 - scale) * 182) / 2);
      break;
    case 2:
      scale = menuScale(i);
      X = centralXAxis + (((1 - scale) * 182) / 2);
      break;
    case 3:
      scale = menuScale(i);
      X = centralXAxis + xShift + (((1 - scale) * 182) / 2);
      break;
  }
  return X;
}

function menuY(i) {
  var centralYAxis = (600 / 2);
  var yShift = (29 * 1.1);
  switch (i) {
    case 0:
      scale = menuScale(i);
      Y = centralYAxis - yShift + (((1 - scale) * 29) / 2);
      break;
    case 1:
      scale = menuScale(i);
      Y = centralYAxis + (((1 - scale) * 29) / 2);
      break;
    case 2:
      scale = menuScale(i);
      Y = centralYAxis + yShift + (((1 - scale) * 29) / 2);
      break;
    case 3:
      scale = menuScale(i);
      Y = centralYAxis + (((1 - scale) * 29) / 2);
      break;
  }
  return Y;
}

function menuScale(i) {
  switch (i) {
    case 0:
      newScale = .5;
      break;
    case 1:
      newScale = .75;
      break;
    case 2:
      newScale = 1
      break;
    case 3:
      newScale = .75;
      break;
  }
  return newScale;
}

function generateMenu(i) {
  //x display location (top left pixel)
  var X;
  //y display
  var Y;
  //action taken when button is selected
  var action;
  //sprite used for button
  var sprite;
  //order to be rendered
  var renderOrder;
  //size, creates depth in menu
  var scale;
  switch (i) {
    case 0:
      scale = .5;
      X = menuX(i);
      Y = menuY(i);
      renderOrder = 0;
      action = "flee";
      sprite = new Sprite('images/Prompts/flee.png', [0, 0], [182, 29]);
    break;
    case 1:
      scale = .75;
      X = menuX(i);
      Y = menuY(i);
      renderOrder = 2;
      action = "special";
      sprite = new Sprite('images/Prompts/special.png', [0, 0], [182, 29]);
    break;
    case 2:
      scale = 1;
      X = menuX(i);
      Y = menuY(i);
      renderOrder = 1;
      action = "attack";
      sprite = new Sprite('images/Prompts/attack.png', [0, 0], [182, 29]);
    break;
    case 3:
      scale = .75;
      X = menuX(i);
      Y = menuY(i);
      renderOrder = 3;
      action = "items";
      sprite = new Sprite('images/Prompts/items.png', [0, 0], [182, 29]);
    break;
  }
  menu.push({
  pos: [X, Y],
  dx: 0,
  dy: 0,
  speed: 12,
  menuPos: i,
  renderOrder: renderOrder,
  action: action,
  sprite: sprite
  });
  menu[i].sprite.scale['x'] = scale;
  menu[i].sprite.scale['y'] = scale;
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
      X = menuX(i+1);
      Y = menuY(i+1);
    break;
  }
  shade.push({
    pos: [X, Y],
    sprite: new Sprite('images/Prompts/shadeBig.png', [0, 0], [185, 29])
  });
  shade[i].sprite.scale['x'] = scale;
  shade[i].sprite.scale['y'] = scale;
}


function findRenderOrder(i, menuPos) {
  switch (menuPos) {
    case 0:
      menu[i].renderOrder = 0;
      break;
    case 1:
      menu[i].renderOrder = 2;
      break;
    case 2:
      menu[i].renderOrder = 1;
      break;
    case 3:
      menu[i].renderOrder = 3;
      break;
  }
}