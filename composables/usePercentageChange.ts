export function usePercentageChange() {
  const from = ref<number | null>(60)
  const to = ref<number | null>(80)

  const isValid = computed(() => typeof from.value === 'number' && typeof to.value === 'number')

  const difference = computed(() => (isValid.value ? to.value! - from.value! : null))

  // Dividing by |from| keeps the sign of the result matching the direction of change
  const percentage = computed(() => {
    if (!isValid.value || from.value === 0) return null
    return (difference.value! / Math.abs(from.value!)) * 100
  })

  const direction = computed<'increase' | 'decrease' | 'none' | null>(() => {
    if (percentage.value === null) return null
    if (percentage.value > 0) return 'increase'
    if (percentage.value < 0) return 'decrease'
    return 'none'
  })

  const isUndefined = computed(() => isValid.value && from.value === 0)

  const formatted = computed(() => {
    if (percentage.value === null) return '—'
    const rounded = Math.round(Math.abs(percentage.value) * 100) / 100
    const sign = percentage.value < 0 ? '−' : ''
    return `${sign}${rounded}%`
  })

  return { from, to, difference, percentage, direction, isUndefined, formatted }
}
