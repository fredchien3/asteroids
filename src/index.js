console.log('Webpack is working!');

const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving_object.js');
const Game = require('./game.js');
const GameView = require('./game_view.js');

window.MovingObject = MovingObject;

const mo = new MovingObject({
  pos: [30, 30],
  vel: [10, 10],
  radius: 15,
  color: "#00FF00"
});
// const a = new Asteroid({ pos: [50, 50] });

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementById('game-canvas');
  canvasEl.width = 500;
  canvasEl.height = 500;
  const ctx = canvasEl.getContext('2d');

  const g = new GameView(ctx);
  // mo.draw(ctx);
  // a.draw(ctx);
  g.start();
});