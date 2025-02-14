<script setup lang="ts">
/**
 * 2025/2/10 20:43
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 登录页面组件
 * @version 1.0
 * @since 1.0
 */
import LoginCard from './module/login-card.vue'
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <div class="title-area">
          <h2>SimpleTools</h2>
          <div class="badge">Beta</div>
        </div>
      </div>
      <login-card />
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #e0eaff;
  width: 100%;
  box-sizing: border-box;

  .login-box {
    width: 100%;
    max-width: 500px;
    margin: 0;

    .login-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 24px;
      padding: 0 12px;

      .title-area {
        display: flex;
        align-items: center;
        gap: 12px;

        h2 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        .badge {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        }
      }

      .subtitle-area {
        display: flex;
        align-items: center;
        gap: 12px;

        .subtitle {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        :deep(.el-tag) {
          border-color: #e2e8f0;
          background-color: rgba(241, 245, 249, 0.6);
          color: #64748b;
          font-weight: 500;
          padding: 0 8px;
          height: 22px;
          line-height: 20px;
          border-radius: 4px;
        }
      }
    }

    .content-card {
      background: linear-gradient(135deg, #ffffff, #f8fafc);
      backdrop-filter: blur(8px);
      border: 1px solid #e5e7eb;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 0 0 1px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      overflow: hidden;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05),
          0 0 0 1px rgba(0, 0, 0, 0.05);
      }

      :deep(.el-card__body) {
        padding: 20px;
      }

      .login-tabs {
        :deep(.el-tabs__nav-wrap::after) {
          height: 1px;
          background-color: #e2e8f0;
        }

        :deep(.el-tabs__item) {
          font-size: 14px;
          color: #64748b;
          height: 40px;
          line-height: 40px;

          &.is-active {
            color: #1d4ed8;
          }
        }
      }

      .login-form {
        margin-top: 20px;
        min-height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        :deep(.el-input__wrapper) {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          box-shadow: none;
          padding: 8px 12px;

          &:hover,
          &.is-focus {
            border-color: #1d4ed8;
            box-shadow: 0 0 0 1px #1d4ed8;
          }
        }

        .login-button {
          width: 100%;
          height: 40px;
          font-size: 14px;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          border: none;
          border-radius: 4px;
          margin-top: 10px;

          &:hover {
            background: linear-gradient(135deg, #1e40af, #1d4ed8);
          }
        }
      }

      .wechat-login {
        padding: 0;
        text-align: center;

        .qr-code {
          width: 160px;
          height: 160px;
          margin: 0 auto 12px;
          background-color: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .scan-tip {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }
      }
    }
  }
}
</style>
