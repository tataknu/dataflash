const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/js/components'),
      '@utils': path.resolve(__dirname, 'src/js/utils'),
      '@services': path.resolve(__dirname, 'src/js/services'),
      '@styles': path.resolve(__dirname, 'src/js/styles'),
      '@constants': path.resolve(__dirname, 'src/js/constants')
    },
    fallback: {
      "path": false,
      "os": false,
      "crypto": false,
      "stream": false
    }
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  experiments: {
    topLevelAwait: true
  }
}; 