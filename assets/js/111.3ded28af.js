(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{532:function(s,t,a){"use strict";a.r(t);var n=a(1),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"parseurl"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parseurl"}},[s._v("#")]),s._v(" parseurl")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://npmjs.org/package/parseurl",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/npm/v/parseurl",alt:"NPM Version"}}),a("OutboundLink")],1),s._v(" "),a("a",{attrs:{href:"https://npmjs.org/package/parseurl",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/npm/dm/parseurl",alt:"NPM Downloads"}}),a("OutboundLink")],1),s._v(" "),a("a",{attrs:{href:"https://nodejs.org/en/download",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/npm/node/parseurl",alt:"Node.js Version"}}),a("OutboundLink")],1),s._v(" "),a("a",{attrs:{href:"https://travis-ci.org/pillarjs/parseurl",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/travis/pillarjs/parseurl/master",alt:"Build Status"}}),a("OutboundLink")],1),s._v(" "),a("a",{attrs:{href:"https://coveralls.io/r/pillarjs/parseurl?branch=master",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/coveralls/c/github/pillarjs/parseurl/master",alt:"Test Coverage"}}),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("Parse a URL with memoization.")]),s._v(" "),a("h2",{attrs:{id:"install"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install"}},[s._v("#")]),s._v(" Install")]),s._v(" "),a("p",[s._v("This is a "),a("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Node.js"),a("OutboundLink")],1),s._v(" module available through the\n"),a("a",{attrs:{href:"https://www.npmjs.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("npm registry"),a("OutboundLink")],1),s._v(". Installation is done using the\n"),a("a",{attrs:{href:"https://docs.npmjs.com/getting-started/installing-npm-packages-locally",target:"_blank",rel:"noopener noreferrer"}},[a("code",[s._v("npm install")]),s._v(" command"),a("OutboundLink")],1),s._v(":")]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" parseurl\n")])])]),a("h2",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[s._v("#")]),s._v(" API")]),s._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" parseurl "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'parseurl'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("h3",{attrs:{id:"parseurl-req"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parseurl-req"}},[s._v("#")]),s._v(" parseurl(req)")]),s._v(" "),a("p",[s._v("Parse the URL of the given request object (looks at the "),a("code",[s._v("req.url")]),s._v(" property)\nand return the result. The result is the same as "),a("code",[s._v("url.parse")]),s._v(" in Node.js core.\nCalling this function multiple times on the same "),a("code",[s._v("req")]),s._v(" where "),a("code",[s._v("req.url")]),s._v(" does\nnot change will return a cached parsed object, rather than parsing again.")]),s._v(" "),a("h3",{attrs:{id:"parseurl-original-req"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parseurl-original-req"}},[s._v("#")]),s._v(" parseurl.original(req)")]),s._v(" "),a("p",[s._v("Parse the original URL of the given request object and return the result.\nThis works by trying to parse "),a("code",[s._v("req.originalUrl")]),s._v(" if it is a string, otherwise\nparses "),a("code",[s._v("req.url")]),s._v(". The result is the same as "),a("code",[s._v("url.parse")]),s._v(" in Node.js core.\nCalling this function multiple times on the same "),a("code",[s._v("req")]),s._v(" where "),a("code",[s._v("req.originalUrl")]),s._v("\ndoes not change will return a cached parsed object, rather than parsing again.")]),s._v(" "),a("h2",{attrs:{id:"benchmark"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#benchmark"}},[s._v("#")]),s._v(" Benchmark")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run-script bench\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" parseurl@1.3.3 bench nodejs-parseurl\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" node benchmark/index.js\n\n  http_parser@2.8.0\n  node@10.6.0\n  v8@6.7.288.46-node.13\n  uv@1.21.0\n  zlib@1.2.11\n  ares@1.14.0\n  modules@64\n  nghttp2@1.32.0\n  napi@3\n  openssl@1.1.0h\n  icu@61.1\n  unicode@10.0\n  cldr@33.0\n  tz@2018c\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" node benchmark/fullurl.js\n\n  Parsing URL "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://localhost:8888/foo/bar?user=tj&pet=fluffy"')]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" tests completed.\n\n  fasturl            x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,207")]),s._v(",842 ops/sec ±3.76% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("184")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - legacy x   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("507,180")]),s._v(" ops/sec ±0.82% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("191")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - whatwg x   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("290,044")]),s._v(" ops/sec ±1.96% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("189")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  parseurl           x   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("488,907")]),s._v(" ops/sec ±2.13% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" node benchmark/pathquery.js\n\n  Parsing URL "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/foo/bar?user=tj&pet=fluffy"')]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" tests completed.\n\n  fasturl            x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3,812")]),s._v(",564 ops/sec ±3.15% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("188")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - legacy x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,651")]),s._v(",631 ops/sec ±1.68% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("189")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - whatwg x   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("161,837")]),s._v(" ops/sec ±2.26% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("189")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  parseurl           x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4,166")]),s._v(",338 ops/sec ±2.23% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("184")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" node benchmark/samerequest.js\n\n  Parsing URL "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/foo/bar?user=tj&pet=fluffy"')]),s._v(" on same request object\n\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" tests completed.\n\n  fasturl            x  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3,821")]),s._v(",651 ops/sec ±2.42% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("185")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - legacy x  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2,651")]),s._v(",162 ops/sec ±1.90% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("187")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - whatwg x    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("175,166")]),s._v(" ops/sec ±1.44% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("188")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  parseurl           x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("14,912")]),s._v(",606 ops/sec ±3.59% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("183")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" node benchmark/simplepath.js\n\n  Parsing URL "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/foo/bar"')]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" tests completed.\n\n  fasturl            x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("12,421")]),s._v(",765 ops/sec ±2.04% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("191")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - legacy x  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7,546")]),s._v(",036 ops/sec ±1.41% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("188")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - whatwg x    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("198,843")]),s._v(" ops/sec ±1.83% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("189")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  parseurl           x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24,244")]),s._v(",006 ops/sec ±0.51% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("194")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" node benchmark/slash.js\n\n  Parsing URL "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" tests completed.\n\n  fasturl            x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("17,159")]),s._v(",456 ops/sec ±3.25% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("188")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - legacy x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11,635")]),s._v(",097 ops/sec ±3.79% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("184")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  nativeurl - whatwg x    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("240,693")]),s._v(" ops/sec ±0.83% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("189")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  parseurl           x "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("42,279")]),s._v(",067 ops/sec ±0.55% "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("190")]),s._v(" runs sampled"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("h2",{attrs:{id:"license"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#license"}},[s._v("#")]),s._v(" License")]),s._v(" "),a("p",[a("a",{attrs:{href:"LICENSE"}},[s._v("MIT")])])])}),[],!1,null,null,null);t.default=e.exports}}]);