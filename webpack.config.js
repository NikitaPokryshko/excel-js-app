const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const SOURCES_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'dist')

module.exports = {
  context: SOURCES_PATH,
  entry: {
    main: './index.js'
  },
  output: {
    path: DIST_PATH,
    filename: '[name].bundle.js',
  },
  resolve: {
    // Extensions '.js': handle short imports '../path/file.js' => '../path/file'
    extensions: ['.js', '.json'],
    alias: {
      // Create aliases to import or require certain modules more easily.
      // Also, can use relative path according to context path
      '@': SOURCES_PATH,
      '@core': `${SOURCES_PATH}/core`,
    }
  },
  plugins: [
    // HtmlWebpackPlugin: Creates html page with injected js and css files for you
    // With custom config gives ability to add your own html page
    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    // FaviconsWebpackPlugin: Create all necessary favicons, manifests and etc. and inject them into index.html
    new FaviconsWebpackPlugin({
      logo: `${SOURCES_PATH}/favicon.svg`,
      cache: true,
    }),

    // MiniCssExtractPlugin: extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // Order of use is from right to left!
        use: [
          // Extracts CSS into separate files
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
}
