<template>
  <div class="w-full max-w-2xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold">📊 Percentage Change</h1>

    <!-- Input Section -->
    <div class="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="from" class="text-sm font-sans text-muted-foreground mb-1 block">
            From
          </label>
          <input
            id="from"
            v-model.number="from"
            type="number"
            step="any"
            placeholder="Starting value"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label for="to" class="text-sm font-sans text-muted-foreground mb-1 block">
            To
          </label>
          <input
            id="to"
            v-model.number="to"
            type="number"
            step="any"
            placeholder="New value"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>

    <!-- Result -->
    <div class="bg-card border border-border rounded-xl p-4 mb-6">
      <div class="text-sm text-muted-foreground font-sans">
        <template v-if="direction === 'increase'">📈 Increase</template>
        <template v-else-if="direction === 'decrease'">📉 Decrease</template>
        <template v-else-if="direction === 'none'">➖ No change</template>
        <template v-else>Result</template>
      </div>
      <div class="text-3xl font-bold font-mono mt-2">{{ formatted }}</div>
      <p v-if="isUndefined" class="text-sm text-muted-foreground font-sans mt-2">
        Percentage change is undefined when the starting value is 0.
      </p>
    </div>

    <!-- Formula -->
    <div class="bg-card border border-border rounded-xl p-4">
      <div class="text-sm text-muted-foreground font-sans mb-2">Formula</div>
      <div class="font-mono text-sm space-y-1">
        <div>% change = ((new − old) ÷ |old|) × 100</div>
        <div v-if="percentage !== null" class="text-muted-foreground">
          = (({{ to }} − {{ from }}) ÷ {{ Math.abs(from!) }}) × 100 = {{ formatted }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Percentage Change - Random Tools' })

const { from, to, percentage, direction, isUndefined, formatted } = usePercentageChange()
</script>
