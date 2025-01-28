<script setup lang="ts">
/**
 * 2025/1/19 0:22
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 顶部菜单组件
 * @version 1.0
 * @since 1.0
 */
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Document, Goods } from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('category')

const menus = [
  { key: 'category', name: '类目管理', icon: Document },
  { key: 'commodity', name: '商品管理', icon: Goods }
]

const handleMenuClick = (key: string) => {
  activeMenu.value = key
  router.push(`/taobao/${key}`)
}
</script>

<template>
  <div class="menu-area">
    <el-card class="menu-card" :body-style="{ padding: '10px' }">
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        @select="handleMenuClick"
        class="menu-container"
      >
        <el-menu-item v-for="menu in menus" :key="menu.key" :index="menu.key">
          <el-icon>
            <component :is="menu.icon" />
          </el-icon>
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.menu-area {
  padding: 6px;
  min-height: 60px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8),
    rgba(248, 250, 252, 0.8)
  );
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .menu-card {
    max-width: 700px;
    width: 100%;
    margin: 0;
    background: rgba(255, 255, 255, 0.6);
    border: none;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    :deep(.el-card__body) {
      padding: 2px 12px;
    }
  }

  .menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    width: 100%;
    min-height: 32px;

    :deep(.el-menu) {
      justify-content: center;
      align-items: center;
      width: 100%;
      border: none;
      height: 100%;
    }

    .el-menu-item {
      height: 32px;
      line-height: 32px;
      margin: 0 4px;
      border-radius: 16px;
      padding: 0 18px;
      font-size: 14px;

      &:hover,
      &.is-active {
        background-color: rgba(255, 255, 255, 0.9);
        color: var(--el-color-primary);
      }

      .el-icon {
        margin-right: 6px;
        font-size: 16px;
      }

      span {
        line-height: 32px;
      }
    }
  }
}
</style>
