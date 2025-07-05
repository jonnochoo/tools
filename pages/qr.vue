<template>
  <h1 class="font-bold text-2xl text-[#D6E1FF]">QR Code</h1>
  <div class="bg-[#0D2847] p-4 rounded-lg shadow-xl border-[#D6E1FF] border-1">
    <input
      class="p-2 bg-gray-100 rounded-sm w-full rounded-lg"
      v-model="text"
      type="text"
      placeholder="Enter your 'URL'"
    />
    <img class="mt-2 w-[700px]" :src="qrcode" alt="QR Code" />
  </div>
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { shallowRef } from 'vue'

const text = shallowRef('')
const qrcode = useQRCode(text, { width: 700 })
</script>
