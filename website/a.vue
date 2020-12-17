<template>
        <section class="content element-doc">
        <h2>Link 文字链接</h2>
<p>文字超链接</p>
<h3>基础用法</h3>
<p>基础的文字链接用法。</p>
<demo-block>
      
      <template #source><element-demo0 /></template>
      <template #highlight><pre v-pre><code class="html">&lt;div&gt;
  &lt;el-link href=&quot;https://element.eleme.io&quot; target=&quot;_blank&quot;&gt;默认链接&lt;/el-link&gt;
  &lt;el-link type=&quot;primary&quot;&gt;主要链接&lt;/el-link&gt;
  &lt;el-link type=&quot;success&quot;&gt;成功链接&lt;/el-link&gt;
  &lt;el-link type=&quot;warning&quot;&gt;警告链接&lt;/el-link&gt;
  &lt;el-link type=&quot;danger&quot;&gt;危险链接&lt;/el-link&gt;
  &lt;el-link type=&quot;info&quot;&gt;信息链接&lt;/el-link&gt;
&lt;/div&gt;
</code></pre></template></demo-block>
        </section>
        </template>
        <script lang="ts">
            import * as Vue from 'vue';
            export default {
              name: 'component-doc',
              components: {
                "element-demo0": (function() {
    
    const { createTextVNode: _createTextVNode, resolveComponent: _resolveComponent, withCtx: _withCtx, createVNode: _createVNode, openBlock: _openBlock, createBlock: _createBlock } = Vue

const _hoisted_1 = /*#__PURE__*/_createTextVNode("默认链接")
const _hoisted_2 = /*#__PURE__*/_createTextVNode("主要链接")
const _hoisted_3 = /*#__PURE__*/_createTextVNode("成功链接")
const _hoisted_4 = /*#__PURE__*/_createTextVNode("警告链接")
const _hoisted_5 = /*#__PURE__*/_createTextVNode("危险链接")
const _hoisted_6 = /*#__PURE__*/_createTextVNode("信息链接")

function render(_ctx, _cache) {
  const _component_el_link = _resolveComponent("el-link")

  return (_openBlock(), _createBlock("div", null, [
    _createVNode("div", null, [
      _createVNode(_component_el_link, {
        href: "https://element.eleme.io",
        target: "_blank"
      }, {
        default: _withCtx(() => [
          _hoisted_1
        ]),
        _: 1 /* STABLE */
      }),
      _createVNode(_component_el_link, { type: "primary" }, {
        default: _withCtx(() => [
          _hoisted_2
        ]),
        _: 1 /* STABLE */
      }),
      _createVNode(_component_el_link, { type: "success" }, {
        default: _withCtx(() => [
          _hoisted_3
        ]),
        _: 1 /* STABLE */
      }),
      _createVNode(_component_el_link, { type: "warning" }, {
        default: _withCtx(() => [
          _hoisted_4
        ]),
        _: 1 /* STABLE */
      }),
      _createVNode(_component_el_link, { type: "danger" }, {
        default: _withCtx(() => [
          _hoisted_5
        ]),
        _: 1 /* STABLE */
      }),
      _createVNode(_component_el_link, { type: "info" }, {
        default: _withCtx(() => [
          _hoisted_6
        ]),
        _: 1 /* STABLE */
      })
    ])
  ]))
}
  
    const democomponentExport = {}
    return {
      render,
      ...democomponentExport
    }
  })(),
              }
            }
          </script>