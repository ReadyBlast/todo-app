<template>
  <div>
    <h1>To-Do List</h1>
    <input
      v-model="newTodoText"
      @keyup.enter="addTodo"
      placeholder="Добавить новую задачу"
    />
    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <span
          :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
        >
          {{ todo.text }}
        </span>
        <button @click="toggleTodo(todo.id)">
          {{ todo.completed ? '❌' : '✔️' }}
        </button>
        <button @click="editTodoText(todo.id)">✏️</button>
        <button @click="deleteTodoItem(todo.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoStore } from './stores/todoStore';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodoText = ref('');

    onMounted(() => {
      todoStore.loadTodos();
    });

    const addTodo = () => {
      if (newTodoText.value.trim()) {
        todoStore.addTodo(newTodoText.value.trim());
        newTodoText.value = '';
      }
    };

    const toggleTodo = (id: number) => {
      todoStore.toggleTodo(id);
    };

    const editTodoText = (id: number) => {
      const newText = prompt('Введите новый текст задачи');
      if (newText) {
        todoStore.editTodo(id, newText);
      }
    };

    const deleteTodoItem = (id: number) => {
      todoStore.deleteTodo(id);
    };

    return {
      newTodoText,
      todoStore,
      addTodo,
      toggleTodo,
      editTodoText,
      deleteTodoItem,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

button {
  margin-left: 10px;
}
</style>
