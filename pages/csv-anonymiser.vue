<template>
  <div class="w-full max-w-5xl mx-auto px-0">
    <!-- Description -->
    <div class="mb-6 md:mb-8">
      <p class="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
        Drop in a CSV and replace sensitive columns with realistic fake data.
        Everything runs in your browser — no file ever leaves this machine.
        Repeated values map to the same fake value, so joins, distributions and
        cardinality survive.
      </p>
    </div>

    <!-- Drop zone -->
    <div
      v-if="!fileName"
      class="border-2 border-dashed rounded-lg p-10 md:p-16 text-center transition-all duration-200 cursor-pointer"
      :class="isDragging ? 'border-primary bg-primary/5' : 'border-border bg-input/40 hover:border-primary/60'"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <svg class="w-10 h-10 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M7 16a4 4 0 01-.88-7.9A5 5 0 0115.9 6.1 4.5 4.5 0 0117 15h-1m-4-4v9m0-9l-3 3m3-3l3 3" />
      </svg>
      <p class="font-sans text-sm md:text-base text-foreground font-medium mb-1">
        Drag &amp; drop a CSV here
      </p>
      <p class="font-sans text-xs md:text-sm text-muted-foreground">
        or click to choose a file
      </p>
      <input ref="fileInput" type="file" accept=".csv,text/csv" class="hidden" @change="onPick" />
    </div>

    <!-- Parse error -->
    <div v-if="parseError" class="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/40 text-destructive text-sm font-sans">
      {{ parseError }}
    </div>

    <!-- Loaded file -->
    <div v-if="fileName" class="space-y-6">
      <!-- File header bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="font-sans text-sm">
          <span class="text-foreground font-medium">{{ fileName }}</span>
          <span class="text-muted-foreground">
            — {{ rows.length.toLocaleString() }} rows, {{ fields.length }} columns
          </span>
        </div>
        <div class="flex gap-2">
          <BaseButton variant="secondary" size="sm" @click="reset">Clear</BaseButton>
          <BaseButton size="sm" :disabled="!anyAnonymised" @click="download">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span>Download anonymised CSV</span>
          </BaseButton>
        </div>
      </div>

      <!-- Column config -->
      <div>
        <h3 class="font-sans font-semibold text-base md:text-lg text-foreground mb-3">Columns</h3>
        <div class="overflow-x-auto border border-border rounded-lg">
          <table class="w-full text-sm font-sans">
            <thead>
              <tr class="bg-secondary text-secondary-foreground text-left">
                <th class="px-3 py-2 font-medium">Column</th>
                <th class="px-3 py-2 font-medium">Sample</th>
                <th class="px-3 py-2 font-medium">Action</th>
                <th class="px-3 py-2 font-medium">Fake as</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="col in columns" :key="col.name" class="border-t border-border">
                <td class="px-3 py-2 text-foreground font-medium whitespace-nowrap">{{ col.name }}</td>
                <td class="px-3 py-2 text-muted-foreground font-mono text-xs max-w-[16rem] truncate" :title="col.sample">
                  {{ col.sample || '—' }}
                </td>
                <td class="px-3 py-2">
                  <select v-model="col.action" class="bg-input border border-border rounded px-2 py-1 text-foreground focus:border-primary focus:outline-none">
                    <option value="keep">Keep</option>
                    <option value="anonymise">Anonymise</option>
                    <option value="drop">Drop</option>
                  </select>
                </td>
                <td class="px-3 py-2">
                  <select
                    v-model="col.type"
                    :disabled="col.action !== 'anonymise'"
                    class="bg-input border border-border rounded px-2 py-1 text-foreground focus:border-primary focus:outline-none disabled:opacity-40"
                  >
                    <option v-for="opt in fakeTypeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Preview -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-sans font-semibold text-base md:text-lg text-foreground">
            Preview
            <span class="text-muted-foreground font-normal text-sm">(first {{ previewRows.length }} rows, anonymised)</span>
          </h3>
        </div>
        <div class="overflow-x-auto border border-border rounded-lg">
          <table class="w-full text-xs font-mono">
            <thead>
              <tr class="bg-secondary text-secondary-foreground text-left">
                <th
                  v-for="field in outputFields"
                  :key="field"
                  class="px-3 py-2 font-medium whitespace-nowrap"
                >{{ field }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in previewRows" :key="i" class="border-t border-border">
                <td v-for="field in outputFields" :key="field" class="px-3 py-2 text-foreground whitespace-nowrap max-w-56 truncate" :title="row[field]">
                  {{ row[field] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FAKE_TYPE_OPTIONS,
  detectColumn,
  makeMapper,
  type ColumnAction,
  type FakeType,
} from '~/utils/anonymise'

// papaparse is provided by plugins/papaparse.client.ts (browser-only — it can't
// be bundled into the server build). All usage below runs in client handlers.
const { $papa } = useNuxtApp()

useHead({ title: 'CSV Anonymiser - The Shed' })

interface ColumnConfig {
  name: string
  sample: string
  action: ColumnAction
  type: FakeType
}

const fakeTypeOptions = FAKE_TYPE_OPTIONS

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const fileName = ref('')
const parseError = ref('')

const fields = ref<string[]>([])
const rows = ref<Record<string, string>[]>([])
const columns = ref<ColumnConfig[]>([])

const PREVIEW_LIMIT = 5

// --- File intake --------------------------------------------------------

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) loadFile(file)
}

const onPick = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) loadFile(file)
}

const loadFile = (file: File) => {
  parseError.value = ''
  if (!/\.csv$/i.test(file.name) && file.type && !/csv/.test(file.type)) {
    parseError.value = 'Please choose a .csv file.'
    return
  }
  $papa.parse<Record<string, string>>(file, {
    header: true,
    skipEmptyLines: 'greedy',
    complete: (results) => {
      if (results.errors.length) {
        // Surface only genuinely fatal errors; PapaParse flags benign ones too.
        const fatal = results.errors.find((e) => e.type === 'Delimiter' || e.type === 'Quotes')
        if (fatal) {
          parseError.value = `Could not parse CSV: ${fatal.message}`
          return
        }
      }
      const detectedFields = results.meta.fields ?? []
      if (!detectedFields.length) {
        parseError.value = 'No columns found — does the file have a header row?'
        return
      }
      fileName.value = file.name
      fields.value = detectedFields
      rows.value = results.data
      columns.value = detectedFields.map((name) => {
        const samples = rows.value.slice(0, 20).map((r) => r[name] ?? '')
        const { action, type } = detectColumn(name, samples)
        return {
          name,
          sample: samples.find((s) => s && s.trim() !== '') ?? '',
          action,
          type,
        }
      })
    },
    error: (err) => {
      parseError.value = `Could not read file: ${err.message}`
    },
  })
}

const reset = () => {
  fileName.value = ''
  parseError.value = ''
  fields.value = []
  rows.value = []
  columns.value = []
  if (fileInput.value) fileInput.value.value = ''
}

// --- Anonymisation ------------------------------------------------------

const anyAnonymised = computed(() => columns.value.some((c) => c.action === 'anonymise'))

const outputFields = computed(() =>
  columns.value.filter((c) => c.action !== 'drop').map((c) => c.name),
)

// Build a fresh set of stable mappers for the current config. Each call to
// transform() should use one consistent set so identical inputs map alike.
const buildMappers = () => {
  const mappers = new Map<string, (v: string) => string>()
  for (const col of columns.value) {
    if (col.action === 'anonymise') mappers.set(col.name, makeMapper(col.type))
  }
  return mappers
}

const transformRows = (
  source: Record<string, string>[],
  mappers: Map<string, (v: string) => string>,
) => {
  const keep = outputFields.value
  return source.map((row) => {
    const out: Record<string, string> = {}
    for (const field of keep) {
      const map = mappers.get(field)
      out[field] = map ? map(row[field] ?? '') : (row[field] ?? '')
    }
    return out
  })
}

// Preview recomputes reactively whenever config changes (cheap — few rows).
const previewRows = computed(() => {
  const mappers = buildMappers()
  return transformRows(rows.value.slice(0, PREVIEW_LIMIT), mappers)
})

const download = () => {
  const mappers = buildMappers()
  const output = transformRows(rows.value, mappers)
  const csv = $papa.unparse({ fields: outputFields.value, data: output })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName.value.replace(/\.csv$/i, '') + '.anonymised.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
