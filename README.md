# citation.js-replacer

Simple HTML API for [Citation.js](https://larsgw.github.io/citation.js).

##### Table of Contents

* [Get Started](#starting)
  * [Example](#starting.example)
* [Use](#use)
  * [Element](#use.element)
  * [Output options](#use.output)
  * [Special options](#use.special)

## <a id="starting" href="#starting">Get Started</a>

Simply load the js file.

```html
<script src="path/to/replacer.citation.js"></script>
```

You can either download this file from [here](https://github.com/larsgw/citation.js-replacer/blob/master/build/replacer.citation.js), or link it directly from [Rawgit]():

```html
<script src="https://cdn.rawgit.com/larsgw/citation.js-replacer/v0.1.0/build/replacer.citation.js"></script>
```

## <a id="use" href="#use">Use</a>

**citation.js-replacer** is a HTML API, so everything is done by adding HTML to your page.

## <a id="use.element" href="#use.element">Element</a>

To add a reference, insert any element with the classes `citation-js` and `cite`. By default, the program will use the `textContent` of the element as input.

```html
<div class="citation-js cite">Q21972834</div>
```

You can also use pass input with the `data-input` attribute.

```html
<div class="citation-js cite" data-input="Q21972834">This text can now be ignored</div>
```

This is usefull, as you can put a fallback in the element, in case the API fails, JavaScript is blocked or the program doesn't work for another reason.

```html
<div class="citation-js cite" data-input="Q21972834">
  <a href="https://wikidata.org/wiki/Q21972834">Link</a>
</div>
```

## <a id="use.output" href="#use.output">Output options</a>

You can specify output options too, with the `data-output-*` attribute. These are the same as the [Citation.js Output options](https://larsgw.github.io/citation.js/api/#cite.out). However, `format` and `type` are locked to returning DOM Elements.

```html
<div class="citation-js cite" data-input="Q21972834" data-output-style="citation-apa">
  <a href="https://wikidata.org/wiki/Q21972834">Link</a>
</div>
```

## <a id="use.special" href="#use.special">Special options</a>

Because it isn't really handy to put output template strings or locales in attributes, you can pass these by URL too, with the `data-output-*-url` attribute. The rest of the option works the same as the regular `template` and `locale` options.

```html
<div class="citation-js cite" data-input="Q21972834" data-output-style="citation-bioinformatics" data-output-template-url="https://cdn.rawgit.com/citation-style-language/styles/914266b9/bioinformatics.csl">
  <a href="https://wikidata.org/wiki/Q21972834">Link</a>
</div>
```

You can, for example, load style files from the [CSL styles repo](https://github.com/citation-style-language/styles). Note that you shouldn't directly link to GitHub here, but instead use a service like [Rawgit](https://rawgit.com/) (to take the load off of the GitHub servers).

### using
![Citation.js](https://larsgw.github.io/citation.js/static/img/banner.png)