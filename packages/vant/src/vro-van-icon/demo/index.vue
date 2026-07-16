<template>
  <demo-block title="基础用法">
    <div class="demo-icon-row">
      <vro-van-icon name="van-icon-chat-o" size="24" />
      <vro-van-icon name="van-icon-like-o" size="24" color="#ee0a24" />
      <vro-van-icon name="van-icon-success" size="24" color="#07c160" />
    </div>
  </demo-block>

  <demo-block title="图片图标">
    <div class="demo-icon-row">
      <vro-van-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" size="28" />
      <vro-van-icon
        name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png"
        size="28"
        loading
      />
    </div>
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-icon size="28" color="#1989fa">
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="256"
        height="256"
      >
        <path
          d="M113.777664 455.110656c-10.223616-11.926528-8.84224-29.884416 3.085312-40.108032l358.11328-306.95424c21.305344-18.260992 52.742144-18.260992 74.046464 0l358.114304 306.95424c11.927552 10.223616 13.308928 28.18048 3.085312 40.108032s-28.18048 13.308928-40.108032 3.085312L512 151.241728l-358.11328 306.95424c-11.928576 10.223616-29.88544 8.84224-40.109056-3.085312z"
          fill="currentColor"
        ></path>
        <path
          d="M227.555328 652.423168v144.021504h568.889344V652.423168L512 415.3856 227.555328 652.423168z m-56.88832 0a56.889344 56.889344 0 0 1 20.46976-43.703296l284.443648-237.036544c21.097472-17.58208 51.74272-17.58208 72.839168 0l284.444672 237.036544a56.889344 56.889344 0 0 1 20.46976 43.703296v144.021504c0 31.418368-25.470976 56.88832-56.889344 56.88832H227.555328c-31.418368 0-56.88832-25.469952-56.88832-56.88832V652.423168z"
          fill="currentColor"
        ></path>
      </svg>
    </vro-van-icon>
  </demo-block>

  <demo-block title="旋转动画">
    <div class="demo-icon-row">
      <vro-van-icon name="van-icon-replay" size="24" loading />
      <vro-van-icon name="van-icon-replay" size="24" loading="800ms" />
    </div>
  </demo-block>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .demo-icon-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
</style>
