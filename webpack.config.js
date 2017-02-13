var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: "./main",
  output: {
    path: __dirname + "/dist",
    filename: "build.js"
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader?presets[]=es2015'
    },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
      loader: 'file-loader'
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My ToDoList',
      filename: 'dist/index.html'
    })
  ]
}