import { Cite, plugins } from '@citation-js/core'

const { document, fetch } = window

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
  const outputOptions = getOpts(CONFIG, 'output')

  const pluginConfig = getOpts(CONFIG, 'plugin')
  for (const plugin of plugins.list()) {
    const config = plugins.config.get(plugin)
    if (config) {
      Object.assign(config, getOpts(pluginConfig, plugin.slice(1)))
    }
  }

  const className = CONFIG.selector || '.citation-js'
  const elements = document.querySelectorAll(className)
  Array.prototype.map.call(elements, async function (element) {
    const format = element.dataset.output || 'bibliography'
    const options = {
      ...outputOptions,
      ...getOpts(element.dataset, 'output')
    }

    if (format === 'bibliography' || format === 'citation') {
      options.format = 'html'
    }

    try {
      const csl = plugins.config.get('@csl')
      if (options.style && !csl.styles.has(options.style)) {
        csl.styles.add(options.style, await get(`https://${CSL_BASE_URL}/styles@master/${options.style}.csl`))
      }
      if (options.lang && !csl.locales.has(options.lang)) {
        csl.locales.add(options.lang, await get(`https://${CSL_BASE_URL}/locales@master/locales-${options.lang}.xml`))
      }
    } catch (e) {
      console.error(e)
    }

    const data = await Cite.async(element.dataset.input || element.textContent, {
      ...inputOptions,
      ...getOpts(element.dataset, 'input')
    })
    let output = data.format(format, options)

    // Only remove children after all other code has run, so that if there's an error
    // the DOM still has the 'fallback', whatever that is
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }

    element.insertAdjacentHTML('beforeend', output)
  })
})
