<template>
  <div class=" h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white" data-mode="light">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <MainContent />
      <Player />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import MainContent from './components/MainContent.vue';
import Player from './components/Player.vue';
</script>

<style>
/* Smooth transitions for theme change */
html {
  transition: background-color 0.3s, color 0.3s;
}
</style>
