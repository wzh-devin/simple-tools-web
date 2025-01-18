<script setup lang="ts">
/**
 * 2025/1/19 0:25
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
</script>

<template>
  <div class="content-area">
    <el-card class="content-card">
      <template #header>
        <div class="content-header">
          <h2>淘宝工作台</h2>
          <el-tag size="small" type="info" effect="plain">商家经营助手</el-tag>
        </div>
      </template>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.content-area {
  flex: 1;
  padding: 20px 40px;
  overflow-y: auto;
  background-color: #f0f7ff;
  display: flex;
  justify-content: center;

  .content-card {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(229, 231, 235, 0.5);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

    :deep(.el-card__header) {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.9),
        rgba(248, 250, 252, 0.9)
      );
      border-bottom: 1px solid rgba(229, 231, 235, 0.5);
      padding: 15px 20px;
    }

    :deep(.el-card__body) {
      padding: 20px;
    }

    .content-header {
      display: flex;
      align-items: center;
      gap: 12px;

      h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
