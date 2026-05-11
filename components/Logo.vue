<template>
  <div class="flex items-center gap-2">
    <!-- Logo Icon -->
    <div
      class="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
    >
      <svg
        class="w-5 h-5 text-primary-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    </div>
    <!-- Logo Text -->
    <div class="flex flex-col">
      <span class="font-sans font-bold text-lg text-accent"> The Shed </span>
      <span class="font-sans text-xs text-muted-foreground -mt-1">
        Random Tools
      </span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
