<script setup>
import { userLoginService, userRegisterService } from '@/api/user'
import { useUserStore } from '@/stores'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

// false：登录
// true：注册
const isRegister = ref(false)

// 表单实例
const form = ref()

// Pinia 用户仓库
const userStore = useUserStore()

// 路由
const router = useRouter()

// 表单数据
const formModel = ref({
  username: '',
  password: '',
  repassword: '',
})

// 表单校验规则
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    {
      min: 5,
      max: 10,
      message: '用户名必须是5-10位的字符',
      trigger: 'blur',
    },
  ],

  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
  ],

  repassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur',
    },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// 注册
const register = async () => {
  await form.value.validate()

  await userRegisterService(formModel.value)

  ElMessage.success('注册成功')

  // 注册成功后切换到登录
  isRegister.value = false
}

// 登录
const login = async () => {
  await form.value.validate()

  const res = await userLoginService(formModel.value)

  // 保存 token
  userStore.setToken(res.data.token)

  ElMessage.success('登录成功')

  // 跳转首页
  router.push('/')
}

// 登录 / 注册切换时清空表单
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: '',
  }
})
</script>

<template>
  <el-row class="login-page">
    <!-- 左侧背景 -->
    <el-col :span="12" class="bg"></el-col>

    <!-- 右侧表单 -->
    <el-col :span="6" :offset="3" class="form">
      <!-- ================= 注册 ================= -->

      <el-form
        v-if="isRegister"
        ref="form"
        :model="formModel"
        :rules="rules"
        size="large"
        autocomplete="off"
      >
        <h1 class="title">注册</h1>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>

        <!-- 返回登录 -->
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回登录 </el-link>
        </el-form-item>
      </el-form>

      <!-- ================= 登录 ================= -->

      <el-form v-else ref="form" :model="formModel" :rules="rules" size="large" autocomplete="off">
        <h1 class="title">登录</h1>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <!-- 记住我 -->
        <el-form-item>
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>

            <el-link type="primary" :underline="false"> 忘记密码？ </el-link>
          </div>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">
            登录
          </el-button>
        </el-form-item>

        <!-- 去注册 -->
        <el-form-item>
          <div class="flex register-link">
            <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;

    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto 30px;
      text-align: center;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .register-link {
      justify-content: flex-end;
    }
  }
}
</style>
