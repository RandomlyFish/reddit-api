import {redditClientApi} from "../../index"; // "../../index" would be replaced by "@randomlyfish/reddit-api"

const limit = document.getElementById("limit");
limit.oninput = () => {
    document.getElementById("limitText").textContent = "Limit (" + limit.value + "):";
};

const button = document.getElementById("submit");
button.onclick = () => {

    const options = {};

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

    redditClientApi.getPosts(options).then(response => {
        console.log(response);
    });
};