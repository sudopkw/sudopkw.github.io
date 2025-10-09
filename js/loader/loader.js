const IS_DEV = "localhost" === window.location.hostname || "127.0.0.1" === window.location.hostname;
const CSS_PATH = IS_DEV ? "css/tui.css" : "css/tui.min.css";
const JS_PATH = IS_DEV ? "js/tui.js" : "js/tui.min.js";

function loadDependency(path, type, callback) {
    const head = document.head;
    const existingStyle = document.getElementById("min-style");
    
    const element = type === "script" 
        ? document.createElement("script") 
        : document.createElement("link");
    
    if (type === "script") {
        element.type = "text/javascript";
        element.src = path;
        if (callback) {
            element.onload = callback;
            element.onerror = function() {
                console.error("Failed to load script: " + path);
            };
        }
    } else {
        element.rel = "stylesheet";
        element.href = path;
    }
    
    head.appendChild(element);
    existingStyle?.remove();
}

// Load CSS first, then JS
loadDependency(CSS_PATH, "link");
loadDependency(JS_PATH, "script", function() {
    // Wait a bit to ensure the script is fully parsed
    setTimeout(function() {
        if (typeof init === 'function') {
            init();
        } else {
            console.error('init function not found');
            // Fallback: try to initialize when DOM is ready
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof init === 'function') {
                    init();
                }
            });
        }
    }, 100);
});
