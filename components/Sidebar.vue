<script setup lang="ts">
import { ref } from 'vue'

const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <!-- <div -->
    <!--   class="fixed  z-20 transition-opacity bg-white opacity-50" -->
    <!-- /> -->
    <!-- End Backdrop -->

    <div
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-800"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">

          <span class="mx-2 text-2xl font-semibold text-white">MeshDash</span>
        </div>
      </div>

      <nav class="mt-10">
        <router-link
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]"
          to="/dashboard"
        >
          <div class="i-file-icons:pnpm w5 h5"></div>
          <span class="mx-4">Dashboard</span>
        </router-link>

        <router-link
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'UIElements' ? activeClass : inactiveClass]"
          to="/ui-elements"
        >
          <div class="i-file-icons:pnpm w5 h5"></div>
          <span class="mx-4">TBD</span>
        </router-link>
        <!---->
        <!-- <router-link -->
        <!--   class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4" -->
        <!--   :class="[$route.name === 'Tables' ? activeClass : inactiveClass]" -->
        <!--   to="/tables" -->
        <!-- > -->
        <!---->
        <!--   <div class="i-file-icons:pnpm w5 h5"></div> -->
        <!--   <span class="mx-4">Tables</span> -->
        <!-- </router-link> -->


      </nav>
    </div>
  </div>
</template>
