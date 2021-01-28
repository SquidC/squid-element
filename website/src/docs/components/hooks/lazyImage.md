# 图片懒加载

`useLazyImage`

## 介绍

图片懒加载在一些图片密集型的网站中运用比较多，通过图片懒加载可以让一些不可视的图片不去加载，避免一次性加载过多的图片导致请求阻塞（浏览器一般对同一域名下的并发请求的连接数有限制），这样就可以提高网站的加载速度，提高用户体验。

## 原理

* 将图片设置为div，设置宽高，在刷新图片的时候不触发浏览器的回流重绘。
* 默认加载加载loading图片，当图片出现在可视范围则更换src内容
* 通过IntersectionObserver api判断图片是否出现在可视区域内，不需要监听Scroll来判断

## 使用

:::demo
```html
<template>
  <div class="wrap">
    <div :ref="lazyImage" class="lazy-image"></div>
    <div :ref="lazyImage" class="lazy-image"></div>
    <div :ref="lazyImage" class="lazy-image"></div>
    <div :ref="lazyImage" class="lazy-image"></div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { useLazyImage } from "@squid-element/hooks";

export default defineComponent({
  setup() {
    const lazyImage = useLazyImage([
      "http://localhost:3050/images/ent_slid1.jpg",
      "http://localhost:3050/images/ent_slid2.jpg",
      "http://localhost:3050/images/ent_slid3.jpg",
      "http://localhost:3050/images/ent_slid4.jpg",
    ], "http://localhost:3050/loading.gif");

    return {
      lazyImage
    }
  }
})
</script>
<style>
.wrap {
  width: 300px;
  height: 300px;
  overflow-y: scroll;

}
.lazy-image {
  width: 200px;
  height: 200px;
  margin-top: 30px;
  background-size: 100%;
}
</style>
```
:::

## 参数说明

### 输入

|params|detail|type|
|------|------|----|
|src|更新图片的url|string[]|
|loadingSrc|加载的图片url|string|


### 输出

|params|detail|type|
|------|------|----|
|lazyImage|挂载ref方法|function|
