<template>
  <h1 class="font-bold text-2xl text-[#edeef0] mb-4">Random Tools</h1>
  <div class="bg-[#18191b] p-8 rounded-xl shadow-xl border-[#313a45] border">
    <h2 class="text-white font-bold mb-4">QR Codes</h2>
    <input
      class="p-2 bg-[#18181c] border-[#313a45] border w-full rounded-lg"
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
