require("./jsdoc");

const StringUtil = require("@randomlyfish/utils/StringUtil");
const axios = require("axios").default;
const querystring = require('querystring');

const types = {
    comment: "t1",
    account: "t2",
    link: "t3",
    message: "t4",
    subreddit: "t5",
    award: "t6"
}

class ServerApi {

    constructor () {
        this.getPosts({})
    }

    /**
     * Call to enable requests from client to the server through the client api
     * @param {*} app instance of an express app
     */
    initialize(app) {
        app.get("/reddit/posts", (req, res) => {
            this.getPosts(req.query).then(response => {
                res.send({response: response});
            });
        });
    }

    /** 
     * @param {redditApiSearchOptions} options The options to use for searching 
     * @returns {Promise<redditApiResponse>} Promise which resolves in an array of posts
     */
    async getPosts(options) {
        let url = "https://www.reddit.com/";

        options = this.cloneObject(options); // The object is cloned as it will be modified

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

        options.q = terms.join(" ");

        if (options.time) {
            options.t = options.time;
        }

        delete options.time;
        delete options.searchTerm;
        delete options.nsfw;
        delete options.subreddit;
        delete options.linkDomain;

        const params = querystring.stringify(options);

        console.log("Reddit search:", url + "?" + params);

        return await axios.get(url + "?" + params).then(response => {
            return this.parseResponse(response);
        });
    }

    cloneObject(obj) {
        const string = JSON.stringify(obj);
        return JSON.parse(string);
    }

    parseResponse(response) {
        response = response.data.data.children.map(object => {
            const data = object.data;
            data.kind = object.kind;
            return data;
        });

        response = response.map(object => {
            const date = new Date(object.created_utc * 1000);

            /** @type {redditApiParsedPost} */
            const data = {
                postUrl: "https://reddit.com" + object.permalink,
                author: object.author,
                date: date.toDateString(),
                id: object.id,
                type: object.kind,
                subreddit: object.subreddit,
                title: object.title,
                score: object.score,
                linkDomain: object.domain,
                linkUrl: object.url,
                nsfw: object.over_18,
                comments: object.num_comments
            }

            // The id in the source urls for gfycat are case sensetive, where as the regular urls are not
            if (data.domain === "gfycat.com" && object.media !== null) {
                data.linkUrl = this.parseGfycatUrl(object.media.oembed.thumbnail_url);
            }

            return data;
        });

        return response;
    }

    parseGfycatUrl(url) {
        url = decodeURIComponent(url); // in case the url have been encoded with unicode characters
        const id = StringUtil.getBetween(url, "gfycat.com/", "-");
        return "https://gfycat.com/" + id;
    }
}

module.exports = new ServerApi();