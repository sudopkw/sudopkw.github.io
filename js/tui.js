async function displayContent() {
  clearMainContent();

  const sectionName = left_sections[currentPosition.sectionIndex].name;

  if (sectionName !== "home") {
    // ... [keep all the existing code for other sections] ...
  } else {
    // HOME SECTION - Use your custom logo and content
    const logoContainer = document.createElement("div");
    logoContainer.id = "logo-container";

    const logoElement = document.createElement("img");
    logoElement.loading = "eager";
    logoElement.src = "images/social-banner.jpg"; // Your custom image
    logoElement.id = "logo";
    logoElement.alt = "sudopkw";
    logoElement.style.maxWidth = "500px"; // Make it HUGE
    logoElement.style.width = "100%"; // Make it responsive but large
    logoElement.style.borderRadius = "8px";

    logoContainer.appendChild(logoElement);

    // Create the content container
    const outerContainerElement = document.createElement("div");
    outerContainerElement.classList.add("outer-paragraph-container");
    const innerContainerElement = document.createElement("div");
    innerContainerElement.classList.add("inner-paragraph-container");

    // Add your home content sections
    const homeSections = [
      {
        content: [
          "Hiya, I'm <span class=\"text-blue\">sudopkw</span>",
          "Mainly a <span class=\"text-orange\">Coder</span> and <span class=\"text-pink\">Gamer</span>."
        ]
      },
      {
        content: [
          "Although i rarely do code nowadays, Most of my focus goes to <span class=\"text-orange\">Lua</span>, As i explore other programming languages such as <span class=\"text-pink\">C++</span>, <span class=\"text-blue\">JavaScript</span> and more.",
          "I also do enjoy programming in almost beginner-like languages such as <span class=\"text-pink\">Python</span>, and will go ahead and learn <span class=\"text-blue\">C</span> in the near future for some fun projects of my own, that will mostly result in a chaotic fail."
        ]
      },
      {
        content: [
          "I'd also like to advance to the real world, Tinkering with electronics, Exploring gadgets like <span class=\"text-orange\">WiFi Deauthers</span>, As i find it interesting on how real world hacking works.",
          "I'm hoping to have some free time and courage in the near future to learn more about how things work, As it's what im passionate about and it's quite sad that i haven't been focused on it as much recently."
        ]
      },
      {
        content: [
          "This entire website is also a learning experience to me, As i inspect the code and try to get an understanding of how <span class=\"text-blue\">JSON</span> and <span class=\"text-orange\">JavaScript</span> work.",
          "And it is also totally not because i love <span class=\"text-pink\">TUI</span>, And i totally didn't choose this project on porpuse because of said not-reason.",
          "Here, You can check out some of my links. They're not related to any of my real work, However i will link my <span class=\"text-blue\">Github</span> down below."
        ]
      },
      {
        content: [
          "So, As i mentioned i am a <span class=\"text-orange\">Gamer</span> ! , So if you feel like it, Check out my <a href=\"https://steamcommunity.com/id/sudopkw/\" target=\"_blank\" class=\"text-blue\">Steam</a>.",
          "If you'd like to add me as a friend, Or leave a comment in my steam wall, Feel free to do so.",
          "Here's also my <a href=\"https://www.tiktok.com/@whoamipkw/\" target=\"_blank\" class=\"text-pink\">Tiktok</a>, Along with my <a href=\"https://stats.fm/pkw/\" target=\"_blank\" class=\"text-green\">Spoti-Stats</a>, So feel free to catch up on the Music i listen to!",
          "And finally, Here's my <a href=\"https://github.com/sudopkw/\" target=\"_blank\" class=\"text-pink\">GitHub</a>."
        ]
      }
    ];

    // Build the home content
    homeSections.forEach((section) => {
      const element = document.createElement("div");
      
      section.content.forEach((content) => {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = content;
        element.appendChild(paragraph);
      });
      
      innerContainerElement.appendChild(element);
    });

    // Add help text
    const desktopHelp = document.createElement("div");
    desktopHelp.id = "desktop-help";
    desktopHelp.innerHTML = `
      <p><span class="text-pink">Click</span> on a section on the left to learn more about my <span class="text-blue">work</span> and past <span class="text-orange">experiences</span>.</p>
      <p>You can also <span class="text-orange">navigate</span> through the sections using the <span class="text-blue">arrow keys</span> or <span class="text-orange">Vim motions</span>.</p>
    `;
    innerContainerElement.appendChild(desktopHelp);

    // Assemble everything
    outerContainerElement.appendChild(innerContainerElement);
    
    clearMainContent();
    MAIN_CONTENT_SECTION.appendChild(logoContainer);
    MAIN_CONTENT_SECTION.appendChild(outerContainerElement);
  }
}
