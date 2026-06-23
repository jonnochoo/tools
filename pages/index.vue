<template>
  <div class="max-w-4xl mx-auto">
    <!-- Welcome Section -->
    <div class="mb-12 animate-fade-in">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1
            class="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4"
          >
            Welcome to The Shed
          </h1>
          <p
            class="font-sans text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            A collection of useful utilities and tools...they are random like
            things in a shed.
          </p>
        </div>
        <PWAInstallButton />
      </div>
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
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
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
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
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

      <!-- Cricket Averages Tool Card -->
      <div
        class="bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-md transition-all duration-200 animate-slide-up"
      >
        <div
          class="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4"
        >
          <span class="text-xl">🏏</span>
        </div>
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
          Cricket Averages
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Calculate live batting averages. Track current average, live average
          with current score, and average if dismissed.
        </p>
        <NuxtLink
          to="/cricket-averages"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          Calculate Averages
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

      <!-- Password Generator Tool Card -->
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
          Password Generator
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Generate secure random passwords with uppercase, lowercase, numbers,
          and symbols.
        </p>
        <NuxtLink
          to="/password-generator"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          Generate Password
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

      <!-- World Clock Tool Card -->
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
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-5.5-3.4V7z"
            />
          </svg>
        </div>
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
          World Clock
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Visualize what time it is across different timezones. See when it's
          working hours in different parts of the world.
        </p>
        <NuxtLink
          to="/world-clock"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          View World Clock
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

      <!-- Speed Converter Tool Card -->
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
          Speed Converter
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Convert between miles per hour and kilometers per hour instantly.
        </p>
        <NuxtLink
          to="/speed-converter"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          Convert Speed
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
      <!-- Meal Spinner Tool Card -->
      <div
        class="bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-md transition-all duration-200 animate-slide-up"
      >
        <div
          class="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4"
        >
          <span class="text-xl">🍽️</span>
        </div>
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
          Meal Spinner
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Can't decide what to eat? Spin the rolodex!
        </p>
        <NuxtLink
          to="/meal-spinner"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          Spin a Meal
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
      <!-- CSV Anonymiser Tool Card -->
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
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3
          class="font-sans font-semibold text-lg md:text-xl text-card-foreground mb-2"
        >
          CSV Anonymiser
        </h3>
        <p class="font-sans text-sm md:text-base text-muted-foreground mb-4">
          Drop in a CSV and swap sensitive columns for realistic fake data.
          Runs entirely in your browser — nothing is uploaded.
        </p>
        <NuxtLink
          to="/csv-anonymiser"
          class="inline-flex items-center px-3 md:px-4 py-2 bg-primary hover:shadow-md text-primary-foreground rounded-lg transition-all duration-200 font-sans text-sm md:text-base font-medium"
        >
          Anonymise CSV
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
