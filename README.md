# @citation-js/replacer

Simple HTML API for [Citation.js](https://citation.js.org).

##### Table of Contents

* [Get Started](#starting)
  * [Example](#starting.example)
* [Use](#use)
  * [Element](#use.element)
  * [Output options](#use.output)
  * [Special options](#use.special)

## <a id="starting" href="#starting">Get Started</a>

Create a bundle with the plugins you want to use with the [Bundle Tool](https://github.com/citation-js/bundle-tool) ([here](https://juniper-coat.glitch.me)).

## <a id="use" href="#use">Use</a>

**citation.js-replacer** is a HTML API, so everything is done by adding HTML to your page.

## <a id="use.element" href="#use.element">Element</a>

To add a reference, insert any element with the class `citation-js`. By default, the program will use the `textContent` of the element as input.

```html
<div class="citation-js">Q21972834</div>
```

You can also use pass input with the `data-input` attribute.

```html
<div class="citation-js" data-input="Q21972834">This text can now be ignored</div>
```

This is usefull, as you can put a fallback in the element, in case the API fails, JavaScript is blocked or the program doesn't work for another reason.

```html
<div class="citation-js" data-input="Q21972834">
  <a href="https://wikidata.org/wiki/Q21972834">Link</a>
</div>
```

## <a id="use.output" href="#use.output">Output options</a>

You can specify output options too, with the `data-output-*` attribute. These are the same as the [Citation.js Output options](https://citation.js.org/api/tutorial-output_formats.html). `data-output-format` is reserved for the format name (`bibliography`, `citation`, `bibtex`). It automatically fetches templates and styles that are not built into Citation.js.

```html
<div class="citation-js" data-input="Q21972834" data-output-format="bibliography" data-output-template="apa">
  <a href="https://wikidata.org/wiki/Q21972834">Link</a>
</div>
```

## <a id="use.special" href="#use.special">Special options</a>

[Input options](https://citation.js.org/api/tutorial-input_options.html) and [plugin configuration](https://citation.js.org/api/tutorial-plugins.html#config) can be set by `data-input-*` and `data-plugin-$PLUGIN-*` respectively.

### using
![Citation.js](https://larsgw.github.io/citation.js/static/img/banner.png)
