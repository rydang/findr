const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  // devServer: {
  //   // contentBase: path.join(__dirname, 'dist'),
  //   publicPath: '/build/',
  //   proxy: {
  //     '/': 'http://localhost:3000',
  //   },
  //   hot: true,
  // },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
