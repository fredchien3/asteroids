const Game = require("./game");

function GameView (ctx) {
  this.game = new Game;
  this.ship = this.game.ship;
  this.ctx = ctx;
}

GameView.MOVES = {
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1],
  right: [1, 0]
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  let that = this;
  setInterval(function () {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20)
}

GameView.prototype.bindKeyHandlers = function () {
  let ship = this.ship;

  Object.keys(GameView.MOVES).forEach(function(k) {
    let move = GameView.MOVES[k];
    key(k, function () {ship.power(move) });
  })

  key("space", function () { ship.fireBullet() });
}

module.exports = GameView;