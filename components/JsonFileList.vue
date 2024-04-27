<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['childEvent', 'file-selected'])
const logFiles = ref<string[]>([])
const selectedDate = ref<string>('')
const selectedFile = ref<string>('')
const pending = ref<boolean>(false)

// when reloading the page
async function fetchFiles() {
  pending.value = true
  const data = await $fetch('/api/fetchAllFilenames')
  logFiles.value = data
  pending.value = false
}

onMounted(fetchFiles)

// filtering files based on date
const uniqueDates = computed(() => {
  const dates = logFiles.value.map(file => file.split('/')[0])
  return [...new Set(dates)]
})

const filteredFiles = computed(() => {
  if (selectedDate.value)
    return logFiles.value.filter(file => file.startsWith(selectedDate.value))

  return logFiles.value
})

function displayFileName(file: string) {
  const parts = file.split('/')
  const fileName = parts.pop() || ''
  const jobName = fileName.replace(/[SF]|_\d{2}h\d{2}_|\.json/g, '')
  return jobName
}

function selectFile(file: string) {
  selectedFile.value = file
  emit('file-selected', file)
}
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-2xl font-bold">
      LOG Files
    </h2>
    <div class="mb-4 flex items-center">
      <label for="date-select" class="mb-2 mr-4 block">Select Date:</label>
      <select id="date-select" v-model="selectedDate" class="mr-4 border border-gray-300 rounded p-2">
        <option value="">
          All Dates
        </option>
        <option v-for="date in uniqueDates" :key="date" :value="date">
          {{ date }}
        </option>
      </select>
      <button class="rounded bg-blue-500 p-2 text-white hover:bg-blue-600" @click="fetchFiles">
        Refresh
      </button>
    </div>
    <ul v-if="!pending" class="space-y-2">
      <li v-for="file in filteredFiles" :key="file">
        <a href="#" class="text-blue-500 hover:underline" @click="selectFile(file)">{{ displayFileName(file) }}</a>
      </li>
    </ul>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
