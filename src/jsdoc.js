/** 
 * @typedef {Object} redditApiSearchOptions
 * 
 * @property {string | string[]} subreddit The subreddit or subreddits to get posts from  
 * Using multiple subreddits does not ensure that posts from all subreddits will be returned
 * @property {string} flair The category for the posts, only usable for subreddits which has flairs
 * @property {string} searchTerm The search query
 * @property {"relevance" | "top" | "new" | "comments"} sort The criteria to use for getting posts
 * @property {"all" | "year" | "month" | "week" | "day" | "hour"} time The max age for posts
 * @property {string} linkDomain Get posts that links to a certain site
 * @property {Number} limit The max number of posts to return, max: 100
 * @property {string} after Will return posts after a given post, format: kind_id   
 * Does only work with a defined subreddit and should be used with sort: "new"
 * @property {string} before Will return posts before a given post, format: kind_id     
 * Does only work with a defined subreddit and should be used with sort: "new"
 * @property {boolean} nsfw If posts featuring adult content should be requested
 */

/** 
 * @typedef {Object} redditApiCommentsOptions
 * 
 * @property {number} depth The max depth of nested replies to comments
 * * 0 results in all
 * * 1 results in only comments directly to the post
 * * 2 results in the comments plus the replies directly to them
 * * ...
 * @property {Number} limit The max number of comments and replies to return
 */

/** 
 * @typedef {Object} redditApiPost
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
 * @typedef {Object} redditApiComment
 * 
 * @property {string} author The username for the creator of the comment
 * @property {string} text The text in the comment
 * @property {number} score The total upvotes subtracted by downvotes
 * @property {string} date The date that the comment was made
 * @property {redditApiComment[]} replies The comments that this comment have recieved
 */

/** 
 * @typedef {Object} redditApiPostsResponse
 * 
 * @property {redditApiPost[]} data
 * @property {*} error
 */

/** 
 * @typedef {Object} redditApiCommentsResponse
 * 
 * @property {redditApiComment[]} data
 * @property {*} error
 */

/** 
 * @typedef {Object} redditApiBooleanResponse
 * 
 * @property {boolean} data
 * @property {*} error
 */