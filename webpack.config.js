const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackConfig = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = webpackConfig;
