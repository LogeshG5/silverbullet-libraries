---
name: "Library/LogeshG5/RG Search"
tags: meta/library
pageDecoration.prefix: "🔍︎ "
files:
- rg-search.css
---

# RG Search

## Prerequisites: Installing `rg` (Ripgrep)

This feature relies on `rg` (Ripgrep) to perform blazing-fast searches across your space. Before you can use it, you need to ensure `rg` is installed in your environment.

### 💻 1. Local System Installation

If you run the application directly on your local computer, you must install `rg` using your system's package manager:

* **macOS (Homebrew):** `brew install ripgrep`
* **Windows (Scoop):** `scoop install ripgrep`
* **Linux (Ubuntu/Debian):** `sudo apt-get install ripgrep`

### 🐋 2. Docker Installation

If you are running the application inside a Docker container, you can automate the installation using a startup script file so it persists whenever the container boots.

1. **Create the boot script file:** Root directory.

Create a new file named exactly `CONTAINER_BOOT.md` and place it in the **root** of your space.

2. **Add the installation command:** Edit file.

Open the file and add the following line to install the package automatically on startup:

```bash
apk add ripgrep
```

*(Note: If your specific base image uses Alpine Linux, `apk add rg` or `apk add ripgrep` will handle fetching the binary).*

3. **Restart your container:** Apply changes.
Restart your Docker container to trigger the boot script and initialize the tool.

---

## Implementation

```space-lua
searcher = searcher or {}

local PANEL_ID = "rhs"

searcher.html = [[
<body>
    <div class="rg-widget">
        <!-- Header -->
        <div class="rg-header">
            <div class="rg-title">SEARCH</div>

            <div class="rg-actions">
                <button id="refreshBtn" class="icon-btn" title="Refresh Search">
                    ⟳
                </button>

                <button id="clearBtn" class="icon-btn" title="Clear Search Results">
                    ✕
                </button>

                <button id="toggleAllBtn" class="icon-btn" title="Collapse / Expand All">
                    ⇵
                </button>
            </div>
        </div>

        <!-- Search Area -->
        <div class="search-area">
            <div class="search-input-wrap">
                <input id="searchInput" class="search-input" placeholder="Search..." autocomplete="off" />

                <div class="modifiers">
                    <button id="matchCaseBtn" class="mod-btn" title="Match Case">
                        Aa
                    </button>

                    <button id="wholeWordBtn" class="mod-btn" title="Match Whole Word">
                        ab
                    </button>

                    <button id="regexBtn" class="mod-btn" title="Use Regex">.*</button>
                </div>
            </div>

            <div id="advancedToggle" class="advanced-toggle">
                Advanced Options...
            </div>

            <div id="advancedPanel" class="advanced-panel">
                <input id="includeInput" class="filter-input" placeholder="Files to include" />

                <input id="excludeInput" class="filter-input" placeholder="Files to exclude" />
            </div>
        </div>

        <!-- Stats -->
        <div class="stats">
            <div id="statsText">Type to search...</div>

            <div id="status" class="status hidden">
                <div class="loader"></div>
                <span>Searching...</span>
            </div>
        </div>

        <!-- Results -->
        <div id="results" class="results"></div>
    </div>
    </body>
]]

searcher.themeInjectionScript = [[
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

]]

searcher.script = [[
/* ------------------------------------------------ */
        /* SILVERBULLET */
        /* ------------------------------------------------ */

        const syscall =
            window.syscall || (() => Promise.reject("syscall unavailable"));

        /* ------------------------------------------------ */
        /* DOM */
        /* ------------------------------------------------ */

        const searchInput = document.getElementById("searchInput");

        const includeInput = document.getElementById("includeInput");
        const excludeInput = document.getElementById("excludeInput");

        const matchCaseBtn = document.getElementById("matchCaseBtn");
        const wholeWordBtn = document.getElementById("wholeWordBtn");
        const regexBtn = document.getElementById("regexBtn");

        const refreshBtn = document.getElementById("refreshBtn");
        const clearBtn = document.getElementById("clearBtn");
        const toggleAllBtn = document.getElementById("toggleAllBtn");

        const advancedToggle = document.getElementById("advancedToggle");
        const advancedPanel = document.getElementById("advancedPanel");

        const statsText = document.getElementById("statsText");
        const resultsEl = document.getElementById("results");
        const statusEl = document.getElementById("status");

        /* ------------------------------------------------ */
        /* STATE */
        /* ------------------------------------------------ */

        let fileStates = {};
        let expandAll = true;

        let lastSearchToken = 0;

        /* ------------------------------------------------ */
        /* HELPERS */
        /* ------------------------------------------------ */

        function setSearching(v) {
            if (v) {
                statusEl.classList.remove("hidden");
            } else {
                statusEl.classList.add("hidden");
            }
        }

        function escapeHTML(str) {
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }

        function splitPath(fullPath) {
            const parts = fullPath.split("/");

            const file = parts.pop();

            return {
                file,
                dir: parts.join("/"),
            };
        }

        function truncateText(text, max = 100) {
            if (text.length <= max) {
                return text;
            }

            return "..." + text.slice(-(max - 3));
        }

        function buildHighlightedHTML(text, submatches) {
            if (!submatches || !submatches.length) {
                return escapeHTML(truncateText(text));
            }

            let result = "";
            let last = 0;

            for (const sm of submatches) {
                result += escapeHTML(text.slice(last, sm.start));

                result += `<span class="hl">${escapeHTML(text.slice(sm.start, sm.end))}</span>`;

                last = sm.end;
            }

            result += escapeHTML(text.slice(last));

            return truncateText(result);
        }

        /* ------------------------------------------------ */
        /* PARSE RG OUTPUT */
        /* ------------------------------------------------ */

        function parseRGOutput(stdout) {
            const files = {};
            let summary = null;

            const lines = stdout.trim().split("\n").filter(Boolean);

            for (const line of lines) {
                let obj;

                try {
                    obj = JSON.parse(line);
                } catch {
                    continue;
                }

                if (obj.type === "match") {
                    const data = obj.data;

                    const path = data.path.text;

                    if (!files[path]) {
                        files[path] = [];
                    }

                    files[path].push({
                        line: data.line_number,
                        absoluteOffset: data.absolute_offset,
                        text: data.lines.text.replace(/\n$/, ""),
                        submatches: data.submatches || [],
                    });
                }

                if (obj.type === "summary") {
                    summary = obj.data.stats;
                }
            }

            return {
                files,
                summary,
            };
        }

        /* ------------------------------------------------ */
        /* RENDER */
        /* ------------------------------------------------ */

        function renderResults(parsed) {
            const files = parsed.files;
            const summary = parsed.summary;

            resultsEl.innerHTML = "";

            const paths = Object.keys(files);

            if (!summary || summary.matches === 0) {
                statsText.textContent = "0 results";

                resultsEl.innerHTML = `
      <div class="empty-state">
        No matches found
      </div>
    `;

                return;
            }

            statsText.textContent = `${summary.matches} results in ${summary.searches_with_match} files`;

            for (const path of paths) {
                const matches = files[path];

                if (fileStates[path] === undefined) {
                    fileStates[path] = true;
                }

                const isOpen = fileStates[path];

                const { file, dir } = splitPath(path);

                const group = document.createElement("div");
                group.className = "file-group";

                /* ---------------------------- */
                /* FILE ROW                     */
                /* ---------------------------- */

                const fileRow = document.createElement("div");
                fileRow.className = "file-row";

                fileRow.innerHTML = `
      <div class="chevron ${isOpen ? "" : "collapsed"}">
        ▼
      </div>

      <div class="file-info">
        <div class="file-name">
          ${escapeHTML(file)}
        </div>

        <div class="file-path">
          ${escapeHTML(dir)}
        </div>
      </div>

      <div class="badge">
        ${matches.length}
      </div>
    `;

                fileRow.onclick = () => {
                    fileStates[path] = !fileStates[path];

                    renderResults(parsed);
                };

                group.appendChild(fileRow);

                /* ---------------------------- */
                /* MATCHES                      */
                /* ---------------------------- */

                if (isOpen) {
                    const matchesWrap = document.createElement("div");
                    matchesWrap.className = "matches";

                    for (const match of matches) {
                        const row = document.createElement("div");
                        row.className = "match-row";

                        row.innerHTML = `
          <div class="line-number">
            ${match.line}
          </div>

          <div class="line-content">
            ${buildHighlightedHTML(match.text, match.submatches)}
          </div>
        `;

                        row.onclick = async (e) => {
                            e.stopPropagation();

                            const firstSubmatch = match.submatches[0];

                            const column = firstSubmatch ? firstSubmatch.start + 1 : 1;

                            const navTarget = `${path}@${column + match.absoluteOffset - 1}`;
                            syscall('editor.navigate', navTarget, false, false)
                            console.log(navTarget);

                            // Optional future navigation:
                            // await syscall("editor.navigate", navTarget);
                        };

                        matchesWrap.appendChild(row);
                    }

                    group.appendChild(matchesWrap);
                }

                resultsEl.appendChild(group);
            }
        }

        /* ------------------------------------------------ */
        /* SEARCH */
        /* ------------------------------------------------ */

        async function performSearch(searchTerm) {
            const token = ++lastSearchToken;

            if (!searchTerm || !searchTerm.trim()) {
                resultsEl.innerHTML = `
      <div class="empty-state">
        Type to search...
      </div>
    `;

                statsText.textContent = "0 results";

                return;
            }

            setSearching(true);

            try {
                const matchCase = matchCaseBtn.classList.contains("active");

                const matchWholeWord = wholeWordBtn.classList.contains("active");

                const useRegex = regexBtn.classList.contains("active");

                const rgArgs = ["-nbiu", "--json", "--column", "--type", "markdown"];

                if (matchCase) {
                    rgArgs.push("--case-sensitive");
                }

                if (matchWholeWord) {
                    rgArgs.push("--word-regexp");
                }

                if (useRegex) {
                    rgArgs.push("--regexp");
                }

                // include/exclude examples
                if (includeInput.value.trim()) {
                    rgArgs.push("--glob");
                    rgArgs.push(includeInput.value.trim());
                }

                if (excludeInput.value.trim()) {
                    rgArgs.push("--glob");
                    rgArgs.push(`!${excludeInput.value.trim()}`);
                }

                rgArgs.push(searchTerm);

                const luaArgs = `{${rgArgs
                    .map((arg) => `"${arg.replace(/"/g, '\\"')}"`)
                    .join(", ")}}`;

                const command = `pcall(shell.run, "rg", ${luaArgs})`;

                const rawResults = await syscall("lua.evalExpression", `${command}`);

                // stale request guard
                if (token !== lastSearchToken) {
                    return;
                }

                const stdout = rawResults.values[1].stdout || "";

                const parsed = parseRGOutput(stdout);

                renderResults(parsed);
            } catch (err) {
                console.error(err);

                resultsEl.innerHTML = `
      <div class="empty-state">
        Search failed
      </div>
    `;

                statsText.textContent = "Search failed";
            } finally {
                if (token === lastSearchToken) {
                    setSearching(false);
                }
            }
        }

        /* ------------------------------------------------ */
        /* EVENTS */
        /* ------------------------------------------------ */

        advancedToggle.onclick = () => {
            advancedPanel.classList.toggle("show");
        };

        function triggerSearch() {
            performSearch(searchInput.value);
        }

        /* ------------------------------------------------ */
        /* LIVE SEARCH */
        /* ------------------------------------------------ */

        searchInput.addEventListener("input", triggerSearch);

        includeInput.addEventListener("input", triggerSearch);

        excludeInput.addEventListener("input", triggerSearch);

        /* ------------------------------------------------ */
        /* MODIFIERS */
        /* ------------------------------------------------ */

        [matchCaseBtn, wholeWordBtn, regexBtn].forEach((btn) => {
            btn.addEventListener("click", () => {
                btn.classList.toggle("active");

                triggerSearch();
            });
        });

        /* ------------------------------------------------ */
        /* ACTIONS */
        /* ------------------------------------------------ */

        refreshBtn.onclick = () => {
            triggerSearch();
        };

        clearBtn.onclick = () => {
            searchInput.value = "";

            resultsEl.innerHTML = `
    <div class="empty-state">
      Cleared
    </div>
  `;

            statsText.textContent = "0 results";
        };

        toggleAllBtn.onclick = () => {
            expandAll = !expandAll;

            Object.keys(fileStates).forEach((path) => {
                fileStates[path] = expandAll;
            });

            triggerSearch();
        };

        /* ------------------------------------------------ */
        /* INITIAL SELECTED TEXT SEARCH */
        /* ------------------------------------------------ */

        async function initializeFromSelection() {
            try {
                const result = await syscall("editor.getSelection");

                if (result?.text?.trim()) {
                    searchInput.value = result.text;

                    performSearch(result.text);
                }
            } catch (err) {
                console.warn("Unable to fetch editor selection", err);
            }
        }

        initializeFromSelection();
]]

local script = searcher.themeInjectionScript .. searcher.script
command.define {
  name = "Advanced Search",
  key = "Ctrl-Shift-f",
  run = function()
    editor.showPanel(PANEL_ID, 1, searcher.html, script)
  end
}
```
