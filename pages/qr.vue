<template>
  <div class="w-full max-w-lg mx-auto px-0">
    <!-- Input Section -->
    <div class="mb-6 md:mb-10">
      <label
        for="qr-input"
        class="block font-sans font-medium text-foreground mb-2 md:mb-3 text-sm"
      >
        URL or Text
      </label>
      <input
        id="qr-input"
        class="w-full p-3 md:p-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground font-mono text-base focus:border-primary focus:ring-1 focus:ring-ring focus:outline-none transition-all duration-200"
        v-model="text"
        type="text"
        placeholder="Enter URL or text here"
      />
    </div>

    <!-- QR Code Display -->
    <div class="flex justify-center mb-6 md:mb-8 p-6 md:p-8 bg-card rounded-lg border border-border">
      <img
        class="w-full max-w-xs md:max-w-sm h-auto rounded-md border border-border shadow-md animate-fade-in-delayed"
        :src="qrcode"
        alt="Generated QR Code"
      />
    </div>

    <!-- Footer Text -->
    <p class="text-center font-sans text-muted-foreground text-xs md:text-sm">
      Scan with your camera to test the QR code
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
