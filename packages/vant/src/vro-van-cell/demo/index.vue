<template>
  <demo-block title="基础用法">
    <van-cell title="11"></van-cell>
    <vro-van-cell label="单元格" value="内容" />
    <vro-van-cell label="单元格" value="内容" arrow />
    <vro-van-cell
      required
      label="单元格"
      value="内容"
      :icon-props="{ name: 'van-icon-setting-o' }"
      arrow
    />
  </demo-block>

  <demo-block title="内容多行">
    <vro-van-cell label="单元格" lineClamp="2" value="1内容内容内容内容内容内容内容内1内2" />
    <vro-van-cell
      label="可省略"
      value="1内容内容内容内容内容内容内容内容内容内容内容内容2"
      ellipsis
    />
    <vro-van-cell
      label="多行可省略"
      lineClamp="2"
      value="1内容内容内容内容内容内容内容内1内容内容内容内容内容内容内容内容内容内容内容内容2容内容内容内容内容2"
    />
  </demo-block>

  <demo-block title="垂直排列">
    <vro-van-cell
      required
      direction="column"
      label="单元格"
      value="1内容内容内容内容内容内容内容内容内容内容内容内容2"
      arrow
    />
    <vro-van-cell
      ref="horCellInstance"
      direction="column"
      lineClamp="2"
      label="超出多少行可省略"
      value="1内容内容内容内容内容内容内容内容内容内容内容内容21内容内容内容内容内容内容内容内容内容内容内容内容21内容内容内容内容内容内容内容内容内容内容内容内容2"
    />
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-cell label="单元格">
      <b>插槽内容</b>
      <hor-icon name="hor-version" />
    </vro-van-cell>
    <vro-van-cell label="单元格" arrow>
      <input type="text" placeholder="请输入密码" />
      <template #suffix>
        <hor-icon name="plus" />
      </template>
      <template #after>
        <div style="width: 100%">123</div>
      </template>
    </vro-van-cell>
  </demo-block>
</template>

<script setup lang="ts"></script>
