
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

  var enemyType = "esch";
  var xPos = (battle.battleAreaWidth / (numOfEnemies + 2));

  enemies.push({
    id: enemies.length,
    pos: [xPos * (i+1) + 200,200],
    speed: 0,
    maxHp: 20,
    currentHp: 20,
    sprite: new Sprite('images/Obstacles/batFlying.png', [0, 0], [256, 192], 12, [0, 1, 2, 3, 4, 5], 'vertical', false, 0, {x: 1, y: 1}),
    attacks: ['Swoop', 1, 'Screech', 2],
  })
}

function healingPotionEffect() {
  hero.currentHp += 10;
  if (hero.currentHp > hero.maxHp) {
    hero.currentHp = hero.maxHp;
  }
  gameState = "enemyAttack";
}
