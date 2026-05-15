<template>
  <div class="w-full max-w-4xl mx-auto px-0">
    <div class="mb-6 md:mb-8">
      <p
        class="font-sans text-sm md:text-base text-muted-foreground leading-relaxed"
      >
        Can't decide what to eat? Let fate spin you a meal!
      </p>
    </div>

    <div class="flex flex-col items-center gap-8">
      <!-- Rolodex Drum -->
      <div class="rolodex-outer">
        <!-- Side selector arrows -->
        <div class="selector-arrow left">&#9658;</div>
        <div class="selector-arrow right">&#9668;</div>

        <!-- Top/bottom selection lines -->
        <div class="selector-line top-line" />
        <div class="selector-line bottom-line" />

        <!-- Center highlight strip (shows through the drum) -->
        <div class="center-strip" />

        <!-- The drum window -->
        <div class="drum-window bg-card border border-border">
          <div class="drum" :style="{ transform: `translateY(${drumY}px)` }">
            <div
              v-for="(meal, i) in displayMeals"
              :key="i"
              class="drum-item font-sans"
            >
              <span class="meal-emoji">{{ meal.emoji }}</span>
              <span class="meal-name text-foreground">{{ meal.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Spin button -->
      <button
        class="spin-btn bg-primary text-primary-foreground font-sans font-bold"
        :class="{ 'spin-btn--active': spinning }"
        :disabled="spinning"
        @click="spin"
      >
        <span v-if="!spinning">🎲 Spin!</span>
        <span v-else class="spinning-text">Spinning<span class="dots" /></span>
      </button>

      <!-- Result card -->
      <Transition name="result">
        <div
          v-if="result && !spinning"
          class="result-card bg-card border border-border font-sans"
        >
          <p class="text-muted-foreground text-sm mb-2">What about:</p>
          <div class="flex items-center justify-center gap-3">
            <span class="result-emoji">{{ result.emoji }}</span>
            <span class="text-foreground font-bold text-2xl md:text-3xl">{{
              result.name
            }}</span>
          </div>
          <button
            class="mt-4 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            @click="spin"
          >
            spin again
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Meal Spinner - The Shed' })

const ITEM_HEIGHT = 80
const VISIBLE_ITEMS = 5
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS
const centerOffset = CONTAINER_HEIGHT / 2 - ITEM_HEIGHT / 2 // 160

const meals = [
  { emoji: '🥪', name: 'Jaffles' },
  { emoji: '🫕', name: 'Steamboat' },
  { emoji: '🌭', name: 'Sausages' },
  { emoji: '🍗', name: 'El Jannah' },
  { emoji: '🍗', name: 'KFC' },
  { emoji: '🥖', name: 'Pork Rolls' },
  { emoji: '🍣', name: 'Sushi' },
]

const REPEATS = 40
const displayMeals = computed(() =>
  Array.from({ length: REPEATS }, () => meals).flat()
)
const START_INDEX = Math.floor(REPEATS / 2) * meals.length

let currentIndex = START_INDEX
const drumY = ref(centerOffset - START_INDEX * ITEM_HEIGHT)
const spinning = ref(false)
const result = ref<{ emoji: string; name: string } | null>(null)

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function spin() {
  if (spinning.value) return
  spinning.value = true
  result.value = null

  // Normalize so we never run out of items
  const currentMealIdx = Math.round(currentIndex) % meals.length
  currentIndex = START_INDEX + currentMealIdx
  drumY.value = centerOffset - currentIndex * ITEM_HEIGHT

  const targetMealIndex = Math.floor(Math.random() * meals.length)
  const fullSpins = 5 + Math.floor(Math.random() * 5)
  const diff = (targetMealIndex - currentMealIdx + meals.length) % meals.length

  const startIndex = currentIndex
  const endIndex = startIndex + fullSpins * meals.length + diff
  const duration = 3000 + Math.random() * 1500
  const startTime = performance.now()

  function animate(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    currentIndex = startIndex + (endIndex - startIndex) * easeOut(t)
    drumY.value = centerOffset - currentIndex * ITEM_HEIGHT

    if (t < 1) {
      requestAnimationFrame(animate)
    } else {
      currentIndex = endIndex
      drumY.value = centerOffset - currentIndex * ITEM_HEIGHT
      spinning.value = false
      result.value = meals[targetMealIndex]
    }
  }

  requestAnimationFrame(animate)
}
</script>

<style scoped>
/* ── Outer positioning container ── */
.rolodex-outer {
  position: relative;
  width: min(340px, 90vw);
}

/* ── The visible drum window ── */
.drum-window {
  height: 400px; /* 5 × 80px */
  border-radius: 16px;
  overflow: hidden;
  position: relative;

  /* Mask creates the rolodex "cylinder" curve illusion */
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.5) 16%,
    black 30%,
    black 70%,
    rgba(0, 0, 0, 0.5) 84%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.5) 16%,
    black 30%,
    black 70%,
    rgba(0, 0, 0, 0.5) 84%,
    transparent 100%
  );
}

/* ── Center highlight strip behind drum ── */
.center-strip {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  height: 80px;
  background: var(--color-secondary);
  border-radius: 8px;
  z-index: 0;
  pointer-events: none;
}

/* ── Selection lines ── */
.selector-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
  z-index: 20;
  pointer-events: none;
}
.top-line {
  top: calc(50% - 40px);
}
.bottom-line {
  top: calc(50% + 38px);
}

/* ── Side arrows ── */
.selector-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-primary);
  font-size: 1.1rem;
  z-index: 20;
  pointer-events: none;
  line-height: 1;
}
.selector-arrow.left {
  left: -22px;
}
.selector-arrow.right {
  right: -22px;
}

/* ── The scrolling drum ── */
.drum {
  will-change: transform;
}

.drum-item {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  user-select: none;
}

.meal-emoji {
  font-size: 2rem;
  line-height: 1;
}
.meal-name {
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 120px;
}

/* ── Spin button ── */
.spin-btn {
  padding: 14px 52px;
  font-size: 1.2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.12s,
    box-shadow 0.12s;
  min-width: 180px;
}
.spin-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.spin-btn:active:not(:disabled) {
  transform: translateY(0);
}
.spin-btn:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

/* Pulsing outline when spinning */
.spin-btn--active {
  animation: btn-pulse 0.9s ease-in-out infinite;
}
@keyframes btn-pulse {
  0%,
  100% {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  }
}

/* Animated ellipsis */
.dots::after {
  content: '';
  display: inline-block;
  animation: dots 1.2s steps(3, end) infinite;
  width: 1.5ch;
  text-align: left;
}
@keyframes dots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}

/* ── Result card ── */
.result-card {
  text-align: center;
  padding: 24px 36px;
  border-radius: 16px;
  min-width: 260px;
}
.result-emoji {
  font-size: 3rem;
  line-height: 1;
}

/* ── Result transition ── */
.result-enter-active {
  animation: pop-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.result-leave-active {
  animation: pop-in 0.2s ease-in reverse;
}
@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0.75) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
