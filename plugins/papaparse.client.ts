import Papa from 'papaparse'

// papaparse is browser-only and ships as UMD that Nitro's server bundler can't
// parse. Exposing it through a `.client` plugin keeps it out of the server
// build entirely while making it available to client-side code as `$papa`.
export default defineNuxtPlugin(() => {
  return {
    provide: {
      papa: Papa,
    },
  }
})
