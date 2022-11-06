<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template slot="name" slot-scope="text, record, index">
      <a v-if="index !== 4">{{ text }}</a>
      <span v-else>{{ text }}: {{ total }}</span>
    </template>
    <template slot="number" slot-scope="text, record, index">
      <a-input 
        v-if="record.editable"
        :value="text"
        @change="e => handleChange(e.target.value, record.key, 'number')"
      ></a-input>
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const renderContent = (row) => {
  const obj = {
      style: { },
      attrs: { }
    }
    if (row.key != 5) {
      return obj;
    } else {
      obj.style.display = 'none'
      return obj
    }
};

const data = [
  {
    key: '1',
    name: '键盘',
    price: 689,
    number: 1,
    operation: ''
  },
  {
    key: '2',
    name: '口红',
    price: 300,
    number: 1,
    operation: ''
  },
  {
    key: '3',
    name: '洗衣液',
    price: 89.9,
    number: 4,
    operation: ''
  },
  {
    key: '4',
    name: '猫粮',
    price: 709,
    number: 1,
    operation: ''
  },
  {
    key: '5',
    name: '总计',
    price: 0,
    number: 0,
    operation: ''
  },
];

export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        customCell: (row) => {
          const obj = {
            style: { },
            attrs: {
            }
          }
          if (row.key === "5") {
            obj.attrs.colSpan = 5
          }
          return obj
        },
        scopedSlots: { customRender: 'name' },
      },
      {
        title: '价格',
        dataIndex: 'price',
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {},
          };
          if (index === 4) {
            obj.attrs.colSpan = 0;
          }
          return obj;
        },
      },
      {
        title: '数量',
        dataIndex: 'number',
        customCell: (row) => renderContent(row),
        scopedSlots: { customRender: 'number' },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        customCell: (row) => renderContent(row),
        scopedSlots: { customRender: 'operation' },
      },
    ];
    return {
      data,
      columns,
      total: 0,
      editingKey: '',
    };
  },
  mounted() {
    this.handleTotal()
  },
  methods: {
    handleTotal() {
      this.total = this.data.map(item => {
        return item.price * item.number
      }).reduce((a,b) => a + b)
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find(item => key === item.key);
      const targetCache = newCacheData.find(item => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        if(!Number(target.number)) target.number = 0;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key));
        delete target.editable;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.data = newData;
        this.handleTotal()
      }
    },
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
