module.exports = {
    title: 'GolderBrother',
    description: 'GolderBrother的博客',
    base: '/blog/',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/assets/favicon.ico'
            }
        ]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@': '../.vuepress',
                '@assets': './public/assets',
                '@public': './public',
            }
        }
    },
    themeConfig: {
        logo: '/assets/logo.jpg',
        navbar: true,
        sidebar: 'auto',
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated', // string | boolean
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'GolderBrother/blog',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'GitHub',
        smoothScroll: true,
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                link: '/guide/'
            },
            {
                text: 'Views',
                link: '/views/'
            },
            // {
            //     text: 'Vue',
            //     items: [
            //         // { text: 'page-a', link: '/views/page-a/' },
            //         { text: 'vue', link: '/views/vue/vue/' },
            //         { text: 'vue-2', link: '/views/vue/vue-2/' }
            //     ]
            // },
        ],
        sidebar: {
            '/guide/': [
                '', /* /guide/ */
            ],
            // '/vue/': [
            //     '',     /* /guide/ */
            //     // 'page-a',     /* /views/page-a/ */
            //     // 'page-b',     /* /views/page-b/ */
            //     {
            //         title: 'vue 页面',
            //         collapsable: false,
            //         children: [
            //             '/views/vue/vue.md',     /* /views/page-a/ */
            //             '/views/vue/vue-2.md',     /* /views/page-b/ */
            //         ],
            //     },
            // ],
            '/views/': [
                '', /* /views/ */
                {
                    title: 'GitHub 软技能',
                    collapsable: false,
                    children: [
                        '/views/github/follow.md',
                        '/views/github/star.md',
                    ],
                },
                {
                    title: 'css',
                    collapsable: false,
                    children: [
                        '/views/css/css-skills1.md',
                        '/views/css/css-knowledge.md',
                        '/views/css/css-knowledge2.md',
                        '/views/css/css-center.md'

                    ]
                },
                {

                    title: '移动端h5',
                    collapsable: false,
                    children: [
                        '/views/h5/h5-demo1.md',
                        '/views/mobile/mobile-skill.md',
                        '/views/mobile/mobile-optmization.md'
                    ]
                },
                {
                    title: 'Javascript',
                    collapsable: false,
                    children: [
                        '/views/javascript/js-skills.md',
                        '/views/javascript/js-skills2.md',
                        '/views/javascript/js-utils.md',
                    ]
                },
                {
                    title: 'Typescript',
                    collapsable: false,
                    children: [
                        '/views/typescript/ts-demo.md',
                    ]
                },
                {
                    title: 'Vue.js',
                    collapsable: false,
                    children: [
                        '/views/vue/vue-ts.md',
                        '/views/vue/vue-lazyload.md',
                        '/views/vue/vue-skills-36.md',
                        '/views/vue/vue-interview.md',
                        '/views/vue/vue-interview/part-one/note.md'
                    ],
                },
                {
                    title: 'React.js',
                    collapsable: false,
                    children: [
                        '/views/react/react-hooks.md',
                        '/views/react/react-lifecycle.md',
                        '/views/react/react-skill.md',
                        '/views/react/react-nice-library.md',
                        '/views/react/react-interview.md',
                    ],
                },
                {
                    title: 'webpack',
                    collapsable: false,
                    children: [
                        '/views/webpack/webpack1.md',
                    ],
                },

                {
                    title: 'Node.js',
                    collapsable: false,
                    children: [
                        '/views/node/node1.md',
                    ],
                },
                {
                    title: '前端数据结构之美',
                    collapsable: false,
                    children: [
                        '/views/data-structure/data-structure.md',
                    ],
                },
                {
                    title: '前端算法学习指南',
                    collapsable: false,
                    children: [
                        '/views/algorithms/sort.md',
                        '/views/algorithms/interview.md',
                    ],
                },
                {
                    title: '前端面试集锦',
                    collapsable: false,
                    children: [
                        '/views/fe-interview/alibaba.md',
                        '/views/fe-interview/bytedance.md',
                        '/views/fe-interview/bytedance-algorithms.md',
                        '/views/fe-interview/tencent.md',
                        '/views/fe-interview/classic-layout.md',
                        '/views/fe-interview/web-safe.md',
                        '/views/fe-interview/http&https.md',
                        '/views/fe-interview/webpack-performance-optimization.md',
                        '/views/fe-interview/webpack-principle.md',
                        '/views/fe-interview/webpack-HMR.md',
                        '/views/fe-interview/chrome-start-process.md',
                        '/views/fe-interview/dns-prefetch.md',
                        '/views/fe-interview/browser-cache.md',
                        '/views/fe-interview/send-content-to-browser.md',
                        '/views/fe-interview/browser-render.md',
                        '/views/fe-interview/browser-reflow&repain.md',
                        '/views/fe-interview/renderEngine-createNewLayer.md',
                        '/views/fe-interview/UDP&TCP-different.md',
                        '/views/fe-interview/js-modules.md',
                        '/views/fe-interview/lazyMan.md',
                        '/views/fe-interview/handwriting-promise.md',
                        '/views/fe-interview/fetch&ajax-diference.md',
                        '/views/fe-interview/browser-input-url.md',
                        '/views/fe-interview/picture-optimization.md',
                        '/views/fe-interview/node-eventLoop.md',
                        '/views/fe-interview/browser-eventLoop.md',
                        '/views/fe-interview/setTimeout&setImmediate.md',
                        '/views/fe-interview/js-interview.md',
                    ],
                },
                {
                    title: '前端必知必会的网络基础',
                    collapsable: false,
                    children: [
                        '/views/network/http-interview.md',
                        '/views/network/tcp-interview.md',
                    ],
                },
                {
                    title: '前端应知应会的Nginx知识',
                    collapsable: false,
                    children: [
                        '/views/nginx/nginx-details.md',
                    ],
                },
                {
                    title: '前端必不可少的git知识',
                    collapsable: false,
                    children: [
                        '/views/git/git-command-animation.md',
                    ],
                },
                {
                    title: '前端性能优化专题，让你的网站飞起来吧',
                    collapsable: false,
                    children: [
                        '/views/performance/code-split.md',
                    ],
                },
                {
                    title: '前端高手进阶专题，告别小菜鸟',
                    collapsable: false,
                    children: [
                        '/views/fe-advanced/ad1.md',
                        '/views/fe-advanced/ad2.md',
                    ],
                }
            ],
        }
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN',
            title: '全栈修炼',
            //   description: 'Vue 驱动的静态网站生成器'
        },
        '/en/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
            title: 'Full stack exercise',
            //   description: 'Vue-powered Static Site Generator'
        },
    },
    plugins: [
        '@vuepress/last-updated',
        '@vuepress/back-to-top',
        '@vuepress/active-header-links',
        '@vuepress/google-analytics',
        {
            'ga': 'UA-00000000-0' // UA-00000000-0
        },
        '@vuepress/medium-zoom',
        '@vuepress/nprogress'
    ]
}