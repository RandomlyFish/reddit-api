import {redditClientApi} from "../../index"; // "../../index" would be replaced by "@randomlyfish/reddit-api"

const limit = document.getElementById("limit");
limit.oninput = () => {
    document.getElementById("limitText").textContent = "Limit (" + limit.value + "):";
};

const button = document.getElementById("submit");
button.onclick = () => {

    const options = {};

    // Store values from the various inputs on the page
    options.subreddit = document.getElementById("subreddit").value || undefined;
    options.flair = document.getElementById("flair").value || undefined;
    options.searchTerm = document.getElementById("search").value || undefined;
    options.linkDomain = document.getElementById("linkDomain").value || undefined;
    options.after = document.getElementById("after").value || undefined;
    options.before = document.getElementById("before").value || undefined;
    options.nsfw = document.getElementById("nsfw").checked;

    /** @type {HTMLSelectElement} */
    const sortSelect = document.getElementById("sort");
    options.sort = sortSelect.options[sortSelect.selectedIndex].text;

    /** @type {HTMLSelectElement} */
    const timeSelect = document.getElementById("time");
    options.time = timeSelect.options[timeSelect.selectedIndex].text;

    options.limit = limit.value;

    console.log("Getting posts...");

    // Check if the provided subreddit exists and then log it out
    redditClientApi.checkIfSubredditExists(options.subreddit).then(response => {
        console.log("Subreddit exists:", response);
    });

    // Get posts based on the search options and log them out, along with any comments on the posts
    redditClientApi.getPosts(options).then(postsResponse => {
        console.log("Posts:", postsResponse);

        if (postsResponse.error !== undefined) {
            return;
        }

        const posts = postsResponse.data;
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].comments > 0) {
                redditClientApi.getCommentsForPost(posts[i].id).then(commentsResponse => {
                    console.log(`Comments for post ${i}:`, commentsResponse);
                });
            }
        }
    });
};