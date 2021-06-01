<template>
  <div>
    <a-spin v-show="show" />
    <div v-show="!show">{{ msg }}</div>
  </div>
</template>

<script>
import listService from "@/api/listService.js";
export default {
  data() {
    return {
      msg: "",
      show: true,
    };
  },
  created() {
    listService.list().then((res) => {
      this.msg = res.data;
      this.show = false;
    });
  },
};
</script>