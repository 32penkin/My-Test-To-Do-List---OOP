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
    /*
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
    {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
    {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}*/
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
      loader: 'file-loader'
    }
    ]
  }
}