# .

基于 vue 的UI组件库

## 目录结构

- packages/core 核心库，公共函数，基础UI库，不依赖第三方UI库
- packages/element-plus 基于 element-plus 二次封装的UI库
- packages/vant 基于 vant 二次封装的UI库
- packages/resolver VroResolver 自动导入组件库
- playground 演练场

## pnpm

```
pnpm install react react-dom -w

pnpm install dayjs -r --filter @test/web

pnpm install @daysnap/horn-ui@latest -r --filter playground

pnpm add @daysnap/utils -r --filter @daysnap/horn

pnpm up @daysnap/utils --latest -r
```
