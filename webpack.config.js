const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageMeta = require('./package.json')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: packageMeta.title
    })
  ]
}
