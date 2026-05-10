export function useCricketAverages() {
  const totalRuns = ref(10140)
  const totalInnings = ref(205)
  const totalNotOuts = ref(25)
  const currentScore = ref(73)

  const dismissals = computed(() => totalInnings.value - totalNotOuts.value)

  const average = computed(() => {
    if (dismissals.value <= 0) return '—'
    return (totalRuns.value / dismissals.value).toFixed(2)
  })

  const liveAverage = computed(() => {
    if (dismissals.value <= 0) return '—'
    return ((totalRuns.value + currentScore.value) / dismissals.value).toFixed(2)
  })

  const averageIfOut = computed(() => {
    if (dismissals.value + 1 <= 0) return '—'
    return ((totalRuns.value + currentScore.value) / (dismissals.value + 1)).toFixed(2)
  })

  return { totalRuns, totalInnings, totalNotOuts, currentScore, average, liveAverage, averageIfOut }
}
