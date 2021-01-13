<template>
  <div class="form-wrap">
    <div class="form">
      <ElForm
        ref="internalForm"
        v-bind="props"
        :model="model"
      >
        <template
          v-for="formItem in formItems"
          :key="formItem.field"
        >
          <ElFormItem
            v-bind="formItem"
            :prop="formItem.scope? formItem.field + '.'+ formItem.scope:formItem.field"
          >
            <FormWidget
              v-if="formItem.scope"
              v-model="model[formItem.field][formItem.scope]"
              v-bind="formItem"
            />
            <FormWidget
              v-else
              v-model="model[formItem.field]"
              v-bind="formItem"
            />
          </ElFormItem>
        </template>
      </ElForm>
    </div>
    <div class="btns">
      <ElButton
        type="primary"
        @click="submitForm"
      >
        提交
      </ElButton>
      <ElButton
        type="primary"
        @click="resetForm"
      >
        重置
      </ElButton>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { props as componentProps } from "./props";
import { ElForm, ElFormItem, ElButton } from "element-plus";
import FormWidget from "./FormWidget";
import { Instance } from "./types";
import { useRefTemplate } from "@squid-element/hooks";

export default defineComponent({
  name: "BasicForm",
  components: { ElForm, ElFormItem, ElButton, FormWidget },
  props: componentProps,
  setup(props) {
    /**
     * 内部表单ref
     */
    const internalForm = ref<RefTemplate<Instance>>(null);
    /**
     * 提交表单
     */
    function submitForm() {
      const el = useRefTemplate<Instance>(internalForm);
      el.validate((isValid, invalidFields) => {
        console.log("校验结果：", isValid);
        console.log("校验错误字段:", invalidFields);
        console.log("表单model:", props.model);
      });
    }
    /**
     * 重置表单
     */
    function resetForm() {
      const el = useRefTemplate<Instance>(internalForm);
      el.resetFields();
    }
    return { submitForm, resetForm, ...toRefs(props), props, internalForm };
  },
});
</script>

<style lang="less" scoped>
.form-wrap {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  .form {
    flex: 1 1 10px;
  }
  .btns {
    flex: 0 0 60px;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
