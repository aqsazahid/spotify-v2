<template>
  <main class="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
<div class="flex flex-col items-center justify-center h-18">
  <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
    You are from {{ country }}
  </h1>
  <h1 class="text-1xl font-bold mb-2 text-gray-900 dark:text-white">
    we have personalized according to your location dynamically
  </h1>
  <p v-if="loading" class="text-gray-500">Fetching your location...</p>
  <p v-else-if="error" class="text-red-500">{{ error }}</p>
</div>
    <!-- Playlists Section -->
    <div v-if="filteredPlaylists.length > 0" class="relative mt-6">
      <h2 class="text-lg font-semibold mb-4">Popular Playlists for your Region:</h2>
      <button
  @click="fetchPlaylists(-1)"
  :disabled="playlistOffset === 0"
  class="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-3xl font-bold p-4 rounded-full shadow-2xl hover:bg-green-500 hover:text-white transition-transform transform hover:scale-125 disabled:opacity-50 disabled:cursor-not-allowed"
>
  &lt;
</button>

      <!-- Playlist Carousel -->
      <div class="flex gap-4 overflow-x-auto scrollbar-hide">
        <div
          v-for="playlist in filteredPlaylists"
          :key="playlist.id"
          class="min-w-[200px] bg-gray-200 dark:bg-gray-800 rounded shadow-lg"
        >
          <img
            :src="playlist.images[0]?.url"
            alt="Playlist Cover"
            class="w-full h-48 object-cover rounded-t"
          />
          <p class="text-center mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            {{ playlist.name }}
          </p>
        </div>
      </div>
      <!-- Right Navigation Icon -->
      <button
  @click="fetchPlaylists(1)"
  class="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-3xl font-bold p-4 rounded-full shadow-2xl hover:bg-green-500 hover:text-white transition-transform transform hover:scale-125"
>
  &gt;
</button>
    </div>

    <!-- Artists Section -->
    <div v-if="filteredArtists.length > 0" class="relative mt-12">
      <h2 class="text-lg font-semibold mb-4">Popular Artists for your Region:</h2>
      <!-- Left Navigation Icon -->
      <button
  @click="fetchArtists(-1)"
  :disabled="playlistOffset === 0"
  class="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-3xl font-bold p-4 rounded-full shadow-2xl hover:bg-green-500 hover:text-white transition-transform transform hover:scale-125 disabled:opacity-50 disabled:cursor-not-allowed"
>
  &lt;
</button>
      <!-- Artist Carousel -->
      <div class="flex gap-4 overflow-x-auto scrollbar-hide">
        <div
          v-for="artist in filteredArtists"
          :key="artist.id"
          class="min-w-[200px] bg-gray-200 dark:bg-gray-800 rounded shadow-lg flex flex-col items-center p-4"
        >
          <img
            :src="artist.images[0]?.url"
            alt="Artist Image"
            class="w-32 h-32 object-cover rounded-full"
          />
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white text-center">
            {{ artist.name }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Followers: {{ artist.followers.total.toLocaleString() }}
          </p>
        </div>
      </div>
      <!-- Right Navigation Icon -->
      <button
  @click="fetchArtists(1)"
  class="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-3xl font-bold p-4 rounded-full shadow-2xl hover:bg-green-500 hover:text-white transition-transform transform hover:scale-125"
>
  &gt;
</button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SpotifyService from '../services/spotifyService';

const country = ref('');
const loading = ref(true);
const error = ref('');
const playlists = ref([]);
const artists = ref([]);
const playlistOffset = ref(0);
const artistOffset = ref(0);
const limit = 8;

const fetchPlaylists = async (direction = 0) => {
  try {
    loading.value = true;
    playlistOffset.value += direction * limit;
    playlistOffset.value = Math.max(0, playlistOffset.value);
    playlists.value = await SpotifyService.searchForRegion(countryCode.value, 'playlist', playlistOffset.value, limit);
  } catch (err) {
    console.error('Error fetching playlists:', err.message);
  } finally {
    loading.value = false;
  }
};

const fetchArtists = async (direction = 0) => {
  try {
    loading.value = true;
    artistOffset.value += direction * limit;
    artistOffset.value = Math.max(0, artistOffset.value);
    artists.value = await SpotifyService.searchForRegion(countryCode.value, 'artist', artistOffset.value, limit);
  } catch (err) {
    console.error('Error fetching artists:', err.message);
  } finally {
    loading.value = false;
  }
};

const countryCode = ref('');
const fetchLocationAndContent = async () => {
  try {
    const locationResponse = await fetch('https://ipinfo.io/json');
    const locationData = await locationResponse.json();
    country.value = `${locationData.city}, ${locationData.country}`;
    countryCode.value = locationData.country;

    await fetchPlaylists();
    await fetchArtists();
  } catch (err) {
    error.value = 'Failed to fetch location or Spotify content.';
  } finally {
    loading.value = false;
  }
};

const filteredPlaylists = computed(() =>
  playlists.value.filter((playlist) => playlist && playlist.images?.length > 0)
);

const filteredArtists = computed(() =>
  artists.value.filter((artist) => artist && artist.images?.length > 0)
);

onMounted(() => {
  fetchLocationAndContent();
});

const searchQuery = ref('');
const searchResults = ref([]);

// Debounced search function
let debounceTimeout;
const onSearchInput = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    if (searchQuery.value.trim() === '') {
      searchResults.value = []; // Clear results if query is empty
    } else {
      loading.value = true;
      try {
        const playlistResults = await SpotifyService.searchByQuery(searchQuery.value, 'playlist', 8);
        const artistResults = await SpotifyService.searchByQuery(searchQuery.value, 'artist', 8);
        searchResults.value = [...playlistResults, ...artistResults];
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      } finally {
        loading.value = false;
      }
    }
  }, 500); // 500ms debounce
};

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
  cursor: pointer;
  transition: transform 0.2s ease;
}

button:hover {
  transform: scale(1.1);
}
</style>
