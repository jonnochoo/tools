<template>
  <div class="max-w-4xl mx-auto">
    <!-- Description -->
    <div class="mb-8">
      <p class="font-['DM_Sans'] text-gray-400 leading-relaxed">
        Convert a list of values (one per line) into a formatted array string
        with parentheses and single quotes.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Section -->
      <div class="space-y-4">
        <h3 class="font-['DM_Sans'] font-medium text-lg text-gray-200">
          Input
        </h3>

        <!-- Input Textarea -->
        <textarea
          v-model="inputText"
          class="w-full h-64 p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 font-['JetBrains_Mono'] text-sm focus:border-gray-500 focus:outline-none transition-colors duration-200 resize-none"
          placeholder="Enter one value per line...&#10;&#10;a&#10;b&#10;c"
          @input="convertToArray"
        ></textarea>

        <!-- Options -->
        <div class="space-y-3">
          <label class="flex items-center space-x-3">
            <input
              v-model="trimWhitespace"
              type="checkbox"
              class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-gray-500 focus:ring-2"
            />
            <span class="font-['DM_Sans'] text-sm text-gray-400"
              >Trim whitespace</span
            >
          </label>

          <label class="flex items-center space-x-3">
            <input
              v-model="skipEmptyLines"
              type="checkbox"
              class="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-gray-500 focus:ring-2"
            />
            <span class="font-['DM_Sans'] text-sm text-gray-400"
              >Skip empty lines</span
            >
          </label>
        </div>
      </div>

      <!-- Output Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-['DM_Sans'] font-medium text-lg text-gray-200">
            Output
          </h3>
          <button
            @click="copyToClipboard"
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 font-['DM_Sans'] text-sm flex items-center space-x-2"
            :disabled="!outputText"
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
          class="w-full h-64 p-4 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 font-['JetBrains_Mono'] text-sm focus:outline-none resize-none"
          placeholder="Formatted array will appear here..."
        ></textarea>

        <!-- Stats -->
        <div class="text-sm text-gray-500 font-['DM_Sans']">
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
