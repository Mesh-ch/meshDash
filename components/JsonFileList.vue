<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['childEvent', 'file-selected'])
const logFiles = ref<string[]>([])

const { data: fileLst, pending } = await useLazyFetch('/api/fetchAllFilenames', {
  server: false,
})
watch(fileLst, (newLst) => {
  console.log('New List Updated...')
})

onMounted(async () => {
  const _ = await $fetch('/api/fetchAllFilenames')
  logFiles.value = fileLst.value

  const eventSource = useEventSource('/api/fetchAllFilenames')
  eventSource.onmessage = (event) => {
    logFiles.value = JSON.parse(event.data)
  }
})

const selectedFile = ref<string>('')
function selectFile(file: string) {
  selectedFile.value = file
  emit('file-selected', file)
//   console.log('selected file: ', file)
}
</script>

<template>
  <div>
    <div class="h1">
      LOG Files
    </div>
    <table v-if="!pending">
      <tr v-for="file in logFiles" :key="file">
        <td><a href="#" @click="selectFile(file)">{{ file }}</a></td>
      </tr>
    </table>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
