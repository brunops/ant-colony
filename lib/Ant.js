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

Ant.prototype.walkLeft = function () {
  if (this.x > 0) {
    this.move(-1, 0);
  }
};

module.exports = Ant;

