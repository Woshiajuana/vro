# .

## pnpm

```
pnpm install react react-dom -w

pnpm install dayjs -r --filter @test/web

pnpm install @daysnap/horn-ui@latest -r --filter playground

pnpm add @daysnap/utils -r --filter @daysnap/horn

pnpm up @daysnap/utils --latest -r
```


js 正则

1. 可以输入数字，可以是小数，只能小数点2位
2. 可以是负数
3. 如果第一位数是0 不能一直输入0， -00  000 这种都不行

1.1 => 通过
1.111 => 失败
-1.1 => 通过
-1 => 通过
1. => 通过
- => 通过
-. => 失败
-.0 => 失败