const { override, addWebpackPlugin, addWebpackModuleRule } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  // Add webpack plugins
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ),
  
  // Add module rules for file-loader
  addWebpackModuleRule({
    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
    type: 'asset/resource',
  }),
  
  // Configure fallbacks for Node.js core modules
  (config) => {
    // Add resolve fallbacks
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify"),
      "url": require.resolve("url"),
      "path": require.resolve("path-browserify"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util/"),
      "process": require.resolve("process/browser")
    };
    
    // Add aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      'process/browser': require.resolve('process/browser')
    };
    
    return config;
  }
);
