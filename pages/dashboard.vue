<script setup lang="ts">
const online = useOnline()

</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Dashboard
    </h3>

    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>

      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>

    <ParseLog />
    
  </div>
</template>
