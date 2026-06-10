import { createRequire } from 'node:module'

import hljs from 'highlight.js'
import type MarkdownIt from 'markdown-it'
import VitePluginMd from 'vite-plugin-md'

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
    wrapperClasses: 'docs-markdown-body',
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
