<template>
  <div class="bg-[#100924]">
    <div
      class="h-[80px] flex justify-between gap-1 sm:gap-4 sm:flex-col items-center mx-auto max-w-[1200px]"
    >
      <div class="flex items-center justify-between gap-6 nav-icon sm:gap-3">
        <div v-if="!store.user">
          <NuxtLink
            class="text-white bg-[#5925DC] px-8 py-3 sm:px-2 sm:py-2 text-lg sm:text-base font-semibold rounded-xl"
            to="/signin"
          >
            Start For Free</NuxtLink
          >
        </div>

        <div class="relative" v-else>
          <div>
            <div v-if="store.user.photoURL">
              <img
                class="rounded-full cursor-pointer w-9 h-9"
                :src="store.user.photoURL"
                alt="ah"
                @click="logout"
              />
            </div>
            <div v-else>
              <img
                class="w-10 h-10 bg-cover rounded-full cursor-pointer"
                alt="ih"
                @click.stop="HomeNavbar = !HomeNavbar"
              />
            </div>
          </div>

          <HomeNavbar
            v-show="HomeNavbar"
            class="block popup absolute bg-gray-100 w-[250px] min-h-[155px] top-[2.5rem] right-0 bottom-0 z-10 rounded-lg shadow-lg shadow-indigo-500/50"
          ></HomeNavbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeNavbar from "~/components/home-navbar.vue";
import { useTodoStore } from "~/store/todo";
const { $pinia } = useNuxtApp();
const store = useTodoStore($pinia);
const HomeNavbar = ref(false);
</script>
