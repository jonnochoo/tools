<template>
  <div :class="['border-b border-border', isBase && 'border-primary/50']">
    <!-- Row header -->
    <div class="flex items-center justify-between gap-4 px-4 py-3">
      <div class="flex items-center gap-3">
        <div>
          <h3 class="font-sans font-semibold text-foreground">{{ label }}</h3>
          <p class="text-xs text-muted-foreground">
            {{ getOffsetLabel() }} · {{ getAbbr() }}
          </p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-mono text-sm font-semibold text-foreground">
          {{ formatTime() }}
        </p>
        <p class="text-xs text-muted-foreground">{{ formatDate() }}</p>
      </div>
    </div>

    <!-- Timeline bars (24 hours) -->
    <div class="flex h-12 relative border-t border-border/50">
      <div
        v-for="h in 24"
        :key="h"
        class="flex-1 border-r border-border/30 transition-colors duration-200"
        :class="isNightHour(h - 1) ? 'bg-muted/60' : 'bg-accent/70'"
      />
      <!-- Cursor line -->
      <div
        class="absolute top-0 bottom-0 w-0.5 bg-primary pointer-events-none"
        :style="{ left: `${cursorPercent}%` }"
      />
    </div>

    <!-- Hour labels -->
    <div class="flex text-xs text-muted-foreground font-mono px-4 py-2">
      <div v-for="h in 25" :key="h" class="flex-1 text-center">
        <span v-if="(h - 1) % 3 === 0">
          {{ hourLabel(h - 1) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  tz: string
  sydneyMidnight: Date
  selectedDate: Date
  isBase?: boolean
}>()

function localHourAt(h: number): number {
  const d = new Date(props.sydneyMidnight.getTime() + h * 3_600_000)
  return parseInt(
    new Intl.DateTimeFormat('en', {
      timeZone: props.tz,
      hour: 'numeric',
      hour12: false,
    }).format(d)
  )
}

function isNightHour(h: number): boolean {
  const localHour = localHourAt(h)
  return localHour < 6 || localHour >= 22
}

function hourLabel(h: number): string {
  const d = new Date(props.sydneyMidnight.getTime() + h * 3_600_000)
  return new Intl.DateTimeFormat('en', {
    timeZone: props.tz,
    hour: 'numeric',
    hour12: true,
  }).format(d)
}

function formatTime(): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: props.tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(props.selectedDate)
}

function formatDate(): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: props.tz,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(props.selectedDate)
}

function getOffsetLabel(): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: props.tz,
    timeZoneName: 'shortOffset',
  }).formatToParts(props.selectedDate)

  const offsetPart = parts.find((p) => p.type === 'timeZoneName')?.value ?? ''
  return offsetPart.replace('GMT', 'UTC')
}

function getAbbr(): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: props.tz,
    timeZoneName: 'short',
  }).formatToParts(props.selectedDate)

  return parts.find((p) => p.type === 'timeZoneName')?.value ?? ''
}

const cursorPercent = computed(() => {
  const diffMs = props.selectedDate.getTime() - props.sydneyMidnight.getTime()
  return (diffMs / 86_400_000) * 100
})
</script>
