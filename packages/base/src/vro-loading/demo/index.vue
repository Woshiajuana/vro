<template>
  <demo-block title="基础用法">
    <ul>
      <li>
        <vro-loading text="加载中..." />
      </li>
    </ul>
  </demo-block>

  <demo-block title="加载类型">
    <ul>
      <li>
        <vro-loading type="circular" />
      </li>
      <li>
        <vro-loading type="spinner" />
      </li>
      <li>
        <vro-loading type="dots" />
      </li>
    </ul>
  </demo-block>

  <demo-block title="自定义样式">
    <ul>
      <li>
        <vro-loading type="spinner" color="#409eff" :size="40" text="请稍候" vertical />
      </li>
      <li>
        <vro-loading type="dots" color="#67c23a" :size="36" text-color="#303133">
          正在处理
        </vro-loading>
      </li>
    </ul>
  </demo-block>
</template>
