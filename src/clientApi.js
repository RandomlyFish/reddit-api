require("./jsdoc");

const querystring = require("querystring");
const axios = require("axios").default;

class ClientApi {
    constructor() {

    }

    /**
     * Returns a promise for posts
     * @param {redditApiSearchOptions} options 
     * @returns {Promise<redditApiPostsResponse>}
     */
    async getPosts(options = {}) {
        options = JSON.parse(JSON.stringify(options));
        const query = querystring.stringify(options);

        return await axios.get("/reddit-api/posts?" + query).then(response => {
            return {data: response.data.data};
        }).catch(error => {
            return {error: error};
        });
    }

    /** 
     * @param {string} id The string used to identify the post
     * @param {redditApiCommentsOptions} options The options to use for getting comments
     * @returns {Promise<redditApiCommentsResponse>}
     */
    async getCommentsForPost(id, options = {}) {
        options = JSON.parse(JSON.stringify(options));
        const query = querystring.stringify(options);

        return await axios.get("/reddit-api/comments/" + id + "?" + query).then(response => {
            return {data: response.data.data};
        }).catch(error => {
            return {error: error};
        });
    }

    /**
     * Returns a promise with a boolean based on if the subreddit exists
     * @param {String} subreddit 
     * @returns {Promise<redditApiBooleanResponse>}
     */
    async checkIfSubredditExists(subreddit) {
        return await axios.get("/reddit-api/check-if-subreddit-exists/" + subreddit).then(response => {
            return {data: response.data.data};
        }).catch(error => {
            return {error: error};
        });
    }
}

module.exports = new ClientApi();