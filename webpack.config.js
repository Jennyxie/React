const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')

const config = {
  entry: './src/index.js',
  output: {
    filename: 'myBundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 4000,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  plugins: [new HtmlWebpackPlugin({template: './src/components/index.html'})],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader", 
          options: {
            presets: [["@babel/preset-env", {"useBuiltIns": "usage", "corejs": 3, "targets": "defaults"}], "@babel/preset-react"]
          }
        }
      }
    ]
  }
}

if (currentTask == "build") {
  config.mode="production"
  config.plugins.push(new CleanWebpackPlugin(), new WebpackManifestPlugin())
}

module.exports = config
