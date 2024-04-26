<!-- pages/index.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetch } from 'nuxt/app'

const files = ref<string[]>([])
const fileProperties = ref(null)

onMounted(async () => {
  const { data } = await useFetch('/api/files')
  files.value = data.value
})

const loadFileProperties = async (fileName: string) => {
  const { data } = await useFetch(`/api/file/${fileName}`)
  fileProperties.value = data.value
}
</script>


<template>
  <div>
    <h1>JSON File List</h1>
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
