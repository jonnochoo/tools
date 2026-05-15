<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'font-sans transition-all duration-200 inline-flex items-center justify-center cursor-pointer',
      variantClasses,
      sizeClasses,
      fullWidth ? 'w-full' : '',
      loading ? 'relative overflow-hidden' : '',
    ]"
  >
    <span :class="['inline-flex items-center gap-2', loading ? 'opacity-0' : '']">
      <slot />
    </span>
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
})

const variantClasses = computed(() => ({
  primary: 'bg-primary hover:shadow-md text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded disabled:opacity-50 disabled:cursor-not-allowed',
}[props.variant]))

const sizeClasses = computed(() => ({
  sm: 'px-2 py-1 text-xs font-medium',
  md: 'px-3 md:px-4 py-2 text-xs md:text-sm font-medium',
  lg: 'px-4 py-3 md:py-4 text-sm md:text-base font-semibold',
}[props.size]))
</script>
