define('app',["exports", "./models/todo"], function (exports, _todo) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.appName = "Todo List";
      this.todoTitle = "";
      this.todos = [new _todo.Todo("Task one", false), new _todo.Todo("Task two", true), new _todo.Todo("Task three", false)];
    }

    App.prototype.addTodo = function addTodo() {
      this.todos.push(new _todo.Todo(this.todoTitle, false));
      this.todoTitle = "";
      console.log(this.todos);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('models/todo',["exports", "../utils/idgenerator"], function (exports, _idgenerator) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Todo = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Todo = exports.Todo = function Todo(title) {
    var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Todo);

    this.id = _idgenerator.IdGenerator.getNextId();
    this.title = title;
    this.completed = completed;
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('utils/idgenerator',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _IdGenerator = function () {
    function _IdGenerator() {
      _classCallCheck(this, _IdGenerator);

      this.id = 0;
    }

    _IdGenerator.prototype.getNextId = function getNextId() {
      return ++this.id;
    };

    return _IdGenerator;
  }();

  var IdGenerator = exports.IdGenerator = new _IdGenerator();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./styles.css\"></require><h1>${appName}</h1><form method=\"post\" submit.trigger=\"addTodo()\"><input type=\"text\" placeholder=\"What will you like to do?\" value.bind=\"todoTitle\"> <button type=\"submit\">Add</button></form><ul repeat.for=\"todo of todos\"><li><input type=\"checkbox\" checked.bind=\"todo.completed\"> <span class.bind=\"todo.completed ? 'strikeOut' : ''\">${todo.id} - ${todo.title}</span></li></ul></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "ul {\n  padding-left: 10px; }\n\nli {\n  list-style-type: none; }\n\n.strikeOut {\n  text-decoration: line-through; }\n"; });
//# sourceMappingURL=app-bundle.js.map