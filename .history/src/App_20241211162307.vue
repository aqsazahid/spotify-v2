<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1">
      <Header />
      <section class="p-4">
        <h2 class="text-lg font-semibold">Welcome to Spotify Enhancement</h2>
      </section>
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
  },
};
</script>
