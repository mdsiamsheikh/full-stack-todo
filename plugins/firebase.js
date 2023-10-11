import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTodoStore } from "../store/todo";
export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyB2Z_ws_jr2iI2zcsStTAslbGxg-V2Pp10",
    authDomain: "full-stack-todo-7e9cc.firebaseapp.com",
    projectId: "full-stack-todo-7e9cc",
    storageBucket: "full-stack-todo-7e9cc.appspot.com",
    messagingSenderId: "513464826288",
    appId: "1:513464826288:web:df6a765dbdf96224c2fe75",
    measurementId: "G-DBTVZS8SEB",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const store = useTodoStore();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user", user);
      store.setUser(user);
    } else {
      store.setUser(null);
    }
  });
});
