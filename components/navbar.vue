<template>
  <div>
    <div
      class="h-[70px] flex justify-between gap-1 items-center py-2 px-4 mx-auto max-w-[1300px] flex-col md:flex-row"
    >
      <div
        class="flex justify-between text-center items-center w-[800px] m-auto"
      >
        <h1 class="text-xl font-bold text-white-500">Todo</h1>
        <NuxtLink
          class="bg-[#A555EC] text-[#fff] px-4 py-1 text-base rounded font-medium"
          to="/signin"
        >
          Sign Up</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>
