# 控制并发请求

## 原理

先发送max次请求每次请求返回再发送下次请求。

## 使用

:::demo
```html
<template>
  <ElButton type="primary" @click="handleClick">click</ElButton>
  <div class="canvas">
    <canvas :ref="(e) => (canvas.ref = e)" width="500" height="100"></canvas>
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
    }) => new Promise((resolve, reject) => {
      setTimeout(() => {
        const e = Date.now();
        const num = Math.ceil(Math.random() * 100);
        if (num > 50 ) {
          resolve({ t: e - s, idx, num });
        } else {
          reject({ t: e - s, idx, num: "e"+num });
        }
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
      canvas.ctx.clearRect(0, 0, 500, 100);
      canvas.ctx.fillStyle = "#1f1f1f";
      canvas.ctx.fillRect(0, 0, 500, 100);
      let offsetY = 0;
      const startTime = Date.now();
      const color = ["#ea4f3d", "#f09a37", "#f8ce46", "#5cc465", "#68a9ed", "#3478f5", "#b57ad6"];
      useReqMax(Array(6).fill(1).map(
        (_, idx) => () => req({ s: startTime, reqTime: 100, idx })),
      3,
      res => {
        offsetY += 10;
        canvas.ctx.fillStyle = color.pop();
        canvas.ctx.fillRect(0, offsetY, res.t, 5);
        canvas.ctx.fillText(res.idx, res.t + 10, offsetY + 5);
      }).then(res => {
        canvas.ctx.fillText(res.map(e => e.num).join("\t"), 180, 85)
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


# 错误重试

## 原理

使用promise.all发送所有请求，记录请求错误次数，重新发送新请求。

## 使用

:::demo
```html
<template>
  <ElButton type="primary" @click="handleClick">click</ElButton>
  <div class="canvas">
    <canvas :ref="(e) => (canvas.ref = e)" width="500" height="100"></canvas>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import { useErrorTry } from "@squid-element/hooks";
import { ElButton } from "element-plus";

export default defineComponent({
  components: { ElButton },
  setup() {
    const req = ({
      s,
      idx,
      reqTime,
    }) => new Promise((resolve, reject) => {
      setTimeout(() => {
        const e = Date.now();
        const num = Math.ceil(Math.random() * 100);
        if (num > 50 ) {
          resolve({ t: e - s, idx, num });
        } else {
          reject({ t: e - s, idx, num: "e"+num });
        }
      }, reqTime);
    });

    onMounted(() => {
      canvas.ctx = canvas.ref.getContext("2d");
      initCanvas();
    });
    const canvas = reactive({
      ref: null,
      ctx: null,
    });
    // 标记
    let offsetXY = [
      { lastX: 6, y: 10, retry: 0 },
      { lastX: 6, y: 20, retry: 0 },
      { lastX: 6, y: 30, retry: 0 },
      { lastX: 6, y: 40, retry: 0 },
      { lastX: 6, y: 50, retry: 0 },
      { lastX: 6, y: 60, retry: 0 },
    ];
    let color = ["#ea4f3d", "#f09a37", "#f8ce46", "#5cc465", "#68a9ed", "#3478f5"];
    const initCanvas = () => {
      offsetXY = [
        { lastX: 10, y: 10, retry: 0 },
        { lastX: 10, y: 20, retry: 0 },
        { lastX: 10, y: 30, retry: 0 },
        { lastX: 10, y: 40, retry: 0 },
        { lastX: 10, y: 50, retry: 0 },
        { lastX: 10, y: 60, retry: 0 },
      ];
      color = ["#ea4f3d", "#f09a37", "#f8ce46", "#5cc465", "#68a9ed", "#3478f5"];
      canvas.ctx.clearRect(0, 0, 500, 100);
      canvas.ctx.fillStyle = "#1f1f1f";
      canvas.ctx.fillRect(0, 0, 500, 100);
      canvas.ctx.fillStyle = color[0];
      canvas.ctx.fillText("0", 3, 15);
      canvas.ctx.fillStyle = color[1];
      canvas.ctx.fillText("1", 3, 25);
      canvas.ctx.fillStyle = color[2];
      canvas.ctx.fillText("2", 3, 35);
      canvas.ctx.fillStyle = color[3];
      canvas.ctx.fillText("3", 3, 45);
      canvas.ctx.fillStyle = color[4];
      canvas.ctx.fillText("4", 3, 55);
      canvas.ctx.fillStyle = color[5];
      canvas.ctx.fillText("5", 3, 65);
    };
    const handleClick = () => {
      initCanvas();
      const startTime = Date.now();
      useErrorTry(Array(6).fill(1).map(
        (_, idx) => () => req({ s: startTime, reqTime: 100, idx })),
      4,
      res => { // callback
        const offset = offsetXY[res.idx];
        offset.retry++;
        canvas.ctx.fillStyle = color[res.idx];
        canvas.ctx.fillRect(offset.lastX, offset.y, res.t - offset.lastX, 5);
        offset.lastX = res.t + 4;
      }).then(res => {
        canvas.ctx.fillText(res.map(e => e.num).join("\t"), 180, 85)
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
