<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['childEvent', 'file-selected'])
const logFiles = ref<string[]>([])
const selectedDate = ref<string>('')
const selectedFile = ref<string>('')

// lazy-fetching data and watch
const { data: fileLst, pending } = await useLazyFetch('/api/fetchAllFilenames', {
  server: false,
})
watch(fileLst, (newLst) => {
  console.log('New List Updated...')
})

onMounted(async () => {
  const _ = await $fetch('/api/fetchAllFilenames')
  logFiles.value = fileLst.value
})

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
  return file.split('/').pop() || ''
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
    <div class="mb-4">
      <label for="date-select" class="mb-2 block">Select Date:</label>
      <select id="date-select" v-model="selectedDate" class="border border-gray-300 rounded p-2">
        <option value="">
          All Dates
        </option>
        <option v-for="date in uniqueDates" :key="date" :value="date">
          {{ date }}
        </option>
      </select>
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
