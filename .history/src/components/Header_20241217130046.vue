<template>
  <header class="flex items-center justify-between p-4 bg-gray-800">
    <div class="flex items-center space-x-4">
      <img src="../assets/logo.png" alt="Spotify Logo" class="w-12" />
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="hover:text-green-500">Home</a>
        <a href="#" class="hover:text-green-500">Search</a>
        <a href="#" class="hover:text-green-500">Library</a>
      </nav>
    </div>
    <input
      type="text"
      placeholder="Search for Artists, Songs..."
      class="hidden md:block px-4 py-2 rounded bg-gray-700 placeholder-gray-400 w-1/3"
    />
    <img
      src="/avatar.png"
      alt="User Avatar"
      class="w-10 h-10 rounded-full cursor-pointer"
    />
  </header>
</template>
