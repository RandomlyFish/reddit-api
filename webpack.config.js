const path = require("path");

module.exports = {
	// This defines where webpack will start gathering dependencies, 
    // it's usually your main client script file, or html file
    entry: "./example/client/index.js",
    // This defines where the bundled code will end up in your project directory
    // It's set up to be added into dist/bundle.js
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js",
        publicPath: "/dist"
    },
    // This is not required, but highly recommended as it makes debugging a lot easier
    devtool: "source-map"
}