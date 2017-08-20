import { Todo } from "./models/todo";
import { InMemoryTodoService } from "./services/inmemory-todo-service";
import { inject } from "aurelia-framework";

@inject(InMemoryTodoService)
export class App {
  constructor(InMemoryTodoService) {
    this.InMemoryTodoService = InMemoryTodoService;
    this.appName = "Todo List";
    this.todoTitle = "";
    this.activeFilter = "all";
    // this.todos = this.InMemoryTodoService.getAllTodos();
    this.filterTodos(this.activeFilter);
    console.log(this.todos);
  }

  addTodo() {
    this.InMemoryTodoService.addTodo(new Todo(this.todoTitle, false));
    this.todoTitle = "";
    this.filterTodos(this.activeFilter);
    console.log(this.todos);
  }

  removeTodo(todo) {
    console.log("remove");
    this.InMemoryTodoService.deleteTodoById(todo.id);
    this.filterTodos(this.activeFilter);
  }

  updateTodo(todo) {
    if (todo.isEditMode) {
      todo.isEditMode = false;
      this.InMemoryTodoService.updateTodoById(todo.id, todo);
    } else {
      todo.isEditMode = true;
    }
  }

  filterTodos(filterCriteria) {
    this.activeFilter = filterCriteria;
    this.todos = this.InMemoryTodoService.filterTodos(this.activeFilter);
  }

  getTodosCount(filter) {
    return this.InMemoryTodoService.filterTodos(filter).length;
  }

  get allTodosCount() {
    return this.getTodosCount("all");
  }

  get activeTodosCount() {
    return this.getTodosCount("active");
  }

  get completedTodosCount() {
    return this.getTodosCount("completed");
  }

  checkIfAllTodosAreCompleted() {
    return this.todos.every(todo => todo.completed);
  }

  toggleAllTodos() {
    this.InMemoryTodoService.toggleAllTodos();
    this.filterTodos(this.activeFilter);
  }

  completeAllTodos() {
    this.InMemoryTodoService.completeAllTodos();
    this.checkIfAllTodosAreCompleted();
    this.filterTodos(this.activeFilter);
  }

  removeCompletedTodos() {
    this.InMemoryTodoService.removeCompletedTodos();
    this.filterTodos(this.activeFilter);
  }

  removeAllTodos() {
    this.InMemoryTodoService.removeAllTodos();
    this.filterTodos(this.activeFilter);
  }
}
