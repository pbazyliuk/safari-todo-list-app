import { Todo } from "./models/todo";

export class App {
  constructor() {
    this.appName = "Todo List";
    this.todoTitle = "";
    this.todos = [
      new Todo("Task one", false),
      new Todo("Task two", true),
      new Todo("Task three", false)
    ];
  }

  addTodo() {
    this.todos.push(new Todo(this.todoTitle, false));
    this.todoTitle = "";
    console.log(this.todos);
  }
}
