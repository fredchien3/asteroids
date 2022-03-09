const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Util = require("./utils");

const ASTEROID = {
  COLOR: 'black',
  RADIUS: 25
}

function Asteroid (options) {
  MovingObject.call(this, options);
  this.color = ASTEROID.COLOR;
  this.radius = ASTEROID.RADIUS;
  this.vel = Util.randomVec(2);
}
Util.inherits(Asteroid, MovingObject)

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else {
    this.game.remove(this);
    this.game.remove(otherObject);
  }
}

module.exports = Asteroid;