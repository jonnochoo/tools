<template>
  <button
    v-if="isInstallable"
    @click="handleInstall"
    class="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-secondary/80 border border-border rounded-full transition-colors duration-200"
    aria-label="Install app"
    title="Install app on your device"
  >
    <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    <span class="text-sm font-medium">Install</span>
  </button>
</template>

<script setup lang="ts">
let deferredPrompt: any = null

const isInstallable = ref(false)

const handleInstall = async () => {
  if (!deferredPrompt) return

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice

  if (outcome === 'accepted') {
    deferredPrompt = null
    isInstallable.value = false
  }
}

onMounted(() => {
  // Check if already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isInstallable.value = false
    return
  }

  // Listen for install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    isInstallable.value = true
  })

  // Hide button when app is installed
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    isInstallable.value = false
  })
})
</script>
