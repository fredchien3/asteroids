const Asteroid = require("./asteroid");

function Game () {
  this.asteroids = [];

  this.addAsteroids();
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push( new Asteroid(this.randomPosition()));    
  }
}

Game.prototype.randomPosition = function () {
  let randX = Math.floor( Math.random() * Game.DIM_X )
  let randY = Math.floor( Math.random() * Game.DIM_Y )
  return { pos: [randX, randY] }
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 500, 500);
  this.asteroids.forEach( asteroid => {
    asteroid.draw(ctx);
  })
}

Game.prototype.moveObjects = function (ctx) {
  this.asteroids.forEach( asteroid => {
    asteroid.move(ctx);
  })
}

module.exports = Game;