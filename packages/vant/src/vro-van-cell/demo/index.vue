<template>
  <demo-block title="基础用法">
    <vro-van-cell label="单元格" value="内容" />
    <vro-van-cell label="带箭头" value="内容" arrow />
    <vro-van-cell label="可点击" value="内容" clickable />
  </demo-block>

  <demo-block title="图标和必填">
    <vro-van-cell label="图标" value="内容" :icon-props="{ name: 'van-icon-setting-o' }" />
    <vro-van-cell required label="必填项" value="内容" arrow />
    <vro-van-cell required no-asterisk label="隐藏星号" value="内容" arrow />
  </demo-block>

  <demo-block title="内容省略">
    <vro-van-cell label="单行省略" :value="longText" ellipsis />
    <vro-van-cell label="多行省略" :value="longText" line-clamp="2" />
  </demo-block>

  <demo-block title="垂直排列">
    <vro-van-cell required direction="column" label="单元格" :value="longText" arrow />
    <vro-van-cell direction="column" align-item-center label="居中排列" value="内容" />
  </demo-block>

  <demo-block title="格式化内容">
    <vro-van-cell label="金额" :value="price" :formatter="formatPrice" />
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-cell label="自定义内容">
      <strong>插槽内容</strong>
      <vro-van-icon name="van-icon-setting-o" />
    </vro-van-cell>

    <vro-van-cell value="自定义标题">
      <template #prefix>
        <vro-van-icon class="demo-cell-prefix" name="van-icon-smile-o" />
      </template>
      <template #label>
        <strong>标题插槽</strong>
      </template>
    </vro-van-cell>

    <vro-van-cell label="自定义区域" arrow>
      <input class="demo-cell-input" type="text" placeholder="请输入内容" />
      <template #suffix>
        <vro-van-icon name="van-icon-plus" />
      </template>
      <template #after>
        <div class="demo-cell-after">附加内容</div>
      </template>
    </vro-van-cell>
  </demo-block>
</template>

<script setup lang="ts">
  const price = '12800'
  const longText = '这是一段较长的内容，用来展示单元格在内容超出时的省略效果。'

  const formatPrice = (value: string) => `¥${Number(value).toLocaleString()}`
</script>

<style lang="scss" scoped>
  .demo-cell-input {
    width: 100%;
    min-width: 0;
    color: var(--van-text-color);
    text-align: right;
    background: transparent;
    border: 0;
    outline: none;
  }

  .demo-cell-prefix {
    margin-right: 8px;
  }

  .demo-cell-after {
    width: 100%;
    padding: 8px 0 0;
    color: var(--van-text-color-2);
    font-size: 12px;
  }
</style>
