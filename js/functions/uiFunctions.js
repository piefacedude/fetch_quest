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
}