const {redditServerApi} = require("../../index");
const path = require("path");
const express = require("express");

const app = express();

const portStatic = 3000;
const port = process.env.PORT || portStatic;
const root = process.cwd();

app.listen(port);
app.use("/scripts", express.static("example/client/dist"));

redditServerApi.addRoutes(app);

app.get("/", (req, res) => {
	res.sendFile(path.join(root + "/example/client/index.html"));
});

if (port === portStatic) {
	console.log("http://127.0.0.1:" + port + "/");
}