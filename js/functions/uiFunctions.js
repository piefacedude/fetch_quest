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

function menuX() {
  var centralXAxis = (800 / 5);
  var xShift = (182 * .7);

}

function menuY() {
  var centralYAxis = (600 / 2);
  var yShift = (29 * 2.3);

}



switch (i) {
  case 0:
    X = centralXAxis;
    Y = centralYAxis - yShift;
    action = "flee";
    sprite = new Sprite('images/Prompts/flee.png', [0, 0], [182, 29]);
  break;
  case 1:
    X = centralXAxis - xShift;
    Y = centralYAxis - (yShift / 2);
    action = "special";
    sprite = new Sprite('images/Prompts/special.png', [0, 0], [182, 29]);
  break;
  case 2:
    X = centralXAxis;
    Y = centralYAxis;
    action = "attack";
    sprite = new Sprite('images/Prompts/attack.png', [0, 0], [182, 29]);
  break;
  case 3:
    Y = centralYAxis - (yShift / 2);
    X = centralXAxis + xShift;
    action = "items";
    sprite = new Sprite('images/Prompts/items.png', [0, 0], [182, 29]);
  break;
}

for (var i = 0; i < menu.length; i++) {

  //find start & end point
  switch (menu[i].renderOrder) {
    case 0:
      presetX = centralXAxis;
      presetY = centralYAxis - yShift;
      endY = centralYAxis - (yShift / 2);
      endX = centralXAxis + xShift;

      break;
    case 1:
      presetX = (800 / 4) - (26 * 3);
      presetY = (600 / 2) - (30);
      endX = (800 / 4);
      endY = (600 / 2) - (30 * 2);
      break;
    case 2:
      presetX = (800 / 4);
      presetY = (600 / 2);
      endX = (800 / 4) - (26 * 3);
      endY = (600 / 2) - (30);
      break;
    case 3:
      presetX = (800 / 4) + (26 * 3);
      presetY = (600 / 2) - (30);
      endX = (800 / 4);
      endY = (600 / 2);
      break;
    default:
  }
}
