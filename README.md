# The Shed

A collection of small, useful web utilities — random like things in a shed. Built with [Nuxt](https://nuxt.com/) and Tailwind CSS.

## Tools

- **QR Code Generator** (`/qr`) — Generate QR codes from URLs or text
- **Array Converter** (`/array-converter`) — Convert a list of values into a formatted array string
- **Cricket Averages** (`/cricket-averages`) — Track live/current/if-dismissed batting averages
- **Password Generator** (`/password-generator`) — Generate secure random passwords
- **World Clock** (`/world-clock`) — Compare times across timezones
- **Speed Converter** (`/speed-converter`) — Convert between mph and km/h
- **Meal Spinner** (`/meal-spinner`) — Spin a rolodex to decide what to eat
- **CSV Anonymiser** (`/csv-anonymiser`) — Swap sensitive CSV columns for realistic fake data, entirely in-browser (nothing is uploaded)
- **Percentage Change** (`/percentage-change`) — Work out the percentage increase or decrease between two numbers

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the dev server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build for production:

```bash
npm run build
```

Locally preview the production build:

```bash
npm run preview
```

Check out the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for more information.

## Tech Stack

- [Nuxt 4](https://nuxt.com/) / Vue 3
- [Tailwind CSS](https://tailwindcss.com/)
- [VueUse](https://vueuse.org/)
- [Papa Parse](https://www.papaparse.com/) (CSV parsing)
- [faker.js](https://fakerjs.dev/) (CSV anonymisation)
- [qrcode](https://github.com/soldair/node-qrcode)
