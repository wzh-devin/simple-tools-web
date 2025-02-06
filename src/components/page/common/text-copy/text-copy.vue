<script setup lang="ts">
/**
 * 2025/2/6 15:14
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 文本复制组件
 * @version 1.0
 * @since 1.0
 */
import { CopyDocument } from '@element-plus/icons-vue'
import { defineProps, onMounted, defineEmits } from 'vue'

interface ITextCopy {
  text: string
}

const emit = defineEmits(['readText'])

const props = defineProps<ITextCopy>()

const navigatorRef = navigator.clipboard

onMounted(() => {
  navigatorRef.writeText(props.text)
})

const readVal = () => {
  emit('readText', navigatorRef.readText())
}
</script>

<template>
  <el-button type="primary" link>
    <el-icon>
      <CopyDocument />
    </el-icon>
  </el-button>
</template>

<style scoped lang="less"></style>
