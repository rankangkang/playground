(function(graph) {
  function require(module) {
    function localRequire(relativePath) {
      return require(graph[module].deps[relativePath]);
    }
    var exports = {};
    (function(require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[module].code);
    return exports;
  }
  require('./src/main.js');
})({
  "./src/main.js": {
    "deps": {
      "./greet.js": "./src/greet.js"
    },
    "code": "\"use strict\";\n\nvar _greet = require(\"./greet.js\");\ndocument.write((0, _greet.greet)(\"World\"));"
  },
  "./src/greet.js": {
    "deps": {},
    "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.greet = greet;\nfunction greet(name) {\n  return \"Hello, \".concat(name, \"!\");\n}"
  }
})