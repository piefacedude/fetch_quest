
function generateMonster(i, numOfEnemies) {
  var potEnem = battle.possibleEnemies;
  var totalChance = 0;
  for (var j = 0; j < potEnem.length / 2; j++) {
    totalChance += potEnem[(2 * j) + 1];
  }
  var monsterCheck = Math.random() * totalChance;
  var scaleCheck = 0;
  var enemyType;
  for (var j = 0; j < potEnem.length / 2; j++) {
    scaleCheck += potEnem[2*j + 1];
    if (monsterCheck <= scaleCheck) {
      enemyType = potEnem[2*j];
      j = potEnem.length;
    }
  }

  var enemyType = "bat";
  var xPos = (battle.battleAreaWidth / (numOfEnemies + 2));

  switch (enemyType) {
    case "bat":
    enemy = {
      id: enemies.length,
      name: "Bat",
      pos: [xPos * (i+1) + 200,300],
      speed: 0,
      type: "flying",
      maxHp: 20,
      currentHp: 20,
      sprite: new Sprite('images/Obstacles/batFlying.png', [0, 0], [256, 192], 12, [0, 1, 2, 3, 4, 5], 'vertical', false, 0, {x: .5, y: .5}),
      attacks: ['Swoop', 1, 'Screech', 2],
    }

      break;
    default:

  }

  enemies.push()
}

function healingPotionEffect() {
  hero.currentHp += 10;
  if (hero.currentHp > hero.maxHp) {
    hero.currentHp = hero.maxHp;
  }
  gameState = "enemyAttack";
}
