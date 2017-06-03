/* global document, fetch */

import 'whatwg-fetch'
import Cite from 'citation-js'

window.addEventListener('load', function () {
  const elements = Array.prototype.slice.call(document.querySelectorAll('.citation-js.cite'))
  elements.map(async function (element) {
    const {
      input = element,
      outputStyle,
      outputLang,
      outputTemplate,
      outputLocale,
      outputTemplateUrl,
      outputLocaleUrl
    } = element.dataset

    const options = {
      format: 'real',
      type: 'html'
    }

    if (outputStyle) {
      options.style = outputStyle
    }
    if (outputLang) {
      options.lang = outputLang
    }
    if (outputTemplate) {
      options.template = outputTemplate
    } else if (outputTemplateUrl) {
      options.template = await (await fetch(outputTemplateUrl)).text()
    }
    if (outputLocale) {
      options.locale = outputLocale
    } else if (outputLocaleUrl) {
      options.locale = await (await fetch(outputLocaleUrl)).text()
    }

    const data = await Cite.async(input)
    const output = data.get(options)

    // Only remove children after all other code has run, so that if there's an error
    // the DOM still has the 'fallback', whatever that is
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }

    element.appendChild(output)
  })
})
