<template>
  <a-form :form="form">
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Name"
    >
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
        placeholder="Please input your name"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Age"
    >
      <a-input
        v-decorator="[
          'age',
        ]"
        placeholder="Please input your age"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Address"
    >
      <a-input
        v-decorator="[
          'address',
        ]"
        placeholder="Please input your address"
      />
    </a-form-item>
    <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">
        {{ $t("global.save") }}
      </a-button>
      <a-button @click="reBack">
        {{ $t("global.return") }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
import listService from "@/api/listService.js";
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
    };
  },
  methods: {
    reBack() {
      location.href = "/table";
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          listService.userUpdate(values).then((res) => {
            console.info(res);
            if (res.data === "OK") {
              location.href = "/table";
            } else {
              this.$message.error("新增失败");
            }
          });
        }
      });
    },
  },
};
</script>