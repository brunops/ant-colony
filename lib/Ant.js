var directions = [ 'N', 'E', 'S', 'W' ];

function Ant(x, y) {
  this.x = typeof x === 'number' ? x : 0;
  this.y = typeof y === 'number' ? y : 0;

  this.direction = directions[Math.random() * 4 >> 0];
}

Ant.prototype.move = function (x, y, worldState) {
  if (!worldState || worldState.isValidPosition(this.x + x, this.y + y)) {
    this.x += x;
    this.y += y;
  }
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
  switch (this.direction) {
    case 'N':
      this.move(-1, 0, worldState);
      this.setDirection('W');
      break;
    case 'E':
      this.move(0, 1, worldState);
      this.setDirection('N');
      break;
    case 'S':
      this.move(1, 0, worldState);
      this.setDirection('E');
      break;
    case 'W':
      this.move(0, -1, worldState);
      this.setDirection('S');
      break;
  }
};

Ant.prototype.walkStraight = function (worldState) {
  switch (this.direction) {
    case 'N':
      this.move(0, 1, worldState);
      break;
    case 'E':
      this.move(1, 0, worldState);
      break;
    case 'S':
      this.move(0, -1, worldState);
      break;
    case 'W':
      this.move(-1, 0, worldState);
  }
};

Ant.prototype.walkRight = function (worldState) {
  switch (this.direction) {
    case 'N':
      this.move(1, 0, worldState);
      this.setDirection('E');
      break;
    case 'E':
      this.move(0, -1, worldState);
      this.setDirection('S');
      break;
    case 'S':
      this.move(-1, 0, worldState);
      this.setDirection('W');
      break;
    case 'W':
      this.move(0, 1, worldState);
      this.setDirection('N');
      break;
  }
};

Ant.prototype.walkUpLeft = function (worldState) {
  switch (this.direction) {
    case 'N':
      this.move(-1, 1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('W');
      }
      break;
    case 'E':
      this.move(1, 1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('N');
      }
      break;
    case 'S':
      this.move(1, -1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('E');
      }
      break;
    case 'W':
      this.move(-1, -1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('S');
      }
      break;
  }
};

Ant.prototype.walkUpRight = function (worldState) {
  switch (this.direction) {
    case 'N':
      this.move(1, 1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('E');
      }
      break;
    case 'E':
      this.move(1, -1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('S');
      }
      break;
    case 'S':
      this.move(-1, -1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('W');
      }
      break;
    case 'W':
      this.move(-1, 1, worldState);
      if (Math.random() * 2 >> 0 === 1) {
        this.setDirection('N');
      }
      break;
  }
};

Ant.prototype.getLeftPosition = function () {
  return [this.x - 1, this.y];
};

module.exports = Ant;

