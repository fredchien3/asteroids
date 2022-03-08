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

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\r\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\nconst DEFAULTS = {\r\n  COLOR: 'black',\r\n  RADIUS: 25\r\n}\r\n\r\nfunction Asteroid (options) {\r\n  MovingObject.call(this, options);\r\n  this.color = DEFAULTS.COLOR;\r\n  this.radius = DEFAULTS.RADIUS;\r\n  this.vel = Util.randomVec(1);\r\n}\r\n\r\nUtil.inherits(Asteroid, MovingObject)\r\n\r\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\r\n\r\nfunction Game () {\r\n  this.asteroids = [];\r\n\r\n  this.addAsteroids();\r\n}\r\n\r\nGame.DIM_X = 500;\r\nGame.DIM_Y = 500;\r\nGame.NUM_ASTEROIDS = 10;\r\n\r\nGame.prototype.addAsteroids = function () {\r\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\r\n    this.asteroids.push( new Asteroid(this.randomPosition()));    \r\n  }\r\n}\r\n\r\nGame.prototype.randomPosition = function () {\r\n  let randX = Math.floor( Math.random() * Game.DIM_X )\r\n  let randY = Math.floor( Math.random() * Game.DIM_Y )\r\n  return { pos: [randX, randY] }\r\n}\r\n\r\nGame.prototype.draw = function (ctx) {\r\n  ctx.clearRect(0, 0, 500, 500);\r\n  this.asteroids.forEach( asteroid => {\r\n    asteroid.draw(ctx);\r\n  })\r\n}\r\n\r\nGame.prototype.moveObjects = function (ctx) {\r\n  this.asteroids.forEach( asteroid => {\r\n    asteroid.move(ctx);\r\n  })\r\n}\r\n\r\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\r\n// Write a GameView.prototype.start method. It should call setInterval to call Game.prototype.moveObjects and Game.prototype.draw once every 20ms or so.\r\n\r\nfunction GameView (ctx) {\r\n  this.game = new Game;\r\n  this.ctx = ctx;\r\n}\r\n\r\nGameView.prototype.start = function () {\r\n  let that = this;\r\n  setInterval(function () {\r\n    that.game.moveObjects();\r\n    that.game.draw(that.ctx);\r\n  }, 20)\r\n}\r\n\r\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

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

eval("function MovingObject(options) {\r\n  this.pos = options.pos;\r\n  this.vel = options.vel;\r\n  this.radius = options.radius;\r\n  this.color = options.color;\r\n}\r\n\r\nMovingObject.prototype.draw = function (ctx) {\r\n  ctx.beginPath();\r\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);\r\n  // this.call.strokeStyle = 'black';\r\n  // ctx.lineWidth = 10;\r\n  // ctx.stroke();\r\n  ctx.fillStyle = this.color;\r\n  ctx.fill();\r\n}\r\n\r\nMovingObject.prototype.move = function () {\r\n  this.pos[0] += this.vel[0];\r\n  this.pos[1] += this.vel[1];\r\n}\r\n\r\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

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