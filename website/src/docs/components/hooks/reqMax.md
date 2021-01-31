# 控制并发请求

## 原理

先发送max次请求每次请求返回再发送下次请求。

## 使用

:::demo
```html
<template>
  <ElButton type="primary" @click="handleClick">click</ElButton>
  <div class="canvas">
    <canvas :ref="(e) => canvas.ref = e" width="500" height="100"></canvas>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import { useReqMax } from "@squid-element/hooks";
import { ElButton } from "element-plus";

export default defineComponent({
  components: { ElButton },
  setup() {
    const req = ({
      s,
      idx,
      reqTime,
    }) => new Promise(resolve => {
      setTimeout(() => {
        const e = Date.now();
        resolve({ t: e - s, idx });
      }, reqTime);
    });

    const canvas = reactive({
      ref: null,
      ctx: null,
    });
    onMounted(() => {
      canvas.ctx = canvas.ref.getContext("2d");
      canvas.ctx.fillStyle="#1f1f1f";
      canvas.ctx.fillRect(0,0,500,100);
    });
    const handleClick = () => {
      let offsetY = 0;
      const startTime = Date.now();
      const color = ["#ea4f3d", "#f09a37", "#f8ce46", "#5cc465", "#68a9ed", "#3478f5", "#b57ad6"];
      useReqMax(Array(6).fill(1).map(
        (_, idx) => () => req({ s: startTime, reqTime: 100, idx })),
      3,
      res => {
        console.log("callback", res);
        offsetY += 10;
        canvas.ctx.fillStyle = color.pop();
        canvas.ctx.fillRect(0, offsetY, res.t, 5);
      }).then(res => {
        console.log("res", res);
      });
    };

    return {
      handleClick,
      canvas,
    }
  }
})
</script>
```
:::
