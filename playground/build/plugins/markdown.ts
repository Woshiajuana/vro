import { createRequire } from 'node:module'

import hljs from 'highlight.js'
import type MarkdownIt from 'markdown-it'
import VitePluginMd from 'vite-plugin-md'

const splitScriptSetup = (htmlCode: string) => {
  const index = htmlCode.indexOf('<script')
  if (index === -1) {
    return [htmlCode, '']
  }

  return [htmlCode.slice(0, index), htmlCode.slice(index)]
}

const markdownCardWrapper = (htmlCode: string) => {
  const [content, script] = splitScriptSetup(htmlCode)
  const group = content.replace(/<h3/g, ':::<h3').replace(/<h2/g, ':::<h2').split(':::')

  const html = group
    .map((fragment) => {
      if (fragment.includes('<h3')) {
        return `<div class="van-doc-card">${fragment}</div>`
      }

      return fragment
    })
    .join('')

  return `${html}${script}`
}

const markdownHighlight = (str: string, lang: string) => {
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
  }

  return ''
}

const markdownLinkOpen = (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.link_open

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const aIndex = tokens[idx].attrIndex('target')

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank'])
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
      html: true,
      typographer: false,
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
