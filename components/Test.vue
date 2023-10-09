<template>
  <!-- component -->
  <div class="h-screen flex items-center justify-center">
    <div class="bg-white rounded shadow p-6 m-4 w-11/12 lg:w-3/4 lg:max-w-lg">
      <div
        class="flex items-center rounded-full justify-center border-2 p-3 m-14"
      >
        <h1 class="text-xl font-semibold">Full-Stack ToDo</h1>
      </div>
      <div class="mb-4">
        <div class="flex mt-4">
          <label for="todoInput" class="sr-only">Todo Item</label>
          <input
            type="text"
            id="todoInput"
            class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Insert your todo"
          />
          <button
            class="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
          >
            Submit
          </button>
        </div>
      </div>
      <ul>
        <!-- To-Do Item 1 -->
        <li class="border mb-4">
          <div class="flex text-center justify-between items-center p-1 px-4">
            <div><h2 class="text-lg font-semibold">Task 1</h2></div>
            <div>
              <button class="p-2 rounded hover:text-white hover:bg-red-500">
                Edit
              </button>
              <button
                class="p-2 ml-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </li>

        <!-- To-Do Item 2 -->
        <li class="border mb-4">
          <div class="flex text-center justify-between items-center p-1 px-4">
            <div><h2 class="text-lg font-semibold">Task 2</h2></div>
            <div>
              <button class="p-2 rounded hover:text-white hover:bg-red-500">
                Edit
              </button>
              <button
                class="p-2 ml-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
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
