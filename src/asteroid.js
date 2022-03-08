const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULTS = {
  COLOR: 'black',
  RADIUS: 25
}

function Asteroid (options) {
  MovingObject.call(this, options);
  this.color = DEFAULTS.COLOR;
  this.radius = DEFAULTS.RADIUS;
  this.vel = Util.randomVec(2);
}

Util.inherits(Asteroid, MovingObject)

module.exports = Asteroid;