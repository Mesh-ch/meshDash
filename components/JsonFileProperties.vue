<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ selectedFile: string }>()

const dayjs = useDayjs()

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
        {{ displayFileName(selectedFile) }}
      </h2>
      <div class="mb-8 flex space-x-8">
        <div>
          <h3 class="mb-2 text-lg font-bold">
            Status
          </h3>
          <p>{{ status }}</p>
        </div>
        <div>
          <h3 class="mb-2 text-lg font-bold">
            Type
          </h3>
          <p>{{ fileProperties.type }}</p>
        </div>
        <div>
          <h3 class="mb-2 text-lg font-bold">
            Version
          </h3>
          <p>{{ fileProperties.version }}</p>
        </div>
        <div>
          <h3 class="mb-2 text-lg font-bold">
            Manufacturing Time
          </h3>
          <p>{{ manufacturingTime }}</p>
        </div>
      </div>
      <div v-if="workfileplan">
        <h3 class="mb-4 text-xl font-bold">
          Workfileplan
        </h3>
        <table class="w-full table-auto">
          <tbody>
            <tr>
              <td class="pr-4 font-bold">
                Job ID
              </td>
              <td>{{ workfileplan.job_id }}</td>
            </tr>
            <tr>
              <td class="pr-4 font-bold">
                Modified Date
              </td>
              <td>{{ workfileplan.modified_date }}</td>
            </tr>
            <tr>
              <td class="pr-4 font-bold">
                Type
              </td>
              <td>{{ workfileplan.type }}</td>
            </tr>
            <tr>
              <td class="pr-4 font-bold">
                Total Length (m)
              </td>
              <td>{{ workfileplan.total_length_m }}</td>
            </tr>
            <tr>
              <td class="pr-4 font-bold">
                Total Weight (kg)
              </td>
              <td>{{ workfileplan.total_weight_kg }}</td>
            </tr>
            <tr>
              <td class="pr-4 font-bold">
                Rebar Diameter
              </td>
              <td>{{ workfileplan.rebar_diameter }}</td>
            </tr>
            <tr>
              <td class="pr-4 font-bold">
                Pallet
              </td>
              <td>{{ workfileplan.pallet }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
