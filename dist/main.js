/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\r\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\nconst ASTEROID = {\r\n  COLOR: 'black',\r\n  RADIUS: 25\r\n}\r\n\r\nfunction Asteroid (options) {\r\n  MovingObject.call(this, options);\r\n  this.color = ASTEROID.COLOR;\r\n  this.radius = ASTEROID.RADIUS;\r\n  this.vel = Util.randomVec(2);\r\n}\r\nUtil.inherits(Asteroid, MovingObject)\r\n\r\nAsteroid.prototype.collideWith = function (otherObject) {\r\n  if (otherObject instanceof Ship) {\r\n    otherObject.relocate();\r\n  } else {\r\n    this.game.remove(this);\r\n    this.game.remove(otherObject);\r\n  }\r\n}\r\n\r\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\r\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\nconst BULLET = {\r\n  COLOR: 'blue',\r\n  RADIUS: 5,\r\n  SPEED: 10\r\n}\r\n\r\nfunction Bullet (options) {\r\n  MovingObject.call(this, options);\r\n  this.radius = BULLET.RADIUS;\r\n  this.color = BULLET.COLOR;\r\n  let shipVel = options.vel;\r\n  let newVel = [Math.sign(shipVel[0]) * BULLET.SPEED, Math.sign(shipVel[1]) * BULLET.SPEED];\r\n  this.vel = newVel;\r\n}\r\n\r\nUtil.inherits(Bullet, MovingObject)\r\n\r\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\r\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\r\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\r\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\nGame.DIM_X = 500;\r\nGame.DIM_Y = 500;\r\nGame.NUM_ASTEROIDS = 10;\r\n\r\nfunction Game () {\r\n  this.asteroids = [];\r\n  this.addAsteroids();\r\n  this.bullets = [];\r\n\r\n  this.ship = new Ship({\r\n    pos: this.randomPosition(),\r\n    game: this\r\n  });\r\n}\r\n\r\nGame.prototype.addAsteroids = function () {\r\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\r\n    let newAsteroid = new Asteroid({\r\n      pos: this.randomPosition(),\r\n      game: this\r\n    });\r\n    this.asteroids.push(newAsteroid);    \r\n  }\r\n}\r\n\r\nGame.prototype.randomPosition = function () {\r\n  let randX = Math.floor( Math.random() * Game.DIM_X )\r\n  let randY = Math.floor( Math.random() * Game.DIM_Y )\r\n  return [randX, randY]\r\n}\r\n\r\nGame.prototype.draw = function (ctx) {\r\n  ctx.clearRect(0, 0, 500, 500);\r\n  this.allObjects().forEach( object => {\r\n    object.draw(ctx);\r\n  })\r\n}\r\n\r\nGame.prototype.moveObjects = function (ctx) {\r\n  this.allObjects().forEach( object => {\r\n    object.move(ctx);\r\n  })\r\n}\r\n\r\nGame.prototype.wrap = function (pos) {\r\n  return [(pos[0] + Game.DIM_X) % Game.DIM_X, (pos[1] + Game.DIM_Y) % Game.DIM_Y];\r\n}\r\n\r\nGame.prototype.checkCollisions = function () {\r\n  for (let i = 0; i < this.allObjects().length; i++) {\r\n    for (let j = 0; j < this.allObjects().length; j++) {\r\n      if (i != j) {\r\n        let firstObject = this.allObjects()[i];\r\n        let secondObject = this.allObjects()[j];\r\n        if (firstObject.isCollidedWith(secondObject)) {\r\n          firstObject.collideWith(secondObject);\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nGame.prototype.step = function () {\r\n  this.moveObjects();\r\n  this.checkCollisions();\r\n}\r\n\r\nGame.prototype.add = function (object) {\r\n  if (object instanceof Asteroid) {\r\n    this.asteroids.push(object);\r\n    return true;\r\n  } else if (object instanceof Bullet) {\r\n    this.bullets.push(object);\r\n    return true;\r\n  }\r\n  return false;\r\n}\r\n\r\nGame.prototype.remove = function (objectToRemove) {\r\n  let idx = this.allObjects().indexOf(objectToRemove);\r\n  this.allObjects().splice(idx, 1);\r\n}\r\n\r\nGame.prototype.allObjects = function () {\r\n  return this.asteroids.concat(this.ship).concat(this.bullets);\r\n}\r\n\r\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\r\n\r\nfunction GameView (ctx) {\r\n  this.game = new Game;\r\n  this.ship = this.game.ship;\r\n  this.ctx = ctx;\r\n}\r\n\r\nGameView.MOVES = {\r\n  up: [0, -1],\r\n  left: [-1, 0],\r\n  down: [0, 1],\r\n  right: [1, 0]\r\n};\r\n\r\nGameView.prototype.start = function () {\r\n  this.bindKeyHandlers();\r\n  let that = this;\r\n  setInterval(function () {\r\n    that.game.step();\r\n    that.game.draw(that.ctx);\r\n  }, 20)\r\n}\r\n\r\nGameView.prototype.bindKeyHandlers = function () {\r\n  let ship = this.ship;\r\n\r\n  Object.keys(GameView.MOVES).forEach(function(k) {\r\n    let move = GameView.MOVES[k];\r\n    key(k, function () {ship.power(move) });\r\n  })\r\n\r\n  key(\"space\", function () { ship.fireBullet() });\r\n}\r\n\r\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log('Webpack is working!');\r\n\r\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\r\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\r\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\r\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\r\n\r\nwindow.MovingObject = MovingObject;\r\n\r\nconst mo = new MovingObject({\r\n  pos: [30, 30],\r\n  vel: [10, 10],\r\n  radius: 15,\r\n  color: \"#00FF00\"\r\n});\r\n// const a = new Asteroid({ pos: [50, 50] });\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n  const canvasEl = document.getElementById('game-canvas');\r\n  canvasEl.width = 500;\r\n  canvasEl.height = 500;\r\n  const ctx = canvasEl.getContext('2d');\r\n\r\n  const g = new GameView(ctx);\r\n  // mo.draw(ctx);\r\n  // a.draw(ctx);\r\n  g.start();\r\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("function MovingObject(options) {\r\n  this.pos = options.pos;\r\n  this.vel = options.vel;\r\n  this.radius = options.radius;\r\n  this.color = options.color;\r\n  this.game = options.game;\r\n}\r\n\r\nMovingObject.prototype.draw = function (ctx) {\r\n  ctx.beginPath();\r\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);\r\n  // ctx.strokeStyle = 'blue';\r\n  // ctx.lineWidth = 10;\r\n  // ctx.stroke();\r\n  ctx.fillStyle = this.color;\r\n  ctx.fill();\r\n}\r\n\r\nMovingObject.prototype.move = function () {\r\n  this.pos[0] += this.vel[0];\r\n  this.pos[1] += this.vel[1];\r\n  this.pos = this.game.wrap(this.pos);\r\n}\r\n\r\nMovingObject.prototype.isCollidedWith = function (otherObject) {\r\n  let sumRadii = this.radius + otherObject.radius;\r\n  // Use the force: a^2 + b^2 = c^2\r\n  // => distanceX^2 + distanceY^2 = distance^2\r\n  let dX = this.pos[0] - otherObject.pos[0]\r\n  let dY = this.pos[1] - otherObject.pos[1]\r\n  let distance = Math.sqrt((dX ** 2) + (dY ** 2))\r\n  return distance < sumRadii ? true : false;\r\n}\r\n\r\nMovingObject.prototype.collideWith = function (otherObject) {\r\n  // this.game.remove(this);\r\n  // this.game.remove(otherObject);\r\n  // console.log('MO collideWith');\r\n}\r\n\r\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\r\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\r\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\nconst SHIP = {\r\n  COLOR: 'red',\r\n  RADIUS: 15\r\n}\r\n\r\nfunction Ship (options) {\r\n  MovingObject.call(this, options);\r\n  this.color = SHIP.COLOR;\r\n  this.radius = SHIP.RADIUS;\r\n  this.vel = [0, 0];\r\n}\r\nUtil.inherits(Ship, MovingObject)\r\n\r\nShip.prototype.relocate = function () {\r\n  this.pos = this.game.randomPosition();\r\n  this.vel = [0, 0];\r\n}\r\n\r\nShip.prototype.power = function (impulse) {\r\n  this.vel[0] += impulse[0];\r\n  this.vel[1] += impulse[1];\r\n}\r\n\r\nShip.prototype.fireBullet = function () {\r\n  if (this.stationary()) {\r\n    console.log('stationary');\r\n  } else {\r\n    console.log('fireBullet');\r\n    let newBullet = new Bullet({pos: this.pos, vel: this.vel, game: this.game});\r\n    this.game.add(newBullet);\r\n  }\r\n}\r\n\r\nShip.prototype.stationary = function () {\r\n  return (this.vel[0] === 0 && this.vel[1] === 0);\r\n}\r\n\r\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const Util = {\r\n  inherits(childClass, parentClass) {\r\n    childClass.prototype = Object.create(parentClass.prototype);\r\n    childClass.prototype.constructor = childClass;\r\n  },\r\n\r\n  randomVec(length) {\r\n    const deg = 2 * Math.PI * Math.random();\r\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\r\n  },\r\n\r\n  scale(vec, m) {\r\n    return [vec[0] * m, vec[1] * m];\r\n  }\r\n}\r\n\r\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;