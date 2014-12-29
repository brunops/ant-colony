function Ant(x, y) {
  this.x = typeof x === 'number' ? x : 0;
  this.y = typeof y === 'number' ? y : 0;
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

module.exports = Ant;

