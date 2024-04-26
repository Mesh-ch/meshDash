<script setup lang="ts">
import JsonFileList from '~/components/JsonFileList.vue'
import JsonFileProperties from '~/components/JsonFileProperties.vue'

const selectedFile = ref('')
function handleFileSelected(file: string) {
  selectedFile.value = file
}
</script>

<template>
  <div>
    <!-- <Sidebar /> -->

    <JsonFileList @file-selected="handleFileSelected" />
    <JsonFileProperties :selected-file="selectedFile" />
  </div>
</template>
