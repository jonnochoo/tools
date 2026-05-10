<template>
  <aside
    class="fixed md:static inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-40 mt-16 md:mt-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <!-- Logo/Brand (desktop only) -->
    <div class="hidden md:block p-6">
      <Logo />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <SidebarNavLink to="/" @close="closeSidebar">Home</SidebarNavLink>
        <SidebarNavLink to="/qr" @close="closeSidebar"
          >QR Code Generator</SidebarNavLink
        >
        <SidebarNavLink to="/array-converter" @close="closeSidebar"
          >Array Converter</SidebarNavLink
        >
        <SidebarNavLink to="/cricket-averages" @close="closeSidebar"
          >Cricket Averages</SidebarNavLink
        >
        <SidebarNavLink to="/password-generator" @close="closeSidebar"
          >Password Generator</SidebarNavLink
        >
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import SidebarNavLink from './SidebarNavLink.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const closeSidebar = () => {
  emit('close')
}
</script>
