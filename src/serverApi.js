require("./jsdoc");

const StringUtil = require("@randomlyfish/utils/StringUtil");
const axios = require("axios").default;
const querystring = require('querystring');

const kinds = {
    comment: "t1",
    account: "t2",
    link: "t3",
    message: "t4",
    subreddit: "t5",
    award: "t6",
    more: "more"
}

class ServerApi {

    constructor () {
        
    }

    /**
     * Add routes to an express app with "/reddit-api" as the root  
     * It's required when using the client api
     * @param {*} app instance of an express app
     */
    addRoutes(app) {
        app.get("/reddit-api/posts", (req, res) => {
            this.getPosts(req.query).then(response => {
                res.send(response);
            });
        });

        app.get("/reddit-api/comments/:id", (req, res) => {
            this.getCommentsForPost(req.params.id).then(response => {
                res.send(response);
            });
        });

        app.get("/reddit-api/check-if-subreddit-exists/:subreddit", (req, res) => {
            this.checkIfSubredditExists(req.params.subreddit).then(response => {
                res.send(response);
            });
        });
    }

    /** 
     * @param {redditApiSearchOptions} options The options to use for searching 
     * @returns {Promise<redditApiPostsResponse>} Promise which resolves in an array of posts
     */
    async getPosts(options) {
        let url = "https://www.reddit.com/";

        options = this._cloneObject(options); // The object is cloned as it will be modified

        if (options.subreddit !== undefined) {
            if (Array.isArray(options.subreddit) === true) {
                url += "r/" + options.subreddit.join("+") + "/search.json";
            } else {
                url += "r/" + options.subreddit + "/search.json";
            }

            options.restrict_sr = "on";

        } else {
            url += "search.json";
        }

        const terms = [];

        if (options.searchTerm !== undefined) {
            terms.push(options.searchTerm);
        }

        if (options.nsfw === true || options.nsfw === "true") {
            terms.push("nsfw:1");
            options.include_over_18 = "on";
        } else {
            terms.push("nsfw:0");
        }

        if (options.linkDomain !== undefined) {
            terms.push("site:" + options.linkDomain);
        }

        if (options.flair !== undefined) {
            terms.push("flair:" + options.flair);
        }

        options.q = terms.join(" ");

        if (options.time) {
            options.t = options.time;
        }

        delete options.subreddit;
        delete options.searchTerm;
        delete options.linkDomain;
        delete options.time;
        delete options.nsfw;
        delete options.flair;

        const query = querystring.stringify(options);

        return await axios.get(url + "?" + query).then(response => {
            return {data: this._parsePostResponse(response)}
        }).catch(error => {
            return {error: error}
        });
    }

    /** 
     * @param {string} id The string used to identify the post
     * @returns {Promise<redditApiCommentsResponse>}
     */
    async getCommentsForPost(id) {
        let url = `https://www.reddit.com/comments/${id}.json`;
        
        return await axios.get(url).then(response => {
            let comments = response.data[1].data.children;

            comments = comments.map(comment => {
                return this._parseCommentResponse(comment);
            });

            return {data: comments}
        }).catch(error => {
            return {error: error}
        });
    }

    /**
     * Returns a promise with a boolean based on if the subreddit exists
     * @param {String} subreddit 
     * @returns {Promise<redditApiBooleanResponse>}
     */
    async checkIfSubredditExists(subreddit) {
        subreddit = subreddit.toLowerCase();

        let url = `https://www.reddit.com/subreddits/search.json?q=${subreddit}&limit=1&include_over_18=on`;
        
        return await axios.get(url).then(response => {
            return {data: response.data.data.dist > 0 && response.data.data.children[0].data.display_name.toLowerCase() === subreddit}
        }).catch(error => {
            return {error: error}
        });
    }

    _cloneObject(obj) {
        const string = JSON.stringify(obj);
        return JSON.parse(string);
    }

    _parsePostResponse(response) {
        response = response.data.data.children.map(object => {
            const data = object.data;
            data.kind = object.kind;
            return data;
        });

        response = response.map(object => {
            const date = new Date(object.created_utc * 1000);

            /** @type {redditApiPost} */
            const data = {
                postUrl: "https://reddit.com" + object.permalink,
                type: object.kind,
                id: object.id,
                flair: object.link_flair_text,
                thumbnail: object.thumbnail,
                author: object.author,
                title: object.title,
                date: date.toDateString(),
                subreddit: object.subreddit,
                score: object.score,
                comments: object.num_comments,
                linkDomain: object.domain,
                linkUrl: object.url,
                nsfw: object.over_18,
                original: object
            }

            // The id in the source urls for gfycat are case sensetive, where as the regular urls are not
            if (data.linkDomain === "gfycat.com" && object.media !== null) {
                data.linkUrl = this._parseGfycatUrl(object.media.oembed.thumbnail_url);
            }

            return data;
        });

        return response;
    }

    /** @returns {redditApiComment} */
    _parseCommentResponse(response) {
        if (response.kind === kinds.more) {
            return undefined;
        }

        const hasReplies = response.data.replies !== "";

        if (response.data.replies === undefined) {
            console.log(Object.keys(response.data), response.data.author, response.data.body, response.data.score, response.data.created_utc);
        }

        /** @type {object[]} */
        let replies = hasReplies === true ? response.data.replies.data.children : [];

        if (hasReplies === true) {
            for (let i = 0; i < replies.length; i++) {
                replies[i] = this._parseCommentResponse(replies[i]);
                if (replies[i] === undefined) {
                    replies.splice(i, 1);
                    i--;
                }
            }
        }

        const date = new Date(response.data.created_utc * 1000);

        return {
            author: response.data.author,
            text: response.data.body,
            score: response.data.score,
            date: date.toDateString(),
            replies: replies
        }
    }

    _parseGfycatUrl(url) {
        url = decodeURIComponent(url); // in case the url have been encoded with unicode characters
        const id = StringUtil.getBetween(url, "gfycat.com/", "-");
        return "https://gfycat.com/" + id;
    }
}

module.exports = new ServerApi();