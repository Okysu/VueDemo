<template>
  <n-tabs
    v-model:value="name"
    type="card"
    :closable="closable"
    tab-style="min-width: 80px;"
    @close="handleClose"
    @update:value="handleClick"
  >
    <n-tab-pane
      v-for="panel in panels"
      :key="panel.index"
      :tab="panel.name"
      :name="panel.index"
      scrolling-y="auto"
      display-directive="show"
    >
      <iframe
        frameborder="0"
        name="other-iframe"
        :src="panel.url"
        v-if="panel.flag"
      ></iframe>
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { NTabs, NTabPane } from "naive-ui";

export default defineComponent({
  components: { NTabs, NTabPane },
  setup() {
    let max = 1;
    const eventHandler = async (params) => {
      handleAdd(params[0], params[1]);
    };

    const { eventHub } = getCurrentInstance().proxy;
    eventHub.$on("add-tabs", eventHandler);
    const addableRef = computed(() => {
      return {
        disabled: panelsRef.value.length >= 10,
      };
    });
    const closableRef = computed(() => {
      return panelsRef.value.length > 1;
    });
    const nameRef = ref(1);
    const panelsRef = ref([
      { index: 1, name: "首页", url: "./index", flag: true },
    ]);
    function handleClick(name) {
      const { value: panels } = panelsRef;
      const index = panels.findIndex((v) => name === v.index);
      panels[index].flag = true;
    }
    function handleAdd(name, url) {
      const newValue = {
        index: ++max,
        name: name,
        url: url,
        flag: true,
      };
      panelsRef.value.push(newValue);
      nameRef.value = newValue.index;
    }
    function handleClose(name) {
      const { value: panels } = panelsRef;
      if (panels.length === 1) {
        console.log("最后一个了");
        return;
      }
      console.log("关掉 " + name);
      const index = panels.findIndex((v) => name === v.index);
      console.log(index);
      panels.splice(index, 1);
      if (nameRef.value === name) {
        nameRef.value = panels[Math.min(index, panels.length - 1)].index;
      }
    }
    return {
      panels: panelsRef,
      name: nameRef,
      addable: addableRef,
      closable: closableRef,
      handleAdd,
      handleClose,
      handleClick,
    };
  },
});
</script>