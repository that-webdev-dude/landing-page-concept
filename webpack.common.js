const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getHtmlPages = srcDir => {
  const pages = fs.readdirSync(srcDir, (err, files) => {
    if (err) reject(new Error(`Error: Unable to scan ${srcDir}`));
    return files;
  });
  return pages
    .map(page => {
      const match = page.match(/\.html$/);
      return match ? match.input : null;
    })
    .filter(page => {
      return page;
    });
};

const HtmlWebpackPlugins = (srcDir, minify = {}) => {
  const pages = getHtmlPages(srcDir);
  if (!Array.isArray(pages)) return [];
  return pages.map(page => {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `${srcDir}/${page}`,
      minify: { ...minify }
    });
  });
};

const common = {
  entry: { main: "./main.js" },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[contenthash].[ext]",
              esModule: false
            }
          },
          {
            // FIXME enable in prod only?
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                optimizationLevel: 3
              },
              pngquant: {
                speed: 4,
                quality: [0.65, 0.9]
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 1
              }
            }
          }
        ]
      }
    ]
  }
};

module.exports = { HtmlWebpackPlugins, common };
