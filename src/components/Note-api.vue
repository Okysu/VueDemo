<template>
  <div></div>
</template>

<script>
import { useNotification } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    window.$notification = useNotification();
    return {
    };
  },
});
</script>