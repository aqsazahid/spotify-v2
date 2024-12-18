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

// State for theme mode
const isDarkMode = ref(false);

// Toggle theme method
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute('data-mode', isDarkMode.value ? 'dark' : 'light');
};

// Initialize theme from localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDarkMode.value = savedTheme === 'dark';
  document.documentElement.setAttribute('data-mode', isDarkMode.value ? 'dark' : 'light');
});

// Watch for changes and persist in localStorage
watch(isDarkMode, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light');
});
</script>

<style>
/* Smooth transitions for theme change */
html {
  transition: background-color 0.3s, color 0.3s;
}
</style>
