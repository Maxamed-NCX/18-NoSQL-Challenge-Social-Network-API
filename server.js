const express = require("express");
const mongoDb = require("./utils/con");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

app.listen(PORT, () =>
  console.log(` Application listing on this Port:${PORT}`)
);
