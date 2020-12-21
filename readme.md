# squid-element

组件库 文档都使用 vue3 实现

## 脚本

> 打包

```shell
# 运行
yarn build

# 执行以下命令
yarn bootstrap            # leran建立依赖
yarn clean:lib            # 清空上次打包
yarn build:esm-bundle     # rollup生成index.d.ts声明文件
yarn build:type           # 更改生成组件的文件名和和引用
yarn build:lib            # webpack全部打包 部分包使用import引入
yarn build:lib-full       # webpack全部打包 全部使用webpack打包
yarn build:esm            # rollup打包生成css vue ts tsx 生成 js / css
yarn build:utils          # 打包utils使用babel
yarn build:theme          # 打包主题 使用gulp打包less样式
```

> 建立`npm link`依赖

使新建的组件可以被其他组件引用

```shell
yarn bootstrap
```

> 生成组件

生成默认组件

```shell
yarn gen
```
