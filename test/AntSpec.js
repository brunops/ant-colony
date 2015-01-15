var assert = require('assert'),
    sinon = require('sinon');

var Ant = require('../lib/Ant.js');

describe('Ant', function () {
  var ant,
      worldState,
      lastPosition,
      worldStateIsValidStub,
      randomStub;

  beforeEach(function () {
    ant = new Ant();

    randomStub = sinon.stub(Math, 'random');

    worldState = {
      getSize: function () {
        return 10;
      },

      isValidPosition: function (x, y) {
        return true;
      }
    };

    lastPosition = worldState.getSize() - 1;

    worldStateIsValidStub = sinon.stub(worldState, 'isValidPosition');
    worldStateIsValidStub.returns(true);
  });

  afterEach(function () {
    Math.random.restore();
  });

  describe('#new Ant(x, y)', function () {
    it('starts at position x: 0, y: 0 if values are undefined', function () {
      assert.equal(ant.x, 0);
      assert.equal(ant.y, 0);
    });

    it('starts at specified position uppon instantiation', function () {
      ant = new Ant(5, 6);

      assert.equal(ant.x, 5);
      assert.equal(ant.y, 6);
    });
  });

  describe('#setPosition(x, y)', function () {
    it('sets ant position', function () {
      ant = new Ant(2, 3);

      ant.setPosition(5, 7);

      assert(ant.x, 5);
      assert(ant.y, 7);
    });
  });

  describe('#getPosition()', function () {
    it('returns an array with current x and y position', function () {
      ant = new Ant(5, 6);

      assert.deepEqual(ant.getPosition(), [5, 6]);
    });
  });

  describe('#move(x, y, [worldState])', function () {
    it('moves ant by x and y starting at current position', function () {
      ant.move(3, 7);

      assert.equal(ant.x, 3);
      assert.equal(ant.y, 7);
    });

    it('has a cummulative effect', function () {
      ant.move(2, 4);
      ant.move(1, -1);

      assert.equal(ant.x, 3);
      assert.equal(ant.y, 3);
    });

    it('moves ONLY if `worldState.isValidPosition()` duck type is `true`', function () {
      ant.move(2, 3, worldState);

      assert.deepEqual(ant.getPosition(), [2, 3]);
    });

    it('does NOT move if `worldState.isValidPosition()` duck type is `false`', function () {
      worldStateIsValidStub.returns(false);
      ant.move(lastPosition, 3, worldState);

      assert.deepEqual(ant.getPosition(), [0, 0]);
    });
  });

  describe('#pickUpFood()', function () {
    var food;

    beforeEach(function () {
      food = {};
    });

    it('picks up food and set "carriedFood" property', function () {
      ant.pickUpFood(food);
      assert.equal(ant.carriedFood, food);
    });

    it('throws an error if ant is already carrying food', function () {
      var food2 = {};
      ant.pickUpFood(food);
      assert.throws(function () {
        ant.pickUpFood(food2);
      }, Error);
    });
  });

  describe('#isCarryingFood()', function () {
    it('starts not carrying any food', function () {
      assert.equal(ant.isCarryingFood(), false);
    });

    it('is carrying food after #pickUpFood() is called', function () {
      var food = {};

      ant.pickUpFood(food);
      assert.equal(ant.isCarryingFood(), true);
    });
  });

  describe('#getDirection()', function () {
    it('direction is either N, E, S or W', function () {
      assert.notEqual(['N', 'E', 'S', 'W'].indexOf(ant.getDirection()), -1);
    });

    it('starts with a random direction', function () {
      randomStub.returns(0.4);
      var ant1 = new Ant(),
          ant1Direction = ant1.getDirection();

      randomStub.returns(0.6);
      var ant2 = new Ant(),
          ant2Direction = ant2.getDirection();

      assert.notEqual(ant1Direction, ant2Direction);
    });
  });

  describe('#setDirection()', function () {
    it('sets new direction', function () {
      var oldDirection = ant.getDirection();
          newDirection = oldDirection === 'N' ? 'S' : 'N';

      ant.setDirection(newDirection);
      assert.equal(ant.getDirection(), newDirection);
    });
  });

  describe('#walkLeft(worldState)', function () {
    beforeEach(function () {
      ant.setPosition(5, 5);
    });

    it('walks to [x - 1][y] when direction is "N"', function () {
      ant.setDirection('N');
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [4, 5]);
    });

    it('does not go out of bounds when position [0][y] and direction "N"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('N');
      ant.setPosition(0, 5);
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [0, 5]);
    });

    it('direction gets updated to "W" if starting direction is "N"', function () {
      ant.setDirection('N');
      ant.walkLeft(worldState);

      assert.equal(ant.getDirection(), 'W');
    });

    it('walks to [x][y + 1] when direction is "E"', function () {
      ant.setDirection('E');
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [5, 6]);
    });

    it('does not go out of bounds when position [x][maxY] and direction "E"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('E');
      ant.setPosition(5, lastPosition);
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [5, lastPosition]);
    });

    it('direction gets updated to "N" if starting direction is "E"', function () {
      ant.setDirection('E');
      ant.walkLeft(worldState);

      assert.equal(ant.getDirection(), 'N');
    });

    it('walks to [x + 1][y] when direction is "S"', function () {
      ant.setDirection('S');
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [6, 5]);
    });

    it('does not go out of bounds when position [maxX][y] and direction "S"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('S');
      ant.setPosition(lastPosition, 5);
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [lastPosition, 5]);
    });

    it('direction gets updated to "E" if starting direction is "S"', function () {
      ant.setDirection('S');
      ant.walkLeft(worldState);

      assert.equal(ant.getDirection(), 'E');
    });

    it('walks to [x][y - 1] when direction is "W"', function () {
      ant.setDirection('W');
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [5, 4]);
    });

    it('does not go out of bounds when position [x][0] and direction "W"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('W');
      ant.setPosition(5, 0);
      ant.walkLeft(worldState);

      assert.deepEqual(ant.getPosition(), [5, 0]);
    });

    it('direction gets updated to "S" if starting direction is "W"', function () {
      ant.setDirection('W');
      ant.walkLeft(worldState);

      assert.equal(ant.getDirection(), 'S');
    });
  });

  describe('#walkStraight(worldState)', function () {
    beforeEach(function () {
      ant.setPosition(5, 5);
    });

    it('walks to [x][y + 1] when direction is "N"', function () {
      ant.setDirection('N');
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [5, 6]);
    });

    it('does not go out of bounds when position [x][maxY] and direction "N"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('N');
      ant.setPosition(5, lastPosition);
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [5, lastPosition]);
    });

    it('direction stays as "N" after move', function () {
      ant.setDirection('N');
      ant.walkStraight(worldState);

      assert.equal(ant.getDirection(), 'N');
    });

    it('walks to [x + 1][y] when direction is "E"', function () {
      ant.setDirection('E');
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [6, 5]);
    });

    it('does not go out of bounds when position [maxX][y] and direction "E"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('E');
      ant.setPosition(lastPosition, 5);
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [lastPosition, 5]);
    });

    it('direction stays "E" after move', function () {
      ant.setDirection('E');
      ant.walkStraight(worldState);

      assert.equal(ant.getDirection(), 'E');
    });

    it('walks to [x][y - 1] when direction is "S"', function () {
      ant.setDirection('S');
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [5, 4]);
    });

    it('does not go out of bounds when position [x][0] and direction "S"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('S');
      ant.setPosition(5, 0);
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [5, 0]);
    });

    it('direction stays "S" after move', function () {
      ant.setDirection('S');
      ant.walkStraight(worldState);

      assert.equal(ant.getDirection(), 'S');
    });

    it('walks to [x - 1][y] when direction is "W"', function () {
      ant.setDirection('W');
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [4, 5]);
    });

    it('does not go out of bounds when position [0][y] and direction "W"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('W');
      ant.setPosition(0, 5);
      ant.walkStraight(worldState);

      assert.deepEqual(ant.getPosition(), [0, 5]);
    });

    it('direction stays "W" after move', function () {
      ant.setDirection('W');
      ant.walkStraight(worldState);

      assert.equal(ant.getDirection(), 'W');
    });
  });

  describe('#walkRight(worldState)', function () {
    beforeEach(function () {
      ant.setPosition(5, 5);
    });

    it('walks to [x + 1][y] when direction is "N"', function () {
      ant.setDirection('N');
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [6, 5]);
    });

    it('does not go out of bounds when position [maxX][y] and direction "N"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('N');
      ant.setPosition(lastPosition, 5);
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [lastPosition, 5]);
    });

    it('direction gets updated to "E" when starting direction is "N"', function () {
      ant.setDirection('N');
      ant.walkRight(worldState);

      assert.equal(ant.getDirection(), 'E');
    });

    it('walks to [x][y - 1] when direction is "E"', function () {
      ant.setDirection('E');
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [5, 4]);
    });

    it('does not go out of bounds when position [x][0] and direction "E"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('E');
      ant.setPosition(5, 0);
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [5, 0]);
    });

    it('direction gets updated to "S" when starting direction is "E"', function () {
      ant.setDirection('E');
      ant.walkRight(worldState);

      assert.equal(ant.getDirection(), 'S');
    });

    it('walks to [x - 1][y] when direction is "S"', function () {
      ant.setDirection('S');
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [4, 5]);
    });

    it('does not go out of bounds when position [0][y] and direction "S"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('S');
      ant.setPosition(0, 5);
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [0, 5]);
    });

    it('direction gets updated to "W" when starting direction is "S"', function () {
      ant.setDirection('S');
      ant.walkRight(worldState);

      assert.equal(ant.getDirection(), 'W');
    });

    it('walks to [x][y + 1] when direction is "W"', function () {
      ant.setDirection('W');
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [5, 6]);
    });

    it('does not go out of bounds when position [x][maxY] and direction "W"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('W');
      ant.setPosition(5, lastPosition);
      ant.walkRight(worldState);

      assert.deepEqual(ant.getPosition(), [5, lastPosition]);
    });

    it('direction gets updated to "N" when starting direction is "W"', function () {
      ant.setDirection('W');
      ant.walkRight(worldState);

      assert.equal(ant.getDirection(), 'N');
    });
  });

  describe('#walkUpLeft(worldState)', function () {
    beforeEach(function () {
      ant.setPosition(5, 5);
    });

    it('walks to [x - 1][y + 1] when direction is "N"', function () {
      ant.setDirection('N');
      ant.walkUpLeft(worldState);

      assert.deepEqual(ant.getPosition(), [4, 6]);
    });

    it('does not go out of bounds when position [0][yMax] and direction "N"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('N');
      ant.setPosition(0, lastPosition);
      ant.walkUpLeft(worldState);

      assert.deepEqual(ant.getPosition(), [0, lastPosition]);
    });

    it('has 50% chance of updating direction to "W" when starting direction is "N"', function () {
      randomStub.returns(.51);
      ant.setDirection('N');
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'W');
    });

    it('has 50% chance of keeping "N" direction', function () {
      randomStub.returns(.49);
      ant.setDirection('N');
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'N');
    });

    it('walks to [x + 1][y + 1] when direction is "E"', function () {
      ant.setDirection('E');
      ant.walkUpLeft(worldState);

      assert.deepEqual(ant.getPosition(), [6, 6]);
    });

    it('does not go out of bounds when position is [maxX][maxY] and direction "E"', function () {
      ant.setDirection('E');
      ant.setPosition(lastPosition, lastPosition);

      assert.deepEqual(ant.getPosition(), [lastPosition, lastPosition]);
    });

    it('has 50% chance of updating direction to "N" when starting direction is "E"', function () {
      randomStub.returns(.51);
      ant.setDirection('E');
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'N');
    });

    it('has 50% chance of keeping "E" direction', function () {
      randomStub.returns(.49);
      ant.setDirection('E');
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'E');
    });

    it('walks to [x + 1][y - 1] when direction is "S"', function () {
      ant.setDirection('S');
      ant.walkUpLeft(worldState);

      assert.deepEqual(ant.getPosition(), [6, 4]);
    });

    it('does not go out of bounds when position is [maxX][0] and direction "S"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('S');
      ant.setPosition(lastPosition, 0);
      ant.walkUpLeft(worldState);

      assert.deepEqual(ant.getPosition(), [lastPosition, 0]);
    });

    it('has 50% chance of updating direction to "E" when starting direction is "S"', function () {
      ant.setDirection('S');
      randomStub.returns(.51);
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'E');
    });

    it('has 50% chance of keeping "S" direction', function () {
      ant.setDirection('S');
      randomStub.returns(.49);
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'S');
    });

    it('walks to [x - 1][y - 1] when starting direction is "W"', function () {
      ant.setDirection('W');
      ant.walkUpLeft(worldState);

      assert.deepEqual(ant.getPosition(), [4, 4]);
    });

    it('does not go out of bounds when position is [0][0] and direction is "W"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('W');
      ant.setPosition(0, 0);
      ant.walkUpLeft(worldState);

      assert.deepEqual(ant.getPosition(), [0, 0]);
    });

    it('has 50% chance of updating direction to "S" when starting direction is "W"', function () {
      ant.setDirection('W');
      randomStub.returns(.51);
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'S');
    });

    it('has 50% chance of keeping "W" direction', function () {
      ant.setDirection('W');
      randomStub.returns(.49);
      ant.walkUpLeft(worldState);

      assert.equal(ant.getDirection(), 'W');
    });
  });

  describe('#walkUpRight(worldState)', function () {
    beforeEach(function () {
      ant.setPosition(5, 5);
    });

    it('walks to [x + 1][y + 1] when direction is "N"', function () {
      ant.setDirection('N');
      ant.walkUpRight(worldState);

      assert.deepEqual(ant.getPosition(), [6, 6]);
    });

    it('does not go out of bounds when position is [maxX][maxY] and direction "N"', function () {
      ant.setDirection('N');
      worldStateIsValidStub.returns(false);
      ant.setPosition(lastPosition, lastPosition);
      ant.walkUpRight(worldState);

      assert.deepEqual(ant.getPosition(), [lastPosition, lastPosition]);
    });

    it('has 50% chance of facing "W" when starting direction is "N"', function () {
      randomStub.returns(.51);
      ant.setDirection('N');
      ant.walkUpRight(worldState);

      assert.equal(ant.getDirection(), 'W');
    });

    it('has 50% chance of keeping "N" direction', function () {
      randomStub.returns(.49);
      ant.setDirection('N');
      ant.walkUpRight(worldState);

      assert.equal(ant.getDirection(), 'N');
    });

    it('walks to [x + 1][y - 1] when direction is "E"', function () {
      ant.setDirection('E');
      ant.walkUpRight(worldState);

      assert.deepEqual(ant.getPosition(), [6, 4]);
    });

    it('does not go go out of bounds when position is [maxX][0] and direction is "E"', function () {
      worldStateIsValidStub.returns(false);
      ant.setDirection('E');
      ant.setPosition(lastPosition, 0);
      ant.walkUpRight(worldState);

      assert.deepEqual(ant.getPosition(), [lastPosition, 0]);
    });

    it('has 50% chance of facing "S" when starting direction is "E"', function () {
      randomStub.returns(.51);
      ant.setDirection('E');
      ant.walkUpRight(worldState);

      assert.equal(ant.getDirection(), 'S');
    });

    it('has 50% chance of keeping "E" direction', function () {
      randomStub.returns(.49);
      ant.setDirection('E');
      ant.walkUpRight(worldState);

      assert.equal(ant.getDirection(), 'E');
    });

    it('walks to [x - 1][y - 1] when direction is "S"', function () {
      ant.setDirection('S');
      ant.walkUpRight(worldState);

      assert.deepEqual(ant.getPosition(), [4, 4]);
    });
  });
});


