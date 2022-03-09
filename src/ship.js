const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULTS = {
  COLOR: 'red',
  RADIUS: 15
}

function Ship (options) {
  MovingObject.call(this, options);
  this.color = DEFAULTS.COLOR;
  this.radius = DEFAULTS.RADIUS;
  this.vel = [0, 0];
}

Util.inherits(Ship, MovingObject)

module.exports = Ship;