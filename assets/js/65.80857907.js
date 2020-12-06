(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{483:function(t,e,a){"use strict";a.r(e);var s=a(1),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"depd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#depd"}},[t._v("#")]),t._v(" depd")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://npmjs.org/package/depd",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/npm/v/depd",alt:"NPM Version"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://npmjs.org/package/depd",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/npm/dm/depd",alt:"NPM Downloads"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://nodejs.org/en/download/",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/npm/node/depd",alt:"Node.js Version"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://travis-ci.org/dougwilson/nodejs-depd",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/travis/dougwilson/nodejs-depd/master?label=linux",alt:"Linux Build"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://ci.appveyor.com/project/dougwilson/nodejs-depd",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/appveyor/ci/dougwilson/nodejs-depd/master?label=windows",alt:"Windows Build"}}),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://coveralls.io/r/dougwilson/nodejs-depd?branch=master",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:"https://badgen.net/coveralls/c/github/dougwilson/nodejs-depd/master",alt:"Coverage Status"}}),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("Deprecate all the things")]),t._v(" "),a("blockquote",[a("p",[t._v("With great modules comes great responsibility; mark things deprecated!")])]),t._v(" "),a("h2",{attrs:{id:"install"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install"}},[t._v("#")]),t._v(" Install")]),t._v(" "),a("p",[t._v("This module is installed directly using "),a("code",[t._v("npm")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" depd\n")])])]),a("p",[t._v("This module can also be bundled with systems like\n"),a("a",{attrs:{href:"http://browserify.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Browserify"),a("OutboundLink")],1),t._v(" or "),a("a",{attrs:{href:"https://webpack.github.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("webpack"),a("OutboundLink")],1),t._v(",\nthough by default this module will alter it's API to no longer display or\ntrack deprecations.")]),t._v(" "),a("h2",{attrs:{id:"api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[t._v("#")]),t._v(" API")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" deprecate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'depd'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("This library allows you to display deprecation messages to your users.\nThis library goes above and beyond with deprecation warnings by\nintrospection of the call stack (but only the bits that it is interested\nin).")]),t._v(" "),a("p",[t._v("Instead of just warning on the first invocation of a deprecated\nfunction and never again, this module will warn on the first invocation\nof a deprecated function per unique call site, making it ideal to alert\nusers of all deprecated uses across the code base, rather than just\nwhatever happens to execute first.")]),t._v(" "),a("p",[t._v("The deprecation warnings from this module also include the file and line\ninformation for the call into the module that the deprecated function was\nin.")]),t._v(" "),a("p",[a("strong",[t._v("NOTE")]),t._v(" this library has a similar interface to the "),a("code",[t._v("debug")]),t._v(" module, and\nthis module uses the calling file to get the boundary for the call stacks,\nso you should always create a new "),a("code",[t._v("deprecate")]),t._v(" object in each file and not\nwithin some central file.")]),t._v(" "),a("h3",{attrs:{id:"depd-namespace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#depd-namespace"}},[t._v("#")]),t._v(" depd(namespace)")]),t._v(" "),a("p",[t._v("Create a new deprecate function that uses the given namespace name in the\nmessages and will display the call site prior to the stack entering the\nfile this function was called from. It is highly suggested you use the\nname of your module as the namespace.")]),t._v(" "),a("h3",{attrs:{id:"deprecate-message"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deprecate-message"}},[t._v("#")]),t._v(" deprecate(message)")]),t._v(" "),a("p",[t._v("Call this function from deprecated code to display a deprecation message.\nThis message will appear once per unique caller site. Caller site is the\nfirst call site in the stack in a different file from the caller of this\nfunction.")]),t._v(" "),a("p",[t._v("If the message is omitted, a message is generated for you based on the site\nof the "),a("code",[t._v("deprecate()")]),t._v(" call and will display the name of the function called,\nsimilar to the name displayed in a stack trace.")]),t._v(" "),a("h3",{attrs:{id:"deprecate-function-fn-message"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deprecate-function-fn-message"}},[t._v("#")]),t._v(" deprecate.function(fn, message)")]),t._v(" "),a("p",[t._v("Call this function to wrap a given function in a deprecation message on any\ncall to the function. An optional message can be supplied to provide a custom\nmessage.")]),t._v(" "),a("h3",{attrs:{id:"deprecate-property-obj-prop-message"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deprecate-property-obj-prop-message"}},[t._v("#")]),t._v(" deprecate.property(obj, prop, message)")]),t._v(" "),a("p",[t._v("Call this function to wrap a given property on object in a deprecation message\non any accessing or setting of the property. An optional message can be supplied\nto provide a custom message.")]),t._v(" "),a("p",[t._v("The method must be called on the object where the property belongs (not\ninherited from the prototype).")]),t._v(" "),a("p",[t._v("If the property is a data descriptor, it will be converted to an accessor\ndescriptor in order to display the deprecation message.")]),t._v(" "),a("h3",{attrs:{id:"process-on-deprecation-fn"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#process-on-deprecation-fn"}},[t._v("#")]),t._v(" process.on('deprecation', fn)")]),t._v(" "),a("p",[t._v('This module will allow easy capturing of deprecation errors by emitting the\nerrors as the type "deprecation" on the global '),a("code",[t._v("process")]),t._v(". If there are no\nlisteners for this type, the errors are written to STDERR as normal, but if\nthere are any listeners, nothing will be written to STDERR and instead only\nemitted. From there, you can write the errors in a different format or to a\nlogging source.")]),t._v(" "),a("p",[t._v("The error represents the deprecation and is emitted only once with the same\nrules as writing to STDERR. The error has the following properties:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("message")]),t._v(" - This is the message given by the library")]),t._v(" "),a("li",[a("code",[t._v("name")]),t._v(" - This is always "),a("code",[t._v("'DeprecationError'")])]),t._v(" "),a("li",[a("code",[t._v("namespace")]),t._v(" - This is the namespace the deprecation came from")]),t._v(" "),a("li",[a("code",[t._v("stack")]),t._v(" - This is the stack of the call to the deprecated thing")])]),t._v(" "),a("p",[t._v("Example "),a("code",[t._v("error.stack")]),t._v(" output:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("DeprecationError: my-cool-module deprecated oldfunction\n    at Object.<anonymous> ([eval]-wrapper:6:22)\n    at Module._compile (module.js:456:26)\n    at evalScript (node.js:532:25)\n    at startup (node.js:80:7)\n    at node.js:902:3\n")])])]),a("h3",{attrs:{id:"process-env-no-deprecation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#process-env-no-deprecation"}},[t._v("#")]),t._v(" process.env.NO_DEPRECATION")]),t._v(" "),a("p",[t._v("As a user of modules that are deprecated, the environment variable "),a("code",[t._v("NO_DEPRECATION")]),t._v("\nis provided as a quick solution to silencing deprecation warnings from being\noutput. The format of this is similar to that of "),a("code",[t._v("DEBUG")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("NO_DEPRECATION")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("my-module,othermod node app.js\n")])])]),a("p",[t._v('This will suppress deprecations from being output for "my-module" and "othermod".\nThe value is a list of comma-separated namespaces. To suppress every warning\nacross all namespaces, use the value '),a("code",[t._v("*")]),t._v(" for a namespace.")]),t._v(" "),a("p",[t._v("Providing the argument "),a("code",[t._v("--no-deprecation")]),t._v(" to the "),a("code",[t._v("node")]),t._v(" executable will suppress\nall deprecations (only available in Node.js 0.8 or higher).")]),t._v(" "),a("p",[a("strong",[t._v("NOTE")]),t._v(' This will not suppress the deperecations given to any "deprecation"\nevent listeners, just the output to STDERR.')]),t._v(" "),a("h3",{attrs:{id:"process-env-trace-deprecation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#process-env-trace-deprecation"}},[t._v("#")]),t._v(" process.env.TRACE_DEPRECATION")]),t._v(" "),a("p",[t._v("As a user of modules that are deprecated, the environment variable "),a("code",[t._v("TRACE_DEPRECATION")]),t._v("\nis provided as a solution to getting more detailed location information in deprecation\nwarnings by including the entire stack trace. The format of this is the same as\n"),a("code",[t._v("NO_DEPRECATION")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("TRACE_DEPRECATION")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("my-module,othermod node app.js\n")])])]),a("p",[t._v('This will include stack traces for deprecations being output for "my-module" and\n"othermod". The value is a list of comma-separated namespaces. To trace every\nwarning across all namespaces, use the value '),a("code",[t._v("*")]),t._v(" for a namespace.")]),t._v(" "),a("p",[t._v("Providing the argument "),a("code",[t._v("--trace-deprecation")]),t._v(" to the "),a("code",[t._v("node")]),t._v(" executable will trace\nall deprecations (only available in Node.js 0.8 or higher).")]),t._v(" "),a("p",[a("strong",[t._v("NOTE")]),t._v(" This will not trace the deperecations silenced by "),a("code",[t._v("NO_DEPRECATION")]),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"display"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#display"}},[t._v("#")]),t._v(" Display")]),t._v(" "),a("p",[a("img",{attrs:{src:"files/message.png",alt:"message"}})]),t._v(" "),a("p",[t._v("When a user calls a function in your library that you mark deprecated, they\nwill see the following written to STDERR (in the given colors, similar colors\nand layout to the "),a("code",[t._v("debug")]),t._v(" module):")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('bright cyan    bright yellow\n|              |          reset       cyan\n|              |          |           |\n▼              ▼          ▼           ▼\nmy-cool-module deprecated oldfunction [eval]-wrapper:6:22\n▲              ▲          ▲           ▲\n|              |          |           |\nnamespace      |          |           location of mycoolmod.oldfunction() call\n               |          deprecation message\n               the word "deprecated"\n')])])]),a("p",[t._v("If the user redirects their STDERR to a file or somewhere that does not support\ncolors, they see (similar layout to the "),a("code",[t._v("debug")]),t._v(" module):")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Sun, 15 Jun 2014 05:21:37 GMT my-cool-module deprecated oldfunction at [eval]-wrapper:6:22\n▲                             ▲              ▲          ▲              ▲\n|                             |              |          |              |\ntimestamp of message          namespace      |          |             location of mycoolmod.oldfunction() call\n                                             |          deprecation message\n                                             the word "deprecated"\n')])])]),a("h2",{attrs:{id:"examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),a("h3",{attrs:{id:"deprecating-all-calls-to-a-function"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deprecating-all-calls-to-a-function"}},[t._v("#")]),t._v(" Deprecating all calls to a function")]),t._v(" "),a("p",[t._v('This will display a deprecated message about "oldfunction" being deprecated\nfrom "my-module" on STDERR.')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" deprecate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'depd'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-cool-module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// message automatically derived from function name")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Object.oldfunction")]),t._v("\nexports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("oldfunction "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" deprecate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("oldfunction")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// all calls to function are deprecated")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// specific message")]),t._v("\nexports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("oldfunction "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" deprecate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// all calls to function are deprecated")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'oldfunction'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h3",{attrs:{id:"conditionally-deprecating-a-function-call"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conditionally-deprecating-a-function-call"}},[t._v("#")]),t._v(" Conditionally deprecating a function call")]),t._v(" "),a("p",[t._v('This will display a deprecated message about "weirdfunction" being deprecated\nfrom "my-module" on STDERR when called with less than 2 arguments.')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" deprecate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'depd'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-cool-module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nexports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("weirdfunction")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arguments"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// calls with 0 or 1 args are deprecated")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deprecate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'weirdfunction args < 2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("When calling "),a("code",[t._v("deprecate")]),t._v(" as a function, the warning is counted per call site\nwithin your own module, so you can display different deprecations depending\non different situations and the users will still get all the warnings:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" deprecate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'depd'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-cool-module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nexports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("weirdfunction")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arguments"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// calls with 0 or 1 args are deprecated")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deprecate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'weirdfunction args < 2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" arguments"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// calls with non-string first argument are deprecated")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deprecate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'weirdfunction non-string first arg'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"deprecating-property-access"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deprecating-property-access"}},[t._v("#")]),t._v(" Deprecating property access")]),t._v(" "),a("p",[t._v('This will display a deprecated message about "oldprop" being deprecated\nfrom "my-module" on STDERR when accessed. A deprecation will be displayed\nwhen setting the value and when getting the value.')]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" deprecate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'depd'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-cool-module'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nexports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("oldprop "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'something'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// message automatically derives from property name")]),t._v("\ndeprecate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("property")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'oldprop'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// explicit message")]),t._v("\ndeprecate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("property")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'oldprop'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'oldprop >= 0.10'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"license"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#license"}},[t._v("#")]),t._v(" License")]),t._v(" "),a("p",[a("a",{attrs:{href:"LICENSE"}},[t._v("MIT")])])])}),[],!1,null,null,null);e.default=n.exports}}]);