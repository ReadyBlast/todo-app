import { defineStore } from 'pinia';

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as TodoItem[],
  }),
  actions: {
    addTodo(text: string) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveTodos();
    },
    editTodo(id: number, newText: string) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
        this.saveTodos();
      }
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveTodos();
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
      }
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadTodos() {
      const todos = localStorage.getItem('todos');
      if (todos) {
        this.todos = JSON.parse(todos);
      }
    },
  },
});
