<template>
  <div>
    <div
      class="h-[70px] flex justify-between gap-1 items-center py-2 px-4 mx-auto max-w-[1300px] flex-col md:flex-row"
    >
      <nuxt-link to="/" class="flex items-center justify-center gap-2 nav-logo">
        <h1 class="text-[#03000E] text-xl font-semibold">Todo</h1>
      </nuxt-link>
      <div class="flex items-center gap-3 nav-icon sm:gap-6">
        <div v-if="!store.user">
          <NuxtLink
            class="bg-[#A555EC] text-[#fff] px-4 py-1 text-base rounded font-medium"
            to="/signin"
          >
            Sign Up</NuxtLink
          >
        </div>

        <div class="relative">
          <div v-if="store.user">
            <div v-if="store.user.photoURL">
              <img
                class="rounded-full cursor-pointer w-9 h-9"
                :src="store?.user?.photoURL"
                alt=""
                @click="showPopupProfileBox = !showPopupProfileBox"
              />
            </div>
            <div v-else>
              <img
                class="w-10 h-10 bg-cover rounded-full cursor-pointer"
                src="data:image/jpeg;base64,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"
                alt=""
                @click="showPopupProfileBox = !showPopupProfileBox"
              />
            </div>
          </div>

          <ProfilePopup
            v-show="showPopupProfileBox"
            @click="showPopupProfileBox = !showPopupProfileBox"
            class="block absolute bg-gray-100 w-[250px] min-h-[155px] top-[2.5rem] right-0 bottom-0 z-10 rounded-lg shadow-lg shadow-indigo-500/50"
          ></ProfilePopup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from "../store/todo";
import { signOut, getAuth } from "firebase/auth";
const store = useTodoStore();
const auth = getAuth();
// let showPopupProfileBox = false;

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
