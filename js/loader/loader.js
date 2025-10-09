// Simple loader that just loads the files and lets the script handle initialization
const IS_DEV = window.location.hostname.includes("localhost") || 
               window.location.hostname.includes("127.0.0.1");

// Load CSS
const css = document.createElement("link");
css.rel = "stylesheet";
css.href = IS_DEV ? "css/tui.css" : "css/tui.min.css";
document.head.appendChild(css);

// Remove old style if exists
document.getElementById("min-style")?.remove();

// Load JS - let it handle its own initialization
const js = document.createElement("script");
js.src = IS_DEV ? "js/tui.js" : "js/tui.min.js";
document.head.appendChild(js);
