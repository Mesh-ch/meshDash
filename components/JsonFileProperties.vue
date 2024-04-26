<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ selectedFile: string }>()
const fileProperties = ref<Record<string, any> | null>(null)
const error = ref<any>(null)

watch(() => props.selectedFile, async (fileName) => {
  if (fileName) {
    try {
      const data = await $fetch(`/api/file/${fileName}`)
      //   console.log(data)
      fileProperties.value = data
      error.value = null
    }
    catch (err) {
      console.error(err)
      error.value = err
      fileProperties.value = null
    }
  }
}, { immediate: true })
</script>

<template>
  <div v-if="error">
    <p>Error: {{ error.message }}</p>
  </div>
  <div v-else-if="fileProperties">
    <h2>Properties of {{ selectedFile }}</h2>
    <table>
      <tr v-for="(value, key) in fileProperties" :key="key">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
    </table>
  </div>
</template>
<!--
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ selectedFile: string }>()
const fileProperties = ref<Record<string, any> | null>(null)

watch(() => props.selectedFile, async (fileName) => {
  if (fileName) {
    console.log(fileName)
    // const { data, error } = await $fetch(`/api/file/${fileName}`)
    const { data, error } = await useFetch(`/api/file/${fileName}`)
    console.log(data)

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
</template> -->
