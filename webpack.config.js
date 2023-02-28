const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const config = {
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  entry: {
    ['service-worker']: [
      path.resolve(__dirname, 'src', 'service-worker', 'index.ts'),
    ],
    ['content-scripts']: [
      path.resolve(__dirname, 'src', 'content', 'index.ts'),
    ],
    popup: [path.resolve(__dirname, 'src', 'popup', 'index.tsx')],
    options: [path.resolve(__dirname, 'src', 'options', 'index.tsx')],
  },
  devServer: {
    port: 3000,
    compress: true,
    watchFiles: ['src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  output: {
    filename: ({ chunk }) => {
      return chunk.name === 'service-worker'
        ? '[name].js'
        : chunk.name === 'content-scripts'
        ? 'scripts/[name].js'
        : '[name]/[name].js';
    },
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'popup', 'index.html'),
      filename: 'popup/popup.html',
      chunks: ['popup'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'options', 'index.html'),
      filename: 'options/options.html',
      chunks: ['options'],
      inject: 'body',
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.join(__dirname, 'src', 'manifest.json'),
              destination: path.join(__dirname, 'dist', 'manifest.json'),
            },
          ],
        },
      },
    }),
  ],
};

// if (process.env.NODE_ENV === 'development') {
//   options.devtool = 'cheap-module-source-map';
// }

module.exports = config;
