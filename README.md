# .

基于 vue 的UI组件库

## 目录结构

```
@vrojs/monorepo
├── packages/
│   ├── core              # 核心组件库，不依赖第三方 UI 库
│   ├── element-plus      # 基于 Element Plus 的业务组件封装
│   ├── vant              # 基于 Vant 的移动端组件封装
│   └── resolver          # unplugin-vue-components 自动导入 resolver
├── playground            # 组件演练场 / 文档预览
├── scripts               # plop 组件模板与生成脚本
├── beifen                # 旧版本备份，暂不用管
├── pnpm-workspace.yaml   # workspace 配置
└── eslint.config.ts      # ESLint 配置
```

## pnpm

```
pnpm install react react-dom -w

pnpm install dayjs -r --filter @test/web

pnpm install @daysnap/horn-ui@latest -r --filter playground

pnpm add @daysnap/utils -r --filter @daysnap/horn

pnpm up @daysnap/utils --latest -r
```
