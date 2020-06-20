export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Ecin520",
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    script: [
      {src: 'https://hm.baidu.com/hm.js?223aa7101e93b8f10a5257202488e514'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '../favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    {src: "mavon-editor/dist/css/index.css"},
    {src: '~assets/css/index.scss', lang: 'scss'},
    {src: '~assets/css/github-markdown.css', lang: 'css'},
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: "~plugins/mavon-editor.js", ssr: false},
    {src: "~plugins/muse-ui.js", ssr: true},
    {src: '~plugins/main.js', ssr: true},
    {src: '~plugins/build.js'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://wwww.pytap.com:8081',
      pathRewrite: { '^/api': '' }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
