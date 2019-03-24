const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js.js',
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        resolve: { extensions: ['.js', '.jsx'] }
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
    }]
  },
  plugins: [ new ExtractTextPlugin({ filename: 'css.css' }) ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: {
      '/': {
        target: 'http://localhost:1791'
      }
    },
    historyApiFallback: true,
    open: false,
    disableHostCheck: true
  },
  devtool: 'inline-source-map'
}
