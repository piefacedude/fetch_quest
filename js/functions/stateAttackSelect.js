function attackSelect(selectMode) {
  //this mode is for selecting the specific attack / item
  if (listTimer == 0) {
    switch (selectMode) {
      //attack
      case "attack":
          var lessThan = hero.attacks.length;
          var actionList = hero.attacks;
        break;
      case "items":
      //items
          var lessThan = hero.items.length;
          var actionList = hero.items;
        break;
      case "special":
      //special
          var lessThan = hero.special.length;
          var actionList = hero.special;
        break;
      default:

    }
    for (var i = 0; i < lessThan; i++) {
      //start of the list
      var X = 100;
      //each item is a standard height apart
      var Y = (i * 22) + 200;
      var action = actionList[i].action;
      switch (action) {
        case "stdJumpAnim":
          var sprite = new Sprite('images/Prompts/jump.png', [0, 0], [121, 19]);
          break;
        case "stdBiteAnim":
          var sprite = new Sprite('images/Prompts/bite.png', [0, 0], [121, 19]);
          break;
        case "healingPotion":
         var sprite = new Sprite('images/Prompts/flee.png', [0, 0], [121, 19]);
         break;
        default:
          var sprite = new Sprite('images/Prompts/jump.png', [0, 0], [121, 19]);
      }

      list.push({
      pos: [X, Y],
      dx: 0,
      dy: 0,
      speed: 12,
      renderOrder:i,
      action: action,
      sprite: sprite,
      shade: {
        pos: [X, Y],
        sprite: new Sprite('images/Prompts/shade.png', [0, 0], [121, 19])
      }

    });
    }
  }
  //give a quick moment so that the enter press to select the mode doesnt select an attack
  //also means that each press of the left / right button only moves it one, and at a constant speed.
  if (listTimer <= 10) {

  }
  else {
    //move up the list
    if (input.isDown('UP')) {
      selected--;
      if (selected <= -1) {
        selected = list.length - 1;
      }
      listTimer = 0;
    }
    //move down the list
    if (input.isDown('DOWN')) {
      selected++;
      if (selected >= list.length) {
        selected = 0;
      }
      listTimer = 0;
    }
    //select an option
    if (input.isDown('ENTER') && gameState == "attackSelect") {
      attackSelected = list[selected].action;
      listTimer = 0;
      gameState = "enemySelect";
    }
  }
  listTimer++;
}