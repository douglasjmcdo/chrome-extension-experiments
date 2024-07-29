// https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-on-every-tab
//built off of chrome documentation for estimated reading time
const article = document.querySelector("article");
if (article) {
    const text = article.textContent;
    const wordmatch = /[^\s]+/g;
    const words = text.matchAll(wordmatch);

    const wordCount = [...words].length;
    const badge = document.createElement("p");

    //add styling here if desired
    badge.textContent = `${wordCount} words`

    //now we're injecting the badge, either next to heading OR time
    //note that this does NOT use shadow dom
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    // console.log(date + " OR " + heading);
    (date ?? heading).insertAdjacentElement("afterend", badge);
} else {
    console.log("NO ARTICLE")
}