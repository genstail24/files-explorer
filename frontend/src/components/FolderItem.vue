<template>
  <div>
    <div class="text-black dark:text-white cursor-pointer flex items-center">
      <!-- Folder Item (Icon and Name) -->
      <div class="flex items-center" @click="onClick(folder)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h6l2 2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
          />
        </svg>

        <span>{{ folder.name }}</span>
      </div>

      <svg
        v-if="folder.subFolders.length > 0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4 transform transition-transform rotate-90 hover:text-gray-400"
        :class="isOpen ? '-rotate-[30]' : ''"
        @click="toggleSubFolder(folder)"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <!-- Render Subfolders and Files if the folder is expanded -->
    <div v-if="isOpen" class="pl-4">
      <!-- Render Subfolders -->
      <div v-for="subfolder in folder.subFolders" :key="subfolder.id">
        <FolderItem :folder="subfolder" @onClick="onClick" />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import FolderItem from "./FolderItem.vue";

const props = defineProps({
  folder: Object,
});

const emit = defineEmits(["onClick"]);

const isOpen = ref(false);

const toggleSubFolder = (folder) => {
  emit("onToggled", folder);
  isOpen.value = !isOpen.value;
};

const onClick = (folder) => {
  emit("onClick", folder);
};
</script>
  