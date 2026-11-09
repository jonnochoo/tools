export function useDuplicateFinder() {
  const input = ref('')
  const caseSensitive = ref(false)
  const trimLines = ref(true)

  const lines = computed(() =>
    input.value
      .split(/\r?\n/)
      .map((l) => (trimLines.value ? l.trim() : l))
      .filter((l) => l !== ''),
  )

  const key = (l: string) => (caseSensitive.value ? l : l.toLowerCase())

  const duplicates = computed(() => {
    const counts = new Map<string, { text: string; count: number }>()
    for (const line of lines.value) {
      const entry = counts.get(key(line))
      if (entry) entry.count++
      else counts.set(key(line), { text: line, count: 1 })
    }
    return [...counts.values()].filter((e) => e.count > 1)
  })

  const unique = computed(() => {
    const seen = new Set<string>()
    return lines.value.filter((l) => {
      const k = key(l)
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
  })

  return { input, caseSensitive, trimLines, lines, duplicates, unique }
}
