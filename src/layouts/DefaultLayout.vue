<template>
  <div class="default-layout">
    <div class="content-wrapper">
      <router-view />
    </div>
    <LogoutButton v-if="showLogoutButton" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LogoutButton from '@/components/LogoutButton.vue'

const route = useRoute()

// 控制登出按钮的显示，在登录页面不显示
const showLogoutButton = computed(() => {
  return route.name !== 'login'
})
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  height: 100vh; /* 固定高度 */
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 隐藏滚动条 */
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* 隐藏滚动条 */
}

/* 隐藏所有滚动条 */
::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style> 