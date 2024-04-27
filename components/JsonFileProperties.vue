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

const importantProperties = ['name', 'date', 'version', 'status']
</script>

<template>
  <div class="p-4">
    <div v-if="error">
      <p class="text-red-500">
        Error: {{ error.message }}
      </p>
    </div>
    <div v-else-if="fileProperties">
      <h2 class="mb-4 text-2xl font-bold">
        Properties of {{ selectedFile }}
      </h2>
      <table class="table-auto">
        <tr v-for="prop in importantProperties" :key="prop">
          <td class="pr-4 font-bold">
            {{ prop }}
          </td>
          <td>{{ fileProperties[prop] }}</td>
        </tr>
      </table>
      <div class="mt-8">
        <h3 class="mb-2 text-xl font-bold">
          Additional Properties
        </h3>
        <table class="table-auto">
          <tr v-for="(value, key) in fileProperties" :key="key">
            <template v-if="!importantProperties.includes(key)">
              <td class="pr-4 font-bold">
                {{ key }}
              </td>
              <td>{{ value }}</td>
            </template>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
