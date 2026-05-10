<template>
  <div
    class="min-h-screen bg-background text-foreground flex flex-col md:flex-row"
  >
    <!-- Mobile Menu Button -->
    <div
      class="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between z-50"
    >
      <h1 class="font-sans font-medium text-lg text-foreground">
        Random Tools
      </h1>
      <div class="flex items-center gap-2">
        <button
          @click="toggleDarkMode"
          class="p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          <svg
            v-if="isDarkMode"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 18a6 6 0 100-12 6 6 0 000 12zM20.485 9.071A9.001 9.001 0 003.515 14.93m16.97-5.86A9.001 9.001 0 006.485 19.85"
            />
          </svg>
          <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="p-2 hover:bg-secondary rounded-lg transition-colors"
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
    </div>

    <!-- Sidebar -->
    <Sidebar :isOpen="mobileMenuOpen" @close="mobileMenuOpen = false" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col w-full md:w-auto">
      <!-- Header (desktop only) -->
      <header
        class="hidden md:block bg-card border-b border-border px-6 py-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="font-sans font-semibold text-lg text-card-foreground">
            {{ pageTitle }}
          </h2>
          <div class="flex items-center gap-4">
            <div class="text-sm text-muted-foreground font-mono">
              {{ currentTime }}
            </div>
            <button
              @click="toggleDarkMode"
              class="p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              <svg
                v-if="isDarkMode"
                class="w-5 h-5 text-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 18a6 6 0 100-12 6 6 0 000 12zM20.485 9.071A9.001 9.001 0 003.515 14.93m16.97-5.86A9.001 9.001 0 006.485 19.85"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </button>
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
const isDarkMode = ref(false)

// Dark mode toggle
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  const htmlElement = document.documentElement
  if (isDarkMode.value) {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

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

  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDarkMode.value = savedTheme ? savedTheme === 'dark' : prefersDark

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  }
})

watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>
