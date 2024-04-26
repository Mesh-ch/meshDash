<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ selectedFile: string }>()
const fileProperties = ref<Record<string, any> | null>(null)

// watch(() => props.selectedFile, async (fileName) => {
//   if (fileName) {
//     const { data, error } = await useFetch(`/api/file/${fileName}`)

//     if (error.value)
//       console.error('Failed to fetch file:', error.value)
//     else
//       fileProperties.value = data.value
//   }
// }, { immediate: true })

watch(() => props.selectedFile, (fileName) => {
  if (fileName) {
    const { data, error } = useAsyncData(`file/${fileName}`, async () => {
      const response = await fetch(`/api/file/${fileName}`)
      if (!response.ok)
        throw new Error('Failed to fetch file')

      return response.json()
    })

    if (error.value)
      console.error('Failed to fetch file:', error.value)
    else
      fileProperties.value = data.value
  }
}, { immediate: true })
</script>

<template>
  <div v-if="fileProperties">
    <h2>Properties of {{ selectedFile }}</h2>
    <table>
      <tr v-for="(value, key) in fileProperties" :key="key">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
    </table>
  </div>
</template>
