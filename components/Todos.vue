<script setup>
import { useTodoStore } from "../store/todo";
const store = useTodoStore();
const computedTodos = computed(() => store.todos);

onMounted(() => {
  store.fetchAllPosts();
});
</script>

<template>
  <!-- component -->
  <div class="flex items-center justify-center h-screen">
    <div class="w-11/12 p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
      <div
        class="flex items-center justify-center p-3 border-2 rounded-full m-14"
      >
        <h1 class="text-xl font-semibold">Full-Stack ToDo</h1>
      </div>

      <div class="mb-4">
        <div class="flex mt-4">
          <label for="todoInput" class="sr-only">Todo Item</label>
          <input
            type="text"
            id="todoInput"
            class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
            placeholder="Insert your todo"
            v-model="store.newTodo"
          />
          <button
            v-if="store.addButton"
            class="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-red-500"
            @click="store.addTodo()"
          >
            Submit
          </button>
          <button
            v-if="store.addButton"
            class="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-red-500"
            @click="store.addTodo()"
          >
            Update
          </button>
        </div>
      </div>
      <ul>
        <li class="mb-4 border">
          <div class="flex items-center justify-between p-1 px-4 text-center">
            <div><h2 class="text-lg font-semibold">Task 1</h2></div>
            <div>
              <button class="p-2 rounded hover:text-white hover:bg-red-500">
                Edit
              </button>
              <button
                class="p-2 ml-2 text-red-500 border-red-500 rounded hover:text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </li>

        <li class="mb-4 border">
          <div class="flex items-center justify-between p-1 px-4 text-center">
            <div><h2 class="text-lg font-semibold">Task 2</h2></div>
            <div>
              <button class="p-2 rounded hover:text-white hover:bg-red-500">
                Edit
              </button>
              <button
                class="p-2 ml-2 text-red-500 border-red-500 rounded hover:text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
