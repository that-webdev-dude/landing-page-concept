const merge = require("webpack-merge");
const { common } = require("./webpack.common");
const { HtmlWebpackPlugins } = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: { filename: "[name].boundle.js" },
  stats: {
    children: false,
    modules: false,
    assets: false
  },
  plugins: [...HtmlWebpackPlugins("./src")],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
});
