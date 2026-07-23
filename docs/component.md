# 组件文档

## 规范

- 补充完善文档
- 补充完善demo，尽可能每个属性都写一个例子
- 组件 types.ts 属性添加注释
- 组件 types.ts 属性归类顺序排列
- 组件里的中文提取到 locale 里，注意：demo 里文案的忽略

## 要求

- 尽量定义少的变量来完善功能
- 命名要规范有含义
- 模板里面组件使用 kebab-case 风格
- 如果有 `defineEmits` 需要采用 typescript 元组类型写法，类型提取到 type.ts 下
- 如果有 `defineSlots` 需要将类型提取到 type.ts 下
