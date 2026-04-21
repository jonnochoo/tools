<template>
  <div class="max-w-lg mx-auto">
    <!-- Input Section -->
    <div class="mb-10">
      <label
        for="qr-input"
        class="block font-['DM_Sans'] text-gray-400 mb-3 text-sm"
      >
        URL or Text
      </label>
      <input
        id="qr-input"
        class="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 font-['JetBrains_Mono'] text-base focus:border-gray-500 focus:outline-none transition-colors duration-200"
        v-model="text"
        type="text"
        placeholder="Enter URL or text here"
      />
    </div>

    <!-- QR Code Display -->
    <div class="flex justify-center mb-6">
      <img
        class="w-full max-w-sm h-auto rounded-lg border border-gray-600 animate-fade-in-delayed"
        :src="qrcode"
        alt="Generated QR Code"
      />
    </div>

    <!-- Footer Text -->
    <p class="text-center text-gray-500 text-sm font-['DM_Sans']">
      Scan with your camera
    </p>
  </div>
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { shallowRef } from 'vue'

const text = shallowRef('https://bible.com')
const qrcode = useQRCode(text, { width: 400, margin: 2 })
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out 0.1s both;
}

.animate-fade-in-delayed {
  animation: fade-in 0.8s ease-out 0.3s both;
}
</style>
