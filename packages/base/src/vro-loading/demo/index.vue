<template>
  <demo-block title="基础用法">
    <ul>
      <li>
        <vro-loading />
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
      <li>
        <vro-loading type="image" :size="15" color="#999" />
      </li>
    </ul>
  </demo-block>

  <demo-block title="自定义样式">
    <ul>
      <li>
        <vro-loading type="spinner" color="#409eff" :size="40" />
      </li>
      <li>
        <vro-loading type="dots" color="#67c23a" :size="36" />
      </li>
      <li>
        <vro-loading type="image" color="#909399" :size="30" duration="800ms" />
      </li>
    </ul>
  </demo-block>
</template>
