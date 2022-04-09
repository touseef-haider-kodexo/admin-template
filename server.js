const express = require("express");
// const path = require("path");

const port = process.env.PORT || 8000;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static("dist"));

// send the user to index html page inspite of the url
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "dist" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port} ${__dirname}`);
});

// const path = require("path");
// const fs = require("fs");
// const React = require("react");
// const express = require("express");
// const { renderToString } = require("react-dom/server");

// const App = require("./app/index.jsx");

// const PORT = process.env.PORT || 8000;
// const app = express();

// app.get("*", (req, res) => {
//   const app = renderToString(App);

//   const indexFile = path.resolve("index.html", { root: "dist" });
//   fs.readFile(indexFile, "utf8", (err, data) => {
//     if (err) {
//       console.error("Something went wrong:", err);
//       return res.status(500).send("Oops, better luck next time!");
//     }

//     return res.send(
//       data.replace('<div id="app"></div>', `<div id="app">${app}</div>`),
//     );
//   });
// });

// app.use(express.static("./dist"));

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
