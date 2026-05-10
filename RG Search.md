---
name: "Library/LogeshG5/RG Search"
tags: meta/library
pageDecoration.prefix: "🔍︎ "
files:
- rg-search.css
---

# RG Search


## Implementation

```space-lua
searcher = searcher or {}

local PANEL_ID = "rhs"

searcher.html = [[
<body>
<div id="search-panel">
    <input type="text" id="search-input" autofocus tabindex="1" placeholder="Search">
    <div id="search-options">
        <button id="match-case">Aa</button>
        <button id="match-whole-word">Ab</button>
        <button id="use-regex">.*</button>
    </div>
</div>

<div id="results-panel"></div>
</body>
]]

searcher.script = [[
// ── 1. Theme injection ────────────────────────────────────────────
(function injectParentTheme() {
  const pd = window.parent && window.parent.document;
  if (!pd) return;

  // Sync theme attribute
  const theme = pd.documentElement.getAttribute("data-theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);

    // ---------------- Load Styles Once ----------------
    document.documentElement.style.visibility = 'hidden';
    const panel = parent.document.querySelector('.sb-panel.]] .. PANEL_ID .. [[');
    if (panel) panel.style.visibility = 'hidden';
    
    function ensureElement(id, tag, attributes, content) {
        if (document.getElementById(id)) return document.getElementById(id);
        const el = document.createElement(tag);
        el.id = id;
        for (let key in attributes) el.setAttribute(key, attributes[key]);
        if (content) el.innerHTML = content;
        document.head.appendChild(el);
        return el;
    }

    const mainCss  = ensureElement("silverbullet-main-css", "link", { rel: "stylesheet", href: "/.client/main.css"});
    const explorerCss = ensureElement("search-style-css", "link", { rel: "stylesheet", href: "/.fs/Library/LogeshG5/rg-search.css" });
    
    if (!document.getElementById("explorer-custom-styles-once")) {
        const parentStyles = parent.document.getElementById("custom-styles")?.innerHTML || "";
        const cleanStyles = parentStyles.replace(/<\/?style>/g, "");
        const styleEl = document.createElement("style");
        styleEl.id = "explorer-custom-styles-once";
        styleEl.innerHTML = cleanStyles;
        document.head.appendChild(styleEl);
    }   

    function onStyleLoaded(el) {
        return new Promise(resolve => {
            if (el.sheet) {
                resolve();
                return;
            }
            el.addEventListener('load',  resolve, { once: true });
            el.addEventListener('error', resolve, { once: true });
        });
    }

    const reveal = () => {
        document.documentElement.style.visibility = '';
        const panel = parent.document.querySelector('.sb-panel.]] .. PANEL_ID .. [[');
        if (panel) panel.style.visibility = '';
        // Move focus here so it triggers after the panel is actually visible
	setTimeout(() => {
	    searchInput.focus();
	    // Optional: select the text if you're pre-filling it from selection
	    searchInput.select(); 
	}, 100);
    };

    Promise.all([onStyleLoaded(mainCss), onStyleLoaded(explorerCss)]).then(reveal);

    setTimeout(reveal, 2000); // Failsafe

})(); 


    const searchInput = document.getElementById('search-input');
    const resultsPanel = document.getElementById('results-panel');
    const matchCaseBtn = document.getElementById('match-case');
    const matchWholeWordBtn = document.getElementById('match-whole-word');
    const useRegexBtn = document.getElementById('use-regex');
    
    syscall('editor.getSelection').then((result) => {
      searchInput.value = result.text;
      if(result.text.length > 3) {
        performSearch(result.text);
        }
    });
    
    let debounceTimeout;

    function debounceSearch() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const searchTerm = searchInput.value;
            if (searchTerm.length > 3) {
                performSearch(searchTerm);
            } else {
                resultsPanel.innerHTML = '';
            }
        }, 1000);
    }

    async function performSearch(searchTerm) {
        const matchCase = matchCaseBtn.classList.contains('active');
        const matchWholeWord = matchWholeWordBtn.classList.contains('active');
        const useRegex = useRegexBtn.classList.contains('active');

        // Construct the rg command arguments
        const rgArgs = ["-nbiu", "--column",  "--type", "markdown"];
        if (matchCase) rgArgs.push('--case-sensitive');
        if (matchWholeWord) rgArgs.push('--word-regexp');
        if(useRegex) rgArgs.push('--regexp');
        rgArgs.push(searchTerm);

        // Convert the JS array to a Lua table string format: {"arg1", "arg2"}
        const luaArgs = `{${rgArgs.map(arg => `"${arg.replace(/"/g, '\\"')}"`).join(", ")}}`;

        // Construct and execute the command
        const command = `pcall(shell.run, "rg", ${luaArgs})`;
        const rawResults = await syscall('lua.evalExpression',  `${command}`);
        
        const parsedResults = parseResults(rawResults.values[1].stdout);
        displayResults(parsedResults);
    }

    function parseResults(rawResults) {
        const lines = rawResults.trim().split('\n');
        const results = {};
        lines.forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 5) {
                const [path, line, column, offset, ...textParts] = parts;
                const text = textParts.join(':').trim();
                if (!results[path]) {
                    results[path] = [];
                }
                results[path].push({ line, column, offset, text });
            }
        });
        return results;
    }

    function displayResults(results) {
        resultsPanel.innerHTML = '';
        for (const path in results) {
            const fileResultsDiv = document.createElement('div');
            fileResultsDiv.className = 'file-results';

            const title = document.createElement('h2');
            title.textContent = path;
            fileResultsDiv.appendChild(title);

            results[path].forEach(result => {
                const item = document.createElement('div');
                item.className = 'result-item';
                item.dataset.path = path;
                item.dataset.column = result.column;
                item.dataset.offset = result.offset;

                const lineSpan = document.createElement('span');
                lineSpan.className = 'result-line';
                lineSpan.textContent = ` ${result.line} `;
                item.appendChild(lineSpan);

                const textSpan = document.createElement('span');
                textSpan.className = 'result-text';
                textSpan.textContent = result.text;
                item.appendChild(textSpan);

                item.addEventListener('click', () => {
                    const position = String(parseInt(item.dataset.column, 10) + parseInt(item.dataset.offset, 10) - 1)
                    const pathWithPosition = `${item.dataset.path}@${position}`;
                    syscall('editor.navigate', pathWithPosition, false, false)
                });

                fileResultsDiv.appendChild(item);
            });
            resultsPanel.appendChild(fileResultsDiv);
        }
    }

    searchInput.addEventListener('input', debounceSearch);

    matchCaseBtn.addEventListener('click', () => {
        matchCaseBtn.classList.toggle('active');
        debounceSearch();
    });

    matchWholeWordBtn.addEventListener('click', () => {
        matchWholeWordBtn.classList.toggle('active');
        debounceSearch();
    });

    useRegexBtn.addEventListener('click', () => {
        useRegexBtn.classList.toggle('active');
        debounceSearch();
    });
]]

command.define {
  name = "Advanced Search",
  key = "Ctrl-Shift-f",
  run = function()
    editor.showPanel(PANEL_ID, 1, searcher.html, searcher.script) 
  end
}
```
