const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
// const Dotenv = require('dotenv-webpack')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = withSass(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }

    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins

      // Read the .env file
      // new Dotenv({
      //   path: path.join(__dirname, '.env'),
      //   systemvars: true
      // })
    ]

    return config
  }
}))
