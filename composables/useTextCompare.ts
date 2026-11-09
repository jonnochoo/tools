export function useTextCompare() {
  const left = ref('')
  const right = ref('')
  const caseSensitive = ref(false)
  const trimLines = ref(true)

  const key = (l: string) => (caseSensitive.value ? l : l.toLowerCase())

  const parse = (text: string) => {
    const seen = new Set<string>()
    const out: string[] = []
    for (const raw of text.split(/\r?\n/)) {
      const l = trimLines.value ? raw.trim() : raw
      if (l === '' || seen.has(key(l))) continue
      seen.add(key(l))
      out.push(l)
    }
    return out
  }

  const leftLines = computed(() => parse(left.value))
  const rightLines = computed(() => parse(right.value))
  const rightKeys = computed(() => new Set(rightLines.value.map(key)))
  const leftKeys = computed(() => new Set(leftLines.value.map(key)))

  const matches = computed(() => leftLines.value.filter((l) => rightKeys.value.has(key(l))))
  const onlyLeft = computed(() => leftLines.value.filter((l) => !rightKeys.value.has(key(l))))
  const onlyRight = computed(() => rightLines.value.filter((l) => !leftKeys.value.has(key(l))))

  return { left, right, caseSensitive, trimLines, matches, onlyLeft, onlyRight }
}
