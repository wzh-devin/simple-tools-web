<script setup lang="ts">
/**
 * 2025/1/18 22:04
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 主页面
 * @version 1.0
 * @since 1.0
 */
import { defineComponent } from 'vue'
import { MainCard } from '@/views/main/module'

defineComponent({
  name: 'Main'
})
</script>

<template>
  <div class="main-container">
    <main-card />
  </div>
</template>

<style lang="less" scoped>
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #e0eaff;
  width: 100%;
  box-sizing: border-box;
}
</style>
