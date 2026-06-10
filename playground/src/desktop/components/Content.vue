<template>
  <main :class="['van-doc-content', `van-doc-content--${currentPage}`]" @click="onClick">
    <slot />
  </main>
</template>

<script setup lang="ts">
  import { computed, nextTick, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const currentPage = computed(() => route.path.split('/').slice(-1)[0] || route.name)

  const onClick = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof HTMLElement)) {
      return
    }

    if (['H2', 'H3', 'H4', 'H5'].includes(target.tagName) && target.id) {
      router.push({
        name: route.name ?? undefined,
        hash: `#${target.id}`,
      })
    }
  }

  watch(
    () => route.fullPath,
    () => {
      nextTick(() => {
        if (route.hash) {
          document.querySelector(route.hash)?.scrollIntoView()
        }
      })
    },
  )
</script>

<style lang="scss">
  .van-doc-card {
    margin-bottom: var(--van-doc-padding);
    padding: 28px 28px 32px;
    background-color: var(--van-doc-background-2);
    border-radius: var(--van-doc-border-radius);
    overflow: auto;

    > p a,
    > ul a,
    > table a,
    > blockquote a {
      margin: 0 1px;
      color: var(--van-doc-link-color);
      -webkit-font-smoothing: auto;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }

    > h3,
    > h4,
    > h5,
    > h6 {
      font-weight: normal;
      line-height: 1.6;

      &[id] {
        cursor: pointer;
      }
    }

    > h3 {
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 20px;
    }

    > h4 {
      margin: 24px 0 12px;
      font-weight: 600;
      font-size: 18px;
    }

    > h5 {
      margin: 24px 0 12px;
      font-weight: 600;
      font-size: 16px;
    }

    > p {
      margin-top: 16px;
      color: var(--van-doc-text-color-3);
      font-size: 15px;
      line-height: 26px;

      strong {
        color: var(--van-doc-text-color-1);
      }
    }

    > table {
      width: 100%;
      margin-top: 12px;
      color: var(--van-doc-text-color-3);
      font-size: 14px;
      line-height: 1.5;
      border-collapse: collapse;

      th {
        padding: 8px 10px;
        font-weight: 600;
        text-align: left;

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          padding-right: 0;
        }
      }

      td {
        padding: 8px;
        border-top: 1px solid var(--van-doc-border-color);

        &:first-child {
          padding-left: 0;

          code {
            margin: 0;
            padding: 2px 6px;
            color: var(--van-doc-blue);
            font-weight: 600;
            font-size: 11px;
            background-color: rgba(25, 137, 250, 0.15);
            border-radius: 20px;
          }
        }

        &:last-child {
          padding-right: 0;
        }
      }
    }

    > ul {
      margin: 16px 0 0;
    }

    > ul li,
    > ol li {
      position: relative;
      margin: 5px 0 5px 10px;
      padding-left: 15px;
      color: var(--van-doc-text-color-3);
      font-size: 15px;
      line-height: 26px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 6px;
        height: 6px;
        margin-top: 10px;
        border: 1px solid currentColor;
        border-radius: 50%;
        content: '';
      }
    }

    > p code,
    > ul code,
    > ol code,
    > table code {
      display: inline;
      margin: 0 2px;
      padding: 3px 7px;
      font-size: 14px;
      word-break: keep-all;
      border-radius: 6px;
      -webkit-font-smoothing: auto;
      font-family: var(--van-doc-code-font-family);
    }

    > blockquote {
      margin: 16px 0 0;
      padding: 16px;
      font-size: 15px;
      line-height: 26px;
      color: var(--van-doc-blockquote-color);
      background-color: var(--van-doc-blockquote-background);
      border-radius: var(--van-doc-border-radius);
    }
  }

  .van-doc-content {
    position: relative;
    flex: 1;
    padding: 0 0 75px;

    .van-doc-markdown-body {
      padding: var(--van-doc-padding);
      overflow: hidden;

      h1,
      h2 {
        font-weight: normal;
        line-height: 1.5;

        &[id] {
          cursor: pointer;
        }
      }

      h1 {
        margin: 0 0 30px;
        font-size: 34px;
        cursor: default;
      }

      h2 {
        margin: 52px 0 20px;
        font-size: 26px;
      }
    }
  }
</style>
