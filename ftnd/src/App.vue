<template>
  <div class="app">
    <div
      class="w-screen h-screen bg-gray-200 flex justify-center items-center flex-col"
    >
    <span class="text-2xl"> Pick Users </span>
      <div class="w-1/2">
        <HomePage/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import HomePage from './views/HomePage.vue';
</script>
