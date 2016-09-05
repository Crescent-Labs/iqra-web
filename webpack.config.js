var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin();

const DEBUG = !process.argv.includes('--release');
const DEVELOP = process.argv.includes('--develop');

const devtool = DEBUG ? 'eval' : 'cheap-module-source-map';
let entry = ['./src/index.js'];
const output = {
  path: __dirname,
  filename: DEBUG ? 'static/js/bundle.js' : 'static/js/bundle.[chunkhash].js',
  publicPath: '/'
};
const innerModule = {
  loaders: [
    {
      test: /.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?presets[]=es2015,presets[]=react']
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style', // backup loader when not building .css file
        'css!sass' // loaders to preprocess CSS
      )
    }
  ]
};
const plugins = [
  new ExtractTextPlugin( DEBUG ? 'static/css/bundle.css' : 'static/css/bundle.[contenthash].css', {
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  }),
  assetsPluginInstance,
];

if (DEVELOP) {
  entry = entry.concat([
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
  ]);
  output.publicPath = 'http://localhost:8080/';
  innerModule.loaders[0].loaders.splice(0, 0, 'react-hot')
}
if (!DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

module.exports = {
  devtool,
  entry,
  output,
  module: innerModule,
  plugins,
};
