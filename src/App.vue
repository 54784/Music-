<script setup lang="ts">
import { useUserStore } from '@/store'
import FooterMusic from './components/FooterMusic/index.vue'
const userStore = useUserStore()
</script>

<template>
  <div id="app">
    <!-- <Suspense>

    </Suspense> -->
    <FooterMusic v-if="userStore.isShowFooter"></FooterMusic>

    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
