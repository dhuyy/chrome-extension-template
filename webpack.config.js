const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    ['service-worker']: [
      path.resolve(__dirname, 'src', 'service-worker', 'index.ts'),
    ],
    ['content-scripts']: [
      path.resolve(__dirname, 'src', 'content', 'index.ts'),
    ],
    popup: [path.resolve(__dirname, 'src', 'popup', 'scripts', 'index.ts')],
    options: [path.resolve(__dirname, 'src', 'options', 'scripts', 'index.ts')],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
