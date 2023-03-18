const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const reslove = (...dir) => path.join(__dirname, ...dir)

module.exports = {
  mode: 'production',
  entry: reslove('src/index.js'),
  output: {
    filename: 'index.js',
    path: reslove('dist'),
  },
  module: {
    rules: [
       // js
       {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        // include: [/[/\\]node_modules[/\\][@\\]daysnap[/\\]/, resolve('src')],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
}