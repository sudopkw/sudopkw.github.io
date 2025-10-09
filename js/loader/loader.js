const IS_DEV = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const CSS_PATH = IS_DEV ? "css/tui.css" : "css/tui.css";
const JS_PATH = IS_DEV ? "js/tui.js" : "js/tui.js";

function loadDependency(path, type, callback) {
    const head = document.head;
    const existingStyle = document.getElementById("min-style");
    
    if (type === "script") {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = path;
        if (callback) {
            script.onload = callback;
        }
        head.appendChild(script);
    } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = path;
        head.appendChild(link);
    }
    
    if (existingStyle) {
        existingStyle.remove();
    }
}

loadDependency(CSS_PATH, "link");
loadDependency(JS_PATH, "script", function() {
    if (typeof init !== 'undefined') {
        init();
    }
});
