'use strict';

require('whatwg-fetch');

var _citationJs = require('citation-js');

var _citationJs2 = _interopRequireDefault(_citationJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global document, fetch */

window.addEventListener('load', function () {
  var elements = Array.prototype.slice.call(document.querySelectorAll('.citation-js.cite'));
  elements.map(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(element) {
      var _element$dataset, _element$dataset$inpu, input, outputStyle, outputLang, outputTemplate, outputLocale, outputTemplateUrl, outputLocaleUrl, options, data, output;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _element$dataset = element.dataset, _element$dataset$inpu = _element$dataset.input, input = _element$dataset$inpu === undefined ? element : _element$dataset$inpu, outputStyle = _element$dataset.outputStyle, outputLang = _element$dataset.outputLang, outputTemplate = _element$dataset.outputTemplate, outputLocale = _element$dataset.outputLocale, outputTemplateUrl = _element$dataset.outputTemplateUrl, outputLocaleUrl = _element$dataset.outputLocaleUrl;
              options = {
                format: 'real',
                type: 'html'
              };


              if (outputStyle) {
                options.style = outputStyle;
              }
              if (outputLang) {
                options.lang = outputLang;
              }

              if (!outputTemplate) {
                _context.next = 8;
                break;
              }

              options.template = outputTemplate;
              _context.next = 14;
              break;

            case 8:
              if (!outputTemplateUrl) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return fetch(outputTemplateUrl);

            case 11:
              _context.next = 13;
              return _context.sent.text();

            case 13:
              options.template = _context.sent;

            case 14:
              if (!outputLocale) {
                _context.next = 18;
                break;
              }

              options.locale = outputLocale;
              _context.next = 24;
              break;

            case 18:
              if (!outputLocaleUrl) {
                _context.next = 24;
                break;
              }

              _context.next = 21;
              return fetch(outputLocaleUrl);

            case 21:
              _context.next = 23;
              return _context.sent.text();

            case 23:
              options.locale = _context.sent;

            case 24:
              _context.next = 26;
              return _citationJs2.default.async(input);

            case 26:
              data = _context.sent;
              output = data.get(options

              // Only remove children after all other code has run, so that if there's an error
              // the DOM still has the 'fallback', whatever that is
              );
              while (element.firstChild) {
                element.removeChild(element.firstChild);
              }

              element.appendChild(output);

            case 30:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});