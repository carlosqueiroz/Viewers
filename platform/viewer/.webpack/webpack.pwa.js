// ~~ WebPack
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBase = require('./../../../.webpack/webpack.base.js');
// ~~ Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// ~~ Rules
const extractStyleChunksRule = require('./rules/extractStyleChunks.js');
// ~~ Directories
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');
const PUBLIC_DIR = path.join(__dirname, '../public');
// ~~ Env Vars
const HTML_TEMPLATE = process.env.HTML_TEMPLATE || 'index.html';
const PUBLIC_URL = process.env.PUBLIC_URL || '/';
const APP_CONFIG = process.env.APP_CONFIG || 'config/default.js';

module.exports = (env, argv) => {
  const baseConfig = webpackBase(env, argv, { SRC_DIR, DIST_DIR });
  const isProdBuild = process.env.NODE_ENV === 'production';

  const mergedConfig = merge(baseConfig, {
    devtool: isProdBuild ? 'source-map' : 'cheap-module-eval-source-map',
    output: {
      path: DIST_DIR,
      filename: isProdBuild ? '[name].bundle.[chunkhash].js' : '[name].js',
      chunkFilename: isProdBuild ? '[name].bundle.[chunkhash].js' : '[name].js',
      publicPath: PUBLIC_URL, // Used by HtmlWebPackPlugin for asset prefix
    },
    stats: {
      colors: true,
      hash: true,
      timings: true,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: false,
      warnings: true,
    },
    optimization: {
      minimize: isProdBuild,
      sideEffects: true,
      //   // TODO: For more granular minimize
      //   // minimizer: [
      //   //   new TerserJSPlugin({
      //   //     sourceMap: true,
      //   //     terserOptions: {
      //   //       sourceMap: {
      //   //         file: '[name].map',
      //   //         url: 'https://my-host/[url]',
      //   //       },
      //   //     },
      //   //   }),
      //   //   new OptimizeCSSAssetsPlugin({}),
      //   // ],

      // https://github.com/webpack/webpack/issues/7217#issuecomment-391042973
      splitChunks: {
        cacheGroups: {
          commons: {
            test({resource}, chunks) {
              return /[\\/]node_modules[\\/]/.test(resource) &&
                !/\.css$/.test(resource);
            },
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [...extractStyleChunksRule(isProdBuild)],
    },
    plugins: [
      // Uncomment to generate bundle analyzer
      // new BundleAnalyzerPlugin(),
      // Clean output.path
      new CleanWebpackPlugin(),
      // Copy "Public" Folder to Dist
      new CopyWebpackPlugin([
        {
          from: PUBLIC_DIR,
          to: DIST_DIR,
          toType: 'dir',
          // Ignore our HtmlWebpackPlugin template file
          // Ignore our configuration files
          ignore: ['config/*', 'html-templates/*', '.DS_Store'],
        },
        // Copy over and rename our target app config file
        {
          from: `${PUBLIC_DIR}/${APP_CONFIG}`,
          to: `${DIST_DIR}/app-config.js`,
        },
      ]),
      // https://github.com/faceyspacey/extract-css-chunks-webpack-plugin#webpack-4-standalone-installation
      new ExtractCssChunksPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      // Generate "index.html" w/ correct includes/imports
      new HtmlWebpackPlugin({
        template: `${PUBLIC_DIR}/html-templates/${HTML_TEMPLATE}`,
        filename: 'index.html',
        templateParameters: {
          PUBLIC_URL: PUBLIC_URL,
        },
        // favicon: `${PUBLIC_DIR}/favicon.ico`,
      }),
      new WorkboxPlugin.GenerateSW({
        swDest: 'sw.js',
        clientsClaim: true,
        skipWaiting: true,
      }),
    ],
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      // gzip compression of everything served
      // Causes Cypress: `wait-on` issue in CI
      compress: true,
      // http2: true,
      // https: true,
      hot: true,
      open: true,
      // https://github.com/webpack/webpack-dev-server/issues/547
      host: '0.0.0.0',
      port: 5000,
      historyApiFallback: {
        disableDotRule: true,
      },
    },
  });

  if (!isProdBuild) {
    mergedConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return mergedConfig;
};
