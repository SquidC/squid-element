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
<style lang="less">
.test-draggable-wrap{
  position: relative;
  overflow: hidden;
  background: #000;
  .test-draggable {
    height: 50px;
    width: 50px;
    background: red;
  }
}
</style>
```

:::
