<template>
  <div>
    <div class="text-center m-5" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <div v-else>
      <Header/>
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/navigation/Header.vue'
import { firdLoad } from '@/composable/auth'
const {loading} = firdLoad()

</script>

<style scoped>

</style>
