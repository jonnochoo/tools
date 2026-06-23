import { faker } from '@faker-js/faker'

// ---------------------------------------------------------------------------
// Column actions & fake types
// ---------------------------------------------------------------------------

export type ColumnAction = 'keep' | 'anonymise' | 'drop'

export type FakeType =
  | 'fullName'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'mobileAU'
  | 'phone'
  | 'vin'
  | 'regoAU'
  | 'streetAddress'
  | 'city'
  | 'postcodeAU'
  | 'company'
  | 'username'
  | 'uuid'
  | 'category'

export interface FakeTypeOption {
  value: FakeType
  label: string
}

// Order here drives the dropdown order in the UI.
export const FAKE_TYPE_OPTIONS: FakeTypeOption[] = [
  { value: 'fullName', label: 'Full name' },
  { value: 'firstName', label: 'First name' },
  { value: 'lastName', label: 'Last name' },
  { value: 'email', label: 'Email' },
  { value: 'mobileAU', label: 'Mobile (AU)' },
  { value: 'phone', label: 'Phone' },
  { value: 'vin', label: 'VIN (valid)' },
  { value: 'regoAU', label: 'Rego (AU)' },
  { value: 'streetAddress', label: 'Street address' },
  { value: 'city', label: 'City' },
  { value: 'postcodeAU', label: 'Postcode (AU)' },
  { value: 'company', label: 'Company' },
  { value: 'username', label: 'Username' },
  { value: 'uuid', label: 'UUID / ID' },
  { value: 'category', label: 'Category / label' },
]

// ---------------------------------------------------------------------------
// VIN — 17 chars, no I/O/Q, position 9 is a mod-11 check digit
// ---------------------------------------------------------------------------

const VIN_ALPHABET = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789' // I, O, Q excluded

const VIN_TRANSLIT: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
  '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
}

const VIN_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

function vinCheckDigit(vin17: string): string {
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += (VIN_TRANSLIT[vin17[i]] ?? 0) * VIN_WEIGHTS[i]
  }
  const remainder = sum % 11
  return remainder === 10 ? 'X' : String(remainder)
}

export function randomValidVin(): string {
  const chars: string[] = []
  for (let i = 0; i < 17; i++) {
    chars.push(VIN_ALPHABET[Math.floor(Math.random() * VIN_ALPHABET.length)])
  }
  // Position 9 (index 8) carries the check digit. Its own weight is 0, so
  // overwriting it after the fact does not change the computed value.
  chars[8] = vinCheckDigit(chars.join(''))
  return chars.join('')
}

// ---------------------------------------------------------------------------
// AU-specific generators
// ---------------------------------------------------------------------------

function digits(n: number): string {
  let out = ''
  for (let i = 0; i < n; i++) out += Math.floor(Math.random() * 10)
  return out
}

function letters(n: number): string {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let out = ''
  for (let i = 0; i < n; i++) out += A[Math.floor(Math.random() * A.length)]
  return out
}

// Classic AU plate format: ABC123 (3 letters + 3 digits).
function randomRegoAU(): string {
  return `${letters(3)}${digits(3)}`
}

// Valid AU mobile: 04 + 8 digits, conventionally grouped 04xx xxx xxx.
function randomMobileAU(): string {
  const d = `04${digits(8)}`
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`
}

// AU postcodes are 4 digits (0800–9999 in practice; keep it simple & plausible).
function randomPostcodeAU(): string {
  return String(Math.floor(Math.random() * 9000) + 1000)
}

// ---------------------------------------------------------------------------
// Generator registry
// ---------------------------------------------------------------------------

const GENERATORS: Record<FakeType, () => string> = {
  fullName: () => faker.person.fullName(),
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  email: () => faker.internet.email().toLowerCase(),
  mobileAU: randomMobileAU,
  phone: () => faker.phone.number(),
  vin: randomValidVin,
  regoAU: randomRegoAU,
  streetAddress: () => faker.location.streetAddress(),
  city: () => faker.location.city(),
  postcodeAU: randomPostcodeAU,
  company: () => faker.company.name(),
  username: () => faker.internet.username().toLowerCase(),
  uuid: () => faker.string.uuid(),
  category: () => capitalise(faker.word.noun()),
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ---------------------------------------------------------------------------
// Stable mapper — same input always yields the same fake (within one run),
// with collision avoidance so distinct inputs stay distinct (preserves
// cardinality, distribution and joins). Blank/null values pass through.
// ---------------------------------------------------------------------------

export type Mapper = (value: string) => string

export function makeMapper(type: FakeType): Mapper {
  const gen = GENERATORS[type] ?? GENERATORS.category
  const map = new Map<string, string>()
  const used = new Set<string>()

  return (value: string): string => {
    if (value == null || value === '') return value
    const existing = map.get(value)
    if (existing !== undefined) return existing

    let fake = gen()
    let guard = 0
    while (used.has(fake) && guard < 100) {
      fake = gen()
      guard++
    }
    used.add(fake)
    map.set(value, fake)
    return fake
  }
}

// ---------------------------------------------------------------------------
// Heuristic auto-detection from a column header + sample values
// ---------------------------------------------------------------------------

export interface Detection {
  action: ColumnAction
  type: FakeType
}

export function detectColumn(header: string, samples: string[] = []): Detection {
  const h = header.toLowerCase().replace(/[^a-z0-9]/g, '')
  const sample = samples.find((s) => s && s.trim() !== '') ?? ''

  const anon = (type: FakeType): Detection => ({ action: 'anonymise', type })

  if (/vin|chassis/.test(h)) return anon('vin')
  if (/rego|registration|numberplate|licenceplate|licenseplate|plate/.test(h)) return anon('regoAU')
  if (/email|mail/.test(h)) return anon('email')
  if (/mobile|cell/.test(h)) return anon('mobileAU')
  if (/phone|landline|fax/.test(h)) return anon('phone')
  if (/firstname|givenname|fname/.test(h)) return anon('firstName')
  if (/lastname|surname|familyname|lname/.test(h)) return anon('lastName')
  if (/fullname|(^|.)name$|customer|contact/.test(h)) return anon('fullName')
  if (/postcode|postalcode|zip/.test(h)) return anon('postcodeAU')
  if (/address|street/.test(h)) return anon('streetAddress')
  if (/suburb|city|town/.test(h)) return anon('city')
  if (/company|employer|business|organisation|organization/.test(h)) return anon('company')
  if (/username|handle|login/.test(h)) return anon('username')
  if (/uuid|guid/.test(h)) return anon('uuid')
  if (/(^|.)id$/.test(h)) return anon('uuid')

  // Content sniffing as a fallback.
  if (/@/.test(sample)) return anon('email')
  if (/^[A-HJ-NPR-Z0-9]{17}$/i.test(sample)) return anon('vin')

  return { action: 'keep', type: 'category' }
}
