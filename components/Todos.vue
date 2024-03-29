<template>
  <div
    class="flex justify-center items-center min-h-[calc(100vh-70px)] overflow-hidden p-10"
  >
    <div class="w-[600px] m-auto p-6 m-4 bg-white rounded rounded-lg shadow">
      <div
        class="flex items-center justify-center p-3 m-auto border-2 rounded-full m-14"
      >
        <h1 class="text-xl font-semibold">Full-Stack ToDo</h1>
      </div>
      <div class="mb-5">
        <div class="flex mt-9">
          <input
            type="text"
            placeholder="Insert your todo"
            class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
            v-model="store.newTodo"
          />
          <button
            :class="{
              'p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-red-500':
                !store.addButton,
              'p-2 border-2 rounded text-teal border-teal cursor-not-allowed opacity-50':
                store.loading,
            }"
            @click="submitHandler()"
            :disabled="store.loading"
          >
            {{ store.loading ? "Loading..." : "Submit" }}
          </button>
          <button
            v-if="store.updateButton"
            class="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-red-500"
            @click="store.updateTodo()"
          >
            Update
          </button>
        </div>
        <p class="justify-center m-2 text-xs text-center text-red-600">
          {{ store.errMsg }}
        </p>
      </div>
      <ul>
        <li v-if="computedTodos.length === 0">No todos available</li>
        <li v-else>
          <div class="todo-list" v-for="todo in computedTodos" :key="todo.id">
            <div
              class="flex items-center justify-between p-2 mt-3 border rounded-lg border-white-500"
            >
              <div class="items">
                <th
                  class="font-sans text-lg font-bold font-xl text-slate-500"
                  :style="{ color: todo.color }"
                >
                  {{ todo.todo }}
                </th>
              </div>
              <table class="button">
                <button
                  class="p-2 ml-2 text-red-500 border-red-500 rounded hover:text-white"
                  @click="store.editTodo(todo.id, todo)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="30px"
                    height="30px"
                  >
                    <path
                      d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"
                    />
                  </svg>
                </button>
                <button
                  class="p-2 ml-2 text-red-500 border-red-500 rounded hover:text-white"
                  @click="store.deleteTodo(todo.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="30px"
                    height="30px"
                  >
                    <path
                      d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
                    />
                  </svg>
                </button>
              </table>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from "../store/todo";
import { computed, onMounted } from "vue";

const store = useTodoStore();
const computedTodos = computed(() => store.todos);

const submitHandler = async () => {
  try {
    store.loading = true;
    await store.addTodo();
  } finally {
    store.loading = false;
  }
};

onMounted(() => {
  store.fetchAllPosts();
});
</script>

<style></style>
