<template>
  <div class="w-full max-w-2xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold">🔍 Duplicate Finder</h1>

    <div class="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
      <label for="input" class="text-sm font-sans text-muted-foreground mb-1 block">
        Paste lines (one per line)
      </label>
      <textarea
        id="input"
        v-model="input"
        rows="8"
        placeholder="red&#10;blue&#10;green&#10;yellow&#10;blue&#10;red"
        class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <div class="flex flex-wrap gap-4 mt-3 text-sm font-sans text-muted-foreground">
        <label class="flex items-center gap-2">
          <input v-model="caseSensitive" type="checkbox" /> Case sensitive
        </label>
        <label class="flex items-center gap-2">
          <input v-model="trimLines" type="checkbox" /> Trim whitespace
        </label>
      </div>
    </div>

    <div class="bg-card border border-border rounded-xl p-4 mb-6">
      <div class="text-sm text-muted-foreground font-sans mb-2">
        Duplicates ({{ duplicates.length }})
      </div>
      <ul v-if="duplicates.length" class="font-mono space-y-1">
        <li v-for="d in duplicates" :key="d.text" class="flex justify-between">
          <span>{{ d.text }}</span>
          <span class="text-muted-foreground">×{{ d.count }}</span>
        </li>
      </ul>
      <p v-else class="text-sm text-muted-foreground font-sans">No duplicates found.</p>
    </div>

    <div class="bg-card border border-border rounded-xl p-4">
      <div class="flex items-center justify-between mb-2">
        <div class="text-sm text-muted-foreground font-sans">
          Without duplicates ({{ unique.length }} of {{ lines.length }})
        </div>
        <button
          class="text-sm font-sans px-3 py-1 rounded-lg bg-primary text-primary-foreground"
          @click="copy"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <pre class="font-mono text-sm whitespace-pre-wrap">{{ unique.join('\n') }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Duplicate Finder - Random Tools' })

const { input, caseSensitive, trimLines, lines, duplicates, unique } = useDuplicateFinder()

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(unique.value.join('\n'))
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}
</script>
