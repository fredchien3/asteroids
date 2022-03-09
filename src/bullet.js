const MovingObject = require("./moving_object");
const Util = require("./utils");

const BULLET = {
  COLOR: 'blue',
  RADIUS: 5,
  SPEED: 10
}

function Bullet (options) {
  MovingObject.call(this, options);
  this.radius = BULLET.RADIUS;
  this.color = BULLET.COLOR;
  let shipVel = options.vel;
  let newVel = [Math.sign(shipVel[0]) * BULLET.SPEED, Math.sign(shipVel[1]) * BULLET.SPEED];
  this.vel = newVel;
}

Util.inherits(Bullet, MovingObject)

module.exports = Bullet;