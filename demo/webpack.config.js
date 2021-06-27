const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const RemovePlugin = require('remove-files-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const cssResourcesPath = require('./src/styles/shared');
const generateAliases = require('./aliases');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  const config = {
    entry: {
      // Entry file for compliation
      app: './src/index.js'
    },
    output: {
      // Output directory and naming of file
      // For prod [contenthash] (generates new only on content update)
      filename: isDev
        ? 'static/js/[name].js'
        : 'static/js/[name].[contenthash:8].js',
      // Output directory and naming of chunkFile
      chunkFilename: isDev
        ? 'static/js/[name].chunk.js'
        : 'static/js/[name].chunk.[contenthash:8].js',
      // Otput root directory
      path: path.resolve(__dirname, 'dist'),
      // Tells webpack where to serve public assets from related to base url.
      // In order to run index.html from Live Server just pass '/dist/'
      publicPath: '/'
    },
    resolve: {
      // Passes alias cofiguration object
      alias: generateAliases(),
      // Files extensions to resolve
      extensions: ['.js', '.jsx']
    },
    module: {
      // Defines loaders for handling different file types
      rules: [
        {
          // worker-loader module
          test: /\.worker\./,
          use: { loader: 'worker-loader' }
        },
        {
          // babael-loader module
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              // react-refresh/babel plugin for hot reload
              plugins: [isDev && require.resolve('react-refresh/babel')].filter(
                Boolean
              )
            }
          }
        },
        {
          // Native Webpack support of file-loader
          // Defines assets/recource or assets/inline type
          // Allows configuring output per file types
          // fonts
          test: /\.(woff|woff2|ttf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: isDev
              ? 'static/assets/fonts/[name].[ext]'
              : 'static/assets/fonts/[name].[contenthash:8].[ext]'
          }
        },
        {
          // Native Webpack support of file-loader
          // Defines assets/recource or assets/inline type
          // Allows configuring output per file types
          // images
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: isDev
              ? 'static/assets/fonts/[name].[ext]'
              : 'static/assets/images/[name].[contenthash:8].[ext]'
          }
        },
        {
          // .scss loaders configuration
          test: /\.scss$/,
          use: [
            {
              // Use MiniCssExtractPlugin instead of style-loader
              // Extracts separate css files
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                // Defines the number of subsequent .scss loaders
                importLoaders: 3,
                modules: {
                  // Add .scss module file naming
                  localIdentName: '[name]__[local]__[hash:base64:5]'
                },
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  // Use autoprefixer package for postcss
                  plugins: ['autoprefixer']
                }
              }
            },
            {
              loader: 'sass-loader'
            },
            {
              // Sharing sass recources
              // Use it for constants only when working with css modules
              loader: 'sass-resources-loader',
              options: {
                resources: cssResourcesPath
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // Used to remove files prior to build
      new RemovePlugin({
        /**
         * Before compilation permanently removes
         * entire `./dist` folder.
         */
        before: {
          include: [path.resolve(__dirname, 'dist')]
        }
      }),
      // Extract html from template
      new HtmlWebPackPlugin({
        favicon: path.resolve(__dirname, 'src/favicon.png'),
        template: path.resolve(__dirname, './src/index.html'),
        scriptLoading: 'defer'
      }),
      // Define naming of extracted .css files
      new MiniCssExtractPlugin({
        filename: isDev
          ? 'static/css/[name].css'
          : 'static/css/[name].[contenthash:8].css',
        chunkFilename: isDev
          ? 'static/css/[id].css'
          : 'static/css/[id].[contenthash:8].css'
      }),
      // Pass global constants which can be configured at compile time
      new webpack.DefinePlugin({
        __mode__: JSON.stringify(argv.mode)
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: ''
          }
        ]
      })
    ],

    // source-map in prod adds only a URL string to the .map file
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: {
      clientLogLevel: 'silent',
      historyApiFallback: {
        index: 'http://localhost:8080'
      },
      hot: true,
      noInfo: true,
      open: true,
      stats: 'minimal'
    },
    optimization: {
      minimizer: []
    }
  };

  if (!isDev) {
    // Compress in prod
    config.plugins.push(new CompressionPlugin());
    // Add TerserPlugin (default Webpack minimizer) and CssMinimizerPlugin
    config.optimization.minimizer.push(
      new TerserPlugin(),
      new CssMinimizerPlugin()
    );
    // Add BundelAnalyzerPlugin for tracking build size
    config.plugins.push(new BundleAnalyzerPlugin());
  } else {
    // Hot reload in dev with ReactRefreshWebpackPlugin
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
