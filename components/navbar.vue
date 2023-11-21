<template>
  <div>
    <div
      class="h-[70px] flex justify-between gap-1 items-center py-2 px-4 mx-auto max-w-[1300px] flex-col md:flex-row"
    >
      <div
        class="flex justify-between text-center items-center w-[800px] m-auto"
      >
        <NuxtLink to="/" class="text-xl font-bold text-white-500">
          <h1 class="text-[#03000E] text-xl font-semibold">Todo</h1></NuxtLink
        >
        <NuxtLink
          v-if="!store.user"
          class="bg-[#A555EC] text-[#fff] px-4 py-1 text-base rounded font-medium"
          to="/signin"
        >
          Sign in
        </NuxtLink>
        <div v-if="store.user">
          <div class="px-3">
            <h2 class="text-xl font-semibold text-[#333] opacity-90 mt-1.5">
              {{ store.user.name }}
            </h2>
            <h3 class="text-base text-[#000000] py-0.5 opacity-70">
              {{ cutEmailIntoAcceptableLength(store.user.email) }}
            </h3>
          </div>
          <div>
            <button
              class="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#DAECEF] border-t mt-2 border-e-cyan-350"
              @click="logout"
            >
              <div
                class="flex justify-center items-center p-1 bg-[#863BF7] rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="rounded-full"
                  height="20"
                  width="20"
                  fill="#fff"
                >
                  <path
                    d="M4.5 17q-.625 0-1.062-.438Q3 16.125 3 15.5v-11q0-.625.438-1.062Q3.875 3 4.5 3H10v1.5H4.5v11H10V17Zm9-3.5-1.062-1.062 1.687-1.688H8v-1.5h6.125l-1.687-1.688L13.5 6.5 17 10Z"
                  />
                </svg>
              </div>
              <button class="text-lg text-[#127582]">Log Out</button>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from "../store/todo";
const store = useTodoStore();
const cutEmailIntoAcceptableLength = (email) => {
  return email.length > 20 ? email.substring(0, 20) + "..." : email;
};

import { signOut, getAuth } from "firebase/auth";
const auth = getAuth();

const logout = () => {
  signOut(auth)
    .then(() => {
      store.setUser(null);
      alert("logout page");
    })
    .catch((e) => {
      console.error(e);
    });
};
</script>
