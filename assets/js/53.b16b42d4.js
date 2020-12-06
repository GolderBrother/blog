(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{479:function(t,s,e){"use strict";e.r(s);var a=e(1),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"any-promise"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#any-promise"}},[t._v("#")]),t._v(" Any Promise")]),t._v(" "),e("p",[e("a",{attrs:{href:"http://travis-ci.org/kevinbeaty/any-promise",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:"https://secure.travis-ci.org/kevinbeaty/any-promise.svg",alt:"Build Status"}}),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("Let your library support any ES 2015 (ES6) compatible "),e("code",[t._v("Promise")]),t._v(" and leave the choice to application authors. The application can "),e("em",[t._v("optionally")]),t._v(" register its preferred "),e("code",[t._v("Promise")]),t._v(" implementation and it will be exported when requiring "),e("code",[t._v("any-promise")]),t._v(" from library code.")]),t._v(" "),e("p",[t._v("If no preference is registered, defaults to the global "),e("code",[t._v("Promise")]),t._v(" for newer Node.js versions. The browser version defaults to the window "),e("code",[t._v("Promise")]),t._v(", so polyfill or register as necessary.")]),t._v(" "),e("h3",{attrs:{id:"usage-with-global-promise"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#usage-with-global-promise"}},[t._v("#")]),t._v(" Usage with global Promise:")]),t._v(" "),e("p",[t._v("Assuming the global "),e("code",[t._v("Promise")]),t._v(" is the desired implementation:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Install any libraries depending on any-promise")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" mz\n")])])]),e("p",[t._v("The installed libraries will use global Promise by default.")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// in library")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" Promise "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the global Promise")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("promiseReturningFunction")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h3",{attrs:{id:"usage-with-registration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#usage-with-registration"}},[t._v("#")]),t._v(" Usage with registration:")]),t._v(" "),e("p",[t._v("Assuming "),e("code",[t._v("bluebird")]),t._v(" is the desired Promise implementation:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Install preferred promise library")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" bluebird\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Install any-promise to allow registration")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" any-promise\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Install any libraries you would like to use depending on any-promise")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" mz\n")])])]),e("p",[t._v("Register your preference in the application entry point before any other "),e("code",[t._v("require")]),t._v(" of packages that load "),e("code",[t._v("any-promise")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// top of application index.js or other entry point")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise/register/bluebird'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -or- Equivalent to above, but allows customization of Promise library")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise/register'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bluebird'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Promise"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bluebird'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("Now that the implementation is registered, you can use any package depending on "),e("code",[t._v("any-promise")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" fsp "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mz/fs'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mz/fs will use registered bluebird promises")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" Promise "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the registered bluebird promise ")]),t._v("\n")])])]),e("p",[t._v("It is safe to call "),e("code",[t._v("register")]),t._v(" multiple times, but it must always be with the same implementation.")]),t._v(" "),e("p",[t._v("Again, registration is "),e("em",[t._v("optional")]),t._v(". It should only be called by the application user if overriding the global "),e("code",[t._v("Promise")]),t._v(" implementation is desired.")]),t._v(" "),e("h3",{attrs:{id:"optional-application-registration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#optional-application-registration"}},[t._v("#")]),t._v(" Optional Application Registration")]),t._v(" "),e("p",[t._v("As an application author, you can "),e("em",[t._v("optionally")]),t._v(" register a preferred "),e("code",[t._v("Promise")]),t._v(" implementation on application startup (before any call to "),e("code",[t._v("require('any-promise')")]),t._v(":")]),t._v(" "),e("p",[t._v("You must register your preference before any call to "),e("code",[t._v("require('any-promise')")]),t._v(" (by you or required packages), and only one implementation can be registered. Typically, this registration would occur at the top of the application entry point.")]),t._v(" "),e("h4",{attrs:{id:"registration-shortcuts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#registration-shortcuts"}},[t._v("#")]),t._v(" Registration shortcuts")]),t._v(" "),e("p",[t._v("If you are using a known "),e("code",[t._v("Promise")]),t._v(" implementation, you can register your preference with a shortcut:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise/register/bluebird'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -or-")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise/register/q'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("Shortcut registration is the preferred registration method as it works in the browser and Node.js. It is also convenient for using with "),e("code",[t._v("import")]),t._v(" and many test runners, that offer a "),e("code",[t._v("--require")]),t._v(" flag:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ ava --require=any-promise/register/bluebird test.js\n")])])]),e("p",[t._v("Current known implementations include "),e("code",[t._v("bluebird")]),t._v(", "),e("code",[t._v("q")]),t._v(", "),e("code",[t._v("when")]),t._v(", "),e("code",[t._v("rsvp")]),t._v(", "),e("code",[t._v("es6-promise")]),t._v(", "),e("code",[t._v("promise")]),t._v(", "),e("code",[t._v("native-promise-only")]),t._v(", "),e("code",[t._v("pinkie")]),t._v(", "),e("code",[t._v("vow")]),t._v(" and "),e("code",[t._v("lie")]),t._v(". If you are not using a known implementation, you can use another registration method described below.")]),t._v(" "),e("h4",{attrs:{id:"basic-registration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#basic-registration"}},[t._v("#")]),t._v(" Basic Registration")]),t._v(" "),e("p",[t._v("As an alternative to registration shortcuts, you can call the "),e("code",[t._v("register")]),t._v(" function with the preferred "),e("code",[t._v("Promise")]),t._v(" implementation. The benefit of this approach is that a "),e("code",[t._v("Promise")]),t._v(" library can be required by name without being a known implementation.  This approach does NOT work in the browser. To use "),e("code",[t._v("any-promise")]),t._v(" in the browser use either registration shortcuts or specify the "),e("code",[t._v("Promise")]),t._v(" constructor using advanced registration (see below).")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise/register'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'when'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -or- require('any-promise/register')('any other ES6 compatible library (known or otherwise)')")]),t._v("\n")])])]),e("p",[t._v("This registration method will try to detect the "),e("code",[t._v("Promise")]),t._v(" constructor from requiring the specified implementation.  If you would like to specify your own constructor, see advanced registration.")]),t._v(" "),e("h4",{attrs:{id:"advanced-registration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#advanced-registration"}},[t._v("#")]),t._v(" Advanced Registration")]),t._v(" "),e("p",[t._v("To use the browser version, you should either install a polyfill or explicitly register the "),e("code",[t._v("Promise")]),t._v(" constructor:")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise/register'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bluebird'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Promise"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bluebird'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("This could also be used for registering a custom "),e("code",[t._v("Promise")]),t._v(" implementation or subclass.")]),t._v(" "),e("p",[t._v("Your preference will be registered globally, allowing a single registration even if multiple versions of "),e("code",[t._v("any-promise")]),t._v(" are installed in the NPM dependency tree or are using multiple bundled JavaScript files in the browser. You can bypass this global registration in options:")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../register'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'es6-promise'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Promise"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'es6-promise'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Promise"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" global"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h3",{attrs:{id:"library-usage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#library-usage"}},[t._v("#")]),t._v(" Library Usage")]),t._v(" "),e("p",[t._v("To use any "),e("code",[t._v("Promise")]),t._v(" constructor, simply require it:")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" Promise "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'any-promise'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Promise\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("all")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("xf"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" f"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" init"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" coll"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fn"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("reject")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])]),e("p",[t._v("Except noted below, libraries using "),e("code",[t._v("any-promise")]),t._v(" should only use "),e("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",target:"_blank",rel:"noopener noreferrer"}},[t._v("documented"),e("OutboundLink")],1),t._v(" functions as there is no guarantee which implementation will be chosen by the application author.  Libraries should never call "),e("code",[t._v("register")]),t._v(", only the application user should call if desired.")]),t._v(" "),e("h4",{attrs:{id:"advanced-library-usage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#advanced-library-usage"}},[t._v("#")]),t._v(" Advanced Library Usage")]),t._v(" "),e("p",[t._v("If your library needs to branch code based on the registered implementation, you can retrieve it using "),e("code",[t._v("var impl = require('any-promise/implementation')")]),t._v(", where "),e("code",[t._v("impl")]),t._v(" will be the package name ("),e("code",[t._v('"bluebird"')]),t._v(", "),e("code",[t._v('"when"')]),t._v(", etc.) if registered, "),e("code",[t._v('"global.Promise"')]),t._v(" if using the global version on Node.js, or "),e("code",[t._v('"window.Promise"')]),t._v(" if using the browser version. You should always include a default case, as there is no guarantee what package may be registered.")]),t._v(" "),e("h3",{attrs:{id:"support-for-old-node-js-versions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#support-for-old-node-js-versions"}},[t._v("#")]),t._v(" Support for old Node.js versions")]),t._v(" "),e("p",[t._v("Node.js versions prior to "),e("code",[t._v("v0.12")]),t._v(" may have contained buggy versions of the global "),e("code",[t._v("Promise")]),t._v(". For this reason, the global "),e("code",[t._v("Promise")]),t._v(" is not loaded automatically for these old versions.  If using "),e("code",[t._v("any-promise")]),t._v(" in Node.js versions versions "),e("code",[t._v("<= v0.12")]),t._v(", the user should register a desired implementation.")]),t._v(" "),e("p",[t._v("If an implementation is not registered, "),e("code",[t._v("any-promise")]),t._v(" will attempt to discover an installed "),e("code",[t._v("Promise")]),t._v(" implementation.  If no implementation can be found, an error will be thrown on "),e("code",[t._v("require('any-promise')")]),t._v(".  While the auto-discovery usually avoids errors, it is non-deterministic. It is recommended that the user always register a preferred implementation for older Node.js versions.")]),t._v(" "),e("p",[t._v("This auto-discovery is only available for Node.jS versions prior to "),e("code",[t._v("v0.12")]),t._v(". Any newer versions will always default to the global "),e("code",[t._v("Promise")]),t._v(" implementation.")]),t._v(" "),e("h3",{attrs:{id:"related"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#related"}},[t._v("#")]),t._v(" Related")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/sindresorhus/any-observable",target:"_blank",rel:"noopener noreferrer"}},[t._v("any-observable"),e("OutboundLink")],1),t._v(" - "),e("code",[t._v("any-promise")]),t._v(" for Observables.")])])])}),[],!1,null,null,null);s.default=n.exports}}]);