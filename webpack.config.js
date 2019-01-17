const webpack = require('webpack');
const path = require('path');

module.exports = {
  // debug: true,
  devtool: 'cheap-module-eval-source-map',
  // noInfo: false,
  entry: ['webpack-hot-middleware/client?reload=true',
    'babel-polyfill', path.join(__dirname, '/client/index.jsx')],
  output: {
    path: path.join(__dirname, '/client/public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'SECRET',
      'SECRETKEY',
      'ADMINSECRET',
      'FIREBASE_MESSENGERID',
      'FIREBASE_APIKEY',
      'FIREBASE_URL',
      'FIREBASE_PROJECTID',
      'FIREBASE_STORAGEBUCKET',
      'FIREBASE_AUTHDOMAIN',
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client/'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: './',
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: './',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },
};
