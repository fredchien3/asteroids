const MovingObject = require("./moving_object");
const Util = require("./utils");

const SHIP = {
  COLOR: 'red',
  RADIUS: 15
}

function Ship (options) {
  MovingObject.call(this, options);
  this.color = SHIP.COLOR;
  this.radius = SHIP.RADIUS;
  this.vel = [0, 0];
}
Util.inherits(Ship, MovingObject)

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
}

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

module.exports = Ship;