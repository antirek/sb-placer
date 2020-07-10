const path = require('path');

module.exports = {
  entry: './src/js/sb-placer.js',
  output: {
    filename: 'sb-placer.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'sbPlacer',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      /*
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      */
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: true,
  },
};
