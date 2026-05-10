<template>
  <li>
    <NuxtLink
      :to="to"
      @click="closeSidebar"
      class="block px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 font-sans text-sidebar-foreground hover:text-sidebar-accent-foreground"
      active-class="bg-sidebar-accent-foreground text-sidebar-accent-foreground"
    >
      <slot />
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()

const emit = defineEmits<{
  close: []
}>()

const closeSidebar = () => {
  emit('close')
}
</script>
