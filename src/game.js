const Asteroid = require("./asteroid");
const MovingObject = require("./moving_object");
const Ship = require("./ship");

function Game () {
  this.asteroids = [];
  this.ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });
  this.addAsteroids();
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let newAsteroid = new Asteroid({
      pos: this.randomPosition(),
      game: this
    });
    this.asteroids.push(newAsteroid);    
  }
}

Game.prototype.randomPosition = function () {
  let randX = Math.floor( Math.random() * Game.DIM_X )
  let randY = Math.floor( Math.random() * Game.DIM_Y )
  return [randX, randY]
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 500, 500);
  this.allObjects().forEach( object => {
    object.draw(ctx);
  })
}

Game.prototype.moveObjects = function (ctx) {
  this.asteroids.forEach( asteroid => {
    asteroid.move(ctx);
  })
}

Game.prototype.wrap = function (pos) {
  return [(pos[0] + Game.DIM_X) % Game.DIM_X, (pos[1] + Game.DIM_Y) % Game.DIM_Y];
}

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.asteroids.length; i++) {
    for (let j = 0; j < this.asteroids.length; j++) {
      if (i != j) {
        let firstAsteroid = this.asteroids[i];
        let secondAsteroid = this.asteroids[j];
        if (firstAsteroid.isCollidedWith(secondAsteroid)) {
          console.log("COLLISION");
          firstAsteroid.collideWith(secondAsteroid);
        }
      }
    }
  }
}

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function (asteroidToRemove) {
  let idx = this.asteroids.indexOf(asteroidToRemove);
  this.asteroids.splice(idx, 1);
}

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship);
}

module.exports = Game;