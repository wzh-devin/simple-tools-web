<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import useLoginStore from '@/stores/login/login.ts'

const router = useRouter()

const loginStore = useLoginStore()

// 账号登录表单
const loginForm = reactive({
  username: 'devin',
  password: '123456'
})

// 表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 处理账号登录
const handleAccountLogin = async () => {
  try {
    await loginStore.accountLoginAction(loginForm)
    ElMessage.success('登录成功')
    await router.push('/main')
  } catch (error) {
    ElMessage.error(`登录失败：${error}`)
  }
}
</script>

<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="rules"
    class="login-form"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入用户名"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        :prefix-icon="Lock"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="login-button"
        @click="handleAccountLogin()"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">
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
</style>
