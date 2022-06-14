<template>
  <n-layout style="height: 100%">
    <n-layout-header style="height: 44px; padding: 12px" bordered>
      Competition Go V1 个人中心
    </n-layout-header>
    <n-layout position="absolute" style="top: 44px;" has-sider>
      <n-layout-sider
        content-style="padding: 0px;"
        :native-scrollbar="false"
        collapse-mode="transform"
        :collapsed-width="0"
        :width="200"
        show-trigger="bar"
        bordered
      >
        <SideBar />
      </n-layout-sider>
      <n-layout content-style="padding: 0px;" :native-scrollbar="false">
        <TabView />
      </n-layout>
    </n-layout>
    <n-notification-provider placement="top">
      <Noteapi />
    </n-notification-provider>
  </n-layout>
</template>

<script>
// Vue 初始化
import { defineComponent } from "vue";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
// 按需引入组件
import {
  NNotificationProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
} from "naive-ui";
// 引入axios
import axios from "axios";
axios.defaults.baseURL = "http://124.222.64.247:8083";
// 引入自定义组件
import Noteapi from "@/components/Note-api.vue"; // 通知组件
import SideBar from "./components/SideBar.vue"; // 侧边栏组件
import TabView from "./components/TabView.vue"; // 选项卡

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
    };
  },
  created() {
    axios.get().then((response) => {
      console.log(response.data);
    });
  },
  components: {
    Noteapi,
    NNotificationProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    SideBar,
    TabView,
  },
  methods: {},
});
</script>