<template>
  <a-select :value="value" :open="isOpen" @change="change" @mouseleave="mouseout">
    <div slot="dropdownRender" slot-scope="menu">
    <div class="applySearch">
        <a-input class="applySearchInput" @click="inputClickHandle" @blur="mouseout" @change="searchInput" v-model="searchTxt"/>
        <button class="icon_search_in_input" @click.stop="inputClickHandle">
          <a-icon type="search" />
        </button>
      </div>
    <v-nodes :vnodes="menu" />
  </div>
    <a-select-option v-for="item in arr" :key="item.id" :value="item.id">
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import { Input } from 'ant-design-vue'
export default {
  data() {
    return {
      isOpen: null,
      searchTxt: null,
      arr: []
    }
  },
  watch: {
    list(val) {
      console.log(this.list)
      this.arr = val.concat([])
    }
  },
  methods: {
    change(val) {
      console.log(val)
      this.$emit('change', val)
      this.isOpen = null
    },
    searchInput() {
      if(this.searchTxt === '') {
        this.arr = this.list.concat([])
      } else {
        this.arr = []
        this.list.forEach(el => {
          if (el.name.toLowerCase().indexOf(this.searchTxt.toLowerCase()) > -1) {
            this.arr.push(el)
          }
        })
      }
    },
    inputClickHandle() {
      this.isOpen = true
    },
    mouseout() {
      this.isOpen = null
    }
  },
  props: {
    value: Number,
    list: Array
  },
  components: {
    AInput: Input,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  }
}
</script>