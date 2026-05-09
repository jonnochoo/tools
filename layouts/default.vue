<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
    <!-- Mobile Menu Button -->
    <div class="md:hidden fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 px-4 py-4 flex items-center justify-between z-50">
      <h1 class="font-['DM_Sans'] font-medium text-lg text-gray-100">
        Random Tools
      </h1>
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="p-2 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!mobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <aside
      class="fixed md:static inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 flex flex-col z-40 mt-16 md:mt-0"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <!-- Logo/Brand (desktop only) -->
      <div class="hidden md:block p-6 border-b border-gray-700">
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
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-['DM_Sans'] text-gray-300 hover:text-gray-100"
              active-class="bg-gray-700 text-gray-100"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/qr"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-['DM_Sans'] text-gray-300 hover:text-gray-100"
              active-class="bg-gray-700 text-gray-100"
            >
              QR Code Generator
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/array-converter"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-['DM_Sans'] text-gray-300 hover:text-gray-100"
              active-class="bg-gray-700 text-gray-100"
            >
              Array Converter
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col w-full md:w-auto">
      <!-- Header (desktop only) -->
      <header class="hidden md:block bg-gray-800 border-b border-gray-700 px-6 py-4">
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
      <main class="flex-1 overflow-auto px-4 md:px-6 py-6 pt-24 md:pt-6">
        <slot />
      </main>
    </div>

    <!-- Mobile menu overlay -->
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30 mt-16"
      @click="mobileMenuOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

// Computed page title based on route
const pageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Dashboard'
    case '/qr':
      return 'QR Code Generator'
    case '/array-converter':
      return 'Array Converter'
    default:
      return 'Random Tools'
  }
})

// Current time
const currentTime = ref('')
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
