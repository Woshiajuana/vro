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

const markdownCardWrapper = (md: MarkdownIt) => {
  md.core.ruler.after('block', 'van_doc_card_wrapper', (state) => {
    const tokens = state.tokens
    const nextTokens = []
    let opened = false

    const createHtmlToken = (content: string) => {
      const token = new state.Token('html_block', '', 0)
      token.content = content
      return token
    }

    tokens.forEach((token) => {
      const isHeadingOpen = token.type === 'heading_open'
      const isH2 = isHeadingOpen && token.tag === 'h2'
      const isH3 = isHeadingOpen && token.tag === 'h3'
      const isScript = token.type === 'html_block' && /^<script\b/i.test(token.content.trim())

      if (opened && (isH2 || isH3 || isScript)) {
        nextTokens.push(createHtmlToken('</div>'))
        opened = false
      }

      if (isH3) {
        nextTokens.push(createHtmlToken('<div class="van-doc-card">'))
        opened = true
      }

      nextTokens.push(token)
    })

    if (opened) {
      nextTokens.push(createHtmlToken('</div>'))
    }

    state.tokens = nextTokens
  })
}

export function Markdown() {
  return VitePluginMd({
    wrapperClasses: 'van-doc-markdown-body',
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
      markdownCardWrapper(md)

      md.use(markdownItAnchor, {
        level: 2,
        slugify,
      })
    },
  })
}
