## Link 文字链接

文字超链接

### 基础用法

直接通过设置类名为 `el-icon-iconName` 来使用即可。例如：

:::demo 备注测试
```html
<template>
  <div class="hello-wrap">
    hello world
  </div>
</template>
<script>
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


### 自定义显示内容
:::demo 备注测试 vscdoe

```html
<template>
  <div class="hello-wrap">
    hello world vscode {{ input }} {{state.a}}
  </div>
</template>
<script>
import { defineComponent, ref, reactive} from 'vue'
export default defineComponent ({
  setup() {
    const state = reactive({
      a: 1
    })
    return {
      input: ref('666'),
      state
    }
  }
})
</script>
```

:::
