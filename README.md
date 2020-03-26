# reddit-api

reddit-api is a small node library that makes it easy to use the reddit api in both the server and client.

<br>

## Client request

Reddit posts can be requested like this:
``` javascript
const options = {};
redditClientApi.getPosts(options).then(response => {
  console.log(response.data); // Logs out an array of objects for each post
});
```
<br>

the options object can include the following properties:

| Property      | Type(s)           | Description                                                                             |
| ------------- | -------------     | -------------                                                                           |
| subreddit     | String, String[]  | The subreddit or subreddits to get posts from                                           |
| flair         | String            | The category for the posts, only usable for subreddits which has flairs                 |
| searchTerm    | String            | The search query                                                                        |
| sort          | String            | The criteria to use for getting posts, can be: "relevance", "top", "new" or "comments"  |
| time          | String            | The max age for posts, can be:  "all", "year", "month", "week", "day" or "hour"         |
| linkDomain    | String            | Get posts that links to a certain site                                                  |
| limit         | Number            | The max number of posts to return, max: 100                                             |
| after         | String            | Will return posts after a given post, format: kind_id. Does only work with a defined subreddit and should be used with sort: "new"|
| before        | String            | Will return posts before a given post, format: kind_id. Does only work with a defined subreddit and should be used with sort: "new"|
| nsfw          | Boolean           | If posts featuring adult content should be requested                                    |

This information is also available through jsdoc.

<br>

## Prerequsites

This library uses [express](https://www.npmjs.com/package/express) to enable comunication between the client and the server, so some knowledege on express is recommended.

In order to use the client api class it also needs to be bundled, for that I would recommend [webpack](https://www.npmjs.com/package/webpack).

<br>

## Getting started

First install reddit-api by running the following in the terminal:
```
npm install @randomlyfish/reddit-api
```
<br>

Then install webpack as a development dependency:
```
npm install webpack --save-dev
```
<br>

Create the following directory and file structure:

```
client
    index.html
    index.js
server
    app.js
webpack.config.js
```
<br>

### index.html

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="scripts/bundle.js" type="module"></script>
</body>
</html>
```
<br>

### index.js
``` javascript
import {redditClientApi} from "@randomlyfish/reddit-api";

const options = {limit: 5};
redditClientApi.getPosts(options).then(response => {
    console.log(response.response); // Logs out an array of objects with all the posts
});
```
<br>

### app.js
``` javascript
// Code for setting up express
const path = require("path");
const express = require("express");

const app = express();

const localPort = 3000;
const port = process.env.PORT || localPort;
const root = process.cwd();

app.listen(port);
app.use("/scripts", express.static("dist"));

app.get("/", (req, res) => {
	res.sendFile(path.join(root + "/client/index.html"));
});

if (port === localPort) {
	// In the terminal, you can hold control and click on the link to open it in the browser
	console.log("http://127.0.0.1:" + port + "/");
}

// Code for setting up reddit-api
const {redditServerApi} = require("@randomlyfish/reddit-api");

// Enables the use of the client api which is used in index.js
redditServerApi.addRoutes(app);
```
<br>

### webpack.config.js
``` javascript
const path = require("path");

module.exports = {
	// This defines where webpack will start gathering dependencies, 
	// it's usually your main client script file, or html file
	entry: "./client/index.js",
	// This defines where the bundled code will end up in your project directory
	// It's set up to be added into dist/bundle.js
	output: {
		path: path.resolve(__dirname),
		filename: "bundle.js",
		publicPath: "/dist"
	},
	// This allows you to view your client scripts in the browser as if they were not bundled
	// While it's not required, it's highly recommended as it makes it much easier to debug your code during development
	devtool: "source-map"
}
```
<br>

### Running

Run the following in terminal to bundle your code:
```
webpack --entry ./client/index.js --output-filename ./dist/bundle.js --mode=development
```
<br>

And this to start the server:
```
node server/app
```
