<template>
  <div
    class="flex-2 overflow-auto bg-windows-gray dark:bg-windows-dark rounded-lg p-4 border-2 border-gray-300 dark:border-gray-700"
  >
    <div v-for="folder in props.folders" :key="folder.id">
      <FolderTreeItem :folder="folder" @onClick="handleFolderItemClicked" />
    </div>
  </div>
</template>

<script setup>
import FolderTreeItem from "./FolderTreeItem.vue";

const props = defineProps({
  folders: Array,
});
const emit = defineEmits([
  "onFolderItemClicked",
]);

const handleFolderItemClicked = (folder) => {
  emit("onFolderItemClicked", folder);
};
</script>