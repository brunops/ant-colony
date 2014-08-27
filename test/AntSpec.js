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
  });
  

});

