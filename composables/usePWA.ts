export const usePWA = () => {
  const deferredPrompt = ref<Event | null>(null)
  const showInstallPrompt = ref(false)

  onMounted(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
    }

    // Handle install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      showInstallPrompt.value = true
    })

    window.addEventListener('appinstalled', () => {
      deferredPrompt.value = null
      showInstallPrompt.value = false
    })
  })

  const installApp = async () => {
    if (!deferredPrompt.value) return

    const prompt = deferredPrompt.value as any
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      deferredPrompt.value = null
      showInstallPrompt.value = false
    }
  }

  return {
    showInstallPrompt,
    installApp,
  }
}
