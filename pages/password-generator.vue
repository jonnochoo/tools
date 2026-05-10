<template>
  <div class="w-full max-w-4xl mx-auto px-0">
    <!-- Description -->
    <div class="mb-6 md:mb-8">
      <p class="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
        Generate secure random passwords with uppercase, lowercase, numbers, and symbols.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Password Display Section -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 class="font-sans font-semibold text-base md:text-lg text-foreground">
            Generated Password
          </h3>
          <button
            @click="copyToClipboard"
            :disabled="!password"
            class="px-3 md:px-4 py-2 bg-primary hover:shadow-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-lg transition-all duration-200 font-sans text-xs md:text-sm font-medium flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
            :class="{ 'bg-green-600': copied }"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!copied"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>

        <!-- Password Display -->
        <div
          class="w-full p-4 md:p-6 bg-secondary border border-border rounded-lg text-foreground font-mono text-sm md:text-base break-all select-all transition-all duration-300"
          :class="{ 'animate-pulse-glow': justGenerated, 'shadow-lg': justGenerated }"
        >
          {{ password || 'Click "Generate" to create a password' }}
        </div>
      </div>

      <!-- Controls Section -->
      <div class="space-y-4">
        <h3 class="font-sans font-semibold text-base md:text-lg text-foreground">
          Password Length
        </h3>

        <div class="space-y-3">
          <!-- Slider -->
          <input
            v-model.number="length"
            type="range"
            min="12"
            max="32"
            class="w-full h-2 bg-input border border-border rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
          />

          <!-- Length Display -->
          <div class="flex items-center justify-between">
            <span class="font-sans text-sm text-muted-foreground">12 characters</span>
            <span class="font-sans text-base md:text-lg font-semibold text-primary">
              {{ length }}
            </span>
            <span class="font-sans text-sm text-muted-foreground">32 characters</span>
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <button
        @click="generate"
        :disabled="isGenerating"
        class="w-full px-4 py-3 md:py-4 bg-primary hover:shadow-md hover:cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-semibold relative overflow-hidden"
        :class="{ 'scale-95': isGenerating }"
      >
        <span :class="{ 'opacity-0': isGenerating }">Generate Password</span>
        <span v-if="isGenerating" class="absolute inset-0 flex items-center justify-center">
          <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Password Generator - Random Tools',
})

const { generatePassword } = usePasswordGenerator()

// Reactive data
const password = ref('')
const length = ref(16)
const copied = ref(false)
const isGenerating = ref(false)
const justGenerated = ref(false)

// Generate password
const generate = () => {
  isGenerating.value = true
  justGenerated.value = true

  setTimeout(() => {
    password.value = generatePassword(length.value)
    isGenerating.value = false
  }, 300)

  setTimeout(() => {
    justGenerated.value = false
  }, 600)
}

// Copy to clipboard
const copyToClipboard = async () => {
  if (!password.value) return

  try {
    await navigator.clipboard.writeText(password.value)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = password.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

// Generate initial password on mount
onMounted(() => {
  generate()
})
</script>

<style scoped>
@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 0.6s ease-out;
}
</style>
