var assert = require('assert');

var Ant = require('../lib/Ant.js');

describe('Ant', function () {
  var ant;

  beforeEach(function () {
    ant = new Ant();
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
  
  describe('#move(x, y)', function () {
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
  });








});

