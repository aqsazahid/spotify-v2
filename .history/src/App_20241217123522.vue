<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <MainContent />
      <Player />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import MainContent from './components/MainContent.vue';
import Player from './components/Player.vue';
</script>
