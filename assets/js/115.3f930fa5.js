(window.webpackJsonp=window.webpackJsonp||[]).push([[115],{539:function(t,s,a){"use strict";a.r(s);var e=a(1),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"statuses"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#statuses"}},[t._v("#")]),t._v(" Statuses")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://npmjs.org/package/statuses",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/npm/v/statuses.svg",alt:"NPM Version"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://npmjs.org/package/statuses",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/npm/dm/statuses.svg",alt:"NPM Downloads"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://nodejs.org/en/download",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/node/v/statuses.svg",alt:"Node.js Version"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://travis-ci.org/jshttp/statuses",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/travis/jshttp/statuses.svg",alt:"Build Status"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://coveralls.io/r/jshttp/statuses?branch=master",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://img.shields.io/coveralls/jshttp/statuses.svg",alt:"Test Coverage"}}),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("HTTP status utility for node.")]),t._v(" "),a("p",[t._v("This module provides a list of status codes and messages sourced from\na few different projects:")]),t._v(" "),a("ul",[a("li",[t._v("The "),a("a",{attrs:{href:"https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml",target:"_blank",rel:"noopener noreferrer"}},[t._v("IANA Status Code Registry"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("The "),a("a",{attrs:{href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js project"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("The "),a("a",{attrs:{href:"https://www.nginx.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("NGINX project"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("The "),a("a",{attrs:{href:"https://httpd.apache.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Apache HTTP Server project"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"installation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),a("p",[t._v("This is a "),a("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js"),a("OutboundLink")],1),t._v(" module available through the\n"),a("a",{attrs:{href:"https://www.npmjs.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm registry"),a("OutboundLink")],1),t._v(". Installation is done using the\n"),a("a",{attrs:{href:"https://docs.npmjs.com/getting-started/installing-npm-packages-locally",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("npm install")]),t._v(" command"),a("OutboundLink")],1),t._v(":")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" statuses\n")])])]),a("h2",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" status "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'statuses'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h3",{attrs:{id:"var-code-status-integer-string"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#var-code-status-integer-string"}},[t._v("#")]),t._v(" var code = status(Integer || String)")]),t._v(" "),a("p",[t._v("If "),a("code",[t._v("Integer")]),t._v(" or "),a("code",[t._v("String")]),t._v(" is a valid HTTP code or status message, then the\nappropriate "),a("code",[t._v("code")]),t._v(" will be returned. Otherwise, an error will be thrown.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("status")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("403")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 403")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("status")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'403'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 403")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("status")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'forbidden'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 403")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("status")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Forbidden'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 403")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("status")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("306")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// throws, as it's not supported by node.js")]),t._v("\n")])])]),a("h3",{attrs:{id:"status-status-codes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status-status-codes"}},[t._v("#")]),t._v(" status.STATUS_CODES")]),t._v(" "),a("p",[t._v("Returns an object which maps status codes to status messages, in\nthe same format as the\n"),a("a",{attrs:{href:"https://nodejs.org/dist/latest/docs/api/http.html#http_http_status_codes",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js http module"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("h3",{attrs:{id:"status-codes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status-codes"}},[t._v("#")]),t._v(" status.codes")]),t._v(" "),a("p",[t._v("Returns an array of all the status codes as "),a("code",[t._v("Integer")]),t._v("s.")]),t._v(" "),a("h3",{attrs:{id:"var-msg-status-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#var-msg-status-code"}},[t._v("#")]),t._v(" var msg = status[code]")]),t._v(" "),a("p",[t._v("Map of "),a("code",[t._v("code")]),t._v(" to "),a("code",[t._v("status message")]),t._v(". "),a("code",[t._v("undefined")]),t._v(" for invalid "),a("code",[t._v("code")]),t._v("s.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("status"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("404")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 'Not Found'")]),t._v("\n")])])]),a("h3",{attrs:{id:"var-code-status-msg"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#var-code-status-msg"}},[t._v("#")]),t._v(" var code = status[msg]")]),t._v(" "),a("p",[t._v("Map of "),a("code",[t._v("status message")]),t._v(" to "),a("code",[t._v("code")]),t._v(". "),a("code",[t._v("msg")]),t._v(" can either be title-cased or\nlower-cased. "),a("code",[t._v("undefined")]),t._v(" for invalid "),a("code",[t._v("status message")]),t._v("s.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("status"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'not found'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 404")]),t._v("\nstatus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Not Found'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 404")]),t._v("\n")])])]),a("h3",{attrs:{id:"status-redirect-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status-redirect-code"}},[t._v("#")]),t._v(" status.redirect[code]")]),t._v(" "),a("p",[t._v("Returns "),a("code",[t._v("true")]),t._v(" if a status code is a valid redirect status.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("status"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("redirect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => undefined")]),t._v("\nstatus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("redirect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("301")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => true")]),t._v("\n")])])]),a("h3",{attrs:{id:"status-empty-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status-empty-code"}},[t._v("#")]),t._v(" status.empty[code]")]),t._v(" "),a("p",[t._v("Returns "),a("code",[t._v("true")]),t._v(" if a status code expects an empty body.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("status"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("empty"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => undefined")]),t._v("\nstatus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("empty"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("204")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => true")]),t._v("\nstatus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("empty"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("304")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => true")]),t._v("\n")])])]),a("h3",{attrs:{id:"status-retry-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status-retry-code"}},[t._v("#")]),t._v(" status.retry[code]")]),t._v(" "),a("p",[t._v("Returns "),a("code",[t._v("true")]),t._v(" if you should retry the rest.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("status"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("retry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("501")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => undefined")]),t._v("\nstatus"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("retry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("503")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => true")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);