const MAIN_CONTAINER = document.getElementById("main-container");
const SECTION_CONTAINER = document.getElementById("section-container");
const LEFT_SECTION = document.getElementById("left-section");
const RIGHT_SECTION = document.getElementById("right-section");

const HOME_SECTION = document.getElementById("home");
const SKILLS_SECTION = document.getElementById("skills");
const EXPERIENCE_SECTION = document.getElementById("experience");
const PROJECTS_SECTION = document.getElementById("projects");
const FOOTER_SECTION = document.getElementById("footer");
const MAIN_CONTENT_SECTION = document
  .getElementById("main-content")
  ?.getElementsByClassName("container-content")[0];

const COLORS = ["text-blue", "text-orange", "text-pink"];

const left_sections = [
  { name: "home", section: HOME_SECTION, items: [] },
  {
    name: "experience",
    section: EXPERIENCE_SECTION,
    items: [...EXPERIENCE_SECTION.firstElementChild.children[2].children],
  },
  {
    name: "projects",
    section: PROJECTS_SECTION,
    items: [...PROJECTS_SECTION.firstElementChild.children[2].children],
  },
  {
    name: "skills",
    section: SKILLS_SECTION,
    items: [...SKILLS_SECTION.firstElementChild.children[2].children],
  },
];

const currentPosition = {
  sectionIndex: 0,
  sectionItemIndex: 0,
};

const previousPosition = {
  sectionIndex: 0,
  sectionItemIndex: 0,
};

function clamp(min, value, max) {
  return Math.min(Math.max(min, value), max);
}

function isMobile() {
  return window.innerWidth <= 768;
}

function getRandomTextColorClass() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function colorizeString(str) {
  return str
    .replaceAll("{{", () => `<span class="${getRandomTextColorClass()}">`)
    .replaceAll("}}", "</span>");
}

function colorizeCode() {
  const element = document.getElementsByTagName("code")[0];

  if (element == null) {
    return;
  }

  const text = element.innerText;
  const language = element.classList[0];

  const keywords = {
    js: javascriptKeywords,
    ts: typescriptKeywords,
    sql: sqlKeywords,
    mjs: nodeKeywords,
    html: htmlKeywords,
    css: cssKeywords,
    go: goKeywords,
    c: cKeywords,
    graphql: graphqlKeywords,
    sql: sqlKeywords,
    tsx: reactKeywords,
    test: testKeywords,
    sh: bashKeywords,
    yml: yamlKeywords,
    ino: arduinoKeywords,
  }[language];

  if (keywords == null) {
    return;
  }

  let coloredText = text;

  keywords.forEach((subKeywords, i) => {
    if (subKeywords.length === 0) {
      return;
    }

    const regex = new RegExp(`\\b(${subKeywords.join("|")})\\b`, "g");
    coloredText = coloredText.replaceAll(
      regex,
      (match) => `<span class="${COLORS[i]}">${match}</span>`,
    );
  });

  element.innerHTML = coloredText;
}

async function getCodeSnippet(snippet) {
  const response = await fetch(`../data/snippets/snippet.${snippet}`);
  const text = await response.text();

  return text;
}

function isVisibleInScrollView(element, container) {
  const elementTop = element.offsetTop;
  const elementBottom = elementTop + element.clientHeight;

  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  return elementTop >= containerTop && elementBottom <= containerBottom;
}

function onHamburgerMenuPress() {
  const hamburgerButtonElement =
    document.getElementsByName("hamburger-toggle")[0];
  const navContainerElement =
    document.getElementsByClassName("nav-container")[0];

  if (hamburgerButtonElement.checked) {
    LEFT_SECTION.classList.add("menu-open");
    navContainerElement.style.opacity = 1;
  } else {
    LEFT_SECTION.classList.remove("menu-open");
    navContainerElement.style.opacity = 0.9;
  }
}

function closeHamburgerMenu() {
  const hamburgerButtonElement =
    document.getElementsByName("hamburger-toggle")[0];
  hamburgerButtonElement.checked = false;
  LEFT_SECTION.classList.remove("menu-open");
}

function clearMainContent() {
  MAIN_CONTENT_SECTION.innerHTML = "";
  MAIN_CONTENT_SECTION.scrollTo({ top: 0 });
}

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

    colorizeCode();
  } else {
    const logoFileName = `images/logo${Math.floor(Math.random() * 4) + 1}.svg`;
    const logoContainer = document.createElement("div");
    logoContainer.id = "logo-container";

    const logoElement = document.createElement("img");
    logoElement.loading = "eager";
    logoElement.src = logoFileName;
    logoElement.id = "logo";
    logoElement.alt = "Wallenart";

    logoContainer.appendChild(logoElement);

    clearMainContent();
    MAIN_CONTENT_SECTION.appendChild(logoContainer);

    data.forEach((d) => {
      const element = document.createElement("div");

      d.content.forEach((c) => {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = colorizeString(c);
        element.appendChild(paragraph);
      });

      innerContainerElement.appendChild(element);
    });

    outerContainerElement.appendChild(innerContainerElement);
    MAIN_CONTENT_SECTION.appendChild(outerContainerElement);
  }
}

function clearSelectionStyling(scrollToTop) {
  if (isMobile()) {
    const selectedElement = document.getElementsByClassName("selected-item")[0];
    const selectedFrameElement =
      document.getElementsByClassName("selected-frame")[0];

    if (selectedElement != null) {
      selectedElement.classList.remove("selected-item");
    }

    if (selectedFrameElement != null) {
      selectedFrameElement.classList.remove("selected-frame");
    }
  }

  const previousSection = left_sections[previousPosition.sectionIndex];

  const previousSectionItemElement =
    previousSection.items[previousPosition.sectionItemIndex];

  const previousSectionItemIndexElement =
    previousSection.section.getElementsByClassName("list-index")[0]
      ?.firstElementChild;

  const scrollableContainerElement =
    previousSection.section.getElementsByClassName("ui-list")[0];

  previousSection.section.classList.remove("selected-frame");
  previousSectionItemElement?.classList.remove("selected-item");

  if (previousSectionItemIndexElement != null) {
    previousSectionItemIndexElement.innerText = `1 of ${previousSection.items.length}`;
  }

  if (scrollableContainerElement != null && scrollToTop) {
    scrollableContainerElement.scrollTo({ top: 0 });
  }
}

async function render(scrollToTop = false, isInitialRender = false) {
  if (
    !isMobile() &&
    !isInitialRender &&
    currentPosition.sectionIndex === previousPosition.sectionIndex &&
    currentPosition.sectionItemIndex === previousPosition.sectionItemIndex
  ) {
    return;
  }

  const currentSection = left_sections[currentPosition.sectionIndex];

  const currentSectionItemElement =
    currentSection.items?.[currentPosition.sectionItemIndex];

  const currentSectionItemIndexElement =
    currentSection.section.getElementsByClassName("list-index")[0]
      ?.firstElementChild;

  const scrollableContainerElement =
    currentSection.section.getElementsByClassName("ui-list")[0];

  clearSelectionStyling(scrollToTop);

  currentSection.section.classList.add("selected-frame");
  currentSectionItemElement?.classList.add("selected-item");

  if (currentSectionItemIndexElement != null) {
    currentSectionItemIndexElement.innerText = `${currentPosition.sectionItemIndex + 1} of ${currentSection.items.length}`;
  }

  // FIXME: not optimal, sometimes, jumps a bit too far
  // but it doesn't impair the user experience too much
  if (scrollableContainerElement != null && currentSectionItemElement != null) {
    if (
      !isVisibleInScrollView(
        currentSectionItemElement,
        scrollableContainerElement,
      ) &&
      previousPosition.sectionItemIndex !== currentPosition.sectionItemIndex
    ) {
      const gap = parseInt(
        window.getComputedStyle(currentSectionItemElement).gap,
      );

      scrollableContainerElement.scrollBy({
        top:
          previousPosition.sectionItemIndex < currentPosition.sectionItemIndex
            ? currentSectionItemElement.clientHeight + gap
            : -currentSectionItemElement.clientHeight - gap,
        behavior: "instant",
      });
    }
  }

  if (!isInitialRender) {
    displayContent();
  }

  if (isMobile()) {
    closeHamburgerMenu();
  }
}

function savePreviousPosition() {
  previousPosition.sectionIndex = currentPosition.sectionIndex;
  previousPosition.sectionItemIndex = currentPosition.sectionItemIndex;
}

function goToSection(sectionNumber, itemNumber = 0) {
  savePreviousPosition();

  currentPosition.sectionIndex = clamp(
    0,
    sectionNumber,
    left_sections.length - 1,
  );
  currentPosition.sectionItemIndex = clamp(
    0,
    itemNumber,
    left_sections[currentPosition.sectionIndex].items.length - 1,
  );
}

function goToNextSection() {
  savePreviousPosition();

  currentPosition.sectionIndex = clamp(
    0,
    currentPosition.sectionIndex + 1,
    left_sections.length - 1,
  );
  currentPosition.sectionItemIndex = 0;
}

function goToPreviousSection() {
  savePreviousPosition();

  currentPosition.sectionIndex = clamp(
    0,
    currentPosition.sectionIndex - 1,
    left_sections.length - 1,
  );
  currentPosition.sectionItemIndex = 0;
}

function goToNextItem() {
  savePreviousPosition();

  currentPosition.sectionItemIndex = clamp(
    0,
    currentPosition.sectionItemIndex + 1,
    left_sections[currentPosition.sectionIndex].items.length - 1,
  );
}

function goToPreviousItem() {
  savePreviousPosition();

  currentPosition.sectionItemIndex = clamp(
    0,
    currentPosition.sectionItemIndex - 1,
    left_sections[currentPosition.sectionIndex].items.length - 1,
  );
}

function scrollMainContentDown() {
  MAIN_CONTENT_SECTION?.scrollBy({
    top: MAIN_CONTENT_SECTION.clientHeight / 2,
  });
}

function scrollMainContentUp() {
  MAIN_CONTENT_SECTION?.scrollBy({
    top: -(MAIN_CONTENT_SECTION.clientHeight / 2),
  });
}

function initKeyboardListeners() {
  // CTRL key is only captured on keydown/keyup
  addEventListener("keydown", async (event) => {
    let scrollToTop = false;
    const { key, code, ctrlKey } = event;

    if (key.includes("Arrow") || key.includes("Page")) {
      event.preventDefault();
    }

    if (key === "PageDown" || (ctrlKey && key === "d")) {
      scrollMainContentDown();
      return;
    } else if (key === "PageUp" || (ctrlKey && key === "u")) {
      scrollMainContentUp();
      return;
    } else if (key === "ArrowUp" || key === "k") {
      if (currentPosition.sectionIndex === 0) {
        return;
      }

      goToPreviousItem();
    } else if (key === "ArrowDown" || key === "j") {
      if (currentPosition.sectionIndex === 0) {
        return;
      }

      goToNextItem();
    } else if (key === "ArrowLeft" || key === "h") {
      goToPreviousSection();
      scrollToTop = true;
    } else if (key === "ArrowRight" || key === "l") {
      goToNextSection();
      scrollToTop = true;
    } else if (code.includes("Digit")) {
      const sectionNumber = parseInt(key) - 1;
      goToSection(sectionNumber);
      scrollToTop = true;
    } else {
      // Just here to avoid rendering on every keypress
      return;
    }

    await render(scrollToTop);
  });
}

function initMouseListeners() {
  left_sections.forEach((section, sectionIndex) => {
    section.items.forEach((item, itemIndex) => {
      item.addEventListener("click", async (event) => {
        event.stopPropagation();

        goToSection(sectionIndex, itemIndex);
        await render(sectionIndex !== previousPosition.sectionIndex);
      });
    });

    section.section.addEventListener("click", async () => {
      goToSection(sectionIndex);
      await render(sectionIndex !== previousPosition.sectionIndex);
    });
  });
}

function initTouchListeners() {
  if (!isMobile()) {
    return;
  }

  const hamburgerButtonElement =
    document.getElementsByName("hamburger-toggle")[0];

  hamburgerButtonElement.addEventListener("click", () => {
    onHamburgerMenuPress();
  });
}

async function init() {
  initKeyboardListeners();
  initMouseListeners();
  initTouchListeners();

  await render(true, true);
}

/** HIGHLIGHTING STUFF **/
const javascriptKeywords = [
  [
    "colorizeCode",
    "getCodeSnippet",
    "javascript",
    "typescript",
    "html",
    "css",
    "go",
    "c",
    "graphql",
    "sql",
    "react",
    "jest",
    "bash",
    "yaml",
    "arduino",
    "innerText",
    "classList",
    "0",
    "'code'",
    "document",
    "null",
    "innerHTML",
  ],
  ["function", "const", "return", "if", "new", "async", "await", "=", "=="],
  ["getElementsByTagName", "RegExp", "fetch", "replaceAll"],
];

const typescriptKeywords = [
  [...javascriptKeywords[0]],
  [...javascriptKeywords[1], "void", "string"],
  [...javascriptKeywords[2], "Promise"],
];

const nodeKeywords = [
  [
    ...javascriptKeywords[0],
    "express",
    "IS_ONLINE",
    "helmet",
    "IS_OFFLINE",
    "method",
    "graphqlHTTP",
    "schema",
    "rootValue",
    "validationRules",
    "graphiql",
    "next",
  ],
  [...javascriptKeywords[1], "NoSchemaIntrospectionCustomRule", "else"],
  [...javascriptKeywords[2], "use", "sendStatus", "json", "setHeader"],
];

const htmlKeywords = [
  ["head", "meta", "link", "script", "title"],
  ["charset", "name", "content", "rel", "type", "href", "src", "defer"],
];

const cssKeywords = [
  [
    "footer-item",
    "home-section-paragraph",
    "container",
    "footer",
    "left-section",
    "selected-frame",
    "container-content",
  ],
  [
    "display",
    "flex-direction",
    "justify-content",
    "position",
    "padding",
    "border-color",
    "margin-top",
    "font-size",
    "flex-direction",
    "gap",
    "border",
    "overflow-y",
    "overflow-x",
    "hover",
    "not",
  ],
];

const goKeywords = [
  ["0", "nil", "1"],
  ["type", "package", "struct", "any", "func", "return", "if", "int"],
];

const cKeywords = [
  [
    "deque_node",
    "data",
    "Node",
    "create_deque",
    "malloc",
    "printf",
    "exit",
    "EXIT_FAILURE",
    "NULL",
    "front",
    "back",
    "next",
    "prev",
    "destroy_deque",
    "deque_is_empty",
    "deque_pop_front",
    "free",
    "memcpy",
    "true",
    "false",
    "deque_push_back",
    "deque_push_front",
    "deque_pop_back",
    "deque_front",
  ],
  [
    "typedef",
    "struct",
    "void",
    "sizeof",
    "if",
    "return",
    "while",
    "bool",
    "else",
    "Deque",
    "static",
    "char",
    "const",
  ],
];

const graphqlKeywords = [
  [
    "FileInput",
    "FilesInput",
    "DirectoryInput",
    "ListBucketResult",
    "DeleteFileResult",
    "DeleteDirectoryResult",
    "Queries",
    "Mutations",
    "schema",
    "ListInput",
    "UploadInput",
    "SignedUrlResult",
    "SignedUrlResult",
    "TextFileContentResult",
    "RestoreFileResult",
  ],
  [
    "input",
    "type",
    "union",
    "fileName",
    "path",
    "root",
    "versionId",
    "bucketName",
    "fileNames",
    "versionIds",
    "listBucketContent",
    "getUploadUrl",
    "getDownloadUrl",
    "getTextFileContent",
    "listInput",
    "uploadInput",
    "fileInput",
    "fileInput",
    "filesInput",
    "directoryInput",
    "deleteOneFile",
    "deleteManyFiles",
    "deleteDirectory",
    "restoreFileVersion",
  ],
  [
    "String",
    "ObjectList",
    "Unauthenticated",
    "Unauthorized",
    "StorageNotFound",
    "ServerError",
    "FileNotFound",
    "FileName",
    "FileNameList",
    "Directory",
    "RestoreFileResult",
  ],
];

const sqlKeywords = [
  ["Who Let The Dogs Out Party", "Let the dogs out"],
  ["SELECT", "DISTINCT", "FROM", "WHERE", "JOIN", "AND", "ON"],
];

const reactKeywords = [
  [
    ...typescriptKeywords[0],
    "Gallery",
    "length",
    "imagesUrls",
    "false",
    "false",
    "useState",
    "1",
    "setShowFullSizeImage",
  ],
  [...typescriptKeywords[1], "export", "ExpandedImageModal"],
  ["setCurrentIndex"],
];

const testKeywords = [
  ["test", "expect", "checkEmailValidity"],
  ["let"],
  ["toBeTruthy", "toBeFalsy", "toBeUndefined", "toBe", "__typename", "not"],
];

const bashKeywords = [
  ["copy_env_files", "$src_dir", "mkdir", "cp"],
  ["for", "in", ";", "then", "if", "elif", "do", "fi", "done"],
];

const yamlKeywords = [
  [
    "name",
    "on",
    "push",
    "jobs",
    "runs-on",
    "steps",
    "uses",
    "with",
    "branches",
    "main",
    "deploy_lambda",
    "ubuntu-latest",
    "env",
    "run",
  ],
];

const arduinoKeywords = [
  [
    ...cKeywords[0],
    "setup",
    "loop",
    "stop",
    "go",
    "pinMode",
    "OUTPUT",
    "INPUT",
    "HIGH",
    "LOW",
    "58.2",
    "1000",
    "delay",
    "50",
    "1000000",
    "pulseIn",
    "digitalWrite",
    "delayMicroSeconds",
    "10",
  ],
  [...cKeywords[1], "long", "int", "swich", "case", "break"],
];
