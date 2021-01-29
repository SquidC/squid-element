# 防抖 / 节流

## 节流（减少用户无意义操作）

在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。
现在有一个旅客刚下了飞机，需要用车，于是打电话叫了该机场唯一的一辆机场大巴来接。司机开到机场，心想来都来了，多接几个人一起走吧，这样这趟才跑得值——我等个十分钟看看。于是司机一边打开了计时器，一边招呼后面的客人陆陆续续上车。在这十分钟内，后面下飞机的乘客都只能乘这一辆大巴，十分钟过去后，不管后面还有多少没挤上车的乘客，这班车都必须发走

## 防抖（所有无意义操作合成一次）

在某段时间内，不管你触发了多少次回调，我都只认最后一次。
第一个乘客上车后，司机开始计时（比如说十分钟）。十分钟之内，如果又上来了一个乘客，司机会把计时器清零，重新开始等另一个十分钟（延迟了等待）。直到有这么一位乘客，从他上车开始，后续十分钟都没有新乘客上车，司机会认为确实没有人需要搭这趟车了，才会把车开走。

## 使用

:::demo
```html
<template>
  <div class="wrap">
    <div class="btn-grounp">
      <ElButton type="primary" @click="clickFn">触发事件</ElButton>
    </div>
    <canvas
      id="debounce"
      :ref="(ref) => debounce.ref = ref"
      width="600"
      height="220"
    ></canvas>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import { useDebounce, useThrottle } from "@squid-element/hooks";
import { ElButton } from "element-plus";

export default defineComponent({
  components: { ElButton },
  setup() {
    const debounce = reactive({
      ref: null,
      ctx: null,
      x: 1,
    });
    const debounceFn = useDebounce(() => {
      debounce.ctx.fillStyle = "#ffffff";
      debounce.ctx.fillRect(debounce.x, 90, 1, 50);
    });
    const throttleFn = useThrottle(() => {
      debounce.ctx.fillStyle = "#D0DC9D";
      debounce.ctx.fillRect(debounce.x, 160, 1, 50);
    });
    const clickFn = () => {
      debounce.ctx.fillStyle = "#C586C0";
      debounce.ctx.fillRect(debounce.x, 20, 1, 50);
      debounceFn();
      throttleFn();
      debounce.x+=5;
      if(debounce.x >= 600) {
        debounce.x = 0;
        debounce.ctx.clearRect(0, 0, 600, 220);
        debounce.ctx.fillStyle = "#1E1E1E";
        debounce.ctx.fillRect(0, 0, 600, 220);
      }
    };
    onMounted(() => {
      debounce.ctx = debounce.ref.getContext("2d");
      debounce.ctx.fillStyle = "#1E1E1E";
      debounce.ctx.fillRect(0, 0, 600, 220);
      debounce.ctx.lineWidth = 10;
      debounce.ctx.fillText("simple", 0, 15);
      debounce.ctx.fillText("debounce", 0, 85);
      debounce.ctx.fillText("throttle", 0, 155);
    });
    return {
      clickFn,
      debounce,
    }
  }
})
</script>
```
:::


## 参数
