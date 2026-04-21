<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <!-- Logo/Brand -->
      <div class="p-6 border-b border-gray-700">
        <h1 class="font-['DM_Sans'] font-medium text-xl text-gray-100">
          Random Tools
        </h1>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/"
              class="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-['DM_Sans'] text-gray-300 hover:text-gray-100"
              active-class="bg-gray-700 text-gray-100"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/qr"
              class="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-['DM_Sans'] text-gray-300 hover:text-gray-100"
              active-class="bg-gray-700 text-gray-100"
            >
              QR Code Generator
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-700">
        <p class="text-xs text-gray-500 font-['DM_Sans']">
          Built with Nuxt
        </p>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="font-['DM_Sans'] font-medium text-lg text-gray-200">
            {{ pageTitle }}
          </h2>
          <div class="text-sm text-gray-500">
            {{ currentTime }}
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Computed page title based on route
const pageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Dashboard'
    case '/qr':
      return 'QR Code Generator'
    default:
      return 'Random Tools'
  }
})

// Current time
const currentTime = ref('')
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}
updateTime()
setInterval(updateTime, 1000)
</script>