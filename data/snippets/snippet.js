document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("clickMe");
    const counter = document.getElementById("count");
    let clicks = 0;

    btn.addEventListener("click", () => {
        clicks++;
        counter.textContent = `Button clicked ${clicks} times!`;
    });
});
