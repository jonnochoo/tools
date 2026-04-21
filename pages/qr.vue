<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="w-full max-w-lg">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1
          class="font-['DM_Sans'] font-light text-3xl text-gray-100 mb-2 tracking-tight"
        >
          Random Tools
        </h1>
        <div class="w-16 h-px bg-gray-600 mx-auto"></div>
      </div>

      <!-- Main Container -->
      <div
        class="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 animate-slide-up"
      >
        <h2
          class="font-['DM_Sans'] font-medium text-xl text-gray-200 mb-8 text-center"
        >
          QR Code Generator
        </h2>

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
    </div>
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
