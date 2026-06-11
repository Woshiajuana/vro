# useComposition

### 介绍

处理输入法组合输入状态，常用于输入框在中文输入过程中避免提前触发格式化。

## 代码演示

### 基础用法

```ts
import { useComposition } from '@vrojs/use'

const { handleCompositionStart, handleCompositionEnd } = useComposition()
```
