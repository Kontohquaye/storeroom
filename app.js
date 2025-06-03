require("dotenv").config();
const express = require("express");
const app = express();

// set ups
const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
