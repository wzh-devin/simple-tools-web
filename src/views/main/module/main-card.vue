<script setup lang="ts">
/**
 * 2025/1/18 23:04
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 卡片组件
 * @version 1.0
 * @since 1.0
 */
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 跳转链接
 */
const jumpLinkHandler = () => {
  router.push('/taobao')
}
</script>

<template>
  <el-card class="content-card">
    <template #header>
      <div class="content-header">
        <h2>工具箱</h2>
        <span class="subtitle">常用工具集合</span>
      </div>
    </template>

    <div class="tools-container">
      <!-- 淘宝千牛工具卡片 -->
      <!-- TODO 后续做动态添加管理 -->
      <el-card class="tool-card" shadow="hover" @click="jumpLinkHandler">
        <template #header>
          <div class="card-header">
            <i class="el-icon-shopping-cart-2"></i>
            <span>淘宝千牛</span>
          </div>
        </template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          alt="淘宝千牛"
        />
      </el-card>

      <!-- 添加工具按钮卡片 -->
      <el-card class="tool-card add-tool-card" shadow="hover">
        <div class="add-tool-content">
          <el-icon class="add-icon">
            <Plus />
          </el-icon>
          <span class="add-text">添加工具</span>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<style scoped lang="less">
.content-card {
  width: 100%;
  max-width: 1200px;
  margin: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  backdrop-filter: blur(8px);
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  .content-header {
    display: flex;
    align-items: baseline;
    gap: 12px;

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #1d4ed8;
    }

    .subtitle {
      font-size: 14px;
      color: #64748b;
    }
  }
}

.tools-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 160px));
  gap: 20px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
}

.tool-card {
  transition: all 0.3s ease;
  cursor: pointer;
  height: 160px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(165deg, #ffffff, #f1f5f9);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #93c5fd;
  }

  :deep(.el-card__header) {
    padding: 8px 12px;
    border-bottom: 1px solid #ebeef5;
    flex-shrink: 0;
  }

  :deep(.el-card__body) {
    padding: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    overflow: hidden;
  }

  .card-header {
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 24px;
    width: 100%;

    i {
      font-size: 16px;
      color: #1d4ed8;
    }

    span {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.add-tool-card {
  height: 160px;
  border: 2px dashed #cbd5e1;
  background: #f8fafc;

  .add-tool-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .add-icon {
      font-size: 24px;
      color: #64748b;
    }

    .add-text {
      font-size: 12px;
      color: #64748b;
    }
  }

  &:hover {
    border-color: #1d4ed8;
    background: #f1f5f9;

    .add-icon,
    .add-text {
      color: #1d4ed8;
    }
  }
}
</style>
