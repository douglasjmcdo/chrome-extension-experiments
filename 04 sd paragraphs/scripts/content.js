
const article = document.querySelector("article");

// // Unique ID for the className.
// var MOUSE_VISITED_CLASSNAME = 'mousevisited';

// // Previous dom, that we want to track, so we can remove the previous styling.
// var prevDOM = null;

// // Mouse listener for any move event on the current document.
// document.addEventListener('mousemove', function (e) {
//     let srcElement = e.srcElement;

//     // Lets check if our underlying element is a IMG.
//     if (prevDOM != srcElement && srcElement.nodeName == 'IMG') {

//         // For NPE checking, we check safely. We need to remove the class name
//         // Since we will be styling the new one after.
//         if (prevDOM != null) {
//             prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
//         }

//         // Add a visited class name to the element. So we can style it.
//         srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

//         // The current element is now the previous. So we can remove the class
//         // during the next ieration.
//         prevDOM = srcElement;
//         console.info(srcElement.currentSrc);
//         console.dir(srcElement);
//     }
// }, false);

if (article) {
    let list = article.querySelectorAll("p");
    for (let i = 0; i < list.length; i++) {
        
        //shadowdom setup
        let src = list[i];

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
            });
    }
} else {
    console.log("NO ARTICLE")
}