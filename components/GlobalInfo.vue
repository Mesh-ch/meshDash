<!-- components/GlobalInfo.vue -->
<script setup lang="ts">
const props = defineProps<{ logFiles: string[] }>()

const totalJobs = computed(() => props.logFiles.length)
const successJobs = computed(() => props.logFiles.filter(file => file.includes('S')).length)
const failedJobs = computed(() => props.logFiles.filter(file => file.includes('F')).length)
const successRate = computed(() => (successJobs.value / totalJobs.value) * 100)
const avgJobsPerDay = computed(() => {
  const folders = [...new Set(props.logFiles.map(file => file.split('/')[0]))]
  return totalJobs.value / folders.length
})
</script>

<template>
  <div class="grid grid-cols-3 mb-8 gap-4">
    <div class="rounded-lg bg-gray-100 p-4">
      <h2 class="mb-2 text-xl font-bold">
        Job Number: {{ totalJobs }}
      </h2>
      <p class="text-sm">
        {{ successJobs }} success / {{ failedJobs }} failed
      </p>
    </div>
    <div class="rounded-lg bg-gray-100 p-4">
      <h2 class="mb-2 text-xl font-bold">
        Average Success Rate
      </h2>
      <p class="text-xl font-bold">
        {{ successRate.toFixed(2) }}%
      </p>
    </div>
    <div class="rounded-lg bg-gray-100 p-4">
      <h2 class="mb-2 text-xl font-bold">
        Average Jobs per Day
      </h2>
      <p class="text-xl font-bold">
        {{ avgJobsPerDay.toFixed(2) }}
      </p>
    </div>
  </div>
</template>
