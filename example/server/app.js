const path = require("path");
const express = require("express");

const app = express();
const portStatic = 3000;
const port = process.env.PORT || portStatic;

app.listen(port);
app.use("/scripts", express.static("example/client/dist"));

const controller = require("./controller");
controller(app);

if (port === portStatic) {
	console.log("http://127.0.0.1:" + port + "/");
}