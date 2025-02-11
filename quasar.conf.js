/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
const ESLintPlugin = require('eslint-webpack-plugin')
const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: [
      'i18n',
      'axios',
      'middleware'
    ],

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
      // 'src/assets/scss/app.scss',
      // 'src/assets/scss/font.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v6',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'ionicons-v4',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      rtl: true, // https://v2.quasar.dev/options/rtl-support
      preloadChunks: false,
      showProgress: true,
      gzip: false,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      env: require('dotenv').config().parsed,

      // https://v2.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack (chain) {
        const fileName = '[id]-[name]-[chunkhash]-[contenthash]-[fullhash:8]'
        const path = '[id]/[name]/[chunkhash]/[contenthash]'
        chain.output.publicPath('/assets/')
        chain.output.filename('js/bundle/' + path + '/' + fileName + '.bundle.js')
        chain.output.chunkFilename('js/chunk/' + path + '/' + fileName + '.chunk.js')

        // chain.module.rule.use('eslint-loader')
        //   .loader('eslint-loader')
        //   .options(cssLoaderOptions)

        chain.module
          .rule('fonts')
          .test(/\.(ttf|otf|eot|woff|woff2)$/)
          .use('file-loader')
          .loader('file-loader')
          .tap(options => {
            options = {
              // limit: 10000,
              name: '/assets/fonts/' + fileName + '.[ext]'
            }
            return options
          })

        // chain
        //   .plugin('mini-css-extract')
        //   // .use('mini-css-extract')
        //   .tap(args => [{ filename: 'css/chunk/'+path+'/'+fileName+'.css' }, ...args]);

        // const hashh = '[id].[name].[chunkhash]'
        // chain.output.filename('js/[name]/' + hashh + '.bundle.js')
        // chain.output.chunkFilename('js/[name]/' + hashh + '.chunk.js')
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      },

      extendWebpack (cfg) {
        // cfg.module.rules.push({
        //   // test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //   loader: 'file?name=./fonts/[hash].[ext]'
        // })

        // /// //////////////////////////////////////////
        // cfg.module.rules.push({
        //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //   loader: 'url-loader?limit=10000&minetype=application/font-woff&name=./[hash].[ext]'
        // })
        // /// //////////////////////////////////////////

        // cfg.module.rules.push({
        //   test: /\.css$/,
        //   loader: 'style!css?sourceMap'
        // })
        // cfg.module.rules.push({
        //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: 'url?limit=10000&mimetype=application/font-woff&name=./[hash].[ext]'
        // })
        // cfg.module.rules.push({
        //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: 'url?limit=10000&mimetype=application/font-woff'
        // })
        // cfg.module.rules.push({
        //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: 'url?limit=10000&mimetype=application/octet-stream'
        // })
        // cfg.module.rules.push({
        //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: 'file'
        // })
        // cfg.module.rules.push({
        //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        //   loader: 'url?limit=10000&mimetype=image/svg+xml'
        // })
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8082,
      open: true, // opens browser window automatically
      proxy: {
        '/alaa/api/v2': {
          target: process.env.AUTH_API_SERVER,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/alaa/api/v2': ''
          }
        },
        '/3a/api/v1': {
          target: process.env.AAA_API_SERVER,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/3a/api/v1': ''
          }
        },
        '/cdn': {
          target: 'https://cdn.alaatv.com',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/cdn': ''
          }
        }
      }
    },
    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {},

      iconSet: 'material-icons', // Quasar icon set
      lang: 'fa', // Quasar language pack (en-US)

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading'
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: 'all',

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      manifest: {
        name: '3A-Quasar',
        short_name: '3A-Quasar',
        description: '3A with Quasar framework',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f1f1f1',
        theme_color: '#ffc107',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: '3a'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackMain (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      }
    }
  }
})
