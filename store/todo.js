import { defineStore } from "pinia";

import axios from "axios";

export const useTodoStore = defineStore("todo", () => {
  const newTodo = ref("");
  const todos = ref([]);
  const editingTodo = ref(null);
  const errMsg = ref("");

  const addButton = ref(true);
  const updateButton = ref(false);
  const user = ref(null);

  function setUser(payload) {
    user.value = payload;
  }

  const uppercaseFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getRandomColor = () => {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://full-stack-todo-api-i3xj.onrender.com/todo/all/"
      );
      console.log(response.data.todos);
      todos.value = response.data.todos;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addTodo = async () => {
    try {
      if (newTodo.value.length < 5) {
        errMsg.value = "Please enter more than 5 letters.";
        return;
      }

      const response = await axios.post(
        "https://full-stack-todo-api-i3xj.onrender.com/todo/",
        {
          todo: uppercaseFirstLetter(newTodo.value),
          color: getRandomColor(),
        }
      );

      const newTodoItem = response.data.todos;

      todos.value.push(newTodoItem);
      errMsg.value = "";
    } catch (error) {
      console.error("Error adding a todo:", error);
    } finally {
      newTodo.value = "";
      fetchAllPosts();
    }
  };

  const editTodo = (id, todo) => {
    updateButton.value = true;
    addButton.value = false;

    editingTodo.value = { id, todo };

    newTodo.value = todo.todo;
  };

  const updateTodo = async () => {
    try {
      if (!editingTodo.value) {
        errMsg.value = "No todo item selected for editing.";
        return;
      }

      if (newTodo.value.length < 5) {
        errMsg.value = "Please enter more than 5 letters.";
        return;
      }

      const updatedTodo = {
        id: editingTodo.value.id,
        todo: uppercaseFirstLetter(newTodo.value),
        color: getRandomColor(),
      };

      const response = await axios.put(
        `https://full-stack-todo-api-i3xj.onrender.com/todo/${editingTodo.value.id}`,
        updatedTodo
      );

      const updatedTodoItem = response.data.data;

      const index = todos.value.findIndex(
        (todo) => todo.id === updatedTodoItem.id
      );
      if (index !== -1) {
        todos.value.splice(index, 1, updatedTodoItem);
      }

      errMsg.value = "";
    } catch (error) {
      console.error("Error updating a todo:", error);
    } finally {
      newTodo.value = "";
      editingTodo.value = null;
      addButton.value = true;
      updateButton.value = false;
    }
  };

  const deleteTodo = async (postId) => {
    try {
      await axios.delete(
        `https://full-stack-todo-api-i3xj.onrender.com/todo/${postId}`
      );

      todos.value = todos.value.filter((todo) => todo.id !== postId);
    } catch (error) {
      console.error("Error deleting the todo:", error);
    }
  };

  // onMounted(() => {
  //   fetchAllPosts();
  // });

  const computedTodos = computed(() => todos.value.slice());

  return {
    setUser,
    newTodo,
    todos: computedTodos,
    addTodo,
    editTodo,
    updateTodo,
    deleteTodo,
    errMsg,
    addButton,
    updateButton,
    fetchAllPosts,
  };
});
