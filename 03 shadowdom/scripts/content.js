// https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-on-every-tab
//built off of chrome documentation for estimated reading time
const article = document.querySelector("article");
if (article) {
    const text = article.textContent;
    const wordmatch = /[^\s]+/g;
    const words = text.matchAll(wordmatch);

    const wordCount = [...words].length;
    const badge = document.createElement("div");

    //add styling here if desired
    badge.textContent = `${wordCount} words (SHADOWDOM)`

    //now we're injecting the badge, either next to heading OR time
    //note that this DOES use shadow dom
    const heading = article.querySelector("h1 ~ div");
    const date = article.querySelector("time")?.parentNode;
    // console.log(date + " OR " + heading);
    const shadow = (date ?? heading).attachShadow({mode: "closed"});
    shadow.appendChild(badge);
    //querySelectorinsertAdjacentElement("afterend", badge);
} else {
    console.log("NO ARTICLE")
}