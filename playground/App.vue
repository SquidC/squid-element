<template>
  <div class="app">
    <h1>squid-element block</h1>
    <ElButton type="primary">hello world</ElButton>
    <Operation :tools="['add']" />
    <BasicForm
      :model="formData"
      :form-items="formItems"
      :label-width="'50px'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { BasicForm, Operation } from "squid-element"
import { ElButton } from "element-plus"

export default defineComponent({
  name: "App",
  components: {
    BasicForm,
    Operation,
    ElButton,
  },
  setup(){
    const formData = reactive({
      formInput: 33,
    })

    return {
      formData,
      formItems: [
        {
          field: "formInput",
          type: "Input",
          label: "字段A",
        },
      ],
    }
  },
})
</script>
