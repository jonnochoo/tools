<template>
  <div class="w-full max-w-4xl mx-auto px-0">
    <!-- Description -->
    <div class="mb-6 md:mb-8">
      <p class="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
        Convert a list of values (one per line) into a formatted array string
        with parentheses and single quotes.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <!-- Input Section -->
      <div class="space-y-4">
        <h3 class="font-sans font-semibold text-base md:text-lg text-foreground">
          Input
        </h3>

        <!-- Input Textarea -->
        <textarea
          v-model="inputText"
          class="w-full h-48 md:h-64 p-3 md:p-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground font-mono text-xs md:text-sm focus:border-primary focus:ring-1 focus:ring-ring focus:outline-none transition-all duration-200 resize-none"
          placeholder="Enter one value per line...&#10;&#10;a&#10;b&#10;c"
          @input="convertToArray"
        ></textarea>

        <!-- Options -->
        <div class="space-y-3">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              v-model="trimWhitespace"
              type="checkbox"
              class="w-4 h-4 bg-input border border-border rounded accent-primary focus:ring-1 focus:ring-ring"
            />
            <span class="font-sans text-xs md:text-sm text-muted-foreground"
              >Trim whitespace</span
            >
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              v-model="skipEmptyLines"
              type="checkbox"
              class="w-4 h-4 bg-input border border-border rounded accent-primary focus:ring-1 focus:ring-ring"
            />
            <span class="font-sans text-xs md:text-sm text-muted-foreground"
              >Skip empty lines</span
            >
          </label>
        </div>
      </div>

      <!-- Output Section -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 class="font-sans font-semibold text-base md:text-lg text-foreground">
            Output
          </h3>
          <button
            @click="copyToClipboard"
            :disabled="!outputText"
            class="px-3 md:px-4 py-2 bg-primary hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-lg transition-all duration-200 font-sans text-xs md:text-sm font-medium flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy</span>
          </button>
        </div>

        <!-- Output Textarea -->
        <textarea
          v-model="outputText"
          readonly
          class="w-full h-48 md:h-64 p-3 md:p-4 bg-secondary border border-border rounded-lg text-foreground font-mono text-xs md:text-sm focus:outline-none resize-none"
          placeholder="Formatted array will appear here..."
        ></textarea>

        <!-- Stats -->
        <div class="text-xs md:text-sm text-muted-foreground font-sans">
          {{ itemCount }} items converted
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Array Converter - Random Tools',
})

// Reactive data
const inputText = ref('')
const outputText = ref('')
const trimWhitespace = ref(true)
const skipEmptyLines = ref(true)
const itemCount = ref(0)

// Convert input to array format
const convertToArray = () => {
  if (!inputText.value.trim()) {
    outputText.value = ''
    itemCount.value = 0
    return
  }

  let lines = inputText.value.split('\n')

  // Apply options
  if (trimWhitespace.value) {
    lines = lines.map((line) => line.trim())
  }

  if (skipEmptyLines.value) {
    lines = lines.filter((line) => line.length > 0)
  }

  // Format as array
  const formattedValues = lines.map((line) => `'${line.replace(/'/g, "\\'")}'`)
  outputText.value = `(${formattedValues.join(',')})`
  itemCount.value = lines.length
}

// Copy to clipboard
const copyToClipboard = async () => {
  if (!outputText.value) return

  try {
    await navigator.clipboard.writeText(outputText.value)
    // Could add a toast notification here
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = outputText.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

// Watch for option changes
watch([trimWhitespace, skipEmptyLines], () => {
  convertToArray()
})
</script>
