module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "react-hot-loader/babel",
    ["import", { libraryName: "antd", style: true }],
    // ["styled-components", { fileName: false }],
  ],
};
