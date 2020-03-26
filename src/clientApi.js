require("./jsdoc");

const querystring = require("querystring");
const axios = require("axios").default;

class ClientApi {
    constructor() {

    }

    /**
     * Returns a promise for posts
     * @param {redditApiSearchOptions} options 
     * @returns {Promise<redditApiResponse>}
     */
    async getPosts(options) {
        options = JSON.parse(JSON.stringify(options));
        const query = querystring.stringify(options);

        return await axios.get("/reddit-api/posts?" + query).then(response => {
            return response.data;
        });
    }
}

module.exports = new ClientApi();