<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <p>ID: {{record.id}}</p>
      <p>{{ $t("people.name") }}: {{record.name}}</p>
      <p>{{ $t("people.age") }}: {{record.age}}</p>
      <p>{{ $t("people.address") }}: {{record.address}}</p>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  props: ['record'],
  methods: {
    afterVisibleChange(val) {
      // console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
