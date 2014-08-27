function Ant(x, y) {
  this.x = typeof x === 'number' ? x : 0;
  this.y = typeof y === 'number' ? y : 0;
}

Ant.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
};

module.exports = Ant;

