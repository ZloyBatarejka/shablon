const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: "src/images", to: "images" }]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/public/path/to/",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: "file-loader",
        options: { name: "[name].[ext]?[hash]" },
      },
    ],
  },
  devServer: {
    port: 3002,
  },
};
