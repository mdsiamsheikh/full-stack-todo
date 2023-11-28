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
            <p>{{ store.user.displayName }}</p>
            <div>
              <h3>{{ store.user.email }}</h3>
            </div>
            <button
              class="text-center border-solid border-2 bg-[#A555EC] border-indigo-200 gap-2 px-3 py-1.5 border-t mt-6"
              @click="logout"
            >
              <NuxtLink class="text-lg text-black">Log Out</NuxtLink>
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
