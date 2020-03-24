const {RedditServerApi} = require("../../index"); // "../../index" would be replaced by "@randomlyfish/reddit-api"
const path = require("path");

const root = process.cwd();

module.exports = (app) => {
    RedditServerApi.initialize(app);

    app.get("/", (req, res) => {
        res.sendFile(path.join(root + "/example/client/index.html"));
    });
}