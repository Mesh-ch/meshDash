<script steup lang="ts">
// import { defineComponent } from 'vue';

// export default defineComponent({
//   data() {
//     return {
//       files: [] as string[],
//       jsonData: null as any | null
//     };
//   },
//   methods: {
//     async loadFile(file: string) {
//       // Make a request to the server to load the JSON file
//       // This is just a placeholder and needs to be replaced with actual code
//       this.jsonData = /* code to load JSON file */;
//     }
//   },
//   created() {
//     // Load the file list when the component is created
//     // This is just a placeholder and needs to be replaced with actual code
//     this.files = /* code to load file list */;
//   }
// });
</script>

<!-- <script setup lang="ts">
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
</script> -->

<template>
  <div>
    <table>
      <tr v-for="(file, index) in files" :key="index" @click="loadFile(file)">
        <td>{{ file }}</td>
      </tr>
    </table>
    <div v-if="jsonData">
      <pre>{{ jsonData }}</pre>
    </div>
  </div>
</template>
