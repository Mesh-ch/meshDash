<script setup lang="ts">
import JsonFileList from '~/components/JsonFileList.vue'
import JsonFileProperties from '~/components/JsonFileProperties.vue'

// Testing Client-Server reaction
console.log('CLIENT LOG')
async function requestFromAPI() {
  console.log('EXECUTE API REQUEST')
  const apiResult = await useFetch('/api/test')
  console.log(apiResult?.data?.value)
}

const selectedFile = ref('')
function handleFileSelected(file: string) {
  selectedFile.value = file
}
</script>

<template>
  <div>
    <button @click="requestFromAPI">
      EXECUTE API REQUEST
    </button>

    <Sidebar />
    <TestJasonLst />

    <JsonFileList @file-selected="handleFileSelected" />
    <JsonFileProperties :selected-file="selectedFile" />
  </div>
</template>
