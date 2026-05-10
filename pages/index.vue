<template>
  <div class="max-w-4xl mx-auto">
    <!-- Welcome Section -->
    <div class="mb-12 animate-fade-in">
      <h1 class="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
        Welcome to Random Tools
      </h1>
      <p class="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
        A collection of useful utilities and tools to make your workflow easier.
        Choose from the menu to get started.
      </p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <!-- QR Code Tool Card -->
      <div
        class="bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-md transition-all duration-200 animate-slide-up"
      >
        <div
          class="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4"
        >
          <svg
            class="w-6 h-6 text-secondary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 15h4.01M12 21h4.01M12 12v.01M12 15v.01M12 18v.01M12 21v.01M12 12h.01M15 12h.01M15 15h.01M15 18h.01M15 21h.01"
            />
          </svg>
        </div>
        <h3 class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2">
          QR Code Generator
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Generate QR codes from URLs or text. Perfect for sharing links
          quickly.
        </p>
        <NuxtLink
          to="/qr"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          Generate QR Code
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Array Converter Tool Card -->
      <div
        class="bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-md transition-all duration-200 animate-slide-up"
      >
        <div
          class="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4"
        >
          <svg
            class="w-6 h-6 text-secondary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2">
          Array Converter
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Convert a list of values into a formatted array string with
          parentheses and quotes.
        </p>
        <NuxtLink
          to="/array-converter"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          Convert to Array
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
useHead({
  title: 'Random Tools - Home',
})
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
  animation: fade-in 0.8s ease-out 0.4s both;
}
</style>
