<template>
  <Start></Start>

  <div class="box">
    <van-tabs v-model:active="activeName">
      <van-tab title="login" name="login">
        <div class="login">
          <van-form @submit="login" class="formData" ref="loginForms">
            <van-cell-group inset>
              <van-field
                v-model="user.username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="rules.username"
              />
              <van-field
                v-model="user.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="rules.password"
              />
              <van-field
                v-model="user.password"
                type="password"
                name="验证码"
                label="验证码"
                placeholder="验证码"
                :rules="rules.nextpassword"
              />
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </div>
      </van-tab>
      <van-tab title="register" name="register">
        <div class="register">
          <van-form class="formData">
            <van-cell-group inset>
              <van-field
                v-model="user.username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="user.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
              <van-field
                v-model="user.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import Start from '@/components/Start/index.vue'
import { showSuccessToast, showFailToast } from 'vant'
import { loginForm } from '@/api/user/types'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
const router = useRouter()

const activeName = ref(1)
// 收集用户名密码信息
const user: loginForm = reactive({
  username: 'admin12',
  password: 'Ll123123'
})
// 自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  console.log(rule)
  console.log(value)
  if (value.length >= 5) {
    // callback()
  } else {
    // callback(new Error('12321312312'))
  }
}
const rules: any = ref({
  username: [
    {
      required: true,
      message: '账号只可包含字母、数字、下划线和减号 长度在3到16之间',
      trigger: 'change'
    },
    { pattern: /^[a-zA-Z0-9_-]{3,16}$/, trigger: 'change' }
  ],
  password: [
    {
      required: true,
      message: '密码必须包含一个大写字母、小写字母、数字 6-15位',
      trigger: 'change'
    },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/, trigger: 'change' }
  ],
  nextpassword: [{ validator: validatorUserName, trigger: 'change' }]
})
// 获取登录表单
const loginForms = ref()

// 登录
const login = async () => {
  // 全部表单向通过在发请求
  await loginForms.value.validate()

  await userStore.userLogin(user)
  showSuccessToast('登陆成功')
  router.push('/')
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  // display: flex;
  // justify-content: space-between;
  // overflow: hidden;
  // display: flex;

  .login,
  .register {
    z-index: 9999;
    position: relative;

    .formData {
      padding-top: 60%;

      .van-cell-group {
        background-color: transparent !important;

        .van-cell {
          background-color: transparent !important;
        }

        :deep(.van-field__label) {
          color: #fff !important;
        }

        :deep(.van-field__control) {
          color: #fff;
        }
      }
    }
  }
}

// .container {
//   position: relative;
//   top: 180px;
//   z-index: 999;
//   padding: 49px 29px;
//   color:#fff;
//   .title {
//     margin-bottom: 20px;
//     h3 {
//       font-size: 26px;
//       font-weight: normal;
//     }
//     p {
//       line-height: 40px;
//       font-size: 14px;
//       color: #e0dede;
//     }
//   }

//   .form-item {
//     border-bottom: 1px solid #f3f1f2;
//     padding: 8px;
//     margin-bottom: 14px;
//     display: flex;
//     align-items: center;
//     .inp {
//       display: block;
//       border: none;
//       outline: none;
//       height: 32px;
//       font-size: 14px;
//       flex: 1;
//       background: none;
//     }
//     img {
//       width: 94px;
//       height: 31px;
//     }
//     button {
//       height: 31px;
//       border: none;
//       font-size: 13px;
//       color: #cea26a;
//       background-color: transparent;
//       padding-right: 9px;
//     }
//   }

//   .login-btn {
//     width: 100%;
//     height: 42px;
//     margin-top: 39px;
//     background: linear-gradient(90deg, #ecb53c, #ff9211);
//     color: #fff;
//     border-radius: 39px;
//     box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
//     letter-spacing: 2px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// }
</style>

<!-- 头部 - vant通用组件NavBar  要是自己写就用到插槽  -->
<!-- <van-nav-bar title="会员登录" left-arrow right-text="" /> -->
<!-- 内容区 -->
<!-- <div class="container">
      <div class="title">
        <h3>用户登录</h3> -->
<!-- <p>未注册的手机号登录后将自动注册</p> -->
<!-- </div>

      <div class="form">
        <div class="form-item">
          <input
            v-model="user.username"
            class="inp"
            maxlength="11"
            placeholder="请输入用户名"
            type="text"
          />
        </div>

        <div class="form-item">
          <input v-model="user.password" class="inp" placeholder="请输入密码" type="text" />
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div> -->
