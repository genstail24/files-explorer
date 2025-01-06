  <template>
  <div :class="{ dark: isDarkMode }">
    <div class="min-h-screen dark:bg-gray-900">
      <!-- Top Bar -->
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

      <!-- File Explorer Layout -->
      <div class="flex space-x-4 p-4">
        <!-- Left Panel: Folder Tree -->
        <div
          class="flex-2 overflow-auto bg-windows-gray dark:bg-windows-dark rounded-lg p-4 border-2 border-gray-300 dark:border-gray-700"
        >
          <div v-for="folder in folders" :key="folder.id">
            <FolderItem :folder="folder" @onClick="handleFolderClicked" />
          </div>
        </div>

        <!-- Right Panel: Files and Search -->
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
            class="mb-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 flex gap-2"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import FolderItem from "./components/FolderItem.vue";

const isDarkMode = ref(false);
const folders = ref([]);
const selectedFolder = ref(null);
const searchQuery = ref("");
const filteredFilesAndFolders = ref([]);

onMounted(() => {
  fetch("http://localhost:3000/folders?parentId=1")
    .then((response) => response.json())
    .then((response) => (folders.value = response));
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const handleFolderClicked = (folder) => {
  searchQuery.value = "";
  selectedFolder.value = folder;
};

const fetchFilesAndFolders = async (parentId, query) => {
  try {
    const foldersResponse = await fetch(
      `http://localhost:3000/folders?parentId=${parentId}${
        query ? `&search=${query}` : ""
      }`
    );
    const folders = await foldersResponse.json();

    const filesResponse = await fetch(
      `http://localhost:3000/files?folderId=${parentId}${
        query ? `&search=${query}` : ""
      }`
    );
    const files = await filesResponse.json();

    return [
      ...folders.map((folder) => ({
        ...folder,
        type: "folder",
      })),
      ...files.map((file) => ({
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