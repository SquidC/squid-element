# squid-element

组件库


## 打包


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

