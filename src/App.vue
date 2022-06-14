<template>
  <n-card
    style="
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    "
    class="box"
  >
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" tab="登录">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input
              v-model:value="signin_id"
              type="text"
              placeholder="请输入登录账号..."
            />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input
              v-model:value="signin_pd"
              type="password"
              placeholder="请输入登录密码..."
            />
          </n-form-item-row>
        </n-form>
        <n-button @click="login" type="primary" block secondary strong>
          登录
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <n-form>
          <n-form-item-row label="注册昵称">
            <n-input
              v-model:value="signup_name"
              type="text"
              placeholder="请输入用户昵称..."
            />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input
              v-model:value="signup_pd"
              type="password"
              placeholder="请输入登录密码..."
            />
          </n-form-item-row>
          <n-form-item-row label="重复密码">
            <n-input
              v-model:value="signup_repd"
              type="password"
              placeholder="请再次输入登录密码..."
            />
          </n-form-item-row>
          <n-form-item-row label="邮箱地址">
            <n-input
              v-model:value="signup_mail"
              type="email"
              placeholder="请输入注册的邮箱..."
            />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" @click="register" block secondary strong> 注册 </n-button>
      </n-tab-pane>
    </n-tabs>
    <n-notification-provider placement="top">
      <Noteapi />
    </n-notification-provider>
  </n-card>
</template>
<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>

<script>
// Vue 初始化
import { defineComponent, ref } from "vue";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
// 按需引入组件
import {
  NTabs,
  NCard,
  NButton,
  NInput,
  NTabPane,
  NForm,
  NFormItemRow,
  NNotificationProvider,
} from "naive-ui";
// 引入axios
import axios from "axios";
axios.defaults.baseURL = "url";
// 引入自定义组件
import Noteapi from "@/components/Note-api.vue"; //通知组件

export default defineComponent({
  setup() {
    const nullmatch = /^[ ]*$/;
    const nummatch = /^[0-9]*$/;
    const mailmatch =
      /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
    return {
      notify(type, title, description) {
        window.$notification[type]({
          meta: description,
          content: title,
          duration: 3000,
        });
      },
      isMail(str) {
        if (mailmatch.test(str)) {
          return true;
        }
        return false;
      },
      isNull(str) {
        if (nullmatch.test(str)) {
          return true;
        }
        return false;
      },
      isNum(str) {
        if (nummatch.test(str)) {
          return true;
        }
        return false;
      },
      signin_id: ref(""),
      signin_pd: ref(""),
      signup_name: ref(""),
      signup_pd: ref(""),
      signup_mail: ref(""),
      signup_repd: ref(""),
    };
  },
  created() {
    axios.get().then((response) => {
      console.log(response.data);
    });
  },
  components: {
    NTabs,
    NCard,
    NButton,
    NInput,
    NTabPane,
    NForm,
    NFormItemRow,
    Noteapi,
    NNotificationProvider,
  },
  methods: {
    login() {
      if (this.isNull(this.signin_id) || this.isNull(this.signin_pd)) {
        this.notify("warning", "警告", "内容不允许为空！");
        return;
      }
      if (this.signin_pd.length < 8) {
        this.notify("warning", "警告", "密码长度小于8位，请仔细核对后登录。");
        return;
      }
      if (!this.isNum(this.signin_id)) {
        this.notify(
          "warning",
          "警告",
          "目前登录仅支持账号登录，邮箱等方式暂未支持。"
        );
        return;
      }
    },
    register() {
      if (
        this.isNull(this.signup_name) ||
        this.isNull(this.signup_pd) ||
        this.isNull(this.signup_repd) ||
        this.isNull(this.signup_mail)
      ) {
        this.notify("warning", "警告", "内容不允许为空！");
        return;
      }
      if (this.signup_pd.length > 20) {
        this.notify("warning", "警告", "昵称过长，请再想一想吧。");
        return;
      }
      if (this.signup_pd.length < 8 || this.signup_repd.length < 8) {
        this.notify("warning", "警告", "密码长度小于8位，请仔细核对后登录。");
        return;
      }
      if (this.signup_repd != this.signup_pd) {
        this.notify("warning", "警告", "两次密码不一致，请重新核对再输入。");
        return;
      }
      if (!this.isMail(this.signup_mail)) {
        this.notify("warning", "警告", "请输入合法的邮箱。");
        return;
      }
    },
  },
});
</script>