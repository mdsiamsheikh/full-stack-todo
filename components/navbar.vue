<template>
  <div>
    <div
      class="h-[70px] flex justify-between gap-1 items-center py-2 px-4 mx-auto max-w-[1300px] flex-col md:flex-row"
    >
      <div
        class="flex justify-between text-center items-center w-[800px] m-auto"
      >
        <h1 class="text-[#03000E] text-xl font-semibold">Todo</h1>
        <div v-if="!store.user">
          <NuxtLink
            class="bg-[#A555EC] text-[#fff] px-4 py-1 text-base rounded font-medium"
            to="/signin"
          >
            Sign in
          </NuxtLink>
        </div>

        <div class="relative" v-else>
          <div>
            <!-- <h2>{{ store.user }}</h2> -->
            <div v-if="store.user.photoURL">
              <img
                class="rounded-full cursor-pointer w-9 h-9"
                :src="store?.user?.photoURL"
                alt=""
                @click.stop="showPopupProfileBox = !showPopupProfileBox"
              />
            </div>
          </div>

          <ProfilePopup
            v-show="showPopupProfileBox"
            class="block popup absolute bg-gray-100 w-[250px] min-h-[155px] top-[2.5rem] right-0 bottom-0 z-10 rounded-lg shadow-lg"
          >
            <button
              class="flex justify-center text-center border-solid border-2 border-indigo-200 gap-2 px-3 py-1.5 border-t mt-6"
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
              <NuxtLink class="text-lg text-[#127582]">Log Out</NuxtLink>
            </button>
          </ProfilePopup>
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

const showPopupProfileBox = ref(false);

import { signOut, getAuth } from "firebase/auth";
const auth = getAuth();

const logout = () => {
  signOut(auth)
    .then(() => {
      store.setUser(null);
      alert("Logout successful");
    })
    .catch((e) => {
      console.error(e);
    });
};
</script>
