<template>
  <div
    class="flex-1 overflow-auto bg-windows-gray dark:bg-windows-dark rounded-lg p-4 border-2 border-gray-300 dark:border-gray-700"
  >
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Files"
        class="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white"
      />
    </div>

    <!-- File List -->
    <div
      v-for="item in filteredFilesAndFolders"
      :key="item.key"
      class="mb-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 flex gap-2 cursor-pointer"
      @click="handleItemClicked(item)"
    >
      <svg
        v-if="item.type === 'folder'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
        />
      </svg>
      <svg
        v-else-if="item.type === 'file'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
const searchQuery = defineModel();
const props = defineProps(["filteredFilesAndFolders"]);
const emit = defineEmits([
  "onSearch",
  "onFolderItemClicked",
  "onFileItemClicked",
]);
const handleSearchInput = (e) => {
  emit("onSearch", e.target.value);
};
const handleItemClicked = (item) => {
  if (item.type === "folder") {
    emit("onFolderItemClicked", item);
  }
};
</script>