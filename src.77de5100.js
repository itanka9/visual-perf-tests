// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"loader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = void 0;
var map;

function load(mapglURL) {
  if (mapglURL === void 0) {
    mapglURL = 'https://mapgl.2gis.com/api/js';
  }

  if (typeof window === 'undefined') {
    throw new Error('mapgl is supported only in browser environment');
  }

  return createScriptAndLoad(mapglURL).then(function () {
    map = window.mapgl;
    return map;
  });
}

exports.load = load;

function createScriptAndLoad(mapglURL) {
  return new Promise(function (resolve, reject) {
    // Create script element and set attributes
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = mapglURL; // Append the script to the DOM

    document.body.appendChild(script); // Resolve the promise once the script is loaded

    script.addEventListener('load', function () {
      resolve();
    }); // Catch any errors while loading the script

    script.addEventListener('error', function (error) {
      reject(error);
    });
  });
}
},{}],"config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runner = void 0;
exports.runner = {
  hostname: '127.0.0.1',
  port: 3003
};
},{}],"tests/render/scenarios.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runTest = exports.cases = void 0; // Типичный кейс для пользователя 2gis.ru:
// 1. Зайти на 11 зуме
// 2. Призумиться к фирме на 16
// 3. Немного отъехать назад

var common = [setZoom(11, {
  animate: false
}), setZoom(16, 4000), setZoom(15, 200), setZoom(14, 0), wait(5000)]; // Кейс для тестирования сжираемой памяти приложением

var memory = [wait(3000), setZoom(17), setCenter([82.90849685668945, 54.98963080619362], {
  duration: 2500
}, 3000), setZoom(14, 2000), setCenter([82.93664932250978, 55.01257157027201], 1000), setZoom(17, {
  duration: 1000
}, 2000), setCenter([82.91759490966797, 55.03353169388017], {
  duration: 2000
}, 3000), setZoom(11, {
  duration: 1000
}, 2000), setCenter([82.99346923828126, 54.990123235010564], 1000), setZoom(14, 2000), setCenter([83.05990219116212, 54.961601652754766], {
  duration: 1000
}, 1500), setCenter([83.0900287628174, 54.87082857361671], {
  duration: 3000
}, 4000), setZoom(17, 2000), setZoom(11, 2000), setCenter([82.96875000000001, 55.02310220421264], 1000), setZoom(17, 2000), setCenter([82.90557861328126, 55.032547895706465], {
  duration: 5000
}, 6000), setZoom(14, 2000), setCenter([82.86300659179689, 54.98362268811953], {
  duration: 3000
}, 3500), setZoom(17), setCenter([82.89753198623659, 54.979657822639815], {
  duration: 3000
}, 3500)]; // Просто залипательный полет

var beauty = [wait(3000), setZoom(18, {
  duration: 3000
}, 4000), setCenter([82.94197082519533, 55.01454012325133], {
  duration: 40000
}, 41000), setCenter([82.91227340698244, 55.041401209743334], {
  duration: 30000
}, 31000)]; // Ужас в Лимасоле

var lemesos = [setCenter([33.00456047058106, 34.671123309195046], {
  animate: false
}, 0), setZoom(17, 5000), setCenter([33.06970596313477, 34.70083628588871], {
  duration: 25000
}, 27000), setCenter([33.00456047058106, 34.671123309195046], {
  duration: 25000
}, 27000)]; // Тест обычной производительности
// Карта уже инициализирована, шейдеры тоже

var perf = [wait(3000), setZoom(18, 4000), setCenter([82.94197082519533, 55.01454012325133], {
  duration: 40000
}, 41000), setCenter([82.91227340698244, 55.041401209743334], {
  duration: 30000
}, 31000)]; // Кейс для тестирования производительности карты в Москве на новых стилях пятерки

var moscow = [setCenter([37.6816, 55.75346], {
  animate: false
}, 0), setZoom(11, 5000), setCenter([37.6016, 55.77346], {
  duration: 2500
}, 3000), setZoom(13, 2000), setCenter([37.6816, 55.75346], 1000), setZoom(17, {
  duration: 1000
}, 2000), setCenter([37.6816, 55.75346], {
  duration: 2000
}, 3000), setZoom(15, {
  duration: 1000
}, 2000), setCenter([37.6816, 55.75346], 1000), setZoom(14, 2000), setCenter([37.6216, 55.55346], {
  duration: 1000
}, 1500), setCenter([37.7216, 55.85346], {
  duration: 2000
}, 3000), setZoom(17, 2000), setZoom(9, 2000), setCenter([37.5216, 55.55346], {
  duration: 1000
}, 1500), setCenter([38.5216, 55.85346], {
  duration: 3000
}, 4000), setZoom(11, 2000), setCenter([37.5816, 55.85346], {
  duration: 4000
}, 5000), setCenter([37.9016, 55.55346], {
  duration: 4000
}, 5000), setZoom(14, 2000), setCenter([37.4816, 55.75346], {
  duration: 2500
}, 3500), setZoom(16, 2000), setCenter([37.61388, 55.75158], {
  duration: 3000
}, 3500), setCenter([37.60235, 55.75438], {
  duration: 3000
}, 3500), setZoom(17, 2000), setCenter([37.601692, 55.744965], {
  duration: 2000
}, 3500), setCenter([37.58532, 55.746361], {
  duration: 2000
}, 3500)];
exports.cases = {
  common: common,
  memory: memory,
  beauty: beauty,
  lemesos: lemesos,
  perf: perf,
  moscow: moscow
};

function runTest(caseName, map) {
  var caseTest = exports.cases[caseName];

  if (!caseTest) {
    console.error('Test "' + caseName + '" not found');
    return;
  }

  var promise = Promise.resolve();
  caseTest.forEach(function (task) {
    promise = promise.then(function (data) {
      return task(data, map);
    });
  });
  return promise;
}

exports.runTest = runTest;

function setCenter(center, options, delay) {
  if (_typeof(options) !== 'object') {
    delay = options;
  }

  delay = delay === undefined ? 3000 : delay;
  return function (data, map) {
    console.log('Set center to ' + center.join(', '));
    map.setCenter(center, options);
    return wait(delay)();
  };
} // function setRotation(rotation, options?, delay?) {
//     if (typeof options !== 'object') {
//         delay = options;
//     }
//     delay = delay === undefined ? 3000 : delay;
//     return () => {
//         console.log('Set rotation to ' + rotation);
//         map.setRotation(rotation, options);
//         return wait(delay)();
//     };
// }


function setZoom(zoom, options, delay) {
  if (_typeof(options) !== 'object') {
    delay = options;
  }

  delay = delay === undefined ? 3000 : delay;
  return function (data, map) {
    console.log('Set zoom to ' + zoom);
    map.setZoom(zoom, options);
    return wait(delay)();
  };
}

function wait(delay) {
  return function (data) {
    return new Promise(function (res) {
      console.log('Wait ' + delay + 'ms');
      setTimeout(function () {
        return res(data);
      }, delay);
    });
  };
}
},{}],"stats.ts":[function(require,module,exports) {
"use strict"; // @ https://stackoverflow.com/questions/48719873/how-to-get-median-and-quartiles-percentiles-of-an-array-in-javascript-or-php

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyedStats = exports.stats = void 0; // sort array ascending

var asc = function asc(arr) {
  return arr.sort(function (a, b) {
    return a - b;
  });
};

var sum = function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
};

var mean = function mean(arr) {
  return sum(arr) / arr.length;
}; // sample standard deviation


var std = function std(arr) {
  var mu = mean(arr);
  var diffArr = arr.map(function (a) {
    return Math.pow(a - mu, 2);
  });
  return Math.sqrt(sum(diffArr) / (arr.length - 1));
};

var quantile = function quantile(arr, q) {
  var sorted = asc(arr);
  var pos = (sorted.length - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
};

var fmt = function fmt(n) {
  return Number(n.toFixed(2));
};

function stats(input) {
  return {
    q25: fmt(quantile(input, .25)),
    median: fmt(quantile(input, .50)),
    q75: fmt(quantile(input, .75)),
    q90: fmt(quantile(input, .90)),
    q95: fmt(quantile(input, .95)),
    q99: fmt(quantile(input, .99))
  };
}

exports.stats = stats;

function keyedStats(input) {
  var keys = Object.keys(input);
  var output = {};

  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var k = keys_1[_i];
    output[k] = stats(input[k]);
  }

  return output;
}

exports.keyedStats = keyedStats;
},{}],"tests/render/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureRender = void 0;

var scenarios_1 = require("./scenarios");

var stats_1 = require("../../stats");

function measureRender(map, scenario) {
  return __awaiter(this, void 0, void 0, function () {
    var ITERATIONS, results, oldCollectStats, frameStart, i;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ITERATIONS = 4;
          results = {
            tileCount: [],
            dynamicTileCount: [],
            drawCount: [],
            vertexCount: [],
            fps: []
          };
          oldCollectStats = map.state.collectStats;
          frameStart = NaN;
          map.on('framestart', function () {
            frameStart = performance.now();
          });
          map.on('frameend', function () {
            var stats = map.state.stats;
            results.fps.push(Math.min(200, 1000 / (performance.now() - frameStart)));
            results.drawCount.push(stats.drawCount);
            results.dynamicTileCount.push(stats.dynamicTileCount);
            results.tileCount.push(stats.tileCount);
            results.vertexCount.push(stats.vertexCount);
          });
          i = 0;
          _a.label = 1;

        case 1:
          if (!(i < ITERATIONS)) return [3
          /*break*/
          , 4];

          if (i > 0) {
            map.state.collectStats = true;
          }

          return [4
          /*yield*/
          , (0, scenarios_1.runTest)(scenario, map)];

        case 2:
          _a.sent();

          _a.label = 3;

        case 3:
          i++;
          return [3
          /*break*/
          , 1];

        case 4:
          map.state.collectStats = oldCollectStats;
          return [2
          /*return*/
          , (0, stats_1.keyedStats)(results)];
      }
    });
  });
}

exports.measureRender = measureRender;
},{"./scenarios":"tests/render/scenarios.ts","../../stats":"stats.ts"}],"../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__spreadArray = __spreadArray;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};

exports.__createBinding = __createBinding;

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */


function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
/** @deprecated */


function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
},{}],"../node_modules/@webmaps/jakarta/dist/es6/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMarkerAnchor = exports.defaultMarkerIcon = exports.cityNameSublayers = exports.landmarkRasterSizes = exports.commercialRasterSizes = exports.floorsDefaultPoiSublayer = exports.landmarkPoiSublayers = exports.personalSublayers = exports.commercialSublayers = exports.transportPoiSublayers = exports.transportPoiSublayerMetroExit = exports.branchPoiSublayers = exports.performanceCheck = exports.fences = exports.floors = exports.camera = exports.inertia = exports.zoom = exports.defaultLang = exports.render = exports.labeling = exports.identify = exports.entranceAnimation = exports.buildingAnimation = exports.tileAnimation = exports.houseHover = exports.forcedDensityPresetIndex = exports.styleMaxDpi = exports.workerResetDebounceTime = exports.analytics = exports.events = exports.fonts = exports.traffic = exports.customStyleServerUrl = exports.urls = exports.atlasSize = exports.loadModelsInfoStyleZoom = exports.modelCacheSize = exports.tiles = exports.MAP_DEFAULTS = void 0;

var _tslib = require("tslib");

var MAP_DEFAULTS = {
  minZoom: 2,
  maxZoom: 20
};
exports.MAP_DEFAULTS = MAP_DEFAULTS;
var tiles = {
  protocol: 'https',
  server: 'tile{subdomain}.maps.2gis.com',
  subdomains: '0123',
  tileSet: 'vector_b',
  tileKey: 'empty',
  appId: 'empty',
  cacheRatio: 2,
  maxUniverseZoom: 8,
  maxRegionalZoom: 15,
  maxDetailLevel: 17,
  displayBounds: false
};
exports.tiles = tiles;
var modelCacheSize = 100;
exports.modelCacheSize = modelCacheSize;
var loadModelsInfoStyleZoom = 13.5;
exports.loadModelsInfoStyleZoom = loadModelsInfoStyleZoom;
var atlasSize = [2048, 2048];
exports.atlasSize = atlasSize;
var urls = {
  tiles: "{protocol}://{host}/vt?r={request}&ts={tileSet}&key={tileKey}&appId={appId}&lang={lang}&default_lang={defaultLang}&s={sessionId}",
  metatile: "{protocol}://{host}/metafiles/{hash}/metatile.json?ts={tileSet}",
  modelInfo: "{protocol}://{host}/metafiles/{regionId}/models.json?ts={tileSet}",
  model: "{protocol}://{host}/metafiles/{regionId}/{name}?ts={tileSet}",
  convertData: "{protocol}://{host}/metafiles/{hash}/convert.json?ts={tileSet}",
  dynamicPoi: "{protocol}://{host}/metafiles/{regionId}/poi/{id}_{width}_{height}.png?ts={tileSet}"
};
exports.urls = urls;
var customStyleServerUrl = 'https://styles.api.2gis.com/styles/{id}';
exports.customStyleServerUrl = customStyleServerUrl;
var traffic = {
  host: 'traffic0.edromaps.2gis.com',
  url: '{protocol}://{host}/tiles?tls={tiles}&reg={regions}&tm={time}&fmt=json&z={z}',
  timestampUrl: '{protocol}://{host}/meta?reg={regions}&time&score',
  updateInterval: 2 * 60 * 1000,
  minZoom: 10,
  maxZoom: 16,
  maxDetailLevel: 17
};
exports.traffic = traffic;
var fonts = {
  url: 'https://mapgl.2gis.com/api/fonts',
  gamma: 0.08,
  baseSize: 24,
  baseLineHeight: 1.2,
  bomCharCode: 65279
};
exports.fonts = fonts;
var events = {
  doubleClickTime: 185,
  dragThreshold: 2,
  pitchWaitingTime: 200,
  pitchThreshold: 7
};
exports.events = events;
var analytics = {
  gaCode: 'UA-25529177-4',
  gaName: 'mapglEngine'
};
exports.analytics = analytics;
var workerResetDebounceTime = 3000; //                          LD   ND   UD   HD   SHD  иначе XHD

exports.workerResetDebounceTime = workerResetDebounceTime;
var styleMaxDpi = [155, 230, 300, 400, 520]; // используется только в дебаг режиме

exports.styleMaxDpi = styleMaxDpi;
var forcedDensityPresetIndex = -1; // -1 для выключения, иначе [0 - 5]

exports.forcedDensityPresetIndex = forcedDensityPresetIndex;
var houseHover = {
  inAnimationTime: 180,
  inAnimationType: 'linear',
  outAnimationTime: 800,
  outAnimationType: 'linear'
};
exports.houseHover = houseHover;
var tileAnimation = {
  time: 300,
  type: 'linear'
};
exports.tileAnimation = tileAnimation;
var buildingAnimation = {
  minStyleZoom: 16,
  duration: 500,
  easing: 'easeOutQuint'
};
exports.buildingAnimation = buildingAnimation;
var entranceAnimation = {
  bounceType: 'easeOutElastic',
  bounceTime: 750,
  growType: 'easeInOutQuad',
  growTime: 750,
  stagger: 0
};
exports.entranceAnimation = entranceAnimation;
var identify = {
  pixelDensity: 0.5,
  sceneOpacity: 0,
  cacheDebounceTime: 400,
  pickDistance: 3
};
exports.identify = identify;
var labeling = {
  interval: 300,
  animationTime: 250,
  animationType: 'linear',
  tileMultiplier: 1.5,
  axisAngleToleranceDeg: 45,
  axisCheckDistancePx: 12,
  boundsDead: false,
  boundsAlive: false,
  commercialBoundsDead: false,
  commercialBoundsAlive: false,
  boundsUnused: false,
  commercialMargins: {
    // todo брать значения из стилей / конфига лейблинга в зависимости от https://jira.2gis.ru/browse/ZNTH-1985
    visibleLeftRight: 60,
    visibleTopBottom: 60,
    appearLeftRight: 70,
    appearTopBottom: 70
  },
  lineLabelsHidePitchDeg: 40,
  maxLabelLength: 30
};
exports.labeling = labeling;
var render = {
  alwaysRerender: false
};
exports.render = render;
var defaultLang = 'en';
exports.defaultLang = defaultLang;
var zoom = {
  mouseDelta: 0.65,
  macTouchDelta: 0.0018,
  animDuration: 400,
  throttleDelay: 100,
  mouseRotateDelta: 2.5,
  mousePitchDelta: 2.5,
  mobilePinchDelta: 1,
  mobileTapDelta: 10
};
exports.zoom = zoom;
var inertia = {
  duration: 1300,
  maxSpeed: 8,
  minSpeed: 0.02,
  nonLinearity: 5
};
exports.inertia = inertia;
var camera = {
  fov: 60,
  near: 1000,
  far: Math.pow(2, 34),
  // Минимальная высота экрана, используемая для расчётов FOV и высоты камеры
  minCalculationScreenHeight: 1000,
  hidePointObjectsAtPitch: 30,
  viewportLimitRatio: 2 // ограничение видимости вьюпорта

};
exports.camera = camera;
var floors = {
  enabled: true,
  url: 'https://floors.api.2gis.ru',
  displayStyleZoom: 17,
  wallHeight: 800,
  islandHeight: 400,
  wallMinBrightness: 0.8265,
  wallMaxBrightness: 0.95,
  // задается в долях от единицы
  viewportPadding: 0.2
};
exports.floors = floors;
var fences = {
  lightIntensity: 0.1
};
exports.fences = fences;
var performanceCheck = {
  fpsCaveat: 10
};
exports.performanceCheck = performanceCheck;
var branchPoiSublayers = ['Commercial_poi_custom', 'Commercial_poi_navi', 'Commercial_poi_default', 'Anchor', 'Transport_poi', 'High_zoom_poi', 'High_zoom_poi_navigator', 'Medium_zoom_poi', 'Medium_zoom_poi_navigator', 'Low_zoom_poi', 'Low_zoom_poi_navigator'];
exports.branchPoiSublayers = branchPoiSublayers;
var transportPoiSublayerMetroExit = ['Subway_exit', 'Subway_exit_on_floor'];
exports.transportPoiSublayerMetroExit = transportPoiSublayerMetroExit;
var transportPoiSublayers = (0, _tslib.__spreadArray)(['Transport_stop'], transportPoiSublayerMetroExit);
exports.transportPoiSublayers = transportPoiSublayers;
var commercialSublayers = ['Commercial_poi_default', 'Commercial_poi_custom', 'Commercial_poi_navi'];
exports.commercialSublayers = commercialSublayers;
var personalSublayers = ['s_personal_poi'];
exports.personalSublayers = personalSublayers;
var landmarkPoiSublayers = ['Landmark_poi', 'Landmark_point'];
exports.landmarkPoiSublayers = landmarkPoiSublayers;
var floorsDefaultPoiSublayer = 'Anchor';
exports.floorsDefaultPoiSublayer = floorsDefaultPoiSublayer;
var commercialRasterSizes = [96, 84, 72, 60, 48, 36, 24];
exports.commercialRasterSizes = commercialRasterSizes;
var landmarkRasterSizes = [105, 84, 63, 42, 21];
exports.landmarkRasterSizes = landmarkRasterSizes;
var cityNameSublayers = ['City_2gis_medium', 'City_2gis_big', 'Capital_2gis'];
exports.cityNameSublayers = cityNameSublayers;
var defaultMarkerIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgMzAgNDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MS4yICg1NzUxOSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+PHRpdGxlPlBhZ2UgMSBDb3B5PC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjUwJSIgeTE9IjUwJSIgeDI9IjUwJSIgeTI9IjAlIiBpZD0ibGluZWFyR3JhZGllbnQtMSI+PHN0b3Agc3RvcC1jb2xvcj0iIzFCODlFRSIgb2Zmc2V0PSIwJSI+PC9zdG9wPjxzdG9wIHN0b3AtY29sb3I9IiMzMTk4RUMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGlkPSJSZWNvdmVyeS0wMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgzOS4wMDAwMDAsIC00MjUuMDAwMDAwKSI+PGcgaWQ9IlBhZ2UtMS1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MzkuMDAwMDAwLCA0MjUuMDAwMDAwKSI+PGVsbGlwc2UgaWQ9Ik92YWwtMyIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMC4wMzYzODA1OTciIGN4PSIxNSIgY3k9IjQ1LjUiIHJ4PSIzIiByeT0iMS41Ij48L2VsbGlwc2U+PGVsbGlwc2UgaWQ9Ik92YWwtMy1Db3B5IiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwLjAzNjM4MDU5NyIgY3g9IjE1IiBjeT0iNDUuNSIgcng9IjQuNSIgcnk9IjIuNSI+PC9lbGxpcHNlPjxwYXRoIGQ9Ik0xNSw0NS44ODM2MzUzIEwxNS44ODIzNTI5LDQ1Ljg4MzYzNTMgQzE1Ljg4MjM1MjksMjkuMjE3NzUyOSAyMC43NzY3NjQ3LDIzLjc5NzQ1ODggMjcuOTg3MzUyOSwyMy43OTc0NTg4IEwyOC4zMjk3MDU5LDIzLjc5NzQ1ODggQzI5LjA3Nzk0MTIsMjEuNTkwNjk0MSAzMCwxNy45OTE1NzY1IDMwLDE1LjAwMDQgQzMwLDcuMTQzOTI5NDEgMjMuNzY3OTQxMiwwLjAwMDQgMTUsMC4wMDA0IEM2LjIzMjA1ODgyLDAuMDAwNCAwLDcuMTQzOTI5NDEgMCwxNS4wMDA0IEMwLDE3Ljk5MTU3NjUgMC45MjIwNTg4MjQsMjEuNTkwNjk0MSAxLjY3MDI5NDEyLDIzLjc5NzQ1ODggTDIuMDEyNjQ3MDYsMjMuNzk3NDU4OCBDOS4yMjQxMTc2NSwyMy43OTc0NTg4IDE0LjExNzY0NzEsMjkuMjE3NzUyOSAxNC4xMTc2NDcxLDQ1Ljg4MzYzNTMgTDE1LDQ1Ljg4MzYzNTMgWiIgaWQ9IkZpbGwtMSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==';
exports.defaultMarkerIcon = defaultMarkerIcon;
var defaultMarkerAnchor = [15, 43];
exports.defaultMarkerAnchor = defaultMarkerAnchor;
},{"tslib":"../node_modules/tslib/tslib.es6.js"}],"../node_modules/@2gis/gl-matrix/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatrixArrayType = setMatrixArrayType;
exports.toRadian = toRadian;
exports.equals = equals;
exports.RANDOM = exports.ARRAY_TYPE = exports.EPSILON = void 0;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
const EPSILON = 0.000001;
exports.EPSILON = EPSILON;
let ARRAY_TYPE = typeof Float64Array !== 'undefined' ? Float64Array : Array;
exports.ARRAY_TYPE = ARRAY_TYPE;
const RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */

exports.RANDOM = RANDOM;

function setMatrixArrayType(type) {
  exports.ARRAY_TYPE = ARRAY_TYPE = type;
}

const degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */


function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
},{}],"../node_modules/@2gis/gl-matrix/vec2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.random = random;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = void 0;

var glMatrix = _interopRequireWildcard(require("./common"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  let out = new glMatrix.ARRAY_TYPE(2);
  out[0] = 0;
  out[1] = 0;
  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */


function clone(a) {
  let out = new glMatrix.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */


function fromValues(x, y) {
  let out = new glMatrix.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */


function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}

;
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}

;
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}

;
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}

;
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}

;
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}

;
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}

;
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}

;
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}

;
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}

;
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}

;
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}

;
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}

;
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}

;
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}

;
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
  }

  return out;
}

;
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

;
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}

;
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}

;
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}

;
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}

;
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}

;
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}

;
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  let x = a[0];
  let y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  let a0 = a[0],
      a1 = a[1];
  let b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */


const len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

exports.len = len;
const sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

exports.sub = sub;
const mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

exports.mul = mul;
const div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

exports.div = div;
const dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

exports.dist = dist;
const sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

exports.sqrDist = sqrDist;
const sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

const forEach = function () {
  let vec = create();
  return function (a, stride, offset, count, fn, arg) {
    let i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

exports.forEach = forEach;
},{"./common":"../node_modules/@2gis/gl-matrix/common.js"}],"../node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.decode = void 0;

/*
 * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
 * Copyright (c) 2021 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // Use a lookup table to find the index.

var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);

for (var i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}

var encode = function (arraybuffer) {
  var bytes = new Uint8Array(arraybuffer),
      i,
      len = bytes.length,
      base64 = '';

  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }

  return base64;
};

exports.encode = encode;

var decode = function (base64) {
  var bufferLength = base64.length * 0.75,
      len = base64.length,
      i,
      p = 0,
      encoded1,
      encoded2,
      encoded3,
      encoded4;

  if (base64[base64.length - 1] === '=') {
    bufferLength--;

    if (base64[base64.length - 2] === '=') {
      bufferLength--;
    }
  }

  var arraybuffer = new ArrayBuffer(bufferLength),
      bytes = new Uint8Array(arraybuffer);

  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }

  return arraybuffer;
};

exports.decode = decode;
},{}],"../node_modules/ieee754/index.js":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../node_modules/pbf/index.js":[function(require,module,exports) {
'use strict';

module.exports = Pbf;

var ieee754 = require('ieee754');

function Pbf(buf) {
    this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
    this.pos = 0;
    this.type = 0;
    this.length = this.buf.length;
}

Pbf.Varint  = 0; // varint: int32, int64, uint32, uint64, sint32, sint64, bool, enum
Pbf.Fixed64 = 1; // 64-bit: double, fixed64, sfixed64
Pbf.Bytes   = 2; // length-delimited: string, bytes, embedded messages, packed repeated fields
Pbf.Fixed32 = 5; // 32-bit: float, fixed32, sfixed32

var SHIFT_LEFT_32 = (1 << 16) * (1 << 16),
    SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;

// Threshold chosen based on both benchmarking and knowledge about browser string
// data structures (which currently switch structure types at 12 bytes or more)
var TEXT_DECODER_MIN_LENGTH = 12;
var utf8TextDecoder = typeof TextDecoder === 'undefined' ? null : new TextDecoder('utf8');

Pbf.prototype = {

    destroy: function() {
        this.buf = null;
    },

    // === READING =================================================================

    readFields: function(readField, result, end) {
        end = end || this.length;

        while (this.pos < end) {
            var val = this.readVarint(),
                tag = val >> 3,
                startPos = this.pos;

            this.type = val & 0x7;
            readField(tag, result, this);

            if (this.pos === startPos) this.skip(val);
        }
        return result;
    },

    readMessage: function(readField, result) {
        return this.readFields(readField, result, this.readVarint() + this.pos);
    },

    readFixed32: function() {
        var val = readUInt32(this.buf, this.pos);
        this.pos += 4;
        return val;
    },

    readSFixed32: function() {
        var val = readInt32(this.buf, this.pos);
        this.pos += 4;
        return val;
    },

    // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)

    readFixed64: function() {
        var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
        this.pos += 8;
        return val;
    },

    readSFixed64: function() {
        var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
        this.pos += 8;
        return val;
    },

    readFloat: function() {
        var val = ieee754.read(this.buf, this.pos, true, 23, 4);
        this.pos += 4;
        return val;
    },

    readDouble: function() {
        var val = ieee754.read(this.buf, this.pos, true, 52, 8);
        this.pos += 8;
        return val;
    },

    readVarint: function(isSigned) {
        var buf = this.buf,
            val, b;

        b = buf[this.pos++]; val  =  b & 0x7f;        if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 7;  if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 14; if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 21; if (b < 0x80) return val;
        b = buf[this.pos];   val |= (b & 0x0f) << 28;

        return readVarintRemainder(val, isSigned, this);
    },

    readVarint64: function() { // for compatibility with v2.0.1
        return this.readVarint(true);
    },

    readSVarint: function() {
        var num = this.readVarint();
        return num % 2 === 1 ? (num + 1) / -2 : num / 2; // zigzag encoding
    },

    readBoolean: function() {
        return Boolean(this.readVarint());
    },

    readString: function() {
        var end = this.readVarint() + this.pos;
        var pos = this.pos;
        this.pos = end;

        if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) {
            // longer strings are fast with the built-in browser TextDecoder API
            return readUtf8TextDecoder(this.buf, pos, end);
        }
        // short strings are fast with our custom implementation
        return readUtf8(this.buf, pos, end);
    },

    readBytes: function() {
        var end = this.readVarint() + this.pos,
            buffer = this.buf.subarray(this.pos, end);
        this.pos = end;
        return buffer;
    },

    // verbose for performance reasons; doesn't affect gzipped size

    readPackedVarint: function(arr, isSigned) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readVarint(isSigned));
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readVarint(isSigned));
        return arr;
    },
    readPackedSVarint: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readSVarint());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readSVarint());
        return arr;
    },
    readPackedBoolean: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readBoolean());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readBoolean());
        return arr;
    },
    readPackedFloat: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readFloat());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readFloat());
        return arr;
    },
    readPackedDouble: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readDouble());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readDouble());
        return arr;
    },
    readPackedFixed32: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readFixed32());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readFixed32());
        return arr;
    },
    readPackedSFixed32: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readSFixed32());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readSFixed32());
        return arr;
    },
    readPackedFixed64: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readFixed64());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readFixed64());
        return arr;
    },
    readPackedSFixed64: function(arr) {
        if (this.type !== Pbf.Bytes) return arr.push(this.readSFixed64());
        var end = readPackedEnd(this);
        arr = arr || [];
        while (this.pos < end) arr.push(this.readSFixed64());
        return arr;
    },

    skip: function(val) {
        var type = val & 0x7;
        if (type === Pbf.Varint) while (this.buf[this.pos++] > 0x7f) {}
        else if (type === Pbf.Bytes) this.pos = this.readVarint() + this.pos;
        else if (type === Pbf.Fixed32) this.pos += 4;
        else if (type === Pbf.Fixed64) this.pos += 8;
        else throw new Error('Unimplemented type: ' + type);
    },

    // === WRITING =================================================================

    writeTag: function(tag, type) {
        this.writeVarint((tag << 3) | type);
    },

    realloc: function(min) {
        var length = this.length || 16;

        while (length < this.pos + min) length *= 2;

        if (length !== this.length) {
            var buf = new Uint8Array(length);
            buf.set(this.buf);
            this.buf = buf;
            this.length = length;
        }
    },

    finish: function() {
        this.length = this.pos;
        this.pos = 0;
        return this.buf.subarray(0, this.length);
    },

    writeFixed32: function(val) {
        this.realloc(4);
        writeInt32(this.buf, val, this.pos);
        this.pos += 4;
    },

    writeSFixed32: function(val) {
        this.realloc(4);
        writeInt32(this.buf, val, this.pos);
        this.pos += 4;
    },

    writeFixed64: function(val) {
        this.realloc(8);
        writeInt32(this.buf, val & -1, this.pos);
        writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
        this.pos += 8;
    },

    writeSFixed64: function(val) {
        this.realloc(8);
        writeInt32(this.buf, val & -1, this.pos);
        writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
        this.pos += 8;
    },

    writeVarint: function(val) {
        val = +val || 0;

        if (val > 0xfffffff || val < 0) {
            writeBigVarint(val, this);
            return;
        }

        this.realloc(4);

        this.buf[this.pos++] =           val & 0x7f  | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] =   (val >>> 7) & 0x7f;
    },

    writeSVarint: function(val) {
        this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
    },

    writeBoolean: function(val) {
        this.writeVarint(Boolean(val));
    },

    writeString: function(str) {
        str = String(str);
        this.realloc(str.length * 4);

        this.pos++; // reserve 1 byte for short string length

        var startPos = this.pos;
        // write the string directly to the buffer and see how much was written
        this.pos = writeUtf8(this.buf, str, this.pos);
        var len = this.pos - startPos;

        if (len >= 0x80) makeRoomForExtraLength(startPos, len, this);

        // finally, write the message length in the reserved place and restore the position
        this.pos = startPos - 1;
        this.writeVarint(len);
        this.pos += len;
    },

    writeFloat: function(val) {
        this.realloc(4);
        ieee754.write(this.buf, val, this.pos, true, 23, 4);
        this.pos += 4;
    },

    writeDouble: function(val) {
        this.realloc(8);
        ieee754.write(this.buf, val, this.pos, true, 52, 8);
        this.pos += 8;
    },

    writeBytes: function(buffer) {
        var len = buffer.length;
        this.writeVarint(len);
        this.realloc(len);
        for (var i = 0; i < len; i++) this.buf[this.pos++] = buffer[i];
    },

    writeRawMessage: function(fn, obj) {
        this.pos++; // reserve 1 byte for short message length

        // write the message directly to the buffer and see how much was written
        var startPos = this.pos;
        fn(obj, this);
        var len = this.pos - startPos;

        if (len >= 0x80) makeRoomForExtraLength(startPos, len, this);

        // finally, write the message length in the reserved place and restore the position
        this.pos = startPos - 1;
        this.writeVarint(len);
        this.pos += len;
    },

    writeMessage: function(tag, fn, obj) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeRawMessage(fn, obj);
    },

    writePackedVarint:   function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedVarint, arr);   },
    writePackedSVarint:  function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedSVarint, arr);  },
    writePackedBoolean:  function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedBoolean, arr);  },
    writePackedFloat:    function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedFloat, arr);    },
    writePackedDouble:   function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedDouble, arr);   },
    writePackedFixed32:  function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedFixed32, arr);  },
    writePackedSFixed32: function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedSFixed32, arr); },
    writePackedFixed64:  function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedFixed64, arr);  },
    writePackedSFixed64: function(tag, arr) { if (arr.length) this.writeMessage(tag, writePackedSFixed64, arr); },

    writeBytesField: function(tag, buffer) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeBytes(buffer);
    },
    writeFixed32Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeFixed32(val);
    },
    writeSFixed32Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeSFixed32(val);
    },
    writeFixed64Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeFixed64(val);
    },
    writeSFixed64Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeSFixed64(val);
    },
    writeVarintField: function(tag, val) {
        this.writeTag(tag, Pbf.Varint);
        this.writeVarint(val);
    },
    writeSVarintField: function(tag, val) {
        this.writeTag(tag, Pbf.Varint);
        this.writeSVarint(val);
    },
    writeStringField: function(tag, str) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeString(str);
    },
    writeFloatField: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeFloat(val);
    },
    writeDoubleField: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeDouble(val);
    },
    writeBooleanField: function(tag, val) {
        this.writeVarintField(tag, Boolean(val));
    }
};

function readVarintRemainder(l, s, p) {
    var buf = p.buf,
        h, b;

    b = buf[p.pos++]; h  = (b & 0x70) >> 4;  if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 3;  if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 10; if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 17; if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x7f) << 24; if (b < 0x80) return toNum(l, h, s);
    b = buf[p.pos++]; h |= (b & 0x01) << 31; if (b < 0x80) return toNum(l, h, s);

    throw new Error('Expected varint not more than 10 bytes');
}

function readPackedEnd(pbf) {
    return pbf.type === Pbf.Bytes ?
        pbf.readVarint() + pbf.pos : pbf.pos + 1;
}

function toNum(low, high, isSigned) {
    if (isSigned) {
        return high * 0x100000000 + (low >>> 0);
    }

    return ((high >>> 0) * 0x100000000) + (low >>> 0);
}

function writeBigVarint(val, pbf) {
    var low, high;

    if (val >= 0) {
        low  = (val % 0x100000000) | 0;
        high = (val / 0x100000000) | 0;
    } else {
        low  = ~(-val % 0x100000000);
        high = ~(-val / 0x100000000);

        if (low ^ 0xffffffff) {
            low = (low + 1) | 0;
        } else {
            low = 0;
            high = (high + 1) | 0;
        }
    }

    if (val >= 0x10000000000000000 || val < -0x10000000000000000) {
        throw new Error('Given varint doesn\'t fit into 10 bytes');
    }

    pbf.realloc(10);

    writeBigVarintLow(low, high, pbf);
    writeBigVarintHigh(high, pbf);
}

function writeBigVarintLow(low, high, pbf) {
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
    pbf.buf[pbf.pos]   = low & 0x7f;
}

function writeBigVarintHigh(high, pbf) {
    var lsb = (high & 0x07) << 4;

    pbf.buf[pbf.pos++] |= lsb         | ((high >>>= 3) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
    pbf.buf[pbf.pos++]  = high & 0x7f;
}

function makeRoomForExtraLength(startPos, len, pbf) {
    var extraLen =
        len <= 0x3fff ? 1 :
        len <= 0x1fffff ? 2 :
        len <= 0xfffffff ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));

    // if 1 byte isn't enough for encoding message length, shift the data to the right
    pbf.realloc(extraLen);
    for (var i = pbf.pos - 1; i >= startPos; i--) pbf.buf[i + extraLen] = pbf.buf[i];
}

function writePackedVarint(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeVarint(arr[i]);   }
function writePackedSVarint(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeSVarint(arr[i]);  }
function writePackedFloat(arr, pbf)    { for (var i = 0; i < arr.length; i++) pbf.writeFloat(arr[i]);    }
function writePackedDouble(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeDouble(arr[i]);   }
function writePackedBoolean(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeBoolean(arr[i]);  }
function writePackedFixed32(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed32(arr[i]);  }
function writePackedSFixed32(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed32(arr[i]); }
function writePackedFixed64(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed64(arr[i]);  }
function writePackedSFixed64(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed64(arr[i]); }

// Buffer code below from https://github.com/feross/buffer, MIT-licensed

function readUInt32(buf, pos) {
    return ((buf[pos]) |
        (buf[pos + 1] << 8) |
        (buf[pos + 2] << 16)) +
        (buf[pos + 3] * 0x1000000);
}

function writeInt32(buf, val, pos) {
    buf[pos] = val;
    buf[pos + 1] = (val >>> 8);
    buf[pos + 2] = (val >>> 16);
    buf[pos + 3] = (val >>> 24);
}

function readInt32(buf, pos) {
    return ((buf[pos]) |
        (buf[pos + 1] << 8) |
        (buf[pos + 2] << 16)) +
        (buf[pos + 3] << 24);
}

function readUtf8(buf, pos, end) {
    var str = '';
    var i = pos;

    while (i < end) {
        var b0 = buf[i];
        var c = null; // codepoint
        var bytesPerSequence =
            b0 > 0xEF ? 4 :
            b0 > 0xDF ? 3 :
            b0 > 0xBF ? 2 : 1;

        if (i + bytesPerSequence > end) break;

        var b1, b2, b3;

        if (bytesPerSequence === 1) {
            if (b0 < 0x80) {
                c = b0;
            }
        } else if (bytesPerSequence === 2) {
            b1 = buf[i + 1];
            if ((b1 & 0xC0) === 0x80) {
                c = (b0 & 0x1F) << 0x6 | (b1 & 0x3F);
                if (c <= 0x7F) {
                    c = null;
                }
            }
        } else if (bytesPerSequence === 3) {
            b1 = buf[i + 1];
            b2 = buf[i + 2];
            if ((b1 & 0xC0) === 0x80 && (b2 & 0xC0) === 0x80) {
                c = (b0 & 0xF) << 0xC | (b1 & 0x3F) << 0x6 | (b2 & 0x3F);
                if (c <= 0x7FF || (c >= 0xD800 && c <= 0xDFFF)) {
                    c = null;
                }
            }
        } else if (bytesPerSequence === 4) {
            b1 = buf[i + 1];
            b2 = buf[i + 2];
            b3 = buf[i + 3];
            if ((b1 & 0xC0) === 0x80 && (b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
                c = (b0 & 0xF) << 0x12 | (b1 & 0x3F) << 0xC | (b2 & 0x3F) << 0x6 | (b3 & 0x3F);
                if (c <= 0xFFFF || c >= 0x110000) {
                    c = null;
                }
            }
        }

        if (c === null) {
            c = 0xFFFD;
            bytesPerSequence = 1;

        } else if (c > 0xFFFF) {
            c -= 0x10000;
            str += String.fromCharCode(c >>> 10 & 0x3FF | 0xD800);
            c = 0xDC00 | c & 0x3FF;
        }

        str += String.fromCharCode(c);
        i += bytesPerSequence;
    }

    return str;
}

function readUtf8TextDecoder(buf, pos, end) {
    return utf8TextDecoder.decode(buf.subarray(pos, end));
}

function writeUtf8(buf, str, pos) {
    for (var i = 0, c, lead; i < str.length; i++) {
        c = str.charCodeAt(i); // code point

        if (c > 0xD7FF && c < 0xE000) {
            if (lead) {
                if (c < 0xDC00) {
                    buf[pos++] = 0xEF;
                    buf[pos++] = 0xBF;
                    buf[pos++] = 0xBD;
                    lead = c;
                    continue;
                } else {
                    c = lead - 0xD800 << 10 | c - 0xDC00 | 0x10000;
                    lead = null;
                }
            } else {
                if (c > 0xDBFF || (i + 1 === str.length)) {
                    buf[pos++] = 0xEF;
                    buf[pos++] = 0xBF;
                    buf[pos++] = 0xBD;
                } else {
                    lead = c;
                }
                continue;
            }
        } else if (lead) {
            buf[pos++] = 0xEF;
            buf[pos++] = 0xBF;
            buf[pos++] = 0xBD;
            lead = null;
        }

        if (c < 0x80) {
            buf[pos++] = c;
        } else {
            if (c < 0x800) {
                buf[pos++] = c >> 0x6 | 0xC0;
            } else {
                if (c < 0x10000) {
                    buf[pos++] = c >> 0xC | 0xE0;
                } else {
                    buf[pos++] = c >> 0x12 | 0xF0;
                    buf[pos++] = c >> 0xC & 0x3F | 0x80;
                }
                buf[pos++] = c >> 0x6 & 0x3F | 0x80;
            }
            buf[pos++] = c & 0x3F | 0x80;
        }
    }
    return pos;
}

},{"ieee754":"../node_modules/ieee754/index.js"}],"../node_modules/@2gis/gl-matrix/vec3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.length = length;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.hermite = hermite;
exports.bezier = bezier;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.angle = angle;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;

var glMatrix = _interopRequireWildcard(require("./common"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  let out = new glMatrix.ARRAY_TYPE(3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */


function fromValues(x, y, z) {
  let out = new glMatrix.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */


function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */


function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */


function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */


function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */


function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }

  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  let ax = a[0],
      ay = a[1],
      az = a[2];
  let bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


function hermite(out, a, b, c, d, t) {
  let factorTimes2 = t * t;
  let factor1 = factorTimes2 * (2 * t - 3) + 1;
  let factor2 = factorTimes2 * (t - 2) + t;
  let factor3 = factorTimes2 * (t - 1);
  let factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


function bezier(out, a, b, c, d, t) {
  let inverseFactor = 1 - t;
  let inverseFactorTimesTwo = inverseFactor * inverseFactor;
  let factorTimes2 = t * t;
  let factor1 = inverseFactorTimesTwo * inverseFactor;
  let factor2 = 3 * t * inverseFactorTimesTwo;
  let factor3 = 3 * factorTimes2 * inverseFactor;
  let factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */


function random(out, scale) {
  scale = scale || 1.0;
  let r = glMatrix.RANDOM() * 2.0 * Math.PI;
  let z = glMatrix.RANDOM() * 2.0 - 1.0;
  let zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */


function transformMat4(out, a, m) {
  let x = a[0],
      y = a[1],
      z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


function transformMat3(out, a, m) {
  let x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */


function transformQuat(out, a, q) {
  // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations
  let x = a[0],
      y = a[1],
      z = a[2];
  let qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  let ix = qw * x + qy * z - qz * y;
  let iy = qw * y + qz * x - qx * z;
  let iz = qw * z + qx * y - qy * x;
  let iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


function rotateX(out, a, b, c) {
  let p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


function rotateY(out, a, b, c) {
  let p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


function rotateZ(out, a, b, c) {
  let p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */


function angle(a, b) {
  let tempA = fromValues(a[0], a[1], a[2]);
  let tempB = fromValues(b[0], b[1], b[2]);
  normalize(tempA, tempA);
  normalize(tempB, tempB);
  let cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  let a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  let b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */


const sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

exports.sub = sub;
const mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

exports.mul = mul;
const div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

exports.div = div;
const dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

exports.dist = dist;
const sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

exports.sqrDist = sqrDist;
const len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

exports.len = len;
const sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

const forEach = function () {
  let vec = create();
  return function (a, stride, offset, count, fn, arg) {
    let i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

exports.forEach = forEach;
},{"./common":"../node_modules/@2gis/gl-matrix/common.js"}],"../node_modules/@2gis/gl-matrix/mat4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.fromValues = fromValues;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.scale = scale;
exports.rotate = rotate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.fromTranslation = fromTranslation;
exports.fromScaling = fromScaling;
exports.fromRotation = fromRotation;
exports.fromXRotation = fromXRotation;
exports.fromYRotation = fromYRotation;
exports.fromZRotation = fromZRotation;
exports.fromRotationTranslation = fromRotationTranslation;
exports.getTranslation = getTranslation;
exports.getScaling = getScaling;
exports.getRotation = getRotation;
exports.fromRotationTranslationScale = fromRotationTranslationScale;
exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
exports.fromQuat = fromQuat;
exports.frustum = frustum;
exports.perspective = perspective;
exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
exports.ortho = ortho;
exports.lookAt = lookAt;
exports.targetTo = targetTo;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.fromTranslationScale = fromTranslationScale;
exports.vpFromTargetEyeView = vpFromTargetEyeView;
exports.sub = exports.mul = void 0;

var glMatrix = _interopRequireWildcard(require("./common"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 4x4 Matrix
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  let out = new glMatrix.ARRAY_TYPE(16);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */


function clone(a) {
  let out = new glMatrix.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */


function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  let out = new glMatrix.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */


function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a12 = a[6],
        a13 = a[7];
    let a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function invert(out, a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function adjoint(out, a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function multiply(out, a, b) {
  let a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  let a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  let a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  let a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */


function translate(out, a, v) {
  let x = v[0],
      y = v[1],
      z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/


function scale(out, a, v) {
  let x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function rotate(out, a, rad, axis) {
  let x = axis[0],
      y = axis[1],
      z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;

  if (Math.abs(len) < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateX(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateY(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateZ(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */


function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */


function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function fromRotation(out, rad, axis) {
  let x = axis[0],
      y = axis[1],
      z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;

  if (Math.abs(len) < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromXRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromYRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromZRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */


function fromRotationTranslation(out, q, v) {
  // Quaternion math
  let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getScaling(out, mat) {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */


function getRotation(out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  let trace = mat[0] + mat[5] + mat[10];
  let S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S;
    out[2] = (mat[1] - mat[4]) / S;
  } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S;
    out[2] = (mat[8] + mat[2]) / S;
  } else if (mat[5] > mat[10]) {
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S;
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S;
  } else {
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */


function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */


function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];
  let ox = o[0];
  let oy = o[1];
  let oz = o[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */


function fromQuat(out, q) {
  let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */


function frustum(out, left, right, bottom, top, near, far) {
  let rl = 1 / (right - left);
  let tb = 1 / (top - bottom);
  let nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function perspective(out, fovy, aspect, near, far) {
  let f = 1.0 / Math.tan(fovy / 2);
  let nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function perspectiveFromFieldOfView(out, fov, near, far) {
  let upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  let downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  let leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  let rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  let xScale = 2.0 / (leftTan + rightTan);
  let yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function ortho(out, left, right, bottom, top, near, far) {
  let lr = 1 / (left - right);
  let bt = 1 / (bottom - top);
  let nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


function lookAt(out, eye, center, up) {
  let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  let eyex = eye[0];
  let eyey = eye[1];
  let eyez = eye[2];
  let upx = up[0];
  let upy = up[1];
  let upz = up[2];
  let centerx = center[0];
  let centery = center[1];
  let centerz = center[2];

  if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
    return mat4.identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


function targetTo(out, eye, target, up) {
  let eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  let z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  let len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  let x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}

;
/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */


function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function equals(a, b) {
  let a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  let a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  let a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  let a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  let b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  let b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  let b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */


const mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

exports.mul = mul;
const sub = subtract;
/**
 * Create a matrix from a vector translation and vector scale
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} t Translation
 * @param {vec3} s Scale
 * @returns {mat4} out
 */

exports.sub = sub;

function fromTranslationScale(out, t, s) {
  out[0] = s[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = s[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = s[2];
  out[11] = 0;
  out[12] = t[0];
  out[13] = t[1];
  out[14] = t[2];
  out[15] = 1;
  return out;
}
/**
 * @typedef {Object} MVPView Visible bound in the screen
 * It is convenient when you need to render only part of the screen
 * @property {number} x Coordinate X of the beginning of the bound
 * @property {number} y Coordinate y of the beginning of the bound
 * @property {number} width Width of the bound
 * @property {number} height Height of the bound
 */

/**
 * Create a VP matrix from center, eye with perspective projection
 * @param {mat4} out mat4 receiving operation result
 * @param {number} fov Vertical field of view in radians
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @param {vec2} size Width and height of viewport
 * @param {vec3} target Point the viewer is looking at
 * @param {vec3} eye Position of the viewer
 * @param {?MVPView} view Visible bound in the screen
 * @returns {mat4} out
 */


function vpFromTargetEyeView(out, fov, near, far, size, target, eye, view) {
  // https://github.com/mrdoob/three.js/blob/dev/src/cameras/PerspectiveCamera.js#L171
  // https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js#L817
  const aspect = size[0] / size[1];
  let top = near * Math.tan(glMatrix.toRadian(fov) / 2);
  let height = 2 * top;
  let width = aspect * height;
  let left = -width / 2;

  if (view) {
    left += view.x * width / size[0];
    top -= view.y * height / size[1];
    width *= view.width / size[0];
    height *= view.height / size[1];
  }

  const right = left + width;
  const bottom = top - height;
  const p00 = 2 * near / (right - left);
  const p20 = (right + left) / (right - left);
  const p21 = (top + bottom) / (top - bottom);
  const p11 = 2 * near / (top - bottom);
  const p22 = -(far + near) / (far - near);
  const p32 = -2 * far * near / (far - near); // Calculate view-matrix

  let v00 = 0;
  let v10 = 0; // http://www.3dgep.com/understanding-the-view-matrix/#Look_At_Camera
  // zAxis = normalize(eye - target)

  let v02 = eye[0] - target[0];
  let v12 = eye[1] - target[1];
  let v22 = eye[2] - target[2];
  let len = v02 * v02 + v12 * v12 + v22 * v22;

  if (len > 0.0) {
    const rLen = 1.0 / Math.sqrt(len);
    v02 = v02 * rLen;
    v12 = v12 * rLen;
    v22 = v22 * rLen;
  } // xAxis = normalize(cross(up, zAxis))


  len = v12 * v12 + v02 * v02;

  if (len > 0.0) {
    const rLen = 1.0 / Math.sqrt(len);
    v00 = -v12 * rLen;
    v10 = v02 * rLen;
  } // yAxis = cross(zAxis, xAxis);


  const v01 = -v22 * v10;
  const v11 = v22 * v00;
  const v21 = v02 * v10 - v12 * v00; // v30, v31, v32 calculated as -dot(axis, eye)

  const v30 = -(v00 * eye[0] + v10 * eye[1]);
  const v31 = -(v01 * eye[0] + v11 * eye[1] + v21 * eye[2]);
  const v32 = -(v02 * eye[0] + v12 * eye[1] + v22 * eye[2]); // multiplication P * V

  out[0] = p00 * v00 + p20 * v02;
  out[1] = p11 * v01 + p21 * v02;
  out[2] = p22 * v02;
  out[3] = -v02;
  out[4] = p00 * v10 + p20 * v12;
  out[5] = p11 * v11 + p21 * v12;
  out[6] = p22 * v12;
  out[7] = -v12;
  out[8] = p20 * v22;
  out[9] = p11 * v21 + p21 * v22;
  out[10] = p22 * v22;
  out[11] = -v22;
  out[12] = p00 * v30 + p20 * v32;
  out[13] = p11 * v31 + p21 * v32;
  out[14] = p22 * v32 + p32;
  out[15] = -v32;
  return out;
}
},{"./common":"../node_modules/@2gis/gl-matrix/common.js"}],"../node_modules/@webmaps/jakarta/dist/es6/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncableMetatileHash = exports.TEXTURE_IMAGE_PADDING = exports.defaultFont = exports.fontNames = exports.maxScaleValue = exports.minScaleValue = exports.maxU32 = exports.invSqrt2 = exports.z0Scale = exports.zptPerInch = exports.cmPerInch = exports.maxTilePoint = exports.tileHeight = exports.worldSize = exports.tileSizeZpt = void 0;
// Размер одного тайла в zpt
var tileSizeZpt = 256; // Размер мира в координатах карты

exports.tileSizeZpt = tileSizeZpt;
var worldSize = Math.pow(2, 32); // Высота тайла в координатах карты

exports.worldSize = worldSize;
var tileHeight = Math.pow(2, 20);
/**
 * Максимальное значение в координатах тайла.
 * Координаты всех данных в рамках тайла содержатся в UINT16 диапазоне от 0 до 65535.
 */

exports.tileHeight = tileHeight;
var maxTilePoint = Math.pow(2, 16) - 1; // Сколько сантиметров в дюйме

exports.maxTilePoint = maxTilePoint;
var cmPerInch = 2.54; // Сколько zpt в дюйме экрана

exports.cmPerInch = cmPerInch;
var zptPerInch = 96; // Масштаб, при котором тайл 0-го уровня должен отображаться в 256 zpt

exports.zptPerInch = zptPerInch;
var z0Scale = worldSize / (tileSizeZpt / zptPerInch * cmPerInch); // 1 / Math.sqrt(2)

exports.z0Scale = z0Scale;
var invSqrt2 = 0.7071067811865475; // Максимальное число u32

exports.invSqrt2 = invSqrt2;
var maxU32 = 4294967295;
exports.maxU32 = maxU32;
var minScaleValue = 1.175494351e-38;
exports.minScaleValue = minScaleValue;
var maxScaleValue = 3.402823466e38; // Массив всех доступных в карте шрифтов

exports.maxScaleValue = maxScaleValue;
var fontNames = ['Arial', 'Helvetica', 'HelveticaNeueCyr', 'Open_Sans', 'Open_Sans_Semibold', 'Open_Sans_Italic', 'Segoe_UI', 'PT_Sans_Caption', 'PT_Sans', 'Verdana', 'Verdana_bold', 'Noto_Sans', 'Noto_Sans_Semibold', 'Noto_Sans_Italic', 'SuisseIntl_Bold']; // Шрифт по умолчанию когда в стиле указан не допустимый шрифт

exports.fontNames = fontNames;
var defaultFont = 'Noto_Sans'; // Паддинг с каждой стороны для хранения изображения в текстуре,
// чтобы картинка не размывалась на границах пикселей

exports.defaultFont = defaultFont;
var TEXTURE_IMAGE_PADDING = 1; // Хэш синхронизируемого метатайла

exports.TEXTURE_IMAGE_PADDING = TEXTURE_IMAGE_PADDING;
var syncableMetatileHash = -3;
exports.syncableMetatileHash = syncableMetatileHash;
},{}],"../node_modules/@webmaps/jakarta/dist/es6/utils/bounds/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.fromGeo = fromGeo;
exports.expandByPoint = expandByPoint;
exports.copy = copy;
exports.reset = reset;
exports.center = center;
exports.clampPoint = clampPoint;
exports.contains = contains;

var vec2 = _interopRequireWildcard(require("@2gis/gl-matrix/vec2"));

var _common = require("../common");

var _geo = require("../geo");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function create(min, max) {
  return {
    min: min || vec2.fromValues(Infinity, Infinity),
    max: max || vec2.fromValues(-Infinity, -Infinity)
  };
}

function fromGeo(geoBounds) {
  return create((0, _geo.projectGeoToMap)(geoBounds.southWest), (0, _geo.projectGeoToMap)(geoBounds.northEast));
}
/**
 * Расширяет границу до заданной точки
 */


function expandByPoint(bounds, point) {
  vec2.min(bounds.min, bounds.min, point);
  vec2.max(bounds.max, bounds.max, point);
}

function copy(target, source) {
  target.min[0] = source.min[0];
  target.max[0] = source.max[0];
  target.min[1] = source.min[1];
  target.max[1] = source.max[1];
}

function reset(bounds) {
  bounds.min[0] = Infinity;
  bounds.max[0] = -Infinity;
  bounds.min[1] = Infinity;
  bounds.max[1] = -Infinity;
}

function center(out, bounds) {
  out[0] = bounds.min[0] + (bounds.max[0] - bounds.min[0]) / 2;
  out[1] = bounds.min[1] + (bounds.max[1] - bounds.min[1]) / 2;
}
/**
 * Вписывает точку в границы
 */


function clampPoint(out, bounds, point) {
  out[0] = (0, _common.clamp)(point[0], bounds.min[0], bounds.max[0]);
  out[1] = (0, _common.clamp)(point[1], bounds.min[1], bounds.max[1]);
}

function contains(bounds, point) {
  return point[0] <= bounds.max[0] && point[0] >= bounds.min[0] && point[1] <= bounds.max[1] && point[1] >= bounds.min[1];
}
},{"@2gis/gl-matrix/vec2":"../node_modules/@2gis/gl-matrix/vec2.js","../common":"../node_modules/@webmaps/jakarta/dist/es6/utils/common.js","../geo":"../node_modules/@webmaps/jakarta/dist/es6/utils/geo.js"}],"../node_modules/@webmaps/jakarta/dist/es6/utils/geo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tilePointToMapPoint = tilePointToMapPoint;
exports.mapPointToTilePoint = mapPointToTilePoint;
exports.projectGeoToMap = projectGeoToMap;
exports.projectMapToGeo = projectMapToGeo;
exports.zoomToHeight = zoomToHeight;
exports.heightToZoom = heightToZoom;
exports.zoomToScale = zoomToScale;
exports.scaleToZoom = scaleToZoom;
exports.getStyleZoom = getStyleZoom;
exports.getZoomFromStyleZoom = getZoomFromStyleZoom;
exports.tileZoomToSize = tileZoomToSize;
exports.worldToZptDistance = worldToZptDistance;
exports.zptToWorldDistance = zptToWorldDistance;
exports.zptToSceneDistance = zptToSceneDistance;
exports.geoToMapDistance = geoToMapDistance;
exports.tileCoordsToMapPoint = tileCoordsToMapPoint;
exports.mapPointTo32ZoomTileCoords = mapPointTo32ZoomTileCoords;
exports.tileCenterToMapPoint = tileCenterToMapPoint;
exports.getBounds = getBounds;
exports.getScreenVertices = getScreenVertices;
exports.getTileCoordsByCenterAndZoom = getTileCoordsByCenterAndZoom;
exports.getBoundsTileCoords = getBoundsTileCoords;
exports.projectionScaleFactor = projectionScaleFactor;
exports.geoPointsDistance = geoPointsDistance;
exports.tileCoordsToOSM = exports.worldBounds = void 0;

var vec2 = _interopRequireWildcard(require("@2gis/gl-matrix/vec2"));

var vec3 = _interopRequireWildcard(require("@2gis/gl-matrix/vec3"));

var _common = require("./common");

var _constants = require("../constants");

var _config = require("../config");

var bounds = _interopRequireWildcard(require("./bounds"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Переводит вектор из координат тайла в координаты карты
 */
function tilePointToMapPoint(result, point, tile) {
  result[0] = point[0] * tile.size / _constants.maxTilePoint + tile.offset[0];
  result[1] = point[1] * tile.size / _constants.maxTilePoint + tile.offset[1];
  result[2] = point[2] * _constants.tileHeight / _constants.maxTilePoint;
}
/**
 * Переводит вектор из координат карты в координаты тайла
 */


function mapPointToTilePoint(result, point, tile) {
  result[0] = (point[0] - tile.offset[0]) * _constants.maxTilePoint / tile.size;
  result[1] = (point[1] - tile.offset[1]) * _constants.maxTilePoint / tile.size;
  result[2] = point[2] * _constants.maxTilePoint / _constants.tileHeight;
}
/**
 * Переводит вектор из географических координат в координаты карты
 */


function projectGeoToMap(geoPoint) {
  var worldHalf = _constants.worldSize / 2;
  var sin = Math.sin((0, _common.degToRad)(geoPoint[1]));
  var x = geoPoint[0] * _constants.worldSize / 360;
  var y = Math.log((1 + sin) / (1 - sin)) * _constants.worldSize / (4 * Math.PI);
  return vec3.fromValues((0, _common.clamp)(x, -worldHalf, worldHalf), (0, _common.clamp)(y, -worldHalf, worldHalf), 0);
}
/**
 * Переводит вектор из координат карты в географические координаты
 */


function projectMapToGeo(mapPoint) {
  var geoPoint = [0, 0];
  geoPoint[0] = mapPoint[0] * 360 / _constants.worldSize;
  var latFactor = -2 * Math.PI / _constants.worldSize;
  geoPoint[1] = 90.0 - 2 * (0, _common.radToDeg)(Math.atan(Math.exp(mapPoint[1] * latFactor)));
  return geoPoint;
}
/**
 * Переводит зум-уровень в высоту камеры
 */


function zoomToHeight(zoom, size) {
  return (0, _common.correctScreenHeight)(size[1]) * _constants.worldSize / (2 * _constants.tileSizeZpt * Math.tan((0, _common.degToRad)(_config.camera.fov) / 2) * Math.pow(2, zoom));
}
/**
 * Переводит высоту камеры в зум-уровень
 */


function heightToZoom(height, size) {
  return Math.log((0, _common.correctScreenHeight)(size[1]) * _constants.worldSize / (2 * _constants.tileSizeZpt * Math.tan((0, _common.degToRad)(_config.camera.fov) / 2) * height)) / Math.LN2;
}
/**
 * Вычисляет масштаб по зум-левелу
 */


function zoomToScale(zoom) {
  return _constants.z0Scale * Math.pow(2, -zoom);
}
/**
 * Вычисляет зум-левел по масштабу
 */


function scaleToZoom(scale) {
  return Math.max(0, Math.log(_constants.z0Scale / scale) / Math.LN2);
}
/**
 * Вычисляет дельту стиливого зума
 */


function getStyleZoomDelta(center) {
  var centerGeo = projectMapToGeo(center);
  var latitude = centerGeo[1];
  var scaleFactor = 1 / (2 * Math.cos((0, _common.degToRad)(latitude)));
  var delta = Math.log(scaleFactor) / Math.log(2);
  return delta;
}
/**
 * Вычисляет зум стилей по зуму и центру карты
 */


function getStyleZoom(zoom, center) {
  var affineDelta = getStyleZoomDelta(center) * (0, _common.affineStep)(9, 10, zoom);
  return zoom + (0, _common.clamp)(affineDelta, -1, 0);
}
/**
 * Вычисляет зум по стилевому зуму и центру карты.
 * Инверсия дельты — обратное интерполированное значение дельты от заданного стилевого зума.
 * affineStep(9, 10 + delta, styleZoom) - вычисляет значение интерполяции, которое нужно применить
 * к коэффициенту delta для текущего стилевого зума
 * с условиями:
 * - 9 минимальный зум - ниже которого всегда будет 0
 * - между 9 и 10+delta - значение интерполяции (например, если delta равна -0.5, а стилевой зум 9.25, то вернет 0.5)
 * - больше 10+delta — всегда вернет 1
 * Для вычисления zoom мы от styleZoom вычитаем обратно интерполированное значение delta.
 * Это действие полностью противоположно методу getStyleZoom.
 */


function getZoomFromStyleZoom(styleZoom, center) {
  var delta = getStyleZoomDelta(center);
  var inverseDelta = delta * (0, _common.affineStep)(9, 10 + delta, styleZoom);
  return styleZoom - (0, _common.clamp)(inverseDelta, -1, 0);
}
/**
 * Возвращает размер тайла в системе координат карты
 */


function tileZoomToSize(tileZoom) {
  return Math.pow(2, 32 - tileZoom);
}
/**
 * Переводит расстояние из координат мира в zpt
 */


function worldToZptDistance(world, zoom) {
  return world * Math.pow(2, zoom) * _constants.tileSizeZpt / _constants.worldSize;
}
/**
 * Переводит расстояние из zpt в координаты мира
 */


function zptToWorldDistance(zpt, zoom) {
  return zpt * Math.pow(2, -zoom) * _constants.worldSize / _constants.tileSizeZpt;
}
/**
 * Переводит расстояние из zpt в координаты сцены. Координаты сцены имеют непонятную
 * размерность и в коде Jakarta не используются. Функция перенесена из Зенита и
 * нужна только для совместимости с его шейдерами. Использовать её для чего-либо ещё
 * нельзя.
 */


function zptToSceneDistance(zpt, tileSizeWorld) {
  return _constants.cmPerInch * (zpt / _constants.zptPerInch) / tileSizeWorld;
}
/**
 * Переводит расстояние из метров в мап-поинты
 *
 * @param point Точка возле которой рассчитывается расстояние
 * @param distance Расстояние в метрах
 */


function geoToMapDistance(point, distance) {
  var earthCircumference = 40075000;
  var mapPointToMeterRatio = _constants.worldSize / earthCircumference;
  return distance * mapPointToMeterRatio * projectionScaleFactor(point);
}
/**
 * Переводит координаты тайла из системы координат зум-уровня в систему координат карты
 */


function tileCoordsToMapPoint(coords) {
  var mapTileSize = tileZoomToSize(coords[2]);
  var offset = 2147483648; //  2^31

  return vec3.fromValues(coords[0] * mapTileSize - offset, coords[1] * mapTileSize - offset, 0);
}
/**
 * Возвращает координаты тайла 32 зума, включающего переданную точку в
 * координатах карты. Тайлы 32 зума имеют размер 1x1 MapPoint, что позволяет
 * удобно управлять положением динамических объектов, меняя координаты их тайлов,
 * а в буферы в качестве координат просто записывать нули.
 */


function mapPointTo32ZoomTileCoords(point) {
  var offset = 2147483648; //  2^31

  return [point[0] + offset, point[1] + offset, 32, 32];
}
/**
 * Находит координаты центра тайла в системе координат карты
 */


function tileCenterToMapPoint(coords) {
  var mapTileSize = tileZoomToSize(coords[2]);
  var offset = 2147483648; //  2^31

  return vec3.fromValues((coords[0] + 0.5) * mapTileSize - offset, (coords[1] + 0.5) * mapTileSize - offset, 0);
}
/**
 * Возвращает границы вьюпорта (bounding box) в системе координат карты
 */


function getBounds(state) {
  var bbox = bounds.create(vec2.clone(state.center), vec2.clone(state.center));
  var vertices = getScreenVertices(state);
  bounds.expandByPoint(bbox, vertices[0]);
  bounds.expandByPoint(bbox, vertices[1]);
  bounds.expandByPoint(bbox, vertices[2]);
  bounds.expandByPoint(bbox, vertices[3]);
  return bbox;
}
/**
 * Возвращает вершины вьюпорта в системе координат карты
 */


function getScreenVertices(state) {
  var size = state.size,
      zoom = state.zoom,
      viewport = state.viewport;
  var vertices = [(0, _common.projectScreenToMap)(state, [viewport.left, size[1] + viewport.top]), (0, _common.projectScreenToMap)(state, [size[0] + viewport.left, size[1] + viewport.top]), (0, _common.projectScreenToMap)(state, [size[0] + viewport.left, viewport.top]), (0, _common.projectScreenToMap)(state, [viewport.left, viewport.top]) // слева сверху
  ];
  var bottomLine = (0, _common.getLineConstants)(vertices[0], vertices[1]);
  var trapezeHeight = (0, _common.pointToLineDistance)(vertices[2], bottomLine);

  var maxTrapezeHeight = zptToWorldDistance(size[1], zoom) * _config.camera.viewportLimitRatio;

  if (trapezeHeight > maxTrapezeHeight) {
    var ratio = maxTrapezeHeight / trapezeHeight;
    vertices[2] = [(vertices[2][0] - vertices[1][0]) * ratio + vertices[1][0], (vertices[2][1] - vertices[1][1]) * ratio + vertices[1][1]];
    vertices[3] = [(vertices[3][0] - vertices[0][0]) * ratio + vertices[0][0], (vertices[3][1] - vertices[0][1]) * ratio + vertices[0][1]];
  }

  return vertices;
}
/**
 * Вычисляет координаты тайла с переданным центром и зумом
 */


function getTileCoordsByCenterAndZoom(center, zoom) {
  var offset = 2147483648; //  2^31

  var tileSize = tileZoomToSize(zoom);
  var tilePositionX = center[0] - tileSize / 2;
  var tilePositionY = center[1] - tileSize / 2;
  return [(tilePositionX + offset) / tileSize, (tilePositionY + offset) / tileSize, zoom, zoom];
}
/**
 * Вычисляет координаты тайла, который будет содержать в себе переданные границы
 */


function getBoundsTileCoords(bbox, multiplier) {
  if (multiplier === void 0) {
    multiplier = 1;
  }

  var tileSize = Math.max(bbox.max[0] - bbox.min[0], bbox.max[1] - bbox.min[1], 1) * multiplier;
  var tileZoom = 32 - Math.log(tileSize) / Math.LN2;
  var center = vec2.create();
  bounds.center(center, bbox);
  return getTileCoordsByCenterAndZoom(center, tileZoom);
}

function projectionScaleFactor(point) {
  return 1 / Math.cos(point[1] * Math.PI / 180);
}
/**
 * Возвращает расстояние между двумя географическими точками - формула Haversine
 */


function geoPointsDistance(lngLat1, lngLat2) {
  var R = 6371000;
  var rad = Math.PI / 180;
  var lat1 = lngLat1[1] * rad;
  var lat2 = lngLat2[1] * rad;
  var sinDLat = Math.sin((lngLat2[1] - lngLat1[1]) * rad / 2);
  var sinDLon = Math.sin((lngLat2[0] - lngLat1[0]) * rad / 2);
  var a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
/**
 * Размер мира в координатах карты
 */


var worldBounds = bounds.create([-(_constants.worldSize / 2), -(_constants.worldSize / 2)], [_constants.worldSize / 2, _constants.worldSize / 2]);
/**
 * Инвертирует Y координату тайла, что бы TileCoords соответствовал сетке OSM.
 * https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 * Применяется для работы с внешними тайловыми сервисами.
 */

exports.worldBounds = worldBounds;

var tileCoordsToOSM = function (tileCoords) {
  var x = tileCoords[0],
      y = tileCoords[1],
      zoom = tileCoords[2],
      detailZoom = tileCoords[3];
  return [x, Math.pow(2, zoom) - 1 - y, zoom, detailZoom];
};

exports.tileCoordsToOSM = tileCoordsToOSM;
},{"@2gis/gl-matrix/vec2":"../node_modules/@2gis/gl-matrix/vec2.js","@2gis/gl-matrix/vec3":"../node_modules/@2gis/gl-matrix/vec3.js","./common":"../node_modules/@webmaps/jakarta/dist/es6/utils/common.js","../constants":"../node_modules/@webmaps/jakarta/dist/es6/constants.js","../config":"../node_modules/@webmaps/jakarta/dist/es6/config.js","./bounds":"../node_modules/@webmaps/jakarta/dist/es6/utils/bounds/index.js"}],"../node_modules/@webmaps/jakarta/dist/es6/utils/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equalPoints = equalPoints;
exports.clamp = clamp;
exports.sign = sign;
exports.normalizeMousePosition = normalizeMousePosition;
exports.removeUndefinedQueryParameters = removeUndefinedQueryParameters;
exports.getUrl = getUrl;
exports.getUrlFromTemplate = getUrlFromTemplate;
exports.template = template;
exports.degToRad = degToRad;
exports.radToDeg = radToDeg;
exports.setEyePosition = setEyePosition;
exports.projectMapToScreenWithVP = projectMapToScreenWithVP;
exports.setVPMatrix = setVPMatrix;
exports.correctScreenHeight = correctScreenHeight;
exports.getCenterCorrection = getCenterCorrection;
exports.getLineConstants = getLineConstants;
exports.getTetragonBoundingBox = getTetragonBoundingBox;
exports.rectangleIntersectsRectangle = rectangleIntersectsRectangle;
exports.rectangleIntersectsTrapeze = rectangleIntersectsTrapeze;
exports.pointToLineDistance = pointToLineDistance;
exports.pow2AtLeast = pow2AtLeast;
exports.bufferToImage = bufferToImage;
exports.svgToImage = svgToImage;
exports.resizeImage = resizeImage;
exports.applyDefaults = applyDefaults;
exports.reverseObject = reverseObject;
exports.getSubdomainFromString = getSubdomainFromString;
exports.mapPointPitch = mapPointPitch;
exports.pick = pick;
exports.subtract = subtract;
exports.mapSubtract = mapSubtract;
exports.affineStep = affineStep;
exports.getFractionalPart = getFractionalPart;
exports.isBetween = isBetween;
exports.isValidGeoPoint = isValidGeoPoint;
exports.equalSets = equalSets;
exports.deepEqual = deepEqual;
exports.excludeItemFromArray = excludeItemFromArray;
exports.projectMapToScreen = exports.projectScreenToMap = void 0;

var _tslib = require("tslib");

var vec2 = _interopRequireWildcard(require("@2gis/gl-matrix/vec2"));

var vec3 = _interopRequireWildcard(require("@2gis/gl-matrix/vec3"));

var mat4 = _interopRequireWildcard(require("@2gis/gl-matrix/mat4"));

var _config = require("../config");

var _geo = require("./geo");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function equalPoints(pointA, pointB) {
  return pointA[0] === pointB[0] && pointA[1] === pointB[1] && pointA[2] === pointB[2];
}

function clamp(value, min, max) {
  value = Math.max(value, min);
  value = Math.min(value, max);
  return value;
}

function sign(x) {
  x = +x; // convert to a number

  if (x === 0 || Number.isNaN(x)) {
    return x; // 0, -0 or NaN
  }

  return x > 0 ? 1 : -1;
}

function normalizeMousePosition(size, point) {
  return [point[0] / size[0] * 2 - 1, -(point[1] / size[1]) * 2 + 1];
}

function removeUndefinedQueryParameters(url) {
  var _a = url.split('?'),
      body = _a[0],
      query = _a[1];

  if (!query) {
    return body;
  }

  var parts = query.split('&').map(function (str) {
    return str.split('=');
  });
  var filteredQuery = parts.filter(function (_a) {
    var key = _a[1];
    return key !== 'undefined';
  }).map(function (pair) {
    return pair.join('=');
  }).join('&');

  if (filteredQuery.length) {
    return body + "?" + filteredQuery;
  }

  return body;
}

function getUrl(type, values) {
  var host = template(values.host, {
    subdomain: values.subdomain
  });
  var url = template(_config.urls[type], (0, _tslib.__assign)((0, _tslib.__assign)({}, values), {
    host: host
  }));
  return removeUndefinedQueryParameters(url);
}
/**
 * Получает из шаблонной строки нормальный URL,
 * подменяя литералы в {} на переданные значения.
 * @param templateUrl Шаблонная строка.
 * @param values Мапа значений, ключи которой в шаблоне нужна заменить на значения.
 */


function getUrlFromTemplate(templateUrl, values) {
  var url = template(templateUrl, values);
  return removeUndefinedQueryParameters(url);
}

var templateRegExp = /\{(\w+)\}/g;

function template(temp, values) {
  return temp.replace(templateRegExp, function (_str, key) {
    return values[key];
  });
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function radToDeg(radians) {
  return radians / Math.PI * 180;
}

function setEyePosition(out, state) {
  var center = state.center,
      rotation = state.rotation,
      zoom = state.zoom,
      pitch = state.pitch,
      size = state.size;
  var height = (0, _geo.zoomToHeight)(zoom, size); // При offset === 0 вычисления взрываются, поэтому ограничим его снизу небольшим значением

  var offset = Math.max(height * Math.sin(pitch), 1);
  out[0] = center[0] + Math.sin(rotation) * offset;
  out[1] = center[1] - Math.cos(rotation) * offset;
  out[2] = height * Math.cos(pitch);
}
/**
 * Проецирует вектор из координат экрана в координаты карты
 */


var projectScreenToMap = function () {
  var vpMatrix = mat4.create();
  return function projectScreenToMap(state, point) {
    var res = vec3.create();
    setVPMatrix(vpMatrix, state);
    projectScreenToMapWithVP(res, point, vpMatrix, state);
    return res;
  };
}();

exports.projectScreenToMap = projectScreenToMap;
var invertedVP = mat4.create();
var eye = vec3.create();
/**
 * Проецирует вектор из координат экрана в координаты карты
 */

function projectScreenToMapWithVP(result, point, vpMatrix, state) {
  setEyePosition(eye, state);
  mat4.invert(invertedVP, vpMatrix);
  result[0] = (point[0] - state.viewport.left) / state.size[0] * 2 - 1;
  result[1] = -((point[1] - state.viewport.top) / state.size[1]) * 2 + 1;
  result[2] = 0;
  vec3.transformMat4(result, result, invertedVP);
  result[0] -= eye[0];
  result[1] -= eye[1];
  result[2] -= eye[2];
  vec3.normalize(result, result);

  if (result[2] !== 0) {
    var t = -eye[2] / result[2];

    if (t >= 0) {
      result[0] = eye[0] + result[0] * t;
      result[1] = eye[1] + result[1] * t;
      result[2] = eye[2] + result[2] * t;
    } else {
      result[0] = result[1] = result[2] = 0;
    }
  } else {
    result[0] = result[1] = result[2] = 0;
  }
}
/**
 * Проецирует вектор из координат карты в координаты экрана
 */


var projectMapToScreen = function () {
  var vpMatrix = mat4.create();
  return function projectMapToScreen(state, point) {
    var res = [0, 0, 0];
    setVPMatrix(vpMatrix, state);
    projectMapToScreenWithVP(res, point, vpMatrix, state.size, state.viewport);
    return res;
  };
}();
/**
 * Проецирует вектор из координат карты в координаты экрана
 */


exports.projectMapToScreen = projectMapToScreen;

function projectMapToScreenWithVP(result, point, vp, size, viewport) {
  var x = point[0];
  var y = point[1];
  var z = point[2];
  var halfWidth = size[0] / 2;
  var halfHeight = size[1] / 2;
  var w = vp[3] * x + vp[7] * y + vp[11] * z + vp[15];
  result[0] = halfWidth + viewport.left + (vp[0] * x + vp[4] * y + vp[12]) * halfWidth / w;
  result[1] = halfHeight + viewport.top - (vp[1] * x + vp[5] * y + vp[9] * z + vp[13]) * halfHeight / w;
}
/**
 * Конструирует VP матрицу
 */


function setVPMatrix(res, state, near, far, userView) {
  if (near === void 0) {
    near = _config.camera.near;
  }

  if (far === void 0) {
    far = _config.camera.far;
  }

  var center = state.center,
      size = state.size,
      padding = state.padding;
  var fov = _config.camera.fov;
  setEyePosition(eye, state); // Добавляем корректировку correctedPaddingTopScreen визуальной проекции камеры с учетом padding и pitch
  // необходимо чтобы компенсировать наклон камеры при большом значение pitch и padding.top
  // если padding.top и pitch имеют большое значение то когда центр карты смещается у камеры
  // смещается линия горизонта (карта визуально выглядит с большим наклоном)
  // для fov 60 near 1000 увеличение высоты экрана на padding (tan(45)=1) достаточно
  // top = near * Math.tan(glMatrix.toRadian(fov) / 2) - (view.y * height / correctedScreenHeightWithPadding);
  // height = 2 * (near * Math.tan(glMatrix.toRadian(fov) / 2)) * (view.height / correctedScreenHeightWithPadding);
  // корректировка высоты экрана изменяет фактически угол fov для компенсации положение центра вьюпорта относительно камеры.
  // to do коэффициент избыточен при небольшом значении height и достаточен чтобы компенсировать узкий fov
  // для портерного аспекта экрана с большим значением height - см задачу TILES-3124 (скорее всего необходимо учитывать высоту экрана в fov)

  var correctedPaddingTopScreen = Math.max(0, padding.top - padding.bottom) * Math.tan(state.pitch);
  var correctedScreenHeightWithPadding = correctScreenHeight(size[1]) + correctedPaddingTopScreen; // Определяем область просмотра

  var view = userView !== undefined ? userView : {
    x: 0 + (padding.right - padding.left) / 2,
    y: 0 + (padding.bottom - padding.top) / 2,
    width: size[0],
    height: size[1]
  }; // Дополнительно сдвигаем область просмотра под фактическую высоту экрана

  view.y += (correctedScreenHeightWithPadding - size[1]) / 2; // Размер экрана, в котором высота заменена на исправленную

  var standardizedSize = [size[0], correctedScreenHeightWithPadding];
  mat4.vpFromTargetEyeView(res, fov, near, far, standardizedSize, center, eye, view);
}
/**
 * Возвращает скорректированное значение высоты экрана. Если фактическое значение
 * меньше standardScreenHeight, возвращается standardScreenHeight. Если больше,
 * то возвращается фактическое значение.
 */


function correctScreenHeight(height) {
  return Math.max(height, _config.camera.minCalculationScreenHeight);
}
/**
 * Возращает вектор коррекции для центра. Этот вектор показывает насколько нужно сдвинуть центр,
 * чтобы переданный screenPoint оказался на том же месте карты, после изменений stateDiff стейта,
 * например, после изменения зума или поворота.
 */


function getCenterCorrection(state, screenPoint, changeState) {
  // В changeState может приходить совсем волшебный zoom, который может
  // превышать maxZoom карты. Чтобы из-за этого не происходило нежелательных
  // эффектов, вернем changeState.zoom в корректный диапазон зума
  if (changeState.zoom !== undefined) {
    changeState.zoom = clamp(changeState.zoom, state.minZoom, state.maxZoom);
  }

  var currentScenePoint = projectScreenToMap(state, screenPoint);
  var futureScenePoint = projectScreenToMap((0, _tslib.__assign)((0, _tslib.__assign)({}, state), changeState), screenPoint);
  var correction = vec3.create();
  vec3.sub(correction, currentScenePoint, futureScenePoint);
  return correction;
}
/**
 * Возвращает константы уравнения прямой: ax + by + c = 0
 */


function getLineConstants(point1, point2) {
  return {
    a: point1[1] - point2[1],
    b: point2[0] - point1[0],
    c: point1[0] * point2[1] - point2[0] * point1[1]
  };
}
/**
 * Возвращает рамку (bounding box) четырёхугольника
 */


function getTetragonBoundingBox(tetragon) {
  var x1 = tetragon[0][0];
  var y1 = tetragon[0][1];
  var x2 = tetragon[1][0];
  var y2 = tetragon[1][1];
  var x3 = tetragon[2][0];
  var y3 = tetragon[2][1];
  var x4 = tetragon[3][0];
  var y4 = tetragon[3][1];
  return {
    min: [Math.min(x1, x2, x3, x4), Math.min(y1, y2, y3, y4)],
    max: [Math.max(x1, x2, x3, x4), Math.max(y1, y2, y3, y4)]
  };
}
/**
 * Пересекаются ли два прямоугольника
 */


function rectangleIntersectsRectangle(rec1, rec2) {
  var intersectsX = rec1.min[0] <= rec2.max[0] && rec2.min[0] <= rec1.max[0];
  var intersectsY = rec1.min[1] <= rec2.max[1] && rec2.min[1] <= rec1.max[1];
  return intersectsX && intersectsY;
}
/**
 * Пересекает ли прямоугольник трапецию (или находится внутри)
 */


function rectangleIntersectsTrapeze(rectangle, trapeze) {
  // алгоритм пересечения https://books.google.ru/books?id=CCqzMm_-WucC&pg=PA77
  var bb = getTetragonBoundingBox(trapeze);

  if (!rectangleIntersectsRectangle(rectangle, bb)) {
    return false; // прямоугольник не пересекает рамку трапеции (условие a)
  } // константы линий трапеции


  var lines = [getLineConstants(trapeze[3], trapeze[2]), getLineConstants(trapeze[1], trapeze[0]), getLineConstants(trapeze[0], trapeze[3]), getLineConstants(trapeze[2], trapeze[1]) // правая
  ]; // координаты вершин прямоугольника

  var vertices = [rectangle.min, rectangle.max, [rectangle.min[0], rectangle.max[1]], [rectangle.max[0], rectangle.min[1]] // правая нижняя
  ];

  for (var lineNum = 0; lineNum < lines.length; lineNum++) {
    var line = lines[lineNum];
    var allVerticesOutside = true;

    for (var vertexNum = 0; vertexNum < vertices.length; vertexNum++) {
      var vertex = vertices[vertexNum];

      if (line.a * vertex[0] + line.b * vertex[1] + line.c < 0) {
        allVerticesOutside = false;
        break;
      }
    }

    if (allVerticesOutside) {
      return false; // прямоугольник полностью лежит за линией (условие b)
    }
  }

  return true; // условия a и b выполняются
}
/**
 * Расстояние от точки до прямой
 */


function pointToLineDistance(point, line) {
  return Math.abs(line.a * point[0] + line.b * point[1] + line.c) / Math.sqrt(line.a * line.a + line.b * line.b);
}
/**
 * Вычисляет наименьшую степень числа 2, большую или равную переданному параметру
 */


function pow2AtLeast(n) {
  n = n >>> 0;
  n = n - 1;
  n = n | n >> 1;
  n = n | n >> 2;
  n = n | n >> 4;
  n = n | n >> 8;
  n = n | n >> 16;
  return n + 1;
}

function bufferToImage(buffer) {
  var blob = new Blob([buffer], {
    type: 'image/png'
  });
  var url = URL.createObjectURL(blob);
  var img = document.createElement('img');
  return new Promise(function (resolve) {
    img.onload = function () {
      URL.revokeObjectURL(url);
      resolve(img);
    }; // Если растра не пришло, пустой arraybuffer
    // Просто создадим прозрачный пиксель


    if (buffer.byteLength === 0) {
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=';
    } else {
      img.src = url;
    }
  });
}

function svgToImage(svg, width, height) {
  var img = document.createElement('img');
  img.width = width;
  img.height = height;
  return new Promise(function (resolve) {
    img.onload = function () {
      return resolve(img);
    };

    img.src = "data:image/svg+xml;base64," + btoa(svg);
  });
}

function resizeImage(image, size) {
  if (size[0] === image.width && size[1] === image.height) {
    return image;
  }

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = size[0];
  canvas.height = size[1];
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.drawImage(image, 0, 0, size[0], size[1]);
  return canvas;
}

function applyDefaults(params, defaults) {
  var result = (0, _tslib.__assign)({}, defaults);

  for (var key in params) {
    if (params[key] !== undefined) {
      result[key] = params[key];
    }
  }

  return result;
}
/**
 * Меняет местами свойства и ключи объекта и возвращает новый объект.
 */


function reverseObject(object) {
  var newObject = {};

  for (var key in object) {
    var value = object[key];
    newObject[value] = key;
  }

  return newObject;
}

function getSubdomainFromString(subdomains, text) {
  var sum = 0;

  for (var i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i);
  }

  return subdomains[sum % subdomains.length];
}

var aVec2 = vec2.create();
var bVec2 = vec2.create();
/**
 * Вычисление угла от точки обзора к точке на карте
 * Т.е. считается аналогично pitch только не к центру, а к точке
 */

function mapPointPitch(eye, point, state) {
  vec2.subtract(aVec2, state.center, eye);
  vec2.subtract(bVec2, point, eye); // Проекция вектора eye->point на вектор eye->center

  var y = vec2.dot(aVec2, bVec2) / vec2.length(aVec2);
  return Math.atan2(y, eye[2]);
}
/**
 * Позволяет получить объект, частично или полностью состоящий из свойств
 * переданного объекта, в зависимости от переданного массива свойств
 */


function pick(obj, props) {
  var targetObj = {};

  for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
    var prop = props_1[_i];
    targetObj[prop] = obj[prop];
  }

  return targetObj;
}
/**
 * Возвращает массив, содержащий все элементы А, которые не входят в Б
 */


function subtract(a, b) {
  var result = [];

  for (var key in a) {
    if (!b[key]) {
      result.push(a[key]);
    }
  }

  return result;
}
/**
 * Возвращает массив, содержащий все элементы А, которые не входят в Б
 */


function mapSubtract(a, b) {
  var result = [];
  a.forEach(function (value, key) {
    if (!b.has(key)) {
      result.push(value);
    }
  });
  return result;
}

function affineStep(min, max, value) {
  return clamp((value - min) / (max - min), 0, 1);
}

function getFractionalPart(value) {
  return value % 1;
}

function isBetween(value, min, max) {
  return value >= min && value <= max;
}

function isValidGeoPoint(point) {
  var lng = point[0];
  var lat = point[1];
  return isBetween(lng, -180, 180) && isBetween(lat, -90, 90);
}

function equalSets(a, b) {
  if (a.size !== b.size) {
    return false;
  }

  for (var _i = 0, _a = Array.from(a); _i < _a.length; _i++) {
    var v = _a[_i];

    if (!b.has(v)) {
      return false;
    }
  }

  return true;
}
/**
 * Честно адаптированная версия из пакета fast-deep-equal
 */


function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    var arrA = Array.isArray(a),
        arrB = Array.isArray(b);
    var i = void 0,
        length_1,
        key = void 0;

    if (arrA && arrB) {
      length_1 = a.length;

      if (length_1 !== b.length) {
        return false;
      }

      for (i = length_1; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    if (arrA !== arrB) {
      return false;
    }

    var dateA = a instanceof Date,
        dateB = b instanceof Date;

    if (dateA !== dateB) {
      return false;
    }

    if (dateA && dateB) {
      return a.getTime() === b.getTime();
    }

    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;

    if (regexpA !== regexpB) {
      return false;
    }

    if (regexpA && regexpB) {
      return a.toString() === b.toString();
    }

    var keys = Object.keys(a);
    length_1 = keys.length;

    if (length_1 !== Object.keys(b).length) {
      return false;
    }

    for (i = length_1; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (i = length_1; i-- !== 0;) {
      key = keys[i];

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a !== a && b !== b;
}
/**
 * Удаляет элемент из массива. Возвращает true, если элемент был в массиве, и false - если нет.
 */


function excludeItemFromArray(array, item) {
  var index = array.indexOf(item);

  if (index !== -1) {
    array.splice(index, 1);
    return true;
  }

  return false;
}
},{"tslib":"../node_modules/tslib/tslib.es6.js","@2gis/gl-matrix/vec2":"../node_modules/@2gis/gl-matrix/vec2.js","@2gis/gl-matrix/vec3":"../node_modules/@2gis/gl-matrix/vec3.js","@2gis/gl-matrix/mat4":"../node_modules/@2gis/gl-matrix/mat4.js","../config":"../node_modules/@webmaps/jakarta/dist/es6/config.js","./geo":"../node_modules/@webmaps/jakarta/dist/es6/utils/geo.js"}],"../node_modules/@webmaps/jakarta/dist/es6/utils/metatile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashToNumber = hashToNumber;
exports.hashToString = hashToString;
exports.prepareTileProps = prepareTileProps;
exports.prepareMetatile = prepareMetatile;
exports.createMetatile = createMetatile;
exports.enhanceTileProps = enhanceTileProps;
exports.prepareLabelingGroups = prepareLabelingGroups;
exports.fixedMetatile = exports.fixedTileProps = void 0;

var _common = require("./common");

var base64 = _interopRequireWildcard(require("base64-arraybuffer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Преобразует хеш метатайла, преставленный байтовым массивом, в число.
 * Для корректной работы необходимо, чтобы размер массива не превышал 6 байт.
 */
function hashToNumber(hash) {
  var numericHash = 0;

  for (var i_1 = 0; i_1 < hash.length; i_1++) {
    numericHash += hash[i_1] * Math.pow(256, hash.length - 1 - i_1);
  }

  return numericHash;
}
/**
 * Преобразует хеш метатайла, представленный числом, в строку
 */


function hashToString(hash) {
  var array = new Uint8Array(6);

  for (var i_2 = 0; i_2 < 6; i_2++) {
    array[i_2] = Math.floor(hash / Math.pow(256, 5 - i_2)) & 0xff;
  }

  return encodeURIComponent(base64.encode(array));
}

function prepareTileProps(props, defaultProps) {
  var dict = {};
  props.forEach(function (elem, i) {
    dict[elem] = i;
  });
  var i = props.length; // добавляем рантайм проперти

  dict.selected = i++;
  dict.hovered = i++;
  dict.dpi = i++;
  dict.isRealtime = i++;
  dict.pixelDensityPreset = i++;

  for (var prop in defaultProps) {
    if (dict[prop] !== undefined) {
      continue;
    }

    dict[prop] = i++;
  }

  return dict;
}

function prepareMetatile(sourceMetatile) {
  var tileProps = prepareTileProps(sourceMetatile.tileProps, sourceMetatile.defaultProps);
  var reversedObjectClasses = (0, _common.reverseObject)(sourceMetatile.objectClasses);
  var indexedDefaultProps = {};

  for (var key in sourceMetatile.defaultProps) {
    indexedDefaultProps[key] = {
      index: tileProps[key],
      value: sourceMetatile.defaultProps[key]
    };
  }

  return {
    version: sourceMetatile.version,
    classes: sourceMetatile.classes,
    sublayers: sourceMetatile.sublayers,
    sublayersByIndex: (0, _common.reverseObject)(sourceMetatile.sublayers),
    objectClassesByIndex: reversedObjectClasses,
    objectClasses: sourceMetatile.objectClasses,
    tileProps: tileProps,
    defaultProps: indexedDefaultProps
  };
}
/**
 * Генерирует нулевой метатайл.
 *
 * Традиционно в генераторах у нас используются метатайлы. Изначально это пришло из наших
 * тайловых данных, где метатайл - это отдельный файл на сервере и его требуется загружать
 * перед генерацией.
 *
 * Но если источник данных другой, например GeoJSON, метатайла у него нет и в этом случае,
 * чтобы переиспользовать генераторы, можно воспользоваться нулевым метатайлом.
 *
 * @returns сгенерированный нулевой метатайл
 */


function createMetatile(tileProps, sublayersList) {
  var sublayers = {};

  if (sublayersList) {
    for (var i_3 = 0; i_3 < sublayersList.length; i_3++) {
      sublayers[sublayersList[i_3]] = i_3;
    }
  }

  return prepareMetatile({
    classes: {},
    sublayers: sublayers,
    objectClasses: {},
    version: '',
    zenithVersion: '',
    date: '',
    defaultProps: {},
    tileProps: tileProps
  });
}

function enhanceTileProps(metatile, newProps) {
  var tileProps = metatile.tileProps;
  var i = Object.keys(tileProps).length;

  for (var _i = 0, newProps_1 = newProps; _i < newProps_1.length; _i++) {
    var prop = newProps_1[_i];

    if (tileProps[prop] === undefined) {
      tileProps[prop] = i;
      i += 1;
    }
  }
}

function prepareLabelingGroups(source) {
  var indexToGroup = source.groups,
      sourceTable = source.table;
  var table = {};

  for (var i_4 = 0; i_4 < sourceTable.length; i_4++) {
    var row = sourceTable[i_4];
    var name1 = indexToGroup[i_4];
    table[name1] = {};

    for (var j = 0; j < row.length; j++) {
      var name2 = indexToGroup[j];
      table[name1][name2] = sourceTable[i_4][j];
    }
  }

  var groupToIndex = indexToGroup.reduce(function (obj, group, index) {
    obj[group] = index;
    return obj;
  }, {});
  return {
    indexToGroup: indexToGroup,
    groupToIndex: groupToIndex,
    table: table
  };
}

var i = 0;
/**
 * Набор фиксированных тайловых атрибутов.
 * Используется для всех объектов, которые не связаны с данными в тайлах.
 */

var fixedTileProps = {
  beginningIsCut: i++,
  class: i++,
  componentDistanceEnd: i++,
  componentDistanceStart: i++,
  iconPriority: i++,
  labelPriority: i++,
  label2Priority: i++,
  dpi: i++,
  endingIsCut: i++,
  height: i++,
  hiddenByPlanBuildingId: i++,
  id: i++,
  isRealtime: i++,
  db_label: i++,
  db_label2: i++,
  nextPointX: i++,
  nextPointY: i++,
  db_object_class: i++,
  objectLength: i++,
  pixelDensityPreset: i++,
  previousPointX: i++,
  previousPointY: i++,
  db_region: i++,
  selected: i++,
  hovered: i++,
  db_sublayer: i++,
  traffic_color: i++,
  traffic_road_class: i++,
  traffic_road_z_level: i++
};
/**
 * Фиксированный метатайл, тайловые пропсы которого захардкожены прямо в коде.
 * Используется для всех объектов, которые не связаны с данными в тайлах.
 */

exports.fixedTileProps = fixedTileProps;
var fixedMetatile = {
  version: '0.0.0',
  tileProps: fixedTileProps,
  defaultProps: {},
  classes: {},
  sublayers: {},
  sublayersByIndex: {},
  objectClasses: {},
  objectClassesByIndex: {}
};
exports.fixedMetatile = fixedMetatile;
},{"./common":"../node_modules/@webmaps/jakarta/dist/es6/utils/common.js","base64-arraybuffer":"../node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js"}],"../node_modules/@webmaps/jakarta/dist/es6/utils/pbfSchemes/server.proto.js":[function(require,module,exports) {
'use strict'; // code generated by pbf v3.2.1
// TileRequestUrl ========================================
var TileRequestUrl = exports.TileRequestUrl = {};
TileRequestUrl.read = function (pbf, end) {
    return pbf.readFields(TileRequestUrl._readField, { tiles: [] }, end);
};
TileRequestUrl._readField = function (tag, obj, pbf) {
    if (tag === 1)
        obj.tiles.push(TileRequestUrl.Tile.read(pbf, pbf.readVarint() + pbf.pos));
};
TileRequestUrl.write = function (obj, pbf) {
    if (obj.tiles)
        for (var i = 0; i < obj.tiles.length; i++)
            pbf.writeMessage(1, TileRequestUrl.Tile.write, obj.tiles[i]);
};
// TileRequestUrl.Tile ========================================
TileRequestUrl.Tile = {};
TileRequestUrl.Tile.read = function (pbf, end) {
    return pbf.readFields(TileRequestUrl.Tile._readField, { x: 0, y: 0, zoom: 0 }, end);
};
TileRequestUrl.Tile._readField = function (tag, obj, pbf) {
    if (tag === 1)
        obj.x = pbf.readVarint();
    else if (tag === 2)
        obj.y = pbf.readVarint();
    else if (tag === 3)
        obj.zoom = pbf.readVarint();
};
TileRequestUrl.Tile.write = function (obj, pbf) {
    if (obj.x)
        pbf.writeVarintField(1, obj.x);
    if (obj.y)
        pbf.writeVarintField(2, obj.y);
    if (obj.zoom)
        pbf.writeVarintField(3, obj.zoom);
};
// TileResponseData ========================================
var TileResponseData = exports.TileResponseData = {};
TileResponseData.read = function (pbf, end) {
    return pbf.readFields(TileResponseData._readField, { tileGroups: [] }, end);
};
TileResponseData._readField = function (tag, obj, pbf) {
    if (tag === 1)
        obj.tileGroups.push(TileResponseData.TileGroup.read(pbf, pbf.readVarint() + pbf.pos));
};
TileResponseData.write = function (obj, pbf) {
    if (obj.tileGroups)
        for (var i = 0; i < obj.tileGroups.length; i++)
            pbf.writeMessage(1, TileResponseData.TileGroup.write, obj.tileGroups[i]);
};
// TileResponseData.TileGroup ========================================
TileResponseData.TileGroup = {};
TileResponseData.TileGroup.read = function (pbf, end) {
    return pbf.readFields(TileResponseData.TileGroup._readField, { x: 0, y: 0, zoom: 0, tiles: [] }, end);
};
TileResponseData.TileGroup._readField = function (tag, obj, pbf) {
    if (tag === 1)
        obj.x = pbf.readVarint();
    else if (tag === 2)
        obj.y = pbf.readVarint();
    else if (tag === 3)
        obj.zoom = pbf.readVarint();
    else if (tag === 4)
        obj.tiles.push(TileResponseData.TileGroup.Tile.read(pbf, pbf.readVarint() + pbf.pos));
};
TileResponseData.TileGroup.write = function (obj, pbf) {
    if (obj.x)
        pbf.writeVarintField(1, obj.x);
    if (obj.y)
        pbf.writeVarintField(2, obj.y);
    if (obj.zoom)
        pbf.writeVarintField(3, obj.zoom);
    if (obj.tiles)
        for (var i = 0; i < obj.tiles.length; i++)
            pbf.writeMessage(4, TileResponseData.TileGroup.Tile.write, obj.tiles[i]);
};
// TileResponseData.TileGroup.Tile ========================================
TileResponseData.TileGroup.Tile = {};
TileResponseData.TileGroup.Tile.read = function (pbf, end) {
    return pbf.readFields(TileResponseData.TileGroup.Tile._readField, { regionId: 0, hash: null, data: null }, end);
};
TileResponseData.TileGroup.Tile._readField = function (tag, obj, pbf) {
    if (tag === 1)
        obj.regionId = pbf.readVarint();
    else if (tag === 2)
        obj.hash = pbf.readBytes();
    else if (tag === 3)
        obj.data = pbf.readBytes();
};
TileResponseData.TileGroup.Tile.write = function (obj, pbf) {
    if (obj.regionId)
        pbf.writeVarintField(1, obj.regionId);
    if (obj.hash)
        pbf.writeBytesField(2, obj.hash);
    if (obj.data)
        pbf.writeBytesField(3, obj.data);
};

},{}],"../node_modules/@webmaps/jakarta/dist/es6/utils/tiles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTileInfo = createTileInfo;
exports.coordsToKey = coordsToKey;
exports.getModKey = getModKey;
exports.keyToCoords = keyToCoords;
exports.splitBuffer = splitBuffer;
exports.stripBuffers = stripBuffers;
exports.copyTileBuffer = copyTileBuffer;
exports.isTileVisible = isTileVisible;
exports.findVisibleTiles = findVisibleTiles;
exports.getTilesUrl = getTilesUrl;
exports.isIntersecting = isIntersecting;
exports.isChild = isChild;
exports.getParentKey = getParentKey;
exports.selectParent = selectParent;
exports.selectChildren = selectChildren;
exports.compare = compare;
exports.compareIds = compareIds;
exports.equalIdArrays = equalIdArrays;
exports.filterIdArrayByIdSet = filterIdArrayByIdSet;
exports.isRegionId = isRegionId;

var vec2 = _interopRequireWildcard(require("@2gis/gl-matrix/vec2"));

var base64 = _interopRequireWildcard(require("base64-arraybuffer"));

var _pbf = _interopRequireDefault(require("pbf"));

var _metatile = require("./metatile");

var _common = require("./common");

var _geo = require("./geo");

var serverSchemaParser = _interopRequireWildcard(require("./pbfSchemes/server.proto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Создаёт объект с информацией о тайле на основе его координат
 */
function createTileInfo(coords) {
  return {
    coords: coords,
    size: (0, _geo.tileZoomToSize)(coords[2]),
    offset: (0, _geo.tileCoordsToMapPoint)(coords)
  };
}
/**
 * Преобразует координаты тайла в ключ
 */


function coordsToKey(coords) {
  // Не используем тут Array.prototype.join для производительности
  return coords[0] + "_" + coords[1] + "_" + coords[2] + "_" + coords[3];
}

function getModKey(coords, args) {
  return coordsToKey(coords) + "_" + args.stringify();
}
/**
 * Преобразует ключ в координаты тайла
 */


function keyToCoords(key) {
  var s = key.split('_');
  return [parseInt(s[0], 10), parseInt(s[1], 10), parseInt(s[2], 10), parseInt(s[3], 10)];
}
/**
 * Разбирает склеенный буфер из нескольки тайлов поступающий с сервера
 */


function splitBuffer(arrayBuffer) {
  var pbf = new _pbf.default(arrayBuffer);
  var data = serverSchemaParser.TileResponseData.read(pbf);
  var _a = data.tileGroups[0],
      x = _a.x,
      y = _a.y,
      zoom = _a.zoom,
      tiles = _a.tiles;
  return tiles.map(function (_a) {
    var regionId = _a.regionId,
        hash = _a.hash,
        data = _a.data;

    if (!data) {
      console.warn("Tile " + zoom + "_" + x + "_" + y + " from region " + regionId + " is corrupt (has no data)");
      data = new Uint8Array(0);
    }

    return {
      data: data,
      regionId: regionId,
      metatileHash: (0, _metatile.hashToNumber)(hash)
    };
  });
}

function stripBuffers(serverData) {
  return serverData.map(function (chunk) {
    return {
      regionId: chunk.regionId,
      metatileHash: chunk.metatileHash
    };
  });
}

function copyTileBuffer(input) {
  var length = Math.ceil(input.byteLength / 4) * 4;
  var output = new ArrayBuffer(length);
  var outputView = new Uint8Array(output);
  outputView.set(input);
  return output;
}
/**
 * Проверяет попадание тайла во вьюпорт
 */


function isTileVisible(coords, viewportVertices) {
  var x = coords[0];
  var y = coords[1];
  var z = coords[2];
  var tileBounds = {
    min: (0, _geo.tileCoordsToMapPoint)([x, y, z, z]),
    max: (0, _geo.tileCoordsToMapPoint)([x + 1, y + 1, z, z])
  };
  return (0, _common.rectangleIntersectsTrapeze)(tileBounds, viewportVertices);
}
/**
 * Находит все тайлы, попадающие во вьюпорт.
 * Функция возвращает координаты всех тайлов зума zoomLevel, попадающих во вьюпорт.
 * Значение параметра detailLevel прописывается во все координаты четвёртым элементом.
 */


function findVisibleTiles(viewport, zoomLevel, detailLevel) {
  // Находим баундинг-бокс вьюпорта
  var bb = (0, _common.getTetragonBoundingBox)(viewport); // Находим граничные координаты тайлов

  var offset = 2147483648;
  var tileSize = (0, _geo.tileZoomToSize)(zoomLevel);
  var coordLimit = Math.pow(2, zoomLevel) - 1;
  var minXCoord = Math.max(Math.floor((bb.min[0] + offset) / tileSize), 0);
  var maxXCoord = Math.min(Math.floor((bb.max[0] + offset) / tileSize), coordLimit);
  var minYCoord = Math.max(Math.floor((bb.min[1] + offset) / tileSize), 0);
  var maxYCoord = Math.min(Math.floor((bb.max[1] + offset) / tileSize), coordLimit);
  var result = [];

  for (var i = minXCoord; i <= maxXCoord; i++) {
    for (var j = minYCoord; j <= maxYCoord; j++) {
      var coords = [i, j, zoomLevel, detailLevel];

      if (isTileVisible(coords, viewport)) {
        result.push(coordsToKey(coords));
      }
    }
  }

  return result;
}
/**
 * Формирует урл для запроса тайлов на сервер
 */


function getTilesUrl(tileServer, tileSet, protocol, subdomains, coords, tileKey, appId, lang, defaultLang, sessionId) {
  var pbf = new _pbf.default();
  var data = {
    tiles: [{
      x: coords[0],
      y: coords[1],
      zoom: coords[2]
    }]
  };
  serverSchemaParser.TileRequestUrl.write(data, pbf);
  return (0, _common.getUrl)('tiles', {
    host: tileServer,
    tileSet: tileSet,
    tileKey: tileKey,
    sessionId: sessionId,
    protocol: protocol,
    appId: appId,
    lang: lang,
    defaultLang: defaultLang,
    subdomain: subdomains[Math.abs(coords[0] + coords[1]) % subdomains.length],
    request: encodeURIComponent(base64.encode(pbf.finish()))
  });
}
/**
 * Возвращает true, если tile1 и tile2 пересекаются
 */


function isIntersecting(tile1, tile2) {
  var coords1 = tile1.coords;
  var coords2 = tile2.coords;
  var zoom1 = coords1[2];
  var zoom2 = coords2[2];

  if (zoom1 === zoom2) {
    return coords1[0] === coords2[0] && coords1[1] === coords2[1];
  }

  return zoom1 < zoom2 ? isChild(tile1, tile2) : isChild(tile2, tile1);
}
/**
 * Возвращает true, если тайл candidate является потомком тайла tile
 */


function isChild(tile, candidate) {
  if (candidate.zoomLevel < tile.zoomLevel) {
    return false;
  }

  if (candidate.zoomLevel === tile.zoomLevel) {
    return candidate.coords[0] === tile.coords[1] && candidate.coords[1] === tile.coords[1] && candidate.detailLevel > tile.detailLevel;
  }

  var stride = Math.pow(2, candidate.coords[2] - tile.coords[2]);
  var minChildX = tile.coords[0] * stride;
  var maxChildX = minChildX + stride;
  var minChildY = tile.coords[1] * stride;
  var maxChildY = minChildY + stride;
  var childX = candidate.coords[0];
  var childY = candidate.coords[1];
  return childX >= minChildX && childX < maxChildX && childY >= minChildY && childY < maxChildY;
}

function getParentKey(tile, detailLevel, maxZoomLevel) {
  var coords = tile.coords;
  var zoomLevel = Math.min(detailLevel, maxZoomLevel);
  var stride = Math.pow(2, tile.zoomLevel - zoomLevel);
  var parentCoords = [Math.floor(coords[0] / stride), Math.floor(coords[1] / stride), zoomLevel, detailLevel];
  return coordsToKey(parentCoords);
}
/**
 * Выбирает из словаря tiles родителя для тайла tile
 */


function selectParent(tiles, tile, detailLevel, maxZoomLevel) {
  var parentKey = getParentKey(tile, detailLevel, maxZoomLevel);
  return tiles[parentKey];
}
/**
 * Выбирает из словаря tiles всех потомков тайла tile
 */


function selectChildren(tiles, tile) {
  var result = [];

  for (var key in tiles) {
    var candidate = tiles[key];

    if (isChild(tile, candidate)) {
      result.push(candidate);
    }
  }

  return result;
}

function compare(center, tileA, tileB) {
  return vec2.distance(center, (0, _geo.tileCenterToMapPoint)(tileA.coords)) - vec2.distance(center, (0, _geo.tileCenterToMapPoint)(tileB.coords));
}
/**
 * Фунция для сортировки массива id
 */


function compareIds(a, b) {
  return a[1] - b[1] || a[0] - b[0];
}
/**
 * Проверяет экв-ть двух массивов Id
 */


function equalIdArrays(idsA, idsB) {
  if (idsA.length !== idsB.length) {
    return false;
  }

  for (var i = 0; i < idsA.length; i++) {
    var a = idsA[i];
    var b = idsB[i];

    if (a[0] !== b[0] || a[1] !== b[1]) {
      return false;
    }
  }

  return true;
}
/**
 * Возвращает новый массив, элементы которого были в изначальном ids и есть в idSet
 */


function filterIdArrayByIdSet(ids, idSet) {
  var res = [];

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];

    if (idSet.has(id)) {
      res.push(id);
    }
  }

  return res;
}

var minRegionId = 1; // Максимально доступный regionId. Далее уже будут id сегментов

var maxRegionId = 65535;
/**
 * Проверяет, находится ли переданный id в диапазон доступных id регионов
 */

function isRegionId(id) {
  return id >= minRegionId && id <= maxRegionId;
}
},{"@2gis/gl-matrix/vec2":"../node_modules/@2gis/gl-matrix/vec2.js","base64-arraybuffer":"../node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js","pbf":"../node_modules/pbf/index.js","./metatile":"../node_modules/@webmaps/jakarta/dist/es6/utils/metatile.js","./common":"../node_modules/@webmaps/jakarta/dist/es6/utils/common.js","./geo":"../node_modules/@webmaps/jakarta/dist/es6/utils/geo.js","./pbfSchemes/server.proto":"../node_modules/@webmaps/jakarta/dist/es6/utils/pbfSchemes/server.proto.js"}],"utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTile = exports.getCoords = exports.now = void 0;

var now = function now() {
  return performance.now();
};

exports.now = now;

function getCoords(map) {
  var tileManager = map.modules.tileManager;
  return tileManager.getViewportTiles().map(function (tile) {
    return tile.coords;
  });
}

exports.getCoords = getCoords;

function generateTile(map, coords) {
  var source = map.modules.tileManager.regionalTileLayer.sourceCore;
  return source.generateTile(map.state, coords, [], 2, {});
}

exports.generateTile = generateTile;
},{}],"tests/labeling.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureLabeling = void 0;

var config_1 = require("@webmaps/jakarta/dist/es6/config");

var tiles_1 = require("@webmaps/jakarta/dist/es6/utils/tiles");

var stats_1 = require("../stats");

var utils_1 = require("../utils");

var pause = function pause(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

function measureLabeling(map) {
  return __awaiter(this, void 0, void 0, function () {
    function collectData(data) {
      data.results.forEach(function (_a) {
        var metatileHash = _a.metatileHash,
            collectorOutput = _a.collectorOutput,
            styleId = _a.styleId;
        var labels = collectorOutput.labels;
        dataFromParser[String(keyCounter++)] = {
          metatileHash: metatileHash,
          labels: labels,
          styleId: styleId
        };
      });
    }

    var ITERATIONS, keyCounter, dataFromParser, coords, results, i, labellingResults, labeler, start, _a, _b, _i, key, labels, _c, coords_1, coord, lr, _d, coords_2, coord, lr, _e, _f, _g, key, index;

    return __generator(this, function (_h) {
      switch (_h.label) {
        case 0:
          ITERATIONS = 100;
          keyCounter = 0;
          dataFromParser = {};
          coords = (0, utils_1.getCoords)(map);
          return [4
          /*yield*/
          , Promise.all(coords.map(function (coord) {
            return (0, utils_1.generateTile)(map, coord).then(collectData);
          }))];

        case 1:
          _h.sent();

          results = {
            addLabels: [],
            processLabels: [],
            secondProcessLabels: [],
            removeLabels: []
          };
          i = 0;
          _h.label = 2;

        case 2:
          if (!(i < ITERATIONS)) return [3
          /*break*/
          , 21];
          labellingResults = [];
          labeler = map.modules.labeler;
          start = (0, utils_1.now)();
          _a = [];

          for (_b in dataFromParser) {
            _a.push(_b);
          }

          _i = 0;
          _h.label = 3;

        case 3:
          if (!(_i < _a.length)) return [3
          /*break*/
          , 6];
          key = _a[_i];
          labels = dataFromParser[key];
          return [4
          /*yield*/
          , labeler.worker.appendLabels(key, 0, [labels])];

        case 4:
          _h.sent();

          labeler.activeLabelKeys.push(key);
          _h.label = 5;

        case 5:
          _i++;
          return [3
          /*break*/
          , 3];

        case 6:
          results.addLabels.push((0, utils_1.now)() - start);
          return [4
          /*yield*/
          , pause(100)];

        case 7:
          _h.sent();

          start = (0, utils_1.now)();
          _c = 0, coords_1 = coords;
          _h.label = 8;

        case 8:
          if (!(_c < coords_1.length)) return [3
          /*break*/
          , 11];
          coord = coords_1[_c];
          return [4
          /*yield*/
          , map.modules.labeler.worker.processLabels(Object.keys(dataFromParser), // [...labelsKeys, ...this.activeLabelKeys],
          map.state, // labelingState,
          (0, tiles_1.createTileInfo)(coord), // createTileInfo(coords),
          1, // window.devicePixelRatio,// window.devicePixelRatio,
          [], // hiddenIds,
          config_1.labeling.commercialMargins, // config.labeling.commercialMargins,
          false)];

        case 9:
          lr = _h.sent();
          labellingResults.push(lr);
          _h.label = 10;

        case 10:
          _c++;
          return [3
          /*break*/
          , 8];

        case 11:
          results.processLabels.push((0, utils_1.now)() - start);
          start = (0, utils_1.now)();
          _d = 0, coords_2 = coords;
          _h.label = 12;

        case 12:
          if (!(_d < coords_2.length)) return [3
          /*break*/
          , 15];
          coord = coords_2[_d];
          return [4
          /*yield*/
          , map.modules.labeler.worker.processLabels(Object.keys(dataFromParser), // [...labelsKeys, ...this.activeLabelKeys],
          map.state, // labelingState,
          (0, tiles_1.createTileInfo)(coord), // createTileInfo(coords),
          1, // window.devicePixelRatio,// window.devicePixelRatio,
          [], // hiddenIds,
          config_1.labeling.commercialMargins, // config.labeling.commercialMargins,
          false)];

        case 13:
          lr = _h.sent();
          labellingResults.push(lr);
          _h.label = 14;

        case 14:
          _d++;
          return [3
          /*break*/
          , 12];

        case 15:
          results.secondProcessLabels.push((0, utils_1.now)() - start);
          start = (0, utils_1.now)();
          _e = [];

          for (_f in dataFromParser) {
            _e.push(_f);
          }

          _g = 0;
          _h.label = 16;

        case 16:
          if (!(_g < _e.length)) return [3
          /*break*/
          , 19];
          key = _e[_g];
          return [4
          /*yield*/
          , labeler.worker.removeLabels(key)];

        case 17:
          _h.sent();

          index = labeler.activeLabelKeys.indexOf(key);

          if (index !== -1) {
            labeler.activeLabelKeys.splice(index, 1);
          }

          _h.label = 18;

        case 18:
          _g++;
          return [3
          /*break*/
          , 16];

        case 19:
          results.removeLabels.push((0, utils_1.now)() - start);
          _h.label = 20;

        case 20:
          i++;
          return [3
          /*break*/
          , 2];

        case 21:
          return [2
          /*return*/
          , (0, stats_1.keyedStats)(results)];
      }
    });
  });
}

exports.measureLabeling = measureLabeling;
},{"@webmaps/jakarta/dist/es6/config":"../node_modules/@webmaps/jakarta/dist/es6/config.js","@webmaps/jakarta/dist/es6/utils/tiles":"../node_modules/@webmaps/jakarta/dist/es6/utils/tiles.js","../stats":"stats.ts","../utils":"utils.ts"}],"tests/parser.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureParser = void 0;

var stats_1 = require("../stats");

var utils_1 = require("../utils");

function measureParser(map) {
  return __awaiter(this, void 0, void 0, function () {
    var ITERATIONS, results, coords, i, start;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ITERATIONS = 100;
          results = {
            viewport: [],
            tile: []
          };
          coords = (0, utils_1.getCoords)(map);
          i = 0;
          _a.label = 1;

        case 1:
          if (!(i < ITERATIONS)) return [3
          /*break*/
          , 4];
          start = (0, utils_1.now)();
          return [4
          /*yield*/
          , Promise.all(coords.map(function (coord) {
            return measureGenerateTile(map, coord, results.tile);
          }))];

        case 2:
          _a.sent();

          results.viewport.push((0, utils_1.now)() - start);
          _a.label = 3;

        case 3:
          i++;
          return [3
          /*break*/
          , 1];

        case 4:
          return [2
          /*return*/
          , (0, stats_1.keyedStats)(results)];
      }
    });
  });
}

exports.measureParser = measureParser;

function measureGenerateTile(map, coords, stats) {
  return __awaiter(this, void 0, void 0, function () {
    var start;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          start = (0, utils_1.now)();
          return [4
          /*yield*/
          , (0, utils_1.generateTile)(map, coords)];

        case 1:
          _a.sent();

          stats.push((0, utils_1.now)() - start);
          return [2
          /*return*/
          ];
      }
    });
  });
}
},{"../stats":"stats.ts","../utils":"utils.ts"}],"../node_modules/describe-it-browser/dist/lib.js":[function(require,module,exports) {
var define;
parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"KkZG":[function(require,module,exports) {
"use strict";function e(e){if(e&&"undefined"!=typeof window){var t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}}function t(e,t){var n=e.__state.conversionName.toString(),o=Math.round(e.r),i=Math.round(e.g),r=Math.round(e.b),s=e.a,a=Math.round(e.h),l=e.s.toFixed(1),d=e.v.toFixed(1);if(t||"THREE_CHAR_HEX"===n||"SIX_CHAR_HEX"===n){for(var c=e.hex.toString(16);c.length<6;)c="0"+c;return"#"+c}return"CSS_RGB"===n?"rgb("+o+","+i+","+r+")":"CSS_RGBA"===n?"rgba("+o+","+i+","+r+","+s+")":"HEX"===n?"0x"+e.hex.toString(16):"RGB_ARRAY"===n?"["+o+","+i+","+r+"]":"RGBA_ARRAY"===n?"["+o+","+i+","+r+","+s+"]":"RGB_OBJ"===n?"{r:"+o+",g:"+i+",b:"+r+"}":"RGBA_OBJ"===n?"{r:"+o+",g:"+i+",b:"+r+",a:"+s+"}":"HSV_OBJ"===n?"{h:"+a+",s:"+l+",v:"+d+"}":"HSVA_OBJ"===n?"{h:"+a+",s:"+l+",v:"+d+",a:"+s+"}":"unknown format"}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.GUI=exports.gui=exports.dom=exports.controllers=exports.color=void 0;var n=Array.prototype.forEach,o=Array.prototype.slice,i={BREAK:{},extend:function(e){return this.each(o.call(arguments,1),function(t){(this.isObject(t)?Object.keys(t):[]).forEach(function(n){this.isUndefined(t[n])||(e[n]=t[n])}.bind(this))},this),e},defaults:function(e){return this.each(o.call(arguments,1),function(t){(this.isObject(t)?Object.keys(t):[]).forEach(function(n){this.isUndefined(e[n])&&(e[n]=t[n])}.bind(this))},this),e},compose:function(){var e=o.call(arguments);return function(){for(var t=o.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,o){if(e)if(n&&e.forEach&&e.forEach===n)e.forEach(t,o);else if(e.length===e.length+0){var i,r=void 0;for(r=0,i=e.length;r<i;r++)if(r in e&&t.call(o,e[r],r)===this.BREAK)return}else for(var s in e)if(t.call(o,e[s],s)===this.BREAK)return},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var o=void 0;return function(){var i=this,r=arguments;var s=n||!o;clearTimeout(o),o=setTimeout(function(){o=null,n||e.apply(i,r)},t),s&&e.apply(i,r)}},toArray:function(e){return e.toArray?e.toArray():o.call(e)},isUndefined:function(e){return void 0===e},isNull:function(e){return null===e},isNaN:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){return isNaN(e)}),isArray:Array.isArray||function(e){return e.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return!1===e||!0===e},isFunction:function(e){return e instanceof Function}},r=[{litmus:i.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:t},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:t},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:t},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:t}}},{litmus:i.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:i.isArray,conversions:{RGB_ARRAY:{read:function(e){return 3===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return 4===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:i.isObject,conversions:{RGBA_OBJ:{read:function(e){return!!(i.isNumber(e.r)&&i.isNumber(e.g)&&i.isNumber(e.b)&&i.isNumber(e.a))&&{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return!!(i.isNumber(e.r)&&i.isNumber(e.g)&&i.isNumber(e.b))&&{space:"RGB",r:e.r,g:e.g,b:e.b}},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return!!(i.isNumber(e.h)&&i.isNumber(e.s)&&i.isNumber(e.v)&&i.isNumber(e.a))&&{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return!!(i.isNumber(e.h)&&i.isNumber(e.s)&&i.isNumber(e.v))&&{space:"HSV",h:e.h,s:e.s,v:e.v}},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],s=void 0,a=void 0,l=function(){a=!1;var e=arguments.length>1?i.toArray(arguments):arguments[0];return i.each(r,function(t){if(t.litmus(e))return i.each(t.conversions,function(t,n){if(s=t.read(e),!1===a&&!1!==s)return a=s,s.conversionName=n,s.conversion=t,i.BREAK}),i.BREAK}),a},d=void 0,c={hsv_to_rgb:function(e,t,n){var o=Math.floor(e/60)%6,i=e/60-Math.floor(e/60),r=n*(1-t),s=n*(1-i*t),a=n*(1-(1-i)*t),l=[[n,a,r],[s,n,r],[r,n,a],[r,s,n],[a,r,n],[n,r,s]][o];return{r:255*l[0],g:255*l[1],b:255*l[2]}},rgb_to_hsv:function(e,t,n){var o=Math.min(e,t,n),i=Math.max(e,t,n),r=i-o,s=void 0;return 0===i?{h:NaN,s:0,v:0}:(s=e===i?(t-n)/r:t===i?2+(n-e)/r:4+(e-t)/r,(s/=6)<0&&(s+=1),{h:360*s,s:r/i,v:i/255})},rgb_to_hex:function(e,t,n){var o=this.hex_with_component(0,2,e);return o=this.hex_with_component(o,1,t),o=this.hex_with_component(o,0,n)},component_from_hex:function(e,t){return e>>8*t&255},hex_with_component:function(e,t,n){return n<<(d=8*t)|e&~(255<<d)}},u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},h=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),p=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,o)}if("value"in i)return i.value;var s=i.get;return void 0!==s?s.call(o):void 0},f=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},m=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},g=function(){function e(){if(_(this,e),this.__state=l.apply(this,arguments),!1===this.__state)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return h(e,[{key:"toString",value:function(){return t(this)}},{key:"toHexString",value:function(){return t(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),e}();function b(e,t,n){Object.defineProperty(e,t,{get:function(){return"RGB"===this.__state.space?this.__state[t]:(g.recalculateRGB(this,t,n),this.__state[t])},set:function(e){"RGB"!==this.__state.space&&(g.recalculateRGB(this,t,n),this.__state.space="RGB"),this.__state[t]=e}})}function v(e,t){Object.defineProperty(e,t,{get:function(){return"HSV"===this.__state.space?this.__state[t]:(g.recalculateHSV(this),this.__state[t])},set:function(e){"HSV"!==this.__state.space&&(g.recalculateHSV(this),this.__state.space="HSV"),this.__state[t]=e}})}g.recalculateRGB=function(e,t,n){if("HEX"===e.__state.space)e.__state[t]=c.component_from_hex(e.__state.hex,n);else{if("HSV"!==e.__state.space)throw new Error("Corrupted color state");i.extend(e.__state,c.hsv_to_rgb(e.__state.h,e.__state.s,e.__state.v))}},g.recalculateHSV=function(e){var t=c.rgb_to_hsv(e.r,e.g,e.b);i.extend(e.__state,{s:t.s,v:t.v}),i.isNaN(t.h)?i.isUndefined(e.__state.h)&&(e.__state.h=0):e.__state.h=t.h},g.COMPONENTS=["r","g","b","h","s","v","hex","a"],b(g.prototype,"r",2),b(g.prototype,"g",1),b(g.prototype,"b",0),v(g.prototype,"h"),v(g.prototype,"s"),v(g.prototype,"v"),Object.defineProperty(g.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}}),Object.defineProperty(g.prototype,"hex",{get:function(){return"HEX"!==this.__state.space&&(this.__state.hex=c.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var y=function(){function e(t,n){_(this,e),this.initialValue=t[n],this.domElement=document.createElement("div"),this.object=t,this.property=n,this.__onChange=void 0,this.__onFinishChange=void 0}return h(e,[{key:"onChange",value:function(e){return this.__onChange=e,this}},{key:"onFinishChange",value:function(e){return this.__onFinishChange=e,this}},{key:"setValue",value:function(e){return this.object[this.property]=e,this.__onChange&&this.__onChange.call(this,e),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),e}(),w={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},x={};i.each(w,function(e,t){i.each(e,function(e){x[e]=t})});var E=/(\d+(\.\d+)?)px/;function C(e){if("0"===e||i.isUndefined(e))return 0;var t=e.match(E);return i.isNull(t)?0:parseFloat(t[1])}var A={makeSelectable:function(e,t){void 0!==e&&void 0!==e.style&&(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var o=n,r=t;i.isUndefined(r)&&(r=!0),i.isUndefined(o)&&(o=!0),e.style.position="absolute",r&&(e.style.left=0,e.style.right=0),o&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,o){var r=n||{},s=x[t];if(!s)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(s);switch(s){case"MouseEvents":var l=r.x||r.clientX||0,d=r.y||r.clientY||0;a.initMouseEvent(t,r.bubbles||!1,r.cancelable||!0,window,r.clickCount||1,0,0,l,d,!1,!1,!1,!1,0,null);break;case"KeyboardEvents":var c=a.initKeyboardEvent||a.initKeyEvent;i.defaults(r,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),c(t,r.bubbles||!1,r.cancelable,window,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.keyCode,r.charCode);break;default:a.initEvent(t,r.bubbles||!1,r.cancelable||!0)}i.defaults(a,o),e.dispatchEvent(a)},bind:function(e,t,n,o){var i=o||!1;return e.addEventListener?e.addEventListener(t,n,i):e.attachEvent&&e.attachEvent("on"+t,n),A},unbind:function(e,t,n,o){var i=o||!1;return e.removeEventListener?e.removeEventListener(t,n,i):e.detachEvent&&e.detachEvent("on"+t,n),A},addClass:function(e,t){if(void 0===e.className)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);-1===n.indexOf(t)&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return A},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),o=n.indexOf(t);-1!==o&&(n.splice(o,1),e.className=n.join(" "))}else e.className=void 0;return A},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return C(t["border-left-width"])+C(t["border-right-width"])+C(t["padding-left"])+C(t["padding-right"])+C(t.width)},getHeight:function(e){var t=getComputedStyle(e);return C(t["border-top-width"])+C(t["border-bottom-width"])+C(t["padding-top"])+C(t["padding-bottom"])+C(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do{n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent}while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},k=function(e){function t(e,n){_(this,t);var o=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n)),i=o;return o.__prev=o.getValue(),o.__checkbox=document.createElement("input"),o.__checkbox.setAttribute("type","checkbox"),A.bind(o.__checkbox,"change",function(){i.setValue(!i.__prev)},!1),o.domElement.appendChild(o.__checkbox),o.updateDisplay(),o}return f(t,y),h(t,[{key:"setValue",value:function(e){var n=p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"setValue",this).call(this,e);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),n}},{key:"updateDisplay",value:function(){return!0===this.getValue()?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"updateDisplay",this).call(this)}}]),t}(),S=function(e){function t(e,n,o){_(this,t);var r=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n)),s=o,a=r;if(r.__select=document.createElement("select"),i.isArray(s)){var l={};i.each(s,function(e){l[e]=e}),s=l}return i.each(s,function(e,t){var n=document.createElement("option");n.innerHTML=t,n.setAttribute("value",e),a.__select.appendChild(n)}),r.updateDisplay(),A.bind(r.__select,"change",function(){var e=this.options[this.selectedIndex].value;a.setValue(e)}),r.domElement.appendChild(r.__select),r}return f(t,y),h(t,[{key:"setValue",value:function(e){var n=p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"setValue",this).call(this,e);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),n}},{key:"updateDisplay",value:function(){return A.isActive(this.__select)?this:(this.__select.value=this.getValue(),p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"updateDisplay",this).call(this))}}]),t}(),O=function(e){function t(e,n){_(this,t);var o=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n)),i=o;function r(){i.setValue(i.__input.value)}return o.__input=document.createElement("input"),o.__input.setAttribute("type","text"),A.bind(o.__input,"keyup",r),A.bind(o.__input,"change",r),A.bind(o.__input,"blur",function(){i.__onFinishChange&&i.__onFinishChange.call(i,i.getValue())}),A.bind(o.__input,"keydown",function(e){13===e.keyCode&&this.blur()}),o.updateDisplay(),o.domElement.appendChild(o.__input),o}return f(t,y),h(t,[{key:"updateDisplay",value:function(){return A.isActive(this.__input)||(this.__input.value=this.getValue()),p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"updateDisplay",this).call(this)}}]),t}();function T(e){var t=e.toString();return t.indexOf(".")>-1?t.length-t.indexOf(".")-1:0}var L=function(e){function t(e,n,o){_(this,t);var r=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n)),s=o||{};return r.__min=s.min,r.__max=s.max,r.__step=s.step,i.isUndefined(r.__step)?0===r.initialValue?r.__impliedStep=1:r.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(r.initialValue))/Math.LN10))/10:r.__impliedStep=r.__step,r.__precision=T(r.__impliedStep),r}return f(t,y),h(t,[{key:"setValue",value:function(e){var n=e;return void 0!==this.__min&&n<this.__min?n=this.__min:void 0!==this.__max&&n>this.__max&&(n=this.__max),void 0!==this.__step&&n%this.__step!=0&&(n=Math.round(n/this.__step)*this.__step),p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"setValue",this).call(this,n)}},{key:"min",value:function(e){return this.__min=e,this}},{key:"max",value:function(e){return this.__max=e,this}},{key:"step",value:function(e){return this.__step=e,this.__impliedStep=e,this.__precision=T(e),this}}]),t}();function R(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n}var B=function(e){function t(e,n,o){_(this,t);var r=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,o));r.__truncationSuspended=!1;var s=r,a=void 0;function l(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}function d(e){var t=a-e.clientY;s.setValue(s.getValue()+t*s.__impliedStep),a=e.clientY}function c(){A.unbind(window,"mousemove",d),A.unbind(window,"mouseup",c),l()}return r.__input=document.createElement("input"),r.__input.setAttribute("type","text"),A.bind(r.__input,"change",function(){var e=parseFloat(s.__input.value);i.isNaN(e)||s.setValue(e)}),A.bind(r.__input,"blur",function(){l()}),A.bind(r.__input,"mousedown",function(e){A.bind(window,"mousemove",d),A.bind(window,"mouseup",c),a=e.clientY}),A.bind(r.__input,"keydown",function(e){13===e.keyCode&&(s.__truncationSuspended=!0,this.blur(),s.__truncationSuspended=!1,l())}),r.updateDisplay(),r.domElement.appendChild(r.__input),r}return f(t,L),h(t,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():R(this.getValue(),this.__precision),p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"updateDisplay",this).call(this)}}]),t}();function N(e,t,n,o,i){return o+(e-t)/(n-t)*(i-o)}var H=function(e){function t(e,n,o,i,r){_(this,t);var s=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,{min:o,max:i,step:r})),a=s;function l(e){e.preventDefault();var t=a.__background.getBoundingClientRect();return a.setValue(N(e.clientX,t.left,t.right,a.__min,a.__max)),!1}function d(){A.unbind(window,"mousemove",l),A.unbind(window,"mouseup",d),a.__onFinishChange&&a.__onFinishChange.call(a,a.getValue())}function c(e){var t=e.touches[0].clientX,n=a.__background.getBoundingClientRect();a.setValue(N(t,n.left,n.right,a.__min,a.__max))}function u(){A.unbind(window,"touchmove",c),A.unbind(window,"touchend",u),a.__onFinishChange&&a.__onFinishChange.call(a,a.getValue())}return s.__background=document.createElement("div"),s.__foreground=document.createElement("div"),A.bind(s.__background,"mousedown",function(e){document.activeElement.blur(),A.bind(window,"mousemove",l),A.bind(window,"mouseup",d),l(e)}),A.bind(s.__background,"touchstart",function(e){if(1!==e.touches.length)return;A.bind(window,"touchmove",c),A.bind(window,"touchend",u),c(e)}),A.addClass(s.__background,"slider"),A.addClass(s.__foreground,"slider-fg"),s.updateDisplay(),s.__background.appendChild(s.__foreground),s.domElement.appendChild(s.__background),s}return f(t,L),h(t,[{key:"updateDisplay",value:function(){var e=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=100*e+"%",p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"updateDisplay",this).call(this)}}]),t}(),F=function(e){function t(e,n,o){_(this,t);var i=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n)),r=i;return i.__button=document.createElement("div"),i.__button.innerHTML=void 0===o?"Fire":o,A.bind(i.__button,"click",function(e){return e.preventDefault(),r.fire(),!1}),A.addClass(i.__button,"button"),i.domElement.appendChild(i.__button),i}return f(t,y),h(t,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),t}(),P=function(e){function t(e,n){_(this,t);var o=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));o.__color=new g(o.getValue()),o.__temp=new g(0);var r=o;o.domElement=document.createElement("div"),A.makeSelectable(o.domElement,!1),o.__selector=document.createElement("div"),o.__selector.className="selector",o.__saturation_field=document.createElement("div"),o.__saturation_field.className="saturation-field",o.__field_knob=document.createElement("div"),o.__field_knob.className="field-knob",o.__field_knob_border="2px solid ",o.__hue_knob=document.createElement("div"),o.__hue_knob.className="hue-knob",o.__hue_field=document.createElement("div"),o.__hue_field.className="hue-field",o.__input=document.createElement("input"),o.__input.type="text",o.__input_textShadow="0 1px 1px ",A.bind(o.__input,"keydown",function(e){13===e.keyCode&&h.call(this)}),A.bind(o.__input,"blur",h),A.bind(o.__selector,"mousedown",function(){A.addClass(this,"drag").bind(window,"mouseup",function(){A.removeClass(r.__selector,"drag")})}),A.bind(o.__selector,"touchstart",function(){A.addClass(this,"drag").bind(window,"touchend",function(){A.removeClass(r.__selector,"drag")})});var s=document.createElement("div");function a(e){f(e),A.bind(window,"mousemove",f),A.bind(window,"touchmove",f),A.bind(window,"mouseup",c),A.bind(window,"touchend",c)}function d(e){b(e),A.bind(window,"mousemove",b),A.bind(window,"touchmove",b),A.bind(window,"mouseup",u),A.bind(window,"touchend",u)}function c(){A.unbind(window,"mousemove",f),A.unbind(window,"touchmove",f),A.unbind(window,"mouseup",c),A.unbind(window,"touchend",c),p()}function u(){A.unbind(window,"mousemove",b),A.unbind(window,"touchmove",b),A.unbind(window,"mouseup",u),A.unbind(window,"touchend",u),p()}function h(){var e=l(this.value);!1!==e?(r.__color.__state=e,r.setValue(r.__color.toOriginal())):this.value=r.__color.toString()}function p(){r.__onFinishChange&&r.__onFinishChange.call(r,r.__color.toOriginal())}function f(e){-1===e.type.indexOf("touch")&&e.preventDefault();var t=r.__saturation_field.getBoundingClientRect(),n=e.touches&&e.touches[0]||e,o=n.clientX,i=n.clientY,s=(o-t.left)/(t.right-t.left),a=1-(i-t.top)/(t.bottom-t.top);return a>1?a=1:a<0&&(a=0),s>1?s=1:s<0&&(s=0),r.__color.v=a,r.__color.s=s,r.setValue(r.__color.toOriginal()),!1}function b(e){-1===e.type.indexOf("touch")&&e.preventDefault();var t=r.__hue_field.getBoundingClientRect(),n=1-((e.touches&&e.touches[0]||e).clientY-t.top)/(t.bottom-t.top);return n>1?n=1:n<0&&(n=0),r.__color.h=360*n,r.setValue(r.__color.toOriginal()),!1}return i.extend(o.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),i.extend(o.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:o.__field_knob_border+(o.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),i.extend(o.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),i.extend(o.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),i.extend(s.style,{width:"100%",height:"100%",background:"none"}),j(s,"top","rgba(0,0,0,0)","#000"),i.extend(o.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),V(o.__hue_field),i.extend(o.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:o.__input_textShadow+"rgba(0,0,0,0.7)"}),A.bind(o.__saturation_field,"mousedown",a),A.bind(o.__saturation_field,"touchstart",a),A.bind(o.__field_knob,"mousedown",a),A.bind(o.__field_knob,"touchstart",a),A.bind(o.__hue_field,"mousedown",d),A.bind(o.__hue_field,"touchstart",d),o.__saturation_field.appendChild(s),o.__selector.appendChild(o.__field_knob),o.__selector.appendChild(o.__saturation_field),o.__selector.appendChild(o.__hue_field),o.__hue_field.appendChild(o.__hue_knob),o.domElement.appendChild(o.__input),o.domElement.appendChild(o.__selector),o.updateDisplay(),o}return f(t,y),h(t,[{key:"updateDisplay",value:function(){var e=l(this.getValue());if(!1!==e){var t=!1;i.each(g.COMPONENTS,function(n){if(!i.isUndefined(e[n])&&!i.isUndefined(this.__color.__state[n])&&e[n]!==this.__color.__state[n])return t=!0,{}},this),t&&i.extend(this.__color.__state,e)}i.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var n=this.__color.v<.5||this.__color.s>.5?255:0,o=255-n;i.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+n+","+n+","+n+")"}),this.__hue_knob.style.marginTop=100*(1-this.__color.h/360)+"px",this.__temp.s=1,this.__temp.v=1,j(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),i.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+n+","+n+","+n+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),t}(),D=["-moz-","-o-","-webkit-","-ms-",""];function j(e,t,n,o){e.style.background="",i.each(D,function(i){e.style.cssText+="background: "+i+"linear-gradient("+t+", "+n+" 0%, "+o+" 100%); "})}function V(e){e.style.background="",e.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",e.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var I={load:function(e,t){var n=t||document,o=n.createElement("link");o.type="text/css",o.rel="stylesheet",o.href=e,n.getElementsByTagName("head")[0].appendChild(o)},inject:function(e,t){var n=t||document,o=document.createElement("style");o.type="text/css",o.innerHTML=e;var i=n.getElementsByTagName("head")[0];try{i.appendChild(o)}catch(r){}}},z='<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>',M=function(e,t){var n=e[t];return i.isArray(arguments[2])||i.isObject(arguments[2])?new S(e,t,arguments[2]):i.isNumber(n)?i.isNumber(arguments[2])&&i.isNumber(arguments[3])?i.isNumber(arguments[4])?new H(e,t,arguments[2],arguments[3],arguments[4]):new H(e,t,arguments[2],arguments[3]):i.isNumber(arguments[4])?new B(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new B(e,t,{min:arguments[2],max:arguments[3]}):i.isString(n)?new O(e,t):i.isFunction(n)?new F(e,t,""):i.isBoolean(n)?new k(e,t):null};function G(e){setTimeout(e,1e3/60)}var U=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||G,X=function(){function e(){_(this,e),this.backgroundElement=document.createElement("div"),i.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),A.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),i.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var t=this;A.bind(this.backgroundElement,"click",function(){t.hide()})}return h(e,[{key:"show",value:function(){var e=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),i.defer(function(){e.backgroundElement.style.opacity=1,e.domElement.style.opacity=1,e.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var e=this,t=function t(){e.domElement.style.display="none",e.backgroundElement.style.display="none",A.unbind(e.domElement,"webkitTransitionEnd",t),A.unbind(e.domElement,"transitionend",t),A.unbind(e.domElement,"oTransitionEnd",t)};A.bind(this.domElement,"webkitTransitionEnd",t),A.bind(this.domElement,"transitionend",t),A.bind(this.domElement,"oTransitionEnd",t),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-A.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-A.getHeight(this.domElement)/2+"px"}}]),e}(),K=e(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");I.inject(K);var Y="dg",J=72,W=20,Q="Default",q=function(){try{return!!window.localStorage}catch(e){return!1}}(),Z=void 0,$=!0,ee=void 0,te=!1,ne=[],oe=function e(t){var n=this,o=t||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),A.addClass(this.domElement,Y),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],o=i.defaults(o,{closeOnTop:!1,autoPlace:!0,width:e.DEFAULT_WIDTH}),o=i.defaults(o,{resizable:o.autoPlace,hideable:o.autoPlace}),i.isUndefined(o.load)?o.load={preset:Q}:o.preset&&(o.load.preset=o.preset),i.isUndefined(o.parent)&&o.hideable&&ne.push(this),o.resizable=i.isUndefined(o.parent)&&o.resizable,o.autoPlace&&i.isUndefined(o.scrollable)&&(o.scrollable=!0);var r,s=q&&"true"===localStorage.getItem(ce(this,"isLocal")),a=void 0,l=void 0;if(Object.defineProperties(this,{parent:{get:function(){return o.parent}},scrollable:{get:function(){return o.scrollable}},autoPlace:{get:function(){return o.autoPlace}},closeOnTop:{get:function(){return o.closeOnTop}},preset:{get:function(){return n.parent?n.getRoot().preset:o.load.preset},set:function(e){n.parent?n.getRoot().preset=e:o.load.preset=e,ge(this),n.revert()}},width:{get:function(){return o.width},set:function(e){o.width=e,fe(n,e)}},name:{get:function(){return o.name},set:function(e){o.name=e,l&&(l.innerHTML=o.name)}},closed:{get:function(){return o.closed},set:function(t){o.closed=t,o.closed?A.addClass(n.__ul,e.CLASS_CLOSED):A.removeClass(n.__ul,e.CLASS_CLOSED),this.onResize(),n.__closeButton&&(n.__closeButton.innerHTML=t?e.TEXT_OPEN:e.TEXT_CLOSED)}},load:{get:function(){return o.load}},useLocalStorage:{get:function(){return s},set:function(e){q&&(s=e,e?A.bind(window,"unload",a):A.unbind(window,"unload",a),localStorage.setItem(ce(n,"isLocal"),e))}}}),i.isUndefined(o.parent)){if(this.closed=o.closed||!1,A.addClass(this.domElement,e.CLASS_MAIN),A.makeSelectable(this.domElement,!1),q&&s){n.useLocalStorage=!0;var d=localStorage.getItem(ce(this,"gui"));d&&(o.load=JSON.parse(d))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=e.TEXT_CLOSED,A.addClass(this.__closeButton,e.CLASS_CLOSE_BUTTON),o.closeOnTop?(A.addClass(this.__closeButton,e.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(A.addClass(this.__closeButton,e.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),A.bind(this.__closeButton,"click",function(){n.closed=!n.closed})}else{void 0===o.closed&&(o.closed=!0);var c=document.createTextNode(o.name);A.addClass(c,"controller-name"),l=ie(n,c);A.addClass(this.__ul,e.CLASS_CLOSED),A.addClass(l,"title"),A.bind(l,"click",function(e){return e.preventDefault(),n.closed=!n.closed,!1}),o.closed||(this.closed=!1)}o.autoPlace&&(i.isUndefined(o.parent)&&($&&(ee=document.createElement("div"),A.addClass(ee,Y),A.addClass(ee,e.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ee),$=!1),ee.appendChild(this.domElement),A.addClass(this.domElement,e.CLASS_AUTO_PLACE)),this.parent||fe(n,o.width)),this.__resizeHandler=function(){n.onResizeDebounced()},A.bind(window,"resize",this.__resizeHandler),A.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),A.bind(this.__ul,"transitionend",this.__resizeHandler),A.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),o.resizable&&pe(this),a=function(){q&&"true"===localStorage.getItem(ce(n,"isLocal"))&&localStorage.setItem(ce(n,"gui"),JSON.stringify(n.getSaveObject()))},this.saveToLocalStorageIfPossible=a,o.parent||((r=n.getRoot()).width+=1,i.defer(function(){r.width-=1}))};function ie(e,t,n){var o=document.createElement("li");return t&&o.appendChild(t),n?e.__ul.insertBefore(o,n):e.__ul.appendChild(o),e.onResize(),o}function re(e){A.unbind(window,"resize",e.__resizeHandler),e.saveToLocalStorageIfPossible&&A.unbind(window,"unload",e.saveToLocalStorageIfPossible)}function se(e,t){var n=e.__preset_select[e.__preset_select.selectedIndex];n.innerHTML=t?n.value+"*":n.value}function ae(e,t,n){if(n.__li=t,n.__gui=e,i.extend(n,{options:function(t){if(arguments.length>1){var o=n.__li.nextElementSibling;return n.remove(),de(e,n.object,n.property,{before:o,factoryArgs:[i.toArray(arguments)]})}if(i.isArray(t)||i.isObject(t)){var r=n.__li.nextElementSibling;return n.remove(),de(e,n.object,n.property,{before:r,factoryArgs:[t]})}},name:function(e){return n.__li.firstElementChild.firstElementChild.innerHTML=e,n},listen:function(){return n.__gui.listen(n),n},remove:function(){return n.__gui.remove(n),n}}),n instanceof H){var o=new B(n.object,n.property,{min:n.__min,max:n.__max,step:n.__step});i.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(e){var t=n[e],i=o[e];n[e]=o[e]=function(){var e=Array.prototype.slice.call(arguments);return i.apply(o,e),t.apply(n,e)}}),A.addClass(t,"has-slider"),n.domElement.insertBefore(o.domElement,n.domElement.firstElementChild)}else if(n instanceof B){var r=function(t){if(i.isNumber(n.__min)&&i.isNumber(n.__max)){var o=n.__li.firstElementChild.firstElementChild.innerHTML,r=n.__gui.__listening.indexOf(n)>-1;n.remove();var s=de(e,n.object,n.property,{before:n.__li.nextElementSibling,factoryArgs:[n.__min,n.__max,n.__step]});return s.name(o),r&&s.listen(),s}return t};n.min=i.compose(r,n.min),n.max=i.compose(r,n.max)}else n instanceof k?(A.bind(t,"click",function(){A.fakeEvent(n.__checkbox,"click")}),A.bind(n.__checkbox,"click",function(e){e.stopPropagation()})):n instanceof F?(A.bind(t,"click",function(){A.fakeEvent(n.__button,"click")}),A.bind(t,"mouseover",function(){A.addClass(n.__button,"hover")}),A.bind(t,"mouseout",function(){A.removeClass(n.__button,"hover")})):n instanceof P&&(A.addClass(t,"color"),n.updateDisplay=i.compose(function(e){return t.style.borderLeftColor=n.__color.toString(),e},n.updateDisplay),n.updateDisplay());n.setValue=i.compose(function(t){return e.getRoot().__preset_select&&n.isModified()&&se(e.getRoot(),!0),t},n.setValue)}function le(e,t){var n=e.getRoot(),o=n.__rememberedObjects.indexOf(t.object);if(-1!==o){var i=n.__rememberedObjectIndecesToControllers[o];if(void 0===i&&(i={},n.__rememberedObjectIndecesToControllers[o]=i),i[t.property]=t,n.load&&n.load.remembered){var r=n.load.remembered,s=void 0;if(r[e.preset])s=r[e.preset];else{if(!r[Q])return;s=r[Q]}if(s[o]&&void 0!==s[o][t.property]){var a=s[o][t.property];t.initialValue=a,t.setValue(a)}}}}function de(e,t,n,o){if(void 0===t[n])throw new Error('Object "'+t+'" has no property "'+n+'"');var i=void 0;if(o.color)i=new P(t,n);else{var r=[t,n].concat(o.factoryArgs);i=M.apply(e,r)}o.before instanceof y&&(o.before=o.before.__li),le(e,i),A.addClass(i.domElement,"c");var s=document.createElement("span");A.addClass(s,"property-name"),s.innerHTML=i.property;var a=document.createElement("div");a.appendChild(s),a.appendChild(i.domElement);var l=ie(e,a,o.before);return A.addClass(l,oe.CLASS_CONTROLLER_ROW),i instanceof P?A.addClass(l,"color"):A.addClass(l,u(i.getValue())),ae(e,l,i),e.__controllers.push(i),i}function ce(e,t){return document.location.href+"."+t}function ue(e,t,n){var o=document.createElement("option");o.innerHTML=t,o.value=t,e.__preset_select.appendChild(o),n&&(e.__preset_select.selectedIndex=e.__preset_select.length-1)}function _e(e,t){t.style.display=e.useLocalStorage?"block":"none"}function he(e){var t=e.__save_row=document.createElement("li");A.addClass(e.domElement,"has-save"),e.__ul.insertBefore(t,e.__ul.firstChild),A.addClass(t,"save-row");var n=document.createElement("span");n.innerHTML="&nbsp;",A.addClass(n,"button gears");var o=document.createElement("span");o.innerHTML="Save",A.addClass(o,"button"),A.addClass(o,"save");var r=document.createElement("span");r.innerHTML="New",A.addClass(r,"button"),A.addClass(r,"save-as");var s=document.createElement("span");s.innerHTML="Revert",A.addClass(s,"button"),A.addClass(s,"revert");var a=e.__preset_select=document.createElement("select");if(e.load&&e.load.remembered?i.each(e.load.remembered,function(t,n){ue(e,n,n===e.preset)}):ue(e,Q,!1),A.bind(a,"change",function(){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].innerHTML=e.__preset_select[t].value;e.preset=this.value}),t.appendChild(a),t.appendChild(n),t.appendChild(o),t.appendChild(r),t.appendChild(s),q){var l=document.getElementById("dg-local-explain"),d=document.getElementById("dg-local-storage");document.getElementById("dg-save-locally").style.display="block","true"===localStorage.getItem(ce(e,"isLocal"))&&d.setAttribute("checked","checked"),_e(e,l),A.bind(d,"change",function(){e.useLocalStorage=!e.useLocalStorage,_e(e,l)})}var c=document.getElementById("dg-new-constructor");A.bind(c,"keydown",function(e){!e.metaKey||67!==e.which&&67!==e.keyCode||Z.hide()}),A.bind(n,"click",function(){c.innerHTML=JSON.stringify(e.getSaveObject(),void 0,2),Z.show(),c.focus(),c.select()}),A.bind(o,"click",function(){e.save()}),A.bind(r,"click",function(){var t=prompt("Enter a new preset name.");t&&e.saveAs(t)}),A.bind(s,"click",function(){e.revert()})}function pe(e){var t=void 0;function n(n){return n.preventDefault(),e.width+=t-n.clientX,e.onResize(),t=n.clientX,!1}function o(){A.removeClass(e.__closeButton,oe.CLASS_DRAG),A.unbind(window,"mousemove",n),A.unbind(window,"mouseup",o)}function r(i){return i.preventDefault(),t=i.clientX,A.addClass(e.__closeButton,oe.CLASS_DRAG),A.bind(window,"mousemove",n),A.bind(window,"mouseup",o),!1}e.__resize_handle=document.createElement("div"),i.extend(e.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"}),A.bind(e.__resize_handle,"mousedown",r),A.bind(e.__closeButton,"mousedown",r),e.domElement.insertBefore(e.__resize_handle,e.domElement.firstElementChild)}function fe(e,t){e.domElement.style.width=t+"px",e.__save_row&&e.autoPlace&&(e.__save_row.style.width=t+"px"),e.__closeButton&&(e.__closeButton.style.width=t+"px")}function me(e,t){var n={};return i.each(e.__rememberedObjects,function(o,r){var s={},a=e.__rememberedObjectIndecesToControllers[r];i.each(a,function(e,n){s[n]=t?e.initialValue:e.getValue()}),n[r]=s}),n}function ge(e){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].value===e.preset&&(e.__preset_select.selectedIndex=t)}function be(e){0!==e.length&&U.call(window,function(){be(e)}),i.each(e,function(e){e.updateDisplay()})}oe.toggleHide=function(){te=!te,i.each(ne,function(e){e.domElement.style.display=te?"none":""})},oe.CLASS_AUTO_PLACE="a",oe.CLASS_AUTO_PLACE_CONTAINER="ac",oe.CLASS_MAIN="main",oe.CLASS_CONTROLLER_ROW="cr",oe.CLASS_TOO_TALL="taller-than-window",oe.CLASS_CLOSED="closed",oe.CLASS_CLOSE_BUTTON="close-button",oe.CLASS_CLOSE_TOP="close-top",oe.CLASS_CLOSE_BOTTOM="close-bottom",oe.CLASS_DRAG="drag",oe.DEFAULT_WIDTH=245,oe.TEXT_CLOSED="Close Controls",oe.TEXT_OPEN="Open Controls",oe._keydownHandler=function(e){"text"===document.activeElement.type||e.which!==J&&e.keyCode!==J||oe.toggleHide()},A.bind(window,"keydown",oe._keydownHandler,!1),i.extend(oe.prototype,{add:function(e,t){return de(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return de(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;i.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&ee.removeChild(this.domElement);var e=this;i.each(this.__folders,function(t){e.removeFolder(t)}),A.unbind(window,"keydown",oe._keydownHandler,!1),re(this)},addFolder:function(e){if(void 0!==this.__folders[e])throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new oe(t);this.__folders[e]=n;var o=ie(this,n.domElement);return A.addClass(o,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],re(e);var t=this;i.each(e.__folders,function(t){e.removeFolder(t)}),i.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=A.getOffset(e.__ul).top,n=0;i.each(e.__ul.childNodes,function(t){e.autoPlace&&t===e.__save_row||(n+=A.getHeight(t))}),window.innerHeight-t-W<n?(A.addClass(e.domElement,oe.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-W+"px"):(A.removeClass(e.domElement,oe.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&i.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:i.debounce(function(){this.onResize()},50),remember:function(){if(i.isUndefined(Z)&&((Z=new X).domElement.innerHTML=z),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;i.each(Array.prototype.slice.call(arguments),function(t){0===e.__rememberedObjects.length&&he(e),-1===e.__rememberedObjects.indexOf(t)&&e.__rememberedObjects.push(t)}),this.autoPlace&&fe(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=me(this)),e.folders={},i.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=me(this),se(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Q]=me(this,!0)),this.load.remembered[e]=me(this),this.preset=e,ue(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){i.each(this.__controllers,function(t){this.getRoot().load.remembered?le(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),i.each(this.__folders,function(e){e.revert(e)}),e||se(this.getRoot(),!1)},listen:function(e){var t=0===this.__listening.length;this.__listening.push(e),t&&be(this.__listening)},updateDisplay:function(){i.each(this.__controllers,function(e){e.updateDisplay()}),i.each(this.__folders,function(e){e.updateDisplay()})}});var ve={Color:g,math:c,interpret:l};exports.color=ve;var ye={Controller:y,BooleanController:k,OptionController:S,StringController:O,NumberController:L,NumberControllerBox:B,NumberControllerSlider:H,FunctionController:F,ColorController:P};exports.controllers=ye;var we={dom:A};exports.dom=we;var xe={GUI:oe};exports.gui=xe;var Ee=oe;exports.GUI=Ee;var Ce={color:ve,controllers:ye,dom:we,gui:xe,GUI:Ee},Ae=Ce;exports.default=Ae;
},{}],"QCba":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.afterEach=exports.afterAll=exports.beforeEach=exports.beforeAll=exports.it=exports.describe=exports.resetRoot=exports.getRoot=void 0;var e,t,r=[];function o(){return e}function n(){t=e={type:"describe",name:"",children:[]},r.push(t)}function s(o,n){var s=null!=(t=r[r.length-1])?t:e,p={type:"describe",name:o,parent:s,children:[]};s.children.push(p),t=p,r.push(t),n(),r.pop(),t=r[r.length-1]}function p(e,r){t.children.push({type:"it",name:e,parent:t,hook:r})}function c(e){t.beforeAll=e}function i(e){t.beforeEach=e}function l(e){t.afterAll=e}function f(e){t.afterEach=e}n(),exports.getRoot=o,exports.resetRoot=n,exports.describe=s,exports.it=p,exports.beforeAll=c,exports.beforeEach=i,exports.afterAll=l,exports.afterEach=f;
},{}],"cKRm":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(a,s){function u(e){try{o(n.next(e))}catch(t){s(t)}}function l(e){try{o(n.throw(e))}catch(t){s(t)}}function o(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(u,l)}o((n=n.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,n,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function l(s){return function(l){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(a=2&s[0]?n.return:s[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,s[1])).done)return a;switch(n=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return u.label++,{value:s[1],done:!1};case 5:u.label++,n=s[1],s=[0];continue;case 7:s=u.ops.pop(),u.trys.pop();continue;default:if(!(a=(a=u.trys).length>0&&a[a.length-1])&&(6===s[0]||2===s[0])){u=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){u.label=s[1];break}if(6===s[0]&&u.label<a[1]){u.label=a[1],a=s;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(s);break}a[2]&&u.ops.pop(),u.trys.pop();continue}s=t.call(e,u)}catch(l){s=[6,l],n=0}finally{r=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.runSingle=exports.runAll=void 0;var r=require("./index");function n(){return e(this,void 0,void 0,function(){var e;return t(this,function(t){switch(t.label){case 0:return e={results:[]},[4,s((0,r.getRoot)(),e)];case 1:return t.sent(),[2,e.results]}})})}function a(r){return e(this,void 0,void 0,function(){var e,n,a,s,l,o,c,i;return t(this,function(t){switch(t.label){case 0:for(e={results:[]},n=[],a=r.parent;a;)n.unshift(a),a=a.parent;s=0,l=n,t.label=1;case 1:return s<l.length?[4,u("beforeAll",(i=l[s]).beforeAll,e)]:[3,5];case 2:return t.sent(),[4,u("beforeEach",i.beforeAll,e)];case 3:t.sent(),t.label=4;case 4:return s++,[3,1];case 5:return[4,u(r.name,r.hook,e)];case 6:t.sent(),o=0,c=n,t.label=7;case 7:return o<c.length?[4,u("afterEach",(i=c[o]).afterEach,e)]:[3,11];case 8:return t.sent(),[4,u("afterAll",i.afterAll,e)];case 9:t.sent(),t.label=10;case 10:return o++,[3,7];case 11:return[2]}})})}function s(r,n){return e(this,void 0,void 0,function(){var e,a,l;return t(this,function(t){switch(t.label){case 0:return[4,u("beforeAll",null==r?void 0:r.beforeAll,n)];case 1:t.sent(),e=0,a=r.children,t.label=2;case 2:return e<a.length?(l=a[e],[4,u("beforeEach",null==r?void 0:r.beforeEach,n)]):[3,10];case 3:return t.sent(),"describe"!==l.type?[3,5]:[4,s(l,n)];case 4:return t.sent(),[3,7];case 5:return"it"!==l.type?[3,7]:[4,u(l.name,l.hook,n)];case 6:t.sent(),t.label=7;case 7:return[4,u("afterEach",null==r?void 0:r.afterEach,n)];case 8:t.sent(),t.label=9;case 9:return e++,[3,2];case 10:return[4,u("afterAll",null==r?void 0:r.afterAll,n)];case 11:return t.sent(),[2]}})})}function u(r,n,a){return e(this,void 0,void 0,function(){var e,s;return t(this,function(t){switch(t.label){case 0:if(!n)return[2];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,n()];case 2:return e=t.sent(),a.results.push({name:[r],status:"pass",meta:e}),[3,4];case 3:return s=t.sent(),a.results.push({name:[r],status:"exception",meta:s}),[3,4];case 4:return[2]}})})}exports.runAll=n,exports.runSingle=a;
},{"./index":"QCba"}],"sRuM":[function(require,module,exports) {
"use strict";var e=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),t=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var n={};if(null!=r)for(var i in r)"default"!==i&&Object.prototype.hasOwnProperty.call(r,i)&&e(n,r,i);return t(n,r),n};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createUI=void 0;var n=r(require("dat.gui")),i=require("./index"),u=require("./runner");function a(e){o((0,i.getRoot)(),e)}function o(e,t){t||(t=new n.GUI({name:e.name}));for(var r=function(e){var r;if("it"===e.type){var n=((r={})[e.name]=function(){return(0,u.runSingle)(e)},r);t.add(n,e.name)}if("describe"===e.type){var i=t.addFolder(e.name);o(e,i)}},i=0,a=e.children;i<a.length;i++){r(a[i])}}exports.createUI=a;
},{"dat.gui":"KkZG","./index":"QCba","./runner":"cKRm"}],"kLTt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.runAll=exports.getRoot=exports.afterEach=exports.afterAll=exports.beforeEach=exports.beforeAll=exports.it=exports.describe=exports.createUI=void 0;var e=require("./ui");Object.defineProperty(exports,"createUI",{enumerable:!0,get:function(){return e.createUI}});var r=require("./index");Object.defineProperty(exports,"describe",{enumerable:!0,get:function(){return r.describe}}),Object.defineProperty(exports,"it",{enumerable:!0,get:function(){return r.it}}),Object.defineProperty(exports,"beforeAll",{enumerable:!0,get:function(){return r.beforeAll}}),Object.defineProperty(exports,"beforeEach",{enumerable:!0,get:function(){return r.beforeEach}}),Object.defineProperty(exports,"afterAll",{enumerable:!0,get:function(){return r.afterAll}}),Object.defineProperty(exports,"afterEach",{enumerable:!0,get:function(){return r.afterEach}}),Object.defineProperty(exports,"getRoot",{enumerable:!0,get:function(){return r.getRoot}});var t=require("./runner");Object.defineProperty(exports,"runAll",{enumerable:!0,get:function(){return t.runAll}});
},{"./ui":"sRuM","./index":"QCba","./runner":"cKRm"}]},{},["kLTt"], null)

},{}],"../node_modules/dat.gui/build/dat.gui.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GUI = exports.gui = exports.dom = exports.controllers = exports.color = void 0;

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function ___$insertStyle(css) {
  if (!css) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function colorToString(color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();

  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);

  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);

    while (str.length < 6) {
      str = '0' + str;
    }

    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }

  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);

      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }

      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }

    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;

      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;

      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }

      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);

      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }

    isNaN.toString = function () {
      return _isNaN.toString();
    };

    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return obj instanceof Function;
  }
};
var INTERPRETATIONS = [{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
}, {
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
}, {
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }

        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
}, {
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;

var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);

        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;

    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }

    h /= 6;

    if (h < 0) {
      h += 1;
    }

    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }

    this.__state.a = this.__state.a || 1;
  }

  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();

function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }

      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }

      this.__state[component] = v;
    }
  });
}

function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }

      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }

      this.__state[component] = v;
    }
  });
}

Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};

Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });

  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};

Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
      this.__state.space = 'HEX';
    }

    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }

  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;

      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }

      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }

  var match = val.match(CSS_VALUE_PIXELS);

  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }

  return 0;
}

var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;

    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }

    if (Common.isUndefined(vertical)) {
      vertical = true;
    }

    elem.style.position = 'absolute';

    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }

    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];

    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }

    var evt = document.createEvent(className);

    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
          break;
        }

      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }

      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }

    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }

    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }

    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);

      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }

    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);

        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }

    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = {
      left: 0,
      top: 0
    };

    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }

    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);

  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);

    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));

    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');

    _this2.__checkbox.setAttribute('type', 'checkbox');

    function onChange() {
      _this.setValue(!_this.__prev);
    }

    dom.bind(_this2.__checkbox, 'change', onChange, false);

    _this2.domElement.appendChild(_this2.__checkbox);

    _this2.updateDisplay();

    return _this2;
  }

  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');

        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }

      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);

  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);

    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));

    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');

    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }

    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);

      _this.__select.appendChild(opt);
    });

    _this2.updateDisplay();

    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;

      _this.setValue(desiredValue);
    });

    _this2.domElement.appendChild(_this2.__select);

    return _this2;
  }

  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);

  function StringController(object, property) {
    classCallCheck(this, StringController);

    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));

    var _this = _this2;

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }

      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();

  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }

  return 0;
}

var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);

  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);

    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));

    var _params = params || {};

    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;

    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }

    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }

  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;

      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }

      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }

      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}

var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);

  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);

    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));

    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;

    function onChange() {
      var attempted = parseFloat(_this.__input.value);

      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onBlur() {
      onFinish();
    }

    function onMouseDrag(e) {
      var diff = prevY - e.clientY;

      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prevY = e.clientY;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}

var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);

  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);

    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, {
      min: min,
      max: max,
      step: step
    }));

    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');

    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }

    function onMouseDrag(e) {
      e.preventDefault();

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));

      return false;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }

      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }

    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }

    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.updateDisplay();

    _this2.__background.appendChild(_this2.__foreground);

    _this2.domElement.appendChild(_this2.__background);

    return _this2;
  }

  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);

      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);

  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);

    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));

    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();

      _this.fire();

      return false;
    });
    dom.addClass(_this2.__button, 'button');

    _this2.domElement.appendChild(_this2.__button);

    return _this2;
  }

  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }

      this.getValue().call(this.object);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);

  function ColorController(object, property) {
    classCallCheck(this, ColorController);

    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));

    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function () {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function () {
      dom.addClass(this, 'drag').bind(window, 'touchend', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);

    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }

    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }

    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }

    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }

    function onBlur() {
      var i = interpret(this.value);

      if (i !== false) {
        _this.__color.__state = i;

        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }

    _this2.__saturation_field.appendChild(valueField);

    _this2.__selector.appendChild(_this2.__field_knob);

    _this2.__selector.appendChild(_this2.__saturation_field);

    _this2.__selector.appendChild(_this2.__hue_field);

    _this2.__hue_field.appendChild(_this2.__hue_knob);

    _this2.domElement.appendChild(_this2.__input);

    _this2.domElement.appendChild(_this2.__selector);

    _this2.updateDisplay();

    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__saturation_field.getBoundingClientRect();

      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;

      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }

      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__hue_field.getBoundingClientRect();

      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;

      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    return _this2;
  }

  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());

      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);

        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }

      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;

      var _flip = 255 - flip;

      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);

var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];

function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}

function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];

    try {
      head.appendChild(injected);
    } catch (e) {}
  }
};
var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];

  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }

  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }

      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }

    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, {
        min: arguments[2],
        max: arguments[3],
        step: arguments[4]
      });
    }

    return new NumberControllerBox(object, property, {
      min: arguments[2],
      max: arguments[3]
    });
  }

  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }

  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }

  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }

  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}

var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;

    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }

  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;

      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;

      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };

      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();

var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];

var GUI = function GUI(pars) {
  var _this = this;

  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });

  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = {
      preset: DEFAULT_DEFAULT_PRESET_NAME
    };
  }

  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }

  params.resizable = Common.isUndefined(params.parent) && params.resizable;

  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }

  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this, {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }

        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }

        setPresetSelectIndex(this);

        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;

        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;

        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }

        this.onResize();

        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;

          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }

          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });

  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);

    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }

    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);

    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }

    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }

    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);

    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };

    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);

    if (!params.closed) {
      this.closed = false;
    }
  }

  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }

      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }

    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }

  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };

  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();

  if (params.resizable) {
    addResizeHandle(this);
  }

  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };

  this.saveToLocalStorageIfPossible = saveToLocalStorage;

  function resetWidth() {
    var root = _this.getRoot();

    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }

  if (!params.parent) {
    resetWidth();
  }
};

GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};

GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';

GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};

dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype, {
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);

    this.__controllers.splice(this.__controllers.indexOf(controller), 1);

    var _this = this;

    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }

    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }

    var _this = this;

    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }

    var newGuiParams = {
      name: name,
      parent: this
    };
    newGuiParams.autoPlace = this.autoPlace;

    if (this.load && this.load.folders && this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }

    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);

    delete this.__folders[folder.name];

    if (this.load && this.load.folders && this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }

    removeListeners(folder);

    var _this = this;

    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();

    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });

      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }

    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }

    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }

    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }

    var _this = this;

    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }

      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });

    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;

    while (gui.parent) {
      gui = gui.parent;
    }

    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;

    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;

      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }

      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }

    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }

    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }

    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }

      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });

    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;

    this.__listening.push(controller);

    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});

function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');

  if (newDom) {
    li.appendChild(newDom);
  }

  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }

  gui.onResize();
  return li;
}

function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);

  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}

function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];

  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}

function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller, {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }

      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);

      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);

      return controller;
    }
  });

  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, {
      min: controller.__min,
      max: controller.__max,
      step: controller.__step
    });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];

      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();

        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });

        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }

      return returned;
    };

    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }

  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }

    return val;
  }, controller.setValue);
}

function recallSavedValue(gui, controller) {
  var root = gui.getRoot();

  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);

  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];

    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }

    controllerMap[controller.property] = controller;

    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;

      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }

      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}

function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }

  var controller = void 0;

  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }

  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }

  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);

  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }

  augmentController(gui, li, controller);

  gui.__controllers.push(controller);

  return controller;
}

function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}

function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;

  gui.__preset_select.appendChild(opt);

  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}

function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}

function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');

  gui.__ul.insertBefore(div, gui.__ul.firstChild);

  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');

  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }

  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }

    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);

  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';

    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }

    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }

  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');

    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}

function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });

  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }

  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }

  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }

  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}

function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';

  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }

  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}

function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}

function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}

function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }

  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
exports.color = color;
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
exports.controllers = controllers;
var dom$1 = {
  dom: dom
};
exports.dom = dom$1;
var gui = {
  GUI: GUI
};
exports.gui = gui;
var GUI$1 = GUI;
exports.GUI = GUI$1;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};
var _default = index;
exports.default = _default;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runnerAddr = void 0;

var loader_1 = require("./loader");

var config_1 = require("./config");

var render_1 = require("./tests/render");

var labeling_1 = require("./tests/labeling");

var parser_1 = require("./tests/parser");

var describe_it_browser_1 = require("describe-it-browser");

var dat = __importStar(require("dat.gui"));

var scenarios_1 = require("./tests/render/scenarios");

exports.runnerAddr = "http://" + config_1.runner.hostname + ":" + config_1.runner.port;

var log = function log(msg) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , console.log(msg)];
    });
  });
};
/* fetch(`${runnerAddr}/log/`, {
method: 'POST', // or 'PUT'
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(msg),
}); */


var finish = function finish(success) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , console.log('end')];
    });
  });
}; // fetch(`${runnerAddr}/exit/${success ? 'pass' : 'fail'}`);


var mapInstance;

function performTest(mapUrl, test) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    if (mapInstance) {
      mapInstance.destroy();
    }

    (0, loader_1.load)(mapUrl).then(function (mapgl) {
      var map = mapInstance = new mapgl.Map('map', {
        key: '042b5b75-f847-4f2a-b695-b5f58adc9dfd',
        zoomControl: 'bottomRight',
        center: [82.897904, 54.98318],
        zoom: 16
      });
      map.once('idle', function () {
        return __awaiter(_this, void 0, void 0, function () {
          var jmap, _a;

          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                jmap = map._impl;
                return [4
                /*yield*/
                , log('Testing ' + (mapUrl || 'production'))];

              case 1:
                _b.sent();

                _a = resolve;
                return [4
                /*yield*/
                , test(jmap)];

              case 2:
                _a.apply(void 0, [_b.sent()]);

                return [2
                /*return*/
                ];
            }
          });
        });
      });
    });
  });
}

var origins = {
  reference: 'https://mapgl.2gis.com/api/js',
  target: 'https://jakarta.web-staging.2gis.ru/sdk/index.js'
};

function performComparingTest(test) {
  return __awaiter(this, void 0, void 0, function () {
    var referenceResults, targetResults, _a, _b, _i, indicator, producationStats, targetStats, _c, _d, _e, percentile, delta;

    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          return [4
          /*yield*/
          , performTest(origins.reference, test)];

        case 1:
          referenceResults = _f.sent();
          return [4
          /*yield*/
          , performTest(origins.target, test)];

        case 2:
          targetResults = _f.sent();
          _a = [];

          for (_b in referenceResults) {
            _a.push(_b);
          }

          _i = 0;
          _f.label = 3;

        case 3:
          if (!(_i < _a.length)) return [3
          /*break*/
          , 9];
          indicator = _a[_i];
          producationStats = referenceResults[indicator];
          targetStats = targetResults[indicator];
          return [4
          /*yield*/
          , log(indicator)];

        case 4:
          _f.sent();

          _c = [];

          for (_d in producationStats) {
            _c.push(_d);
          }

          _e = 0;
          _f.label = 5;

        case 5:
          if (!(_e < _c.length)) return [3
          /*break*/
          , 8];
          percentile = _c[_e];
          delta = (targetStats[percentile] - producationStats[percentile]).toFixed(2);

          if (delta[0] !== '-') {
            delta = "+" + delta;
          }

          return [4
          /*yield*/
          , log("  " + percentile + " " + delta + " (" + targetStats[percentile] + "/" + producationStats[percentile] + ")")];

        case 6:
          _f.sent();

          _f.label = 7;

        case 7:
          _e++;
          return [3
          /*break*/
          , 5];

        case 8:
          _i++;
          return [3
          /*break*/
          , 3];

        case 9:
          return [4
          /*yield*/
          , finish(true)];

        case 10:
          _f.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
}

(0, describe_it_browser_1.it)('Parser', function () {
  return performComparingTest(parser_1.measureParser);
});
(0, describe_it_browser_1.it)('Labeling', function () {
  return performComparingTest(labeling_1.measureLabeling);
});
(0, describe_it_browser_1.describe)('Rendering', function () {
  var _loop_1 = function _loop_1(prefCase) {
    (0, describe_it_browser_1.it)(prefCase, function () {
      return performComparingTest(function (map) {
        return (0, render_1.measureRender)(map, prefCase);
      });
    });
  };

  for (var prefCase in scenarios_1.cases) {
    _loop_1(prefCase);
  }
});
var ui = new dat.GUI({
  width: 300
});
ui.add(origins, 'reference');
ui.add(origins, 'target');
(0, describe_it_browser_1.createUI)(ui.addFolder('Cases'));
},{"./loader":"loader.ts","./config":"config.ts","./tests/render":"tests/render/index.ts","./tests/labeling":"tests/labeling.ts","./tests/parser":"tests/parser.ts","describe-it-browser":"../node_modules/describe-it-browser/dist/lib.js","dat.gui":"../node_modules/dat.gui/build/dat.gui.module.js","./tests/render/scenarios":"tests/render/scenarios.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59796" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map