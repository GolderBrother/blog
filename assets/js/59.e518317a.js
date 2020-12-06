(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{486:function(t,s,e){"use strict";e.r(s);var a=e(1),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"content-disposition"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#content-disposition"}},[t._v("#")]),t._v(" content-disposition")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://npmjs.org/package/content-disposition",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://img.shields.io/npm/v/content-disposition.svg",alt:"NPM Version"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://npmjs.org/package/content-disposition",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://img.shields.io/npm/dm/content-disposition.svg",alt:"NPM Downloads"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://nodejs.org/en/download",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://img.shields.io/node/v/content-disposition.svg",alt:"Node.js Version"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://travis-ci.org/jshttp/content-disposition",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://img.shields.io/travis/jshttp/content-disposition.svg",alt:"Build Status"}}),e("OutboundLink")],1),t._v(" "),e("a",{attrs:{href:"https://coveralls.io/r/jshttp/content-disposition?branch=master",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://img.shields.io/coveralls/jshttp/content-disposition.svg",alt:"Test Coverage"}}),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("Create and parse HTTP "),e("code",[t._v("Content-Disposition")]),t._v(" header")]),t._v(" "),e("h2",{attrs:{id:"installation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" content-disposition\n")])])]),e("h2",{attrs:{id:"api"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" contentDisposition "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'content-disposition'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h3",{attrs:{id:"contentdisposition-filename-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#contentdisposition-filename-options"}},[t._v("#")]),t._v(" contentDisposition(filename, options)")]),t._v(" "),e("p",[t._v("Create an attachment "),e("code",[t._v("Content-Disposition")]),t._v(" header value using the given file name,\nif supplied. The "),e("code",[t._v("filename")]),t._v(" is optional and if no file name is desired, but you\nwant to specify "),e("code",[t._v("options")]),t._v(", set "),e("code",[t._v("filename")]),t._v(" to "),e("code",[t._v("undefined")]),t._v(".")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Disposition'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("contentDisposition")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'∫ maths.pdf'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[e("strong",[t._v("note")]),t._v(" HTTP headers are of the ISO-8859-1 character set. If you are writing this\nheader through a means different from "),e("code",[t._v("setHeader")]),t._v(" in Node.js, you'll want to specify\nthe "),e("code",[t._v("'binary'")]),t._v(" encoding in Node.js.")]),t._v(" "),e("h4",{attrs:{id:"options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[t._v("#")]),t._v(" Options")]),t._v(" "),e("p",[e("code",[t._v("contentDisposition")]),t._v(" accepts these properties in the options object.")]),t._v(" "),e("h5",{attrs:{id:"fallback"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#fallback"}},[t._v("#")]),t._v(" fallback")]),t._v(" "),e("p",[t._v("If the "),e("code",[t._v("filename")]),t._v(" option is outside ISO-8859-1, then the file name is actually\nstored in a supplemental field for clients that support Unicode file names and\na ISO-8859-1 version of the file name is automatically generated.")]),t._v(" "),e("p",[t._v("This specifies the ISO-8859-1 file name to override the automatic generation or\ndisables the generation all together, defaults to "),e("code",[t._v("true")]),t._v(".")]),t._v(" "),e("ul",[e("li",[t._v("A string will specify the ISO-8859-1 file name to use in place of automatic\ngeneration.")]),t._v(" "),e("li",[e("code",[t._v("false")]),t._v(" will disable including a ISO-8859-1 file name and only include the\nUnicode version (unless the file name is already ISO-8859-1).")]),t._v(" "),e("li",[e("code",[t._v("true")]),t._v(" will enable automatic generation if the file name is outside ISO-8859-1.")])]),t._v(" "),e("p",[t._v("If the "),e("code",[t._v("filename")]),t._v(" option is ISO-8859-1 and this option is specified and has a\ndifferent value, then the "),e("code",[t._v("filename")]),t._v(" option is encoded in the extended field\nand this set as the fallback field, even though they are both ISO-8859-1.")]),t._v(" "),e("h5",{attrs:{id:"type"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#type"}},[t._v("#")]),t._v(" type")]),t._v(" "),e("p",[t._v("Specifies the disposition type, defaults to "),e("code",[t._v('"attachment"')]),t._v(". This can also be\n"),e("code",[t._v('"inline"')]),t._v(", or any other value (all values except inline are treated like\n"),e("code",[t._v("attachment")]),t._v(", but can convey additional information if both parties agree to\nit). The type is normalized to lower-case.")]),t._v(" "),e("h3",{attrs:{id:"contentdisposition-parse-string"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#contentdisposition-parse-string"}},[t._v("#")]),t._v(" contentDisposition.parse(string)")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" disposition "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" contentDisposition"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'attachment; filename=\"EURO rates.txt\"; filename*=UTF-8\\'\\'%e2%82%ac%20rates.txt'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("Parse a "),e("code",[t._v("Content-Disposition")]),t._v(' header string. This automatically handles extended\n("Unicode") parameters by decoding them and providing them under the standard\nparameter name. This will return an object with the following properties (examples\nare shown for the string '),e("code",[t._v("'attachment; filename=\"EURO rates.txt\"; filename*=UTF-8\\'\\'%e2%82%ac%20rates.txt'")]),t._v("):")]),t._v(" "),e("ul",[e("li",[e("p",[e("code",[t._v("type")]),t._v(": The disposition type (always lower case). Example: "),e("code",[t._v("'attachment'")])])]),t._v(" "),e("li",[e("p",[e("code",[t._v("parameters")]),t._v(": An object of the parameters in the disposition (name of parameter\nalways lower case and extended versions replace non-extended versions). Example:\n"),e("code",[t._v('{filename: "€ rates.txt"}')])])])]),t._v(" "),e("h2",{attrs:{id:"examples"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),e("h3",{attrs:{id:"send-a-file-for-download"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#send-a-file-for-download"}},[t._v("#")]),t._v(" Send a file for download")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" contentDisposition "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'content-disposition'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" destroy "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'destroy'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" fs "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fs'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" http "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" onFinished "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'on-finished'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" filePath "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/path/to/public/plans.pdf'")]),t._v("\n\nhttp"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("createServer")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("onRequest")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// set headers")]),t._v("\n  res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/pdf'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Disposition'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("contentDisposition")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filePath"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// send file")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" stream "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("createReadStream")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filePath"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  stream"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("pipe")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("onFinished")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("destroy")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stream"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h2",{attrs:{id:"testing"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#testing"}},[t._v("#")]),t._v(" Testing")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v("\n")])])]),e("h2",{attrs:{id:"references"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[t._v("#")]),t._v(" References")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://tools.ietf.org/html/rfc2616",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 2616: Hypertext Transfer Protocol -- HTTP/1.1"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://tools.ietf.org/html/rfc5987",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 5987: Character Set and Language Encoding for Hypertext Transfer Protocol (HTTP) Header Field Parameters"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://tools.ietf.org/html/rfc6266",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 6266: Use of the Content-Disposition Header Field in the Hypertext Transfer Protocol (HTTP)"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"http://greenbytes.de/tech/tc2231/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Test Cases for HTTP Content-Disposition header field (RFC 6266) and the Encodings defined in RFCs 2047, 2231 and 5987"),e("OutboundLink")],1)])]),t._v(" "),e("h2",{attrs:{id:"license"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#license"}},[t._v("#")]),t._v(" License")]),t._v(" "),e("p",[e("a",{attrs:{href:"LICENSE"}},[t._v("MIT")])])])}),[],!1,null,null,null);s.default=n.exports}}]);