function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);
  // this.call.strokeStyle = 'black';
  // ctx.lineWidth = 10;
  // ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();
}

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let sumRadii = this.radius + otherObject.radius;
  // Use the force: a^2 + b^2 = c^2
  // => distanceX^2 + distanceY^2 = distance^2
  let dX = this.pos[0] - otherObject.pos[0]
  let dY = this.pos[1] - otherObject.pos[1]
  let distance = Math.sqrt((dX ** 2) + (dY ** 2))
  return distance < sumRadii ? true : false;
}

MovingObject.prototype.collideWith = function (otherObject) {
  this.game.remove(this);
  this.game.remove(otherObject);
}

module.exports = MovingObject;