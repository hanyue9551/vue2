<template>
  <div>
    <div>
      <router-link to="/tableAdd">
        <a-button type="primary">{{ $t("global.add") }}</a-button>
      </router-link>
    </div>
    <a-table :columns="columns" :data-source="dataSource" bordered rowKey="id">
      <template
        v-for="col in ['name', 'age', 'address']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.id)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.id)"
              >{{ $t("global.edit") }}</a
            >
            <a @click="() => delate(record.id)">{{ $t("global.delete") }}</a>
            <a @click="() => showDetail(record.id)">{{ $t("global.detail") }}</a>
          </span>
        </div>
      </template>
    </a-table>
    <TableDetail ref="showDrawer" :id="detailId"/>
  </div>
</template>
<script>
const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
    scopedSlots: { customRender: "age" },
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
    scopedSlots: { customRender: "address" },
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

import listService from "@/api/listService.js";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("table");
import TableDetail from './TableDetail'
export default {
  components: {
    TableDetail
  },
  data() {
    return {
      dataSource: [],
      cacheData: [],
      columns,
      editingKey: "",
      detailId: Number
    };
  },
  created() {
    this.update();
  },
  methods: {
    ...mapActions(["getTable"]),
    async update() {
      let res = await this.getTable();
      this.dataSource = res.data;
      this.cacheData = res.data.map((item) => ({ ...item }));
    },
    handleChange(value, key, column) {
      const newData = [...this.dataSource];
      const target = newData.filter((item) => key === item.id)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    edit(key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item) => key === item.id)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.dataSource = newData;
      }
    },
    delate(key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item) => key === item.id)[0];
      if (target) {
        listService.userDelete({ id: key }).then((res) => {
          if (res.data === "OK") {
            this.dataSource = newData.filter((item) => key !== item.id);
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        });
      }
    },
    save(key) {
      const newData = [...this.dataSource];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.id)[0];
      const targetCache = newCacheData.filter((item) => key === item.id)[0];
      if (target && targetCache) {
        listService.userUpdate(target).then((res) => {
          if (res.data === "OK") {
            delete target.editable;
            this.dataSource = newData;
            Object.assign(targetCache, target);
            this.cacheData = newCacheData;
            this.$message.success("修改成功");
          } else {
            this.$message.error("修改失败");
          }
        });
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item) => key === item.id)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.id)[0]
        );
        delete target.editable;
        this.dataSource = newData;
      }
    },
    showDetail(id) {
      this.detailId = id
      this.$refs.showDrawer.showDrawer();
    }
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
