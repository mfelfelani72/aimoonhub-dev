const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// for minifing stuffs.
const TerserPlugin = require("terser-webpack-plugin");

// this is new
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  entry: "./src/index.js",
  // entry: {
  //   main: "./src/index.js",
  //   sub: "./src/components/app.js",
  // },

  stats: { warnings: false },
  output: {
    //filename: "bundle.js",
    filename: "[name].[contenthash].js",
    path: path.resolve("dist"),
    publicPath: "/",
  },


  devtool: false,
  parallelism: 4,



  performance: {
    // hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    // assetFilter: function (assetFilename) {
    //   return assetFilename.endsWith(".js");
    // },
  },
  // stats: "verbose",
  optimization: {
    minimize: true,

    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    // check this before use
    realContentHash: true,
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      maxSize: 250000
    },
    usedExports: true,
    removeAvailableModules: true,
  },
  mode: "production",
  devServer: {
    hot: true,
    compress: true,
    client: {
      logging: "info",
    },

    historyApiFallback: true,//mohammad

    port: process.env.PORT,
    //... other options ...
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      /*Choose only one of the following two: if you're using
      plain CSS, use the first one, and if you're using a
      preprocessor, in this case SASS, use the second one*/
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv({
      path: ".env",
      safe: true,
      systemvars: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
    }),
  ],
}; 