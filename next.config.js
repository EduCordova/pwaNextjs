const webpack = require('webpack')
module.exports = {

  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.plugins = config.plugins.filter(
      (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
   )
   config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
   )


    return config
  }
}

