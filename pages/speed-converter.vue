<template>
  <div class="w-full max-w-4xl mx-auto px-0">
    <!-- Description -->
    <div class="mb-6 md:mb-8">
      <p
        class="font-sans text-sm md:text-base text-muted-foreground leading-relaxed"
      >
        Convert between miles per hour (mph) and kilometers per hour (km/h).
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <!-- MPH to KM Section -->
      <div class="space-y-4">
        <h3
          class="font-sans font-semibold text-base md:text-lg text-foreground"
        >
          Miles Per Hour (mph)
        </h3>

        <input
          v-model.number="mph"
          type="number"
          class="w-full px-3 md:px-4 py-3 md:py-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground font-mono text-sm md:text-base focus:border-primary focus:ring-1 focus:ring-ring focus:outline-none transition-all duration-200"
          placeholder="Enter speed in mph..."
        />

        <div class="text-xs md:text-sm text-muted-foreground font-sans">
          Common speeds:
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="mph = 30"
            class="px-2 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded text-xs font-sans transition-all duration-200"
          >
            30 mph
          </button>
          <button
            @click="mph = 50"
            class="px-2 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded text-xs font-sans transition-all duration-200"
          >
            50 mph
          </button>
          <button
            @click="mph = 90"
            class="px-2 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded text-xs font-sans transition-all duration-200"
          >
            90 mph
          </button>
          <button
            @click="mph = 100"
            class="px-2 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded text-xs font-sans transition-all duration-200"
          >
            100 mph
          </button>
        </div>
      </div>

      <!-- KM to MPH Section -->
      <div class="space-y-4">
        <h3
          class="font-sans font-semibold text-base md:text-lg text-foreground"
        >
          Kilometers Per Hour (km/h)
        </h3>

        <input
          v-model.number="kmh"
          type="number"
          class="w-full px-3 md:px-4 py-3 md:py-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground font-mono text-sm md:text-base focus:border-primary focus:ring-1 focus:ring-ring focus:outline-none transition-all duration-200"
          placeholder="Enter speed in km/h..."
        />
      </div>
    </div>

    <!-- Conversion Reference -->
    <div class="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-border">
      <h3
        class="font-sans font-semibold text-base md:text-lg text-foreground mb-4"
      >
        Conversion Reference
      </h3>
      <p class="font-sans text-xs md:text-sm text-muted-foreground mb-4">
        1 mph = 1.60934 km/h
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Speed Converter - Random Tools',
})

const mph = ref(100)
const kmh = ref(160.934)

watch(mph, (newMph) => {
  kmh.value = parseFloat((newMph * 1.60934).toFixed(2))
})

watch(kmh, (newKmh) => {
  mph.value = parseFloat((newKmh / 1.60934).toFixed(2))
})
</script>
