const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProdEnv = process.env.NODE_ENV === 'production';

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
    watchFiles: ['src/(popup|options)/**/*'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:svg|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  output: {
    filename: ({ chunk }) => {
      return /(popup|options)/.test(chunk.name)
        ? '[name]/[name].js'
        : chunk.name === 'content-scripts'
        ? 'scripts/[name].js'
        : '[name].js';
    },
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
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
            {
              source: path.join(__dirname, 'src', 'assets', 'icons', '*'),
              destination: path.join(__dirname, 'dist', 'icons'),
            },
            ...(!isProdEnv
              ? [
                  {
                    source: path.join(__dirname, 'public', 'index.html'),
                    destination: path.join(__dirname, 'dist', 'index.html'),
                  },
                ]
              : []),
          ],
          ...(isProdEnv && {
            delete: [path.join(__dirname, 'dist', '**/*.LICENSE.txt')],
          }),
        },
      },
    }),
  ],
};

if (process.env.NODE_ENV === 'developmemt') {
  config.devtool = 'eval-source-map';
}

if (process.env.ANALYZE) {
  config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
}

module.exports = config;
