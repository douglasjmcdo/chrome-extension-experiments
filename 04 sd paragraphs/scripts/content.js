
const article = document.querySelector("article");

if (article) {
    let list = article.querySelectorAll("p");
    for (let i = 0; i < list.length; i++) {
        
        //shadowdom setup
        let src = list[i];

        //note: shadowDOM 'hides' lightDOM. re-inject contents like below or use "<slot></slot>" to display lightDOM
        let originalcontent = document.createElement("div");
        originalcontent.textContent = src.textContent;

        const shadow = src.attachShadow({mode: "open"});
        shadow.appendChild(originalcontent);
        const el = document.createElement("span");
        
        list[i].addEventListener(
            'mouseenter', 
            (e) => {
                e.target.style.backgroundColor = "orange";
                
                //add wordcount to shadowdom:
                const text = src.textContent;
                const wordmatch = /[^\s]+/g;
                const words = text.matchAll(wordmatch);
                const wordCount = [...words].length;
                el.textContent =  `${wordCount} words`;
    
                shadow.appendChild(el);
            });
        list[i].addEventListener(
            'mouseleave', 
            (e) => {
                e.target.style.backgroundColor = "";
                shadow.removeChild(shadow.lastElementChild);    
                //note: shadowDOMs cannot be destroyed, so instead we just make it identical to the lightDOM            
            });
    }
} else {
    console.log("NO ARTICLE")
}