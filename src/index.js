/* global document, fetch */

import 'whatwg-fetch'
import { Cite, plugins } from '@citation-js/core'

const CSL_BASE_URL = 'cdn.jsdelivr.net/gh/citation-style-language'
const CONFIG = document.currentScript.dataset

async function get (url) {
  return (await fetch(url)).text()
}

function getOpts (options, prefix) {
  return Object.keys(options).reduce((output, key) => {
    if (key.slice(0, prefix.length) === prefix) {
      let option = key.slice(prefix.length)
      option = option[0].toLowerCase() + option.slice(1)
      output[option] = options[key] === 'false' ? false : options[key]
    }

    return output
  }, {})
}

window.addEventListener('load', function () {
  const inputOptions = getOpts(CONFIG, 'input')

  const pluginConfig = getOpts(CONFIG, 'plugin')
  for (let plugin of plugins.list()) {
    const config = plugins.config.get(plugin)
    if (config) {
      Object.assign(config, getOpts(pluginConfig, plugin.slice(1)))
    }
  }

  const elements = document.getElementsByClassName('citation-js')
  Array.prototype.map.call(elements, async function (element) {
    const format = element.dataset.outputFormat || 'bibliography'
    const options = {
      ...getOpts(element.dataset, 'output'),
      format: 'html'
    }

    try {
      const csl = plugins.config.get('@csl')
      if (options.template && !csl.templates.has(options.template)) {
        csl.templates.add(options.template, await get(`https://${CSL_BASE_URL}/styles@master/${options.template}.csl`))
      }
      if (options.lang && !csl.locales.has(options.lang)) {
        csl.locales.add(options.lang, await get(`https://${CSL_BASE_URL}/locales@master/${options.lang}.csl`))
      }
    } catch (e) {
      console.error(e)
    }

    const data = await Cite.async(element.dataset.input || element, inputOptions)
    const output = data.format(format, options)

    // Only remove children after all other code has run, so that if there's an error
    // the DOM still has the 'fallback', whatever that is
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }

    element.insertAdjacentHTML('beforeend', output)
  })
})
