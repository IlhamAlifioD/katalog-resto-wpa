const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
    port: 9000,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
