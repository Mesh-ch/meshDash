<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFetch } from 'nuxt/app'

const files = ref<string[]>([])
const fileProperties = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  const { data } = await useFetch('/api/loadFilenames')

  await nextTick()
  files.value = data.value
  console.log('File Loading Done!')
  isLoading.value = false
})

async function loadFileProperties(fileName: string) {
  const { data, error } = await useFetch(`/api/file/${fileName}`)

  if (error.value)
    console.error('Failed to fetch file:', error.value)
  else
    fileProperties.value = data.value
}
</script>

<template>
  <div>
    <h1>JSON File List</h1>

    <div v-if="isLoading">
      Loading files...
    </div>

    <table>
      <thead>
        <tr>
          <th>File Name</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="file in files" :key="file" @click="loadFileProperties(file)">
          <td>{{ file }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="fileProperties">
      <h2>File Properties</h2>
      <pre>{{ fileProperties }}</pre>
    </div>
  </div>
</template>
