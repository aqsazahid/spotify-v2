<template>
  <aside class="w-64 bg-gray-800 p-4 hidden lg:block">
    <ul class="space-y-4">
      <li><a href="#" class="hover:text-green-500">Home</a></li>
      <li><a href="#" class="hover:text-green-500">Search</a></li>
      <li><a href="#" class="hover:text-green-500">Your Library</a></li>
      <hr class="border-gray-600" />
      <li><a href="#" class="hover:text-green-500">Create Playlist</a></li>
      <li><a href="#" class="hover:text-green-500">Liked Songs</a></li>
    </ul>
    <div class="mt-4">
      <h3 class="text-gray-400 text-sm">Your Playlists</h3>
      <ul class="mt-2 space-y-2">
        <li v-for="playlist in playlists" :key="playlist.id">
          <a href="#" class="hover:text-green-500">{{ playlist.name }}</a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const playlists = ref([
  { id: 1, name: 'Pop Hits' },
  { id: 2, name: 'Rock Classics' },
  { id: 3, name: 'Chill Vibes' },
]);
</script>
