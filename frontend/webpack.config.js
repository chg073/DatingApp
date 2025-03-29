const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/main.tsx", // Your application's entry point
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle name
    clean: true, // Cleans the output directory before builds
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // TypeScript and TSX files
        use: "ts-loader", // Use TypeScript loader
        exclude: /node_modules/, // Exclude dependencies
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Images
        type: "asset/resource", // Handle image files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template HTML for Webpack to inject into
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output CSS bundle name
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"), // Dev server content base
    port: 3000, // Dev server port
    open: true, // Automatically open in browser
    hot: true, // Enable Hot Module Replacement (HMR)
  },
  mode: "development", // Development mode
};