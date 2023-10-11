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

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
  };

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
        "https://rest-api-ug3w.onrender.com/api/v1/posts"
      );

      todos.value = response.data.data;
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
        "https://rest-api-ug3w.onrender.com/api/v1/posts",
        {
          id: generateUniqueId(),
          todo: uppercaseFirstLetter(newTodo.value),
          color: getRandomColor(),
        }
      );

      const newTodoItem = response.data.data;

      todos.value.push(newTodoItem);
      errMsg.value = "";
    } catch (error) {
      console.error("Error adding a todo:", error);
    } finally {
      newTodo.value = "";
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
        `https://rest-api-ug3w.onrender.com/api/v1/posts/${editingTodo.value.id}`,
        updatedTodo
      );

      const updatedTodoItem = response.data.data;

      const index = todos.value.findIndex(
        (todo) => todo._id === updatedTodoItem._id
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
        `https://rest-api-ug3w.onrender.com/api/v1/posts/${postId}`
      );

      todos.value = todos.value.filter((todo) => todo._id !== postId);
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
