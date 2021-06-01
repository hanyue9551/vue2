<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }],
          },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
    >
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import listService from "@/api/listService.js";
import { encodePwd } from "@/common/utils.js"
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods: {
    ...mapMutations(['setLogin', 'setAccountLevel']),
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.password = encodePwd(values.password)
          listService.login(values).then((res) => {
            if (res.data && res.data.length > 0) {
              this.setLogin(true)
              this.setAccountLevel(res.data[0].level)
              sessionStorage.setItem('login', true)
              sessionStorage.setItem('level', res.data[0].level)
              sessionStorage.setItem('username', res.data[0].username)
              // this.$router.push('/table')
              location.href = "/table";
            } else {
              this.$message.error("账号或密码错误");
            }
          });
        }
      });
    },
  },
};
</script>