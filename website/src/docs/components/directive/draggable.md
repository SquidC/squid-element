## draggable

vue draggable指令
使用该指令，会使元素变成相对定位

### 用法

:::demo

```html
<template>
  <div class="test-draggable-wrap">
    <div v-draggable class="test-draggable"></div>
  </div>
</template>
<style>
.test-draggable-wrap{
  position: relative;
  height: 200px;
  background: red;
  overflow: hidden;
}
</style>
```

:::
