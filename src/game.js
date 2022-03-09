const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const MovingObject = require("./moving_object");
const Ship = require("./ship");

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

function Game () {
  this.asteroids = [];
  this.addAsteroids();
  this.bullets = [];

  this.ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });
}

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
  this.allObjects().forEach( object => {
    object.move(ctx);
  })
}

Game.prototype.wrap = function (pos) {
  return [(pos[0] + Game.DIM_X) % Game.DIM_X, (pos[1] + Game.DIM_Y) % Game.DIM_Y];
}

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.allObjects().length; i++) {
    for (let j = 0; j < this.allObjects().length; j++) {
      if (i != j) {
        let firstObject = this.allObjects()[i];
        let secondObject = this.allObjects()[j];
        if (firstObject.isCollidedWith(secondObject)) {
          let collision = firstObject.collideWith(secondObject);
          if (collision) return;
        }
      }
    }
  }
}

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.add = function (object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
    return true;
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
    return true;
  }
  return false;
}

Game.prototype.remove = function (object) {
  if (object instanceof Asteroid) {
    let idx = this.asteroids.indexOf(object);
    this.asteroids.splice(idx, 1);
    return true;
  } else if (object instanceof Bullet) {
    let idx = this.bullets.indexOf(object);
    this.bullets.splice(idx, 1);
    return true;
  }
}

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship).concat(this.bullets);
}

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] < 0 || pos[0] > 500 || pos[1] < 0 || pos[1] > 500) {
    return true;
  } else {
    return false;
  }
}

module.exports = Game;