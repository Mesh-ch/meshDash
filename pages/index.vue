<script setup lang="ts">
import JsonFileList from '~/components/JsonFileList.vue'
import JsonFileProperties from '~/components/JsonFileProperties.vue'
import GlobalInfo from '~/components/GlobalInfo.vue'

const selectedFile = ref('')
const logFiles = ref<string[]>([])

function handleFileSelected(file: string) {
  selectedFile.value = file
}

async function fetchFiles() {
  const data = await $fetch('/api/fetchAllFilenames')
  logFiles.value = data
}

onMounted(fetchFiles)
</script>

<template>
  <div class="mx-auto p-4 container">
    <h1 class="mb-8 text-4xl font-bold">
      Rebotic Monitoring Dashboard
    </h1>
    <GlobalInfo :log-files="logFiles" class="mb-8" />

    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-1">
        <JsonFileList @file-selected="handleFileSelected" />
      </div>
      <div class="col-span-2">
        <JsonFileProperties :selected-file="selectedFile" />
      </div>
    </div>
  </div>
</template>
