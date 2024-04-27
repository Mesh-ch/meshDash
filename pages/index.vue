<script setup lang="ts">
import JsonFileList from '~/components/JsonFileList.vue'
import JsonFileProperties from '~/components/JsonFileProperties.vue'

const selectedFile = ref('')
function handleFileSelected(file: string) {
  selectedFile.value = file
}
</script>

<template>
  <div class="mx-auto p-4 container">
    <h1 class="mb-8 text-4xl font-bold">
      JSON File Viewer
    </h1>
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
