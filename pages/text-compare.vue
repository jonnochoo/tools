<template>
  <div class="w-full max-w-3xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold">⚖️ Text Compare</h1>

    <div class="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="left" class="text-sm font-sans text-muted-foreground mb-1 block">List A</label>
          <textarea
            id="left"
            v-model="left"
            placeholder="red&#10;blue&#10;green&#10;yellow"
            rows="8"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label for="right" class="text-sm font-sans text-muted-foreground mb-1 block">List B</label>
          <textarea
            id="right"
            v-model="right"
            placeholder="blue&#10;purple&#10;green&#10;orange"
            rows="8"
            class="w-full bg-input border border-border rounded-lg px-3 py-2 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div class="flex flex-wrap gap-4 mt-3 text-sm font-sans text-muted-foreground">
        <label class="flex items-center gap-2">
          <input v-model="caseSensitive" type="checkbox" /> Case sensitive
        </label>
        <label class="flex items-center gap-2">
          <input v-model="trimLines" type="checkbox" /> Trim whitespace
        </label>
      </div>
    </div>

    <div class="flex justify-end mb-3">
      <button
        class="text-sm font-sans px-3 py-1 rounded-lg bg-primary text-primary-foreground"
        @click="copy('all', allText)"
      >
        {{ copiedKey === 'all' ? 'Copied!' : 'Copy all results' }}
      </button>
    </div>

    <div class="bg-card border border-border rounded-xl p-4 mb-6">
      <div class="flex items-center justify-between mb-2">
        <div class="text-sm text-muted-foreground font-sans">✅ In both ({{ matches.length }})</div>
        <button class="text-xs font-sans px-2 py-1 rounded-lg bg-secondary text-secondary-foreground" @click="copy('both', matches.join('\n'))">{{ copiedKey === 'both' ? 'Copied!' : 'Copy' }}</button>
      </div>
      <ul v-if="matches.length" class="font-mono space-y-1">
        <li v-for="l in matches" :key="l">{{ l }}</li>
      </ul>
      <p v-else class="text-sm text-muted-foreground font-sans">No matching lines.</p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="text-sm text-muted-foreground font-sans">Only in A ({{ onlyLeft.length }})</div>
          <button class="text-xs font-sans px-2 py-1 rounded-lg bg-secondary text-secondary-foreground" @click="copy('a', onlyLeft.join('\n'))">{{ copiedKey === 'a' ? 'Copied!' : 'Copy' }}</button>
        </div>
        <ul class="font-mono space-y-1">
          <li v-for="l in onlyLeft" :key="l">{{ l }}</li>
        </ul>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="text-sm text-muted-foreground font-sans">Only in B ({{ onlyRight.length }})</div>
          <button class="text-xs font-sans px-2 py-1 rounded-lg bg-secondary text-secondary-foreground" @click="copy('b', onlyRight.join('\n'))">{{ copiedKey === 'b' ? 'Copied!' : 'Copy' }}</button>
        </div>
        <ul class="font-mono space-y-1">
          <li v-for="l in onlyRight" :key="l">{{ l }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Text Compare - Random Tools' })

const { left, right, caseSensitive, trimLines, matches, onlyLeft, onlyRight } = useTextCompare()

const copiedKey = ref<string | null>(null)
const allText = computed(() =>
  [
    `In both (${matches.value.length}):`,
    ...matches.value,
    '',
    `Only in A (${onlyLeft.value.length}):`,
    ...onlyLeft.value,
    '',
    `Only in B (${onlyRight.value.length}):`,
    ...onlyRight.value,
  ].join('\n'),
)

async function copy(key: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => (copiedKey.value = null), 1500)
  } catch {}
}
</script>
