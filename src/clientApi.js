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
            
            const request = new XMLHttpRequest();
            request.addEventListener("load", onLoad);
            request.open("GET", "/reddit/posts?" + querystring.stringify(options));
            request.setRequestHeader("Content-Type", "application/json"); 
            request.send();
        });
    }
}

module.exports = new ClientApi();