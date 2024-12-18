<template>
  <aside
    :class="[
      'h-screen float-left bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-white transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 v-if="!isCollapsed" class="text-xl font-bold">Menu</h2>
      <button
        @click="toggleSidebar"
        class="p-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-green-500 dark:hover:bg-green-600 transition"
      >
        <svg
          class="w-6 h-6 text-gray-700 dark:text-white"
          :class="{ 'rotate-180': isCollapsed }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
    </div>
    <ul class="space-y-4">
      <li>
        <a
          href="#"
          class="flex items-center space-x-3 hover:text-green-500 transition"
        >
          <span>
            <svg
              class="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h11M9 21V3m0 18l4-4M9 3L5 7"
              ></path>
            </svg>
          </span>
          <span v-if="!isCollapsed">Home</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="flex items-center space-x-3 hover:text-green-500 transition"
        >
          <span>
            <svg
              class="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          </span>
          <span v-if="!isCollapsed">Library</span>
        </a>
      </li>
    </ul>

    <!-- Playlists Section -->
    <div v-if="!isCollapsed" class="mt-8">
      <h3 class="text-lg font-semibold mb-4">Your Playlists</h3>
      <ul class="space-y-2">
        <li
          v-for="playlist in playlists"
          :key="playlist.id"
          class="hover:text-green-500 cursor-pointer transition"
        >
          {{ playlist.name }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

// State to control the collapse/expand behavior
const isCollapsed = ref(false);
const playlists = ref([
  { id: 1, name: 'Pop Hits' },
  { id: 2, name: 'Rock Classics' },
  { id: 3, name: 'Chill Vibes' },
]);

// Toggle sidebar state
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
