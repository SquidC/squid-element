# 组件库文档

使用[`@squidc/vite-md`](https://github.com/SquidC/squid-vite-md) markdown 格式 loader

⚠ vite 的`alias`不能直接使用`"."`

```typescript
{
  alias: {
    "@/": pathResolve("."),
  },
}
```

这样会直接拦截所有/的路径 导致`/vite/jsx`被`rewrite`成`@/vite/jsx`
