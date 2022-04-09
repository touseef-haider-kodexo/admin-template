const { appPath } = require("./constants");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: options.babelQuery,
          options: {
            plugins: [["import", { libraryName: "antd", style: true }]],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  "primary-color": "#0057FF",
                  "link-color": "#0057FF",
                  "border-radius-base": "2px",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|git|svg|)$/i,
        use: [
          {
            loader: `img-optimize-loader`,
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },

      {
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "@": appPath,
    },
    extensions: [".js", ".jsx"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
  target: "web", // Make web variables accessible to webpack, e.g. window
};
