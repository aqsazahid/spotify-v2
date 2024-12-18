<template>
  <footer class="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-900 p-4 text-gray-900 dark:text-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="../assets/album-art.jpg" alt="Album Art" class="w-12 h-12" />
        <div>
          <p class="text-sm">Track Name</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">Artist Name</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">⏮</button>
        <button class="text-green-500">▶</button>
        <button class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">⏭</button>
      </div>
    </div>
  </footer>
</template>


import { fetchPlaylists } from './services/spotifyService';
export default {
  name: 'App',
  async mounted() {
    try {
      const playlists = await fetchPlaylists();
      console.log('Playlists:', playlists);
    } catch (error) {
      console.error(error);
    }
  },
}


