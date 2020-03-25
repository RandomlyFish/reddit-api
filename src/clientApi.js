require("./jsdoc");

const querystring = require('querystring');

class ClientApi {
    constructor() {

    }

    /**
     * Returns a promise for posts
     * @param {redditApiSearchOptions} options 
     * @returns {Promise<redditApiResponse>}
     */
    getPosts(options) {
        return new Promise((resolve, reject) => {
            const onLoad = (response) => {
                resolve(JSON.parse(response.target.response));
            }
            
            // Any undefined properties are not included when using JSON.stringify
            // Which is important as querystring.stringify includes undefined as properties with empty strings
            options = JSON.parse(JSON.stringify(options));

            const request = new XMLHttpRequest();
            request.addEventListener("load", onLoad);
            request.open("GET", "/reddit-api/posts?" + querystring.stringify(options));
            request.setRequestHeader("Content-Type", "application/json"); 
            request.send();
        });
    }
}

module.exports = new ClientApi();