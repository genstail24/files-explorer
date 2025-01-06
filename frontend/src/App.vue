  <template>
  <div :class="{ dark: isDarkMode }">
    <div class="min-h-screen dark:bg-gray-900">
      <!-- Top Bar -->
      <TopBar :toggleDarkMode="toggleDarkMode" />

      <!-- File Explorer Layout -->
      <div class="flex space-x-4 p-4">
        <!-- Left Panel: Folder Tree -->
        <FolderTree
          :folders="folders"
          @onFolderItemClicked="handleFolderItemClicked"
        />

        <!-- Right Panel: Files and Search -->
        <FileList
          :filteredFilesAndFolders="filteredFilesAndFolders"
          :selectedFolder="selectedFolder"
          v-model="searchQuery"
          @onFolderItemClicked="handleFolderItemClicked"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import FolderTree from "./components/FolderTree.vue";
import FileList from "./components/FileList.vue";
import TopBar from "./components/TopBar.vue";
import {
  env
} from './config';

const isDarkMode = ref(false);
const folders = ref([]);
const selectedFolder = ref({
  name: "None",
  count: 0,
});
const searchQuery = ref("");
const filteredFilesAndFolders = ref([]);

onMounted(() => {
  fetch(`${env.BASE_API_URL}/folders?parentId=1`)
    .then((response) => response.json())
    .then((response) => (folders.value = response.data));
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const handleFolderItemClicked = (folder) => {
  searchQuery.value = "";
  selectedFolder.value = folder;
};

const fetchFilesAndFolders = async (parentId, query) => {
  try {
    const foldersResponse = await fetch(
      `${env.BASE_API_URL}/folders?parentId=${parentId}${
        query ? `&search=${query}` : ""
      }`
    );
    const folders = await foldersResponse.json();

    const filesResponse = await fetch(
      `${env.BASE_API_URL}/files?folderId=${parentId}${
        query ? `&search=${query}` : ""
      }`
    );
    const files = await filesResponse.json();

    return [
      ...folders.data.map((folder) => ({
        ...folder,
        type: "folder",
      })),
      ...files.data.map((file) => ({
        ...file,
        type: "file",
      })),
    ];
  } catch (error) {
    console.error("Failed to fetch folders or files:", error);
    return [];
  }
};

const updateFilesAndFolders = async () => {
  if (!selectedFolder.value?.id) {
    filteredFilesAndFolders.value = [];
    return;
  }
  filteredFilesAndFolders.value = await fetchFilesAndFolders(
    selectedFolder.value.id,
    searchQuery.value
  );
};

watch([selectedFolder, searchQuery], updateFilesAndFolders);
</script>