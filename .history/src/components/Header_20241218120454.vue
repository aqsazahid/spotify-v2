<template>
  <header class="flex flex-col items-center justify-between p-4 bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 shadow-lg">
    <!-- Top Navigation -->
    <div class="flex items-center justify-between w-full mb-4">
      <div class="text-4xl font-extrabold tracking-wide text-green-500">
  <span class="text-gray-200 dark:text-white">SP</span>
  <span class="text-green-500">OTIFY</span>
  <span class="ml-2 text font-semibold text-gray-400 dark:text-gray-300">
    - Created using Vue + Tailwind
  </span> 
</div>

      <!-- Categories Dropdown -->
      <div class="relative mx-auto w-64">
        <!-- Categories Button -->
        <button
          @click="toggleDropdown"
          class="flex items-center justify-between w-full px-4 py-2 bg-gray-700 dark:bg-gray-800 text-white dark:text-gray-200 rounded hover:bg-green-500 dark:hover:bg-green-600 transition"
        >
          Categories
          <svg
            :class="{ 'transform rotate-180': isDropdownOpen }"
            class="w-5 h-5 transition-transform"
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

        <!-- Dropdown Content -->
        <div
          v-if="isDropdownOpen"
          @scroll="handleScroll"
          class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 h-80 overflow-y-auto bg-gray-700 dark:bg-gray-800 rounded-lg shadow-lg z-10 scrollbar-hide"
        >
          <ul class="divide-y divide-gray-600 dark:divide-gray-700">
            <li
              v-for="(category, index) in displayedCategories"
              :key="category.id"
              class="flex items-center space-x-2 p-3 hover:bg-green-500 dark:hover:bg-green-600 cursor-pointer transition"
            >
              <img
                :src="category.icons[0]?.url"
                alt="Category Icon"
                class="w-8 h-8 object-cover rounded"
              />
              <span class="text-white dark:text-gray-200 text-sm font-semibold">
                {{ category.name }}
              </span>
            </li>
          </ul>
          <div v-if="loadingMore" class="p-2 text-center text-gray-200 dark:text-gray-400 text-sm">
            Loading more...
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SpotifyService from '../services/spotifyService';

// State
const categories = ref([]);
const displayedCategories = ref([]);
const isDropdownOpen = ref(false);
const offset = ref(0);
const limit = 15;
const loadingMore = ref(false);

// Fetch Spotify Categories with Pagination
const fetchCategories = async (reset = false) => {
  try {
    if (loadingMore.value) return;
    loadingMore.value = true;

    const response = await SpotifyService.getCategories(limit, offset.value);
    if (reset) {
      categories.value = response.items || [];
    } else {
      categories.value = [...categories.value, ...(response.items || [])];
    }
    displayedCategories.value = categories.value;
    offset.value += limit;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
  } finally {
    loadingMore.value = false;
  }
};

// Toggle Dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value && categories.value.length === 0) {
    fetchCategories(true); // Load initial categories when opened
  }
};

// Handle Scroll to Fetch More Categories
const handleScroll = (event) => {
  const bottomReached =
    event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 10;

  if (bottomReached && !loadingMore.value) {
    fetchCategories();
  }
};

onMounted(() => {
  fetchCategories(true);
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #22c55e;
}
</style>
