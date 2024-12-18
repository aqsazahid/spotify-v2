<template>
  <main class="flex-1 p-4 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-4">Featured Playlists</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        :name="playlist.name"
        :image="playlist.image"
      />
    </div>
  </main>
</template>

<script setup>
import PlaylistCard from './PlaylistCard.vue';

const playlists = [
  { id: 1, name: 'Discover Weekly', image: '/playlist1.jpg' },
  { id: 2, name: 'Top Hits', image: '/playlist2.jpg' },
  { id: 3, name: 'Relax & Unwind', image: '/playlist3.jpg' },
  { id: 4, name: 'Workout Mix', image: '/playlist4.jpg' },
];
</script>
