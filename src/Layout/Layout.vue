<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        :default-selected-keys="[this.$route.path.substr(1)]"
        mode="inline"
        @click="handleMenuClick"
      >
        <a-menu-item key="table">
          <a-icon type="pie-chart" />
          <span>{{ $t("menu.table") }}</span>
        </a-menu-item>
        <a-menu-item key="list" v-show="level === '1'">
          <a-icon type="desktop" />
          <span>{{ $t("menu.list") }}</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>不可点1</span></span>
          <a-menu-item key="3"> Tom </a-menu-item>
          <a-menu-item key="4"> Bill </a-menu-item>
          <a-menu-item key="5"> Alex </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>不可点2</span></span>
          <a-menu-item key="6"> Team 1 </a-menu-item>
          <a-menu-item key="8"> Team 2 </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="file" />
          <span>不可点3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header">
          <label class="user-switch">
            <span class="info" @click="changeLang('zh')" v-if="langZh == 'en'"
              >中</span
            >
            <span class="info" @click="changeLang('en')" v-else>En</span>
          </label>
          <a-button type="danger" @click="logout">
            {{ $t("global.exit") }}
          </a-button>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        {{ copyrightInfo }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { setCookie, getCookie } from "@/common/utils";
export default {
  data() {
    return {
      collapsed: false,
      selectedKey: ["table"],
      title: "table",
      langZh: "",
      level: "",
      copyrightInfo: ''
    };
  },
  mounted() {
    this.level = sessionStorage.getItem('level')
    this.langZh = getCookie('locale')
    this.copyrightInfo = this.$store.state.copyright
  },
  methods: {
    handleMenuClick(item) {
      if ("/" + item.key === this.$route.path) return;
      this.selectedKey = item.keyPath;
      this.title = item.key;
      this.$router.push(item.key);
    },
    logout() {
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('level')
      sessionStorage.removeItem('login')
      location.href = "/login";
    },
    changeLang(type) {
      this.$i18n.locale = type;
      this.langZh = type;
      setCookie("locale", type);
      location.reload()
    },
  },
};
</script>

<style lang="less">
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  .user-switch {
    margin-right: 10px;
    .info {
      cursor: pointer;
    }
  }
}
</style>
