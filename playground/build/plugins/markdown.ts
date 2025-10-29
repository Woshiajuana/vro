import hljs from 'highlight.js'
import VitePluginMd from 'vite-plugin-md'
import { createRequire } from 'node:module'
import type MarkdownIt from 'markdown-it'

function markdownCardWrapper(htmlCode: string) {
  const group = htmlCode.replace(/<h3/g, ':::<h3').replace(/<h2/g, ':::<h2').split(':::')

  const html = group
    .map((fragment) => {
      if (fragment.indexOf('<h3') !== -1) {
        return `<div class="van-doc-card">${fragment}</div>`
      }

      return fragment
    })
    .join('')

  return html
}

function markdownHighlight(str: string, lang: string) {
  if (lang && hljs.getLanguage(lang)) {
    // https://github.com/highlightjs/highlight.js/issues/2277
    return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
  }

  return ''
}

// add target="_blank" to all links
function markdownLinkOpen(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.link_open

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const aIndex = tokens[idx].attrIndex('target')

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']) // add new attribute
    }

    if (defaultRender) {
      return defaultRender(tokens, idx, options, env, self)
    }

    return self.renderToken(tokens, idx, options)
  }
}

export function Markdown() {
  return VitePluginMd({
    wrapperClasses: 'van-doc-markdown-body',
    transforms: {
      after: markdownCardWrapper,
    },
    markdownItOptions: {
      typographer: false, // https://markdown-it.github.io/markdown-it/#MarkdownIt
      highlight: markdownHighlight,
    },
    markdownItSetup(md: MarkdownIt) {
      const require = createRequire(import.meta.url)
      const { slugify } = require('transliteration')
      const markdownItAnchor = require('markdown-it-anchor')

      markdownLinkOpen(md)

      md.use(markdownItAnchor, {
        level: 2,
        slugify,
      })
    },
  })
}
