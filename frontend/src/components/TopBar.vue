<template>
  <div
    class="flex justify-between items-center p-4 bg-windows-gray dark:bg-windows-dark shadow-md"
  >
    <h1 class="text-2xl font-semibold text-black dark:text-white">
      File Explorer
    </h1>
    <button
      @click="toggleDarkMode"
      class="px-4 py-2 rounded-md bg-windows-blue text-white dark:bg-windows-gray dark:text-black"
    >
      Toggle Dark Mode
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
    toggleDarkMode: Function,
});
</script>