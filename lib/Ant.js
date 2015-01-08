var directions = [ 'N', 'E', 'S', 'W' ];

function Ant(x, y) {
  this.x = typeof x === 'number' ? x : 0;
  this.y = typeof y === 'number' ? y : 0;

  this.direction = directions[Math.random() * 4 >> 0];
}

Ant.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
};

Ant.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
};

Ant.prototype.getPosition = function () {
  return [this.x, this.y];
};

Ant.prototype.pickUpFood = function (food) {
  if (this.carriedFood) {
    throw new Error('Already carrying food.');
  }

  this.carriedFood = food;
};

Ant.prototype.isCarryingFood = function () {
  return !!this.carriedFood;
};

Ant.prototype.getDirection = function () {
  return this.direction;
};

Ant.prototype.setDirection = function (newDirection) {
  this.direction = newDirection;
};

Ant.prototype.walkLeft = function (worldState) {
  var worldSize = worldState.getSize();

  switch (this.direction) {
    case 'N':
      if (this.x > 0) {
        this.move(-1, 0);
      }
      this.setDirection('W');
      break;
    case 'E':
      if (this.y < worldSize) {
        this.move(0, 1);
      }
      this.setDirection('N');
      break;
    case 'S':
      if (this.x < worldSize) {
        this.move(1, 0);
      }
      this.setDirection('E');
      break;
    case 'W':
      if (this.y > 0) {
        this.move(0, -1);
      }
      this.setDirection('S');
      break;
  }
};

Ant.prototype.walkStraight = function (worldState) {
  switch (this.direction) {
    case 'N':
      if (this.y < worldState.getSize()) {
        this.move(0, 1);
      }
      break;
    case 'E':
      this.move(1, 0);
      break;
  }
};

module.exports = Ant;

