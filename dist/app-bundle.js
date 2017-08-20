define('app',["exports", "./models/todo", "./services/inmemory-todo-service", "aurelia-framework"], function (exports, _todo, _inmemoryTodoService, _aureliaFramework) {
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

  var _createClass = function () {
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

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_inmemoryTodoService.InMemoryTodoService), _dec(_class = function () {
    function App(InMemoryTodoService) {
      _classCallCheck(this, App);

      this.InMemoryTodoService = InMemoryTodoService;
      this.appName = "Todo List";
      this.todoTitle = "";
      this.activeFilter = "all";

      this.filterTodos(this.activeFilter);
      console.log(this.todos);
    }

    App.prototype.addTodo = function addTodo() {
      this.InMemoryTodoService.addTodo(new _todo.Todo(this.todoTitle, false));
      this.todoTitle = "";
      this.filterTodos(this.activeFilter);
      console.log(this.todos);
    };

    App.prototype.removeTodo = function removeTodo(todo) {
      console.log("remove");
      this.InMemoryTodoService.deleteTodoById(todo.id);
      this.filterTodos(this.activeFilter);
    };

    App.prototype.updateTodo = function updateTodo(todo) {
      if (todo.isEditMode) {
        todo.isEditMode = false;
        this.InMemoryTodoService.updateTodoById(todo.id, todo);
      } else {
        todo.isEditMode = true;
      }
    };

    App.prototype.filterTodos = function filterTodos(filterCriteria) {
      this.activeFilter = filterCriteria;
      this.todos = this.InMemoryTodoService.filterTodos(this.activeFilter);
    };

    App.prototype.getTodosCount = function getTodosCount(filter) {
      return this.InMemoryTodoService.filterTodos(filter).length;
    };

    App.prototype.checkIfAllTodosAreCompleted = function checkIfAllTodosAreCompleted() {
      return this.todos.every(function (todo) {
        return todo.completed;
      });
    };

    App.prototype.toggleAllTodos = function toggleAllTodos() {
      this.InMemoryTodoService.toggleAllTodos();
      this.filterTodos(this.activeFilter);
    };

    App.prototype.completeAllTodos = function completeAllTodos() {
      this.InMemoryTodoService.completeAllTodos();
      this.checkIfAllTodosAreCompleted();
      this.filterTodos(this.activeFilter);
    };

    App.prototype.removeCompletedTodos = function removeCompletedTodos() {
      this.InMemoryTodoService.removeCompletedTodos();
      this.filterTodos(this.activeFilter);
    };

    App.prototype.removeAllTodos = function removeAllTodos() {
      this.InMemoryTodoService.removeAllTodos();
      this.filterTodos(this.activeFilter);
    };

    _createClass(App, [{
      key: "allTodosCount",
      get: function get() {
        return this.getTodosCount("all");
      }
    }, {
      key: "activeTodosCount",
      get: function get() {
        return this.getTodosCount("active");
      }
    }, {
      key: "completedTodosCount",
      get: function get() {
        return this.getTodosCount("completed");
      }
    }]);

    return App;
  }()) || _class);
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
define('services/inmemory-todo-service',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var InMemoryTodoService = exports.InMemoryTodoService = function () {
    function InMemoryTodoService() {
      _classCallCheck(this, InMemoryTodoService);

      this.todos = [];
    }

    InMemoryTodoService.prototype.getAllTodos = function getAllTodos() {
      return this.todos;
    };

    InMemoryTodoService.prototype.getTodoById = function getTodoById(id) {
      return this.todos.filter(function (todo) {
        return todo.id === id;
      }).pop();
    };

    InMemoryTodoService.prototype.addTodo = function addTodo(todo) {
      this.todos.push(todo);
      return this;
    };

    InMemoryTodoService.prototype.deleteTodoById = function deleteTodoById(id) {
      this.todos = this.todos.filter(function (todo) {
        return todo.id !== id;
      });
      return this;
    };

    InMemoryTodoService.prototype.updateTodoById = function updateTodoById(id) {
      var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var todo = this.getTodoById(id);
      if (!todo) {
        return null;
      }
      Object.assign(todo, values);
      return todo;
    };

    InMemoryTodoService.prototype.filterTodos = function filterTodos(filterCriteria) {
      switch (filterCriteria) {
        case "active":
          return this.todos.filter(function (t) {
            return !t.completed;
          });
        case "completed":
          return this.todos.filter(function (t) {
            return t.completed;
          });
        case "all":
        default:
          return this.todos;
      }
    };

    InMemoryTodoService.prototype.toggleAllTodos = function toggleAllTodos() {
      this.todos.forEach(function (t) {
        return t.completed = !t.completed;
      });
    };

    InMemoryTodoService.prototype.completeAllTodos = function completeAllTodos() {
      this.todos.forEach(function (t) {
        return t.completed = true;
      });
    };

    InMemoryTodoService.prototype.removeAllTodos = function removeAllTodos() {
      this.todos.splice(0);
    };

    InMemoryTodoService.prototype.removeCompletedTodos = function removeCompletedTodos() {
      this.todos = this.todos.filter(function (todo) {
        return !todo.completed;
      });
    };

    return InMemoryTodoService;
  }();
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./styles.css\"></require><h1>${appName}</h1><form method=\"post\" submit.trigger=\"addTodo()\"><input type=\"text\" placeholder=\"What will you like to do?\" value.bind=\"todoTitle\"> <button type=\"submit\">Add</button></form><div><a href=\"#\" click.trigger=\"filterTodos('all')\">All</a> <a href=\"#\" click.trigger=\"filterTodos('active')\">Active</a> <a href=\"#\" click.trigger=\"filterTodos('completed')\">Completed</a></div><div><strong>${allTodosCount}</strong>${allTodosCount === 1 ? ' task ': ' tasks '} | <strong>${activeTodosCount}</strong>${activeTodosCount === 1 ? ' task ': ' tasks '} left | <strong>${completedTodosCount}</strong>${completedTodosCount === 1 ? ' task ': ' tasks '} completed</div><div><button disabled.bind=\"allTodosCount === 0\" click.trigger=\"removeAllTodos()\">Remove All</button> <button disabled.bind=\"completedTodosCount === 0\" click.trigger=\"removeCompletedTodos()\">Remove Completed</button> <button disabled.bind=\"allTodosCount === 0\" click.trigger=\"toggleAllTodos()\">Toggle All</button> <button disabled.bind=\"allTodosCount === 0\" click.trigger=\"completeAllTodos()\">Complete All</button></div><ul repeat.for=\"todo of todos\"><li><input type=\"checkbox\" checked.bind=\"todo.completed\"> <input show.bind=\"todo.isEditMode\" type=\"text\" value.bind=\"todo.title\"> <span click.trigger=\"updateTodo(todo)\" show.two-way=\"!todo.isEditMode\" class.bind=\"todo.completed ? 'strikeOut' : ''\">${todo.id} - ${todo.title}</span><button click.trigger=\"removeTodo(todo)\">Remove</button> <button click.trigger=\"updateTodo(todo)\">${todo.isEditMode ? 'Update' : 'Edit'}</button></li></ul></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "ul {\n  padding-left: 10px; }\n\nli {\n  list-style-type: none; }\n\n.strikeOut {\n  text-decoration: line-through; }\n"; });
//# sourceMappingURL=app-bundle.js.map