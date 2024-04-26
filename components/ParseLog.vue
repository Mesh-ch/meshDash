<script setup lang="ts">
const fs = require('node:fs')
// import data from '/logs/20240325_Monday/_14h03_4323-048599-01-297707.json.json'

// const allLog = import.meta.glob('../logs/20240325_Monday/*.json')

// for (const name in allLog)
//   console.log(name)
// console.log(allLog)
// const mod: any = await modules[path]()
// extraLocales = mod.default

// const fs = require('node:fs')

// const testLog = await fetch('/logs/20240325_Monday/_14h03_4323-048599-01-297707.json.json')
// const dat = testLog.json()
// console.log(testLog)
const { data: log } = await useAsyncData('fab-log', () => {
  log = JSON.parse(fs.readFileSync('../public/logs/20240325_Monday/_14h03_4323-048599-01-297707.json.json', 'utf8'))
})
console.log(log)
</script>

<template>
  <div />
</template>
