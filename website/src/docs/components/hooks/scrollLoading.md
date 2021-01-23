# 滚动加载

只需要加载可视区域的数据，当滚动到最后继续加载，可以实现加载无限个dom。

## 使用

:::demo
```html
<template>
  <div ref="listWrap" class="list-wrap">
    <h2 v-for="item in state.data" :key="item">{{ item }}</h2>
  </div>
  <div v-if="loading" class="loading">正在加载...</div>
</template>
<script>
import { defineComponent, ref, reactive} from "vue"
import { useScrollLoading } from "@squid-element/hooks"
export default defineComponent ({
  setup() {
    const state = reactive({
      data: [],
    })
    const fakeReq = () => {
      // 使用闭包可以有效控制请求是否生效
      let i = 0;
      return () => new Promise(resolve => {
        setTimeout(() => {
          resolve(Array(10).fill(++i));
        }, 1000);
      });
    }
    const req = fakeReq()
    const listWrap = ref(null);
    const loading = useScrollLoading(listWrap, state.data, req)
    return {
      state,
      listWrap,
      loading
    }
  }
})
</script>
<style>
.list-wrap{
  height: 300px;
  overflow-y: scroll;
}
</style>
```
:::


## 参数说明

### useScrollLoading

|参数|说明|
|----|-----|
|1|滚动加载的容器|
|2|驱动容器更新的响应式数据|
|3|请求加载函数|
|4|格式化请求加载函数返回结果|
