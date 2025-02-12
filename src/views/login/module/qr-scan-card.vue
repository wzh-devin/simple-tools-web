<script setup lang="ts">
import useLoginStore from '@/stores/login/login.ts'

const loginStore = useLoginStore()

const handleClick = () => {
  loginStore.getQrCodeAction()
}
</script>

<template>
  <el-form class="login-form" @click="handleClick">
    <div class="wechat-login">
      <div class="qr-code">
        <img :src="loginStore.qrCode" alt="微信二维码" />
      </div>
      <p class="scan-tip">请使用微信扫码登录</p>
    </div>
  </el-form>
</template>

<style scoped lang="less">
.login-form {
  margin-top: 20px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
</style>
