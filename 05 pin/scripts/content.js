
const article = document.querySelector("article");



if (article) {
    let list = article.querySelectorAll("p");
    for (let i = 0; i < list.length; i++) {

        //set up pin button
        let pinned = false;
        const pin = document.createElement("button");
        pin.textContent = "PIN";
        pin.onclick = function()
        {
            pinned = !pinned;
            if (pinned) {
            pin.textContent = "PINNED";
            } else {
                pin.textContent = "PIN";
            }
        }

        //shadowdom setup: identify src
        let src = list[i];

        //calculate wordcount
        let countdisplay = false;
        const text = src.textContent;
        const wordmatch = /[^\s]+/g;
        const words = text.matchAll(wordmatch);
        const wordCount = [...words].length;
        const countel = document.createElement("span");
        countel.textContent =  `${wordCount} words`;

        //note: shadowDOM 'hides' lightDOM. re-inject contents like below or use "<slot></slot>" to display lightDOM
        let basediv = document.createElement("div");
        basediv.textContent = src.textContent;

        //attach shadowdom to src
        const shadow = src.attachShadow({mode: "open"});
        shadow.appendChild(basediv);
        
        list[i].addEventListener(
            'mouseenter', 
            (e) => {
                if (!pinned) {
                    basediv.style.backgroundColor = "orange";
                    basediv.appendChild(pin);
                }
            });
        list[i].addEventListener(
            'mouseleave', 
            (e) => {
                if (!pinned) {
                    basediv.style.backgroundColor = "";
                    basediv.removeChild(basediv.lastElementChild);
                }
                //note: shadowDOMs cannot be destroyed, so instead we just make it identical to the lightDOM            
            });
        list[i].addEventListener(
            'click',
            (e) => {
                if (pinned) {
                    //toggle wordcount
                    //this triggers on initial click to pin: i'm leaving that behaviour intentionally
                    countdisplay = !countdisplay;
                    if (countdisplay) {
                        basediv.appendChild(countel)
                    } else {
                        basediv.removeChild(basediv.lastElementChild);   
                    }
                } else if (countdisplay) {
                    //if not pinned but countdisplay, p was just unpinned-- clear and reset countdisplay
                    countdisplay = false;
                    basediv.removeChild(basediv.lastElementChild);
                }
            });
    }
} else {
    console.log("NO ARTICLE")
}