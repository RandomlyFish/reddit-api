import {RedditClientApi} from "../../index"; // "../../index" would be replaced by "@randomlyfish/reddit-api"

console.log("Getting posts...");

RedditClientApi.getPosts({limit: 5, sort: "new", subreddit: "videos"}).then(response => {
    console.log(response.response);
});