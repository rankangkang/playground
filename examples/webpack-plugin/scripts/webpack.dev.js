const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')

const LogOrderPlugin = require('../plugins/log-order-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/main.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    clean: true,
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    open: true,
    port: 8081
  },

  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                // {
                //   targets: 'last 2 versions, > 0.2%, not dead',
                //   useBuiltIns: 'usage',
                //   corejs: 3,
                // },
              ],
              ['@babel/preset-react'],
              ['@babel/preset-typescript'],
            ]
          }
        }
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),

    new LogOrderPlugin('Order1'),
    new LogOrderPlugin('Order2'),
  ]
}