<script setup lang="ts">
import { ContainerArea, MenuArea } from '@/views/taobao/home/module'
</script>

<template>
  <div class="taobao-container">
    <!-- 顶部菜单区域 -->
    <menu-area />
    <!-- 内容区域 -->
    <container-area />
  </div>
</template>

<style lang="less" scoped>
.taobao-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f0f7ff;
}
</style>
