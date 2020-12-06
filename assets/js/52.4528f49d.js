(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{476:function(t,s,e){"use strict";e.r(s);var a=e(1),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"accepts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#accepts"}},[t._v("#")]),t._v(" accepts")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://npmjs.org/package/accepts",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/npm/v/accepts",alt:"NPM Version"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://npmjs.org/package/accepts",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/npm/dm/accepts",alt:"NPM Downloads"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://nodejs.org/en/download",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/npm/node/accepts",alt:"Node.js Version"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://travis-ci.org/jshttp/accepts",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/travis/jshttp/accepts/master",alt:"Build Status"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://coveralls.io/r/jshttp/accepts?branch=master",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://badgen.net/coveralls/c/github/jshttp/accepts/master",alt:"Test Coverage"}}),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("Higher level content negotiation based on "),e("a",{attrs:{href:"https://www.npmjs.com/package/negotiator",target:"_blank",rel:"noopener noreferrer"}},[t._v("negotiator"),e("OutboundLink")],1),t._v(".\nExtracted from "),e("a",{attrs:{href:"https://www.npmjs.com/package/koa",target:"_blank",rel:"noopener noreferrer"}},[t._v("koa"),e("OutboundLink")],1),t._v(" for general use.")]),t._v(" "),e("p",[t._v("In addition to negotiator, it allows:")]),t._v(" "),e("ul",[e("li",[t._v("Allows types as an array or arguments list, ie "),e("code",[t._v("(['text/html', 'application/json'])")]),t._v("\nas well as "),e("code",[t._v("('text/html', 'application/json')")]),t._v(".")]),t._v(" "),e("li",[t._v("Allows type shorthands such as "),e("code",[t._v("json")]),t._v(".")]),t._v(" "),e("li",[t._v("Returns "),e("code",[t._v("false")]),t._v(" when no types match")]),t._v(" "),e("li",[t._v("Treats non-existent headers as "),e("code",[t._v("*")])])]),t._v(" "),e("h2",{attrs:{id:"installation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),e("p",[t._v("This is a "),e("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js"),e("OutboundLink")],1),t._v(" module available through the\n"),e("a",{attrs:{href:"https://www.npmjs.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm registry"),e("OutboundLink")],1),t._v(". Installation is done using the\n"),e("a",{attrs:{href:"https://docs.npmjs.com/getting-started/installing-npm-packages-locally",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("npm install")]),t._v(" command"),e("OutboundLink")],1),t._v(":")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" accepts\n")])])]),e("h2",{attrs:{id:"api"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" accepts "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accepts'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h3",{attrs:{id:"accepts-req"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#accepts-req"}},[t._v("#")]),t._v(" accepts(req)")]),t._v(" "),e("p",[t._v("Create a new "),e("code",[t._v("Accepts")]),t._v(" object for the given "),e("code",[t._v("req")]),t._v(".")]),t._v(" "),e("h4",{attrs:{id:"charset-charsets"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#charset-charsets"}},[t._v("#")]),t._v(" .charset(charsets)")]),t._v(" "),e("p",[t._v("Return the first accepted charset. If nothing in "),e("code",[t._v("charsets")]),t._v(" is accepted,\nthen "),e("code",[t._v("false")]),t._v(" is returned.")]),t._v(" "),e("h4",{attrs:{id:"charsets"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#charsets"}},[t._v("#")]),t._v(" .charsets()")]),t._v(" "),e("p",[t._v("Return the charsets that the request accepts, in the order of the client's\npreference (most preferred first).")]),t._v(" "),e("h4",{attrs:{id:"encoding-encodings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#encoding-encodings"}},[t._v("#")]),t._v(" .encoding(encodings)")]),t._v(" "),e("p",[t._v("Return the first accepted encoding. If nothing in "),e("code",[t._v("encodings")]),t._v(" is accepted,\nthen "),e("code",[t._v("false")]),t._v(" is returned.")]),t._v(" "),e("h4",{attrs:{id:"encodings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#encodings"}},[t._v("#")]),t._v(" .encodings()")]),t._v(" "),e("p",[t._v("Return the encodings that the request accepts, in the order of the client's\npreference (most preferred first).")]),t._v(" "),e("h4",{attrs:{id:"language-languages"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#language-languages"}},[t._v("#")]),t._v(" .language(languages)")]),t._v(" "),e("p",[t._v("Return the first accepted language. If nothing in "),e("code",[t._v("languages")]),t._v(" is accepted,\nthen "),e("code",[t._v("false")]),t._v(" is returned.")]),t._v(" "),e("h4",{attrs:{id:"languages"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#languages"}},[t._v("#")]),t._v(" .languages()")]),t._v(" "),e("p",[t._v("Return the languages that the request accepts, in the order of the client's\npreference (most preferred first).")]),t._v(" "),e("h4",{attrs:{id:"type-types"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#type-types"}},[t._v("#")]),t._v(" .type(types)")]),t._v(" "),e("p",[t._v("Return the first accepted type (and it is returned as the same text as what\nappears in the "),e("code",[t._v("types")]),t._v(" array). If nothing in "),e("code",[t._v("types")]),t._v(" is accepted, then "),e("code",[t._v("false")]),t._v("\nis returned.")]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("types")]),t._v(" array can contain full MIME types or file extensions. Any value\nthat is not a full MIME types is passed to "),e("code",[t._v("require('mime-types').lookup")]),t._v(".")]),t._v(" "),e("h4",{attrs:{id:"types"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#types"}},[t._v("#")]),t._v(" .types()")]),t._v(" "),e("p",[t._v("Return the types that the request accepts, in the order of the client's\npreference (most preferred first).")]),t._v(" "),e("h2",{attrs:{id:"examples"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),e("h3",{attrs:{id:"simple-type-negotiation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#simple-type-negotiation"}},[t._v("#")]),t._v(" Simple type negotiation")]),t._v(" "),e("p",[t._v("This simple example shows how to use "),e("code",[t._v("accepts")]),t._v(" to return a different typed\nrespond body based on what the client wants to accept. The server lists it's\npreferences in order and will get back the best match between the client and\nserver.")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" accepts "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accepts'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" http "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("app")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" accept "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("accepts")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("req"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the order of this list is significant; should be server preferred order")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("accept"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'json'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'html'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'json'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/json'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{"hello":"world!"}\'')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'html'")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/html'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<b>hello, world!</b>'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the fallback is text/plain, so no need to specify it above")]),t._v("\n      res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/plain'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello, world!'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nhttp"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("createServer")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("listen")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("You can test this out with the cURL program:")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -I -H"),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Accept: text/html'")]),t._v(" http://localhost:3000/\n")])])]),e("h2",{attrs:{id:"license"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#license"}},[t._v("#")]),t._v(" License")]),t._v(" "),e("p",[e("a",{attrs:{href:"LICENSE"}},[t._v("MIT")])])])}),[],!1,null,null,null);s.default=n.exports}}]);