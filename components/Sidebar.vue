<template>
  <aside
    class="fixed md:static inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-40 mt-16 md:mt-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >
    <!-- Logo/Brand (desktop only) -->
    <div class="hidden md:block p-6 border-b border-sidebar-border">
      <h1 class="font-sans font-medium text-xl text-sidebar-foreground">
        Random Tools
      </h1>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li>
          <NuxtLink
            to="/"
            @click="closeSidebar"
            class="block px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 font-sans text-sidebar-foreground hover:text-sidebar-accent-foreground"
            active-class="bg-sidebar-accent-foreground text-sidebar-accent-foreground"
          >
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/qr"
            @click="closeSidebar"
            class="block px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 font-sans text-sidebar-foreground hover:text-sidebar-accent-foreground"
            active-class="bg-sidebar-accent-foreground text-sidebar-accent-foreground"
          >
            QR Code Generator
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/array-converter"
            @click="closeSidebar"
            class="block px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 font-sans text-sidebar-foreground hover:text-sidebar-accent-foreground"
            active-class="bg-sidebar-accent-foreground text-sidebar-accent-foreground"
          >
            Array Converter
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
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
