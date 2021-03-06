const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) =>
  isDev ? `bundle.${ext}` : `bundle.[contenthash].${ext}`;

const webpackConfig = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },

  devtool: isDev ? "source-map" : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
};

module.exports = webpackConfig;
