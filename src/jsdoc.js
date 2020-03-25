/** 
 * @typedef {Object} redditApiSearchOptions
 * 
 * @property {string | string[]} subreddit The subreddit to get posts from  
 * Can either be a string or an array of multiple strings   
 * Using multiple subreddits does not ensure that posts from all subreddits will be returned
 * @property {string} flair The category for the posts, only used on certain subreddits
 * @property {string} searchTerm The search query
 * @property {"relevance" | "top" | "new" | "comments"} sort The criteria to use for getting posts
 * @property {"hour" | "day" | "week" | "month" | "year" | "all"} time The max age for posts
 * @property {string} linkDomain Get posts that links to a certain site
 * @property {Number} limit The max number of posts to return, max: 100
 * @property {string} after Will return posts after a given post, format: kind_id   
 * Does only work with a defined subreddit and Should be used with sort: "new"
 * @property {string} before Will return posts before a given post, format: kind_id     
 * Does only work with a defined subreddit and Should be used with sort: "new"
 * @property {boolean} nsfw If posts featuring adult content should be requested
 */

/** 
 * @typedef {Object} redditApiParsedPost
 * 
 * @property {string} postUrl The url to the reddit post
 * @property {string} type The type of post it is
 * @property {string} id The string used to identify the post
 * @property {string} flair The category for the post, only used on certain subreddits
 * @property {string} thumbnail The url to thumbnail for the linked content
 * @property {string} author The username for the creator of the post
 * @property {string} title The title for the post
 * @property {string} date The date that the post was made
 * @property {string} subreddit The subreddit the post was posted to
 * @property {Number} score The total upvotes subtracted by downvotes
 * @property {Number} comments The number of comments that the post has recieved
 * @property {string} linkDomain The domain for the linked content
 * @property {string} linkUrl The url for the linked content
 * @property {boolean} nsfw If the post is featuring adult content
 */

/** 
 * @typedef {Object} redditApiResponse
 * 
 * @property {redditApiParsedPost[]} response
 * @property {error} error
 */