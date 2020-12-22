## Link 文字链接

文字超链接

### 基础用法

基础的文字链接用法。
:::demo 备注测试

```html
<template>
  <div class="hello-wrap">
    hello world
  </div>
</template>
<script lang="ts">
  export default {
    name: "hellow"
  };
</script>
<style>
  .hello-wrap {
    font-size: 20px;
    color: red;
  }
</style>
```

:::

:::demo 备注测试 vscdoe

```html
<template>
  <div class="hello-wrap">
    hello world vscode {{ abc }}
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from "vue";
  export default defineComponent({
    name: "BasicLayout",
    setup() {
      const state = reactive({
        a: 1
      });
      const abc: 333;
      return { state ,abc};
    }
  });
</script>
<style>
  .hello-wrap {
    font-size: 20px;
    color: red;
  }
</style>
```

:::
