<template>
  <div class="w-full max-w-2xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold">🏏 Cricket Averages</h1>

    <!-- Input Section -->
    <div class="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
      <div class="grid gap-4">
        <div>
          <label for="totalRuns" class="text-sm font-sans text-muted-foreground mb-1 block">
            Total Runs
          </label>
          <input
            id="totalRuns"
            v-model.number="totalRuns"
            type="number"
            placeholder="Total Runs"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label for="totalInnings" class="text-sm font-sans text-muted-foreground mb-1 block">
            Total Innings
          </label>
          <input
            id="totalInnings"
            v-model.number="totalInnings"
            type="number"
            placeholder="Innings"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label for="totalNotOuts" class="text-sm font-sans text-muted-foreground mb-1 block">
            Total Not Outs
          </label>
          <input
            id="totalNotOuts"
            v-model.number="totalNotOuts"
            type="number"
            placeholder="Not outs"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label for="currentScore" class="text-sm font-sans text-muted-foreground mb-1 block">
            Current Score
          </label>
          <input
            id="currentScore"
            v-model.number="currentScore"
            type="number"
            placeholder="Current score"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-sm text-muted-foreground font-sans">📈 Current Average</div>
        <div class="text-3xl font-bold font-mono mt-2">{{ average }}</div>
      </div>

      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-sm text-muted-foreground font-sans">🟢 Live Average</div>
        <div class="text-3xl font-bold font-mono mt-2">{{ liveAverage }}</div>
      </div>

      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-sm text-muted-foreground font-sans">❌ Average If Out</div>
        <div class="text-3xl font-bold font-mono mt-2">{{ averageIfOut }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Cricket Averages - Random Tools' })

const { totalRuns, totalInnings, totalNotOuts, currentScore, average, liveAverage, averageIfOut }
  = useCricketAverages()
</script>
