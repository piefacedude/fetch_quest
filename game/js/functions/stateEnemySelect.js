function renderSelector(type) {
  selector.selectedEnemy = 0;
  if (listTimer <= 10) {

  }
  else {
    //move up the list
    if (input.isDown('LEFT') && listTimer > 10) {
      selected--;
      if (selected <= -1) {
        selected = enemies.length - 1;
      }
      if (enemies[selected].type != selector.attackType && selector.attackType != "any") {
        selected--;
        if (selected <= -1) {
          selected = enemies.length - 1;
        }
      }
      listTimer = 0;
    }
    //move down the list
    if (input.isDown('RIGHT') && listTimer > 10) {
      selected++;
      if (selected >= enemies.length) {
        selected = 0;
      }
      listTimer = 0;
    }
    selector.pos[0] = enemies[selected].pos[0] + ((enemies[selected].sprite.size[0] * enemies[selected].sprite.scale["x"]) / 2) - ((selector.sprite.size[0] * enemies[selected].sprite.scale["x"]) / 2);
    selector.pos[1] = enemies[selected].pos[1];
    //select an option
    if (input.isDown('ENTER') && gameState == "enemySelect") {
      listTimer = 0;
      gameState = "animRunning";
      selector.pos[0] = 1000;
      switch (attackSelected) {
        case "stdJumpAnim":
          stdJumpAnim = true;
          break;
        case "stdBiteAnim":
          stdBiteAnim = true;
          break;
        default:

      }
    }
  }
  listTimer++;
}