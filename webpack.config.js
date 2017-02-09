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
    {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }
}