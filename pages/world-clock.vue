<template>
  <div class="w-full max-w-4xl mx-auto px-0">
    <!-- Description -->
    <div class="mb-6 md:mb-8 px-4 md:px-0">
      <p
        class="font-sans text-sm md:text-base text-muted-foreground leading-relaxed"
      >
        See what time it is across the world based on Sydney time. Drag the
        slider to change the time, or click "Now" to reset to the current
        moment. Night hours are shaded darker on each row.
      </p>
    </div>

    <div class="text-3xl text-muted-foreground font-mono text-center mb-2">
      {{ currentTimeDisplay }} Sydney
    </div>

    <!-- Timeline rows -->
    <div class="border border-border rounded-lg overflow-hidden bg-card">
      <WorldClockRow
        v-for="zone in ZONES"
        :key="zone.tz"
        :label="zone.label"
        :tz="zone.tz"
        :sydney-midnight="sydneyMidnight"
        :selected-date="selectedDate"
        :is-base="zone.tz === 'Australia/Sydney'"
      />
    </div>

    <!-- Slider section -->
    <div class="mt-6 md:mt-8 px-4 md:px-0">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <input
            v-model.number="sydneyMinutes"
            type="range"
            min="0"
            max="1439"
            step="15"
            class="flex-1 h-2 bg-secondary rounded-lg accent-primary cursor-pointer"
          />
          <BaseButton @click="setToNow" class="active:shadow-sm whitespace-nowrap">
            Now
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WorldClockRow from '~/components/WorldClockRow.vue'

useHead({ title: 'World Clock - The Shed' })

const ZONES = [
  { label: 'Sydney', tz: 'Australia/Sydney' },
  { label: 'South Korea', tz: 'Asia/Seoul' },
  { label: 'UTC', tz: 'UTC' },
]

// Parse a Sydney local time string ("YYYY-MM-DDTHH:MM") to UTC Date
function parseSydneyLocal(localStr: string): Date {
  const approxUtc = new Date(localStr + 'Z')
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(approxUtc)

  const year = parts.find((p) => p.type === 'year')?.value
  const month = parts.find((p) => p.type === 'month')?.value
  const day = parts.find((p) => p.type === 'day')?.value
  const hour = parts.find((p) => p.type === 'hour')?.value
  const minute = parts.find((p) => p.type === 'minute')?.value
  const second = parts.find((p) => p.type === 'second')?.value

  const sydneyStr = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
  const sydForApprox = new Date(sydneyStr)
  const offsetMs = sydForApprox.getTime() - approxUtc.getTime()
  return new Date(approxUtc.getTime() - offsetMs)
}

// Get today's Sydney date
function getSydneyMidnight(): Date {
  const todaySydney = new Intl.DateTimeFormat('sv', {
    timeZone: 'Australia/Sydney',
  })
    .format(new Date())
    .slice(0, 10)
  return parseSydneyLocal(todaySydney + 'T00:00')
}

// Get current Sydney time as minutes from midnight
function getNowMinutes(): number {
  const now = new Date()
  const h = parseInt(
    new Intl.DateTimeFormat('en', {
      timeZone: 'Australia/Sydney',
      hour: 'numeric',
      hour12: false,
    }).format(now)
  )
  const m = parseInt(
    new Intl.DateTimeFormat('en', {
      timeZone: 'Australia/Sydney',
      minute: 'numeric',
    }).format(now)
  )
  return h * 60 + m
}

const sydneyMidnight = ref<Date>(new Date())
const sydneyMinutes = ref<number>(0)

const selectedDate = computed(
  () => new Date(sydneyMidnight.value.getTime() + sydneyMinutes.value * 60_000)
)

const currentTimeDisplay = computed(() => {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(selectedDate.value)
})

function setToNow(): void {
  sydneyMinutes.value = getNowMinutes()
}

onMounted(() => {
  sydneyMidnight.value = getSydneyMidnight()
  sydneyMinutes.value = getNowMinutes()
})
</script>
