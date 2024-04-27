<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ selectedFile: string }>()

const fileProperties = ref<Record<string, any> | null>(null)
const error = ref<any>(null)

watch(() => props.selectedFile, async (fileName) => {
  if (fileName) {
    try {
      const data = await $fetch(`/api/file/${fileName}`)
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

function displayFileName(file: string) {
  const parts = file.split('/')
  const fileName = parts.pop() || ''
  // const jobName = fileName.replace(/[SF]|_\d{2}h\d{2}_|\.json/g, '')
  const jobName = fileName.replace(/[SF]_|\.json/g, '')
  return jobName
}

const status = computed(() => {
  return props.selectedFile.includes('S') ? 'Success' : 'Failed'
})

const manufacturingTime = computed(() => {
  if (fileProperties.value) {
    const startTime = fileProperties.value.data.start_time
    const endTime = fileProperties.value.data.end_time
    const duration_in_sec = endTime - startTime

    const hours = Math.floor(duration_in_sec / (60 * 60))
    const minutes = Math.floor((duration_in_sec % (60 * 60)) / 60)
    const seconds = Math.floor((duration_in_sec % 60))
    return `
    ${hours.toString().padStart(2, '0')}h : \
    ${minutes.toString().padStart(2, '0')}m : \
    ${seconds.toString().padStart(2, '0')}s
    `
  }
  return ''
})

const workfileplan = computed(() => {
  if (fileProperties.value) {
    const workfileplanData = fileProperties.value.data?.workfileplan.data
    if (workfileplanData) {
      const { job_id, modified_date, type, total_length_m, total_weight_kg, rebar_diameter, pallet } = workfileplanData
      return {
        job_id,
        modified_date: new Date(modified_date).toLocaleString(),
        type,
        total_length_m,
        total_weight_kg,
        rebar_diameter,
        pallet,
      }
    }
  }
  return null
})

const importantProperties = computed(() => {
  return [
    { label: 'Status', value: status.value },
    { label: 'Type', value: fileProperties.value?.type || '' },
    { label: 'Version', value: fileProperties.value?.version || '' },
    { label: 'Manufacturing Time', value: manufacturingTime.value },
  ]
})

const workfileplanProperties = computed(() => {
  if (workfileplan.value) {
    return [
      { label: 'Job ID', value: workfileplan.value.job_id },
      { label: 'Type', value: workfileplan.value.type },
      { label: 'Modified Date', value: workfileplan.value.modified_date },
      { label: 'Total Length (m)', value: workfileplan.value.total_length_m },
      { label: 'Total Weight (kg)', value: workfileplan.value.total_weight_kg },
      { label: 'Rebar Diameter', value: workfileplan.value.rebar_diameter },
      { label: 'Pallet', value: workfileplan.value.pallet },
    ]
  }
  return []
})
</script>

<template>
  <div class="p-4">
    <div v-if="error" class="mb-4">
      <p class="text-red-500">
        Error: {{ error.message }}
      </p>
    </div>
    <div>
      <h2 class="mb-4 text-2xl font-bold">
        {{ selectedFile ? displayFileName(selectedFile) : 'No file selected' }}
      </h2>

      <div class="mb-8">
        <table class="w-full table-auto border border-gray-100">
          <thead class="bg-gray-100">
            <tr>
              <th v-for="(property, index) in importantProperties" :key="index" class="px-4 py-2 text-center font-bold">
                {{ property.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(property, index) in importantProperties" :key="index" class="px-4 py-2 text-center">
                {{ property.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 class="mb-4 text-xl font-bold">
          Workfileplan
        </h3>
        <table class="w-full table-auto border border-3 border-gray-300">
          <tbody>
            <tr
              v-for="(property, index) in workfileplanProperties" :key="index"
              class="border-b border-gray-200"
            >
              <td class="border-r border-gray-300 py-4 pr-4 font-bold">
                {{ property.label }}
              </td>
              <td class="px-4 py-4">
                {{ property.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
