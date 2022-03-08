const Game = require("./game");
// Write a GameView.prototype.start method. It should call setInterval to call Game.prototype.moveObjects and Game.prototype.draw once every 20ms or so.

function GameView (ctx) {
  this.game = new Game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  let that = this;
  setInterval(function () {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20)
}

module.exports = GameView;