<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script>
import { defineComponent, h, getCurrentInstance, onMounted } from "vue";
import { NIcon, NMenu } from "naive-ui";

import {
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: "首页",
    key: "index",
    icon: renderIcon(HomeIcon),
  },
  {
    key: "divider-1",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px",
      },
    },
  },
  {
    label: "1973年的弹珠玩具",
    key: "./admin",
    icon: renderIcon(BookIcon),
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    icon: renderIcon(BookIcon),
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
  },
];

export default defineComponent({
  components: {
    NMenu,
  },
  setup() {
    const { eventHub } = getCurrentInstance().proxy;

    onMounted(() => {});
    return {
      menuOptions,
      handleUpdateValue(key, item) {
        eventHub.$emit("add-tabs", [item.label, key]);
      },
    };
  },
});
</script>