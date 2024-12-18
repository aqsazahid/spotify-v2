<template>
  <div class="bg-gray-200 dark:bg-gray-800 rounded p-4 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
    <img :src="image" alt="Playlist" class="w-full rounded mb-2" />
    <p class="text-sm font-semibold">{{ name }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  image: String,
});
</script>
