const path = require("path");
const express = require("express");
const req = require("express/lib/request");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const indexRoutes = require("./routes/index.js");
//settings

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/", indexRoutes);

app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
