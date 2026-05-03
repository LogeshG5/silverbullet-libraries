---
name: "Library/LogeshG5/Mobile Toolbar"
tags: meta/library
pageDecoration.prefix: "🧰 "
---

# Mobile Toolbar

```space-style
/* -- Fixed Bottom Container ---------------------------------------------- */
#sb-mobile-toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: var(--fmttb-bg);
    border-top: 1px solid var(--fmttb-border);
    display: flex;
    flex-direction: column; /* Stack for sub-menus if needed, or just single row */
    padding-bottom: env(safe-area-inset-bottom); /* iOS support */
    user-select: none;
    touch-action: manipulation;
}

.sb-toolbar-row {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 6px;
    gap: 8px;
    align-items: center;
}

.sb-toolbar-row::-webkit-scrollbar { display: none; }

/* -- Buttons ------------------------------------------------------------ */
.sb-fmttb-btn {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--fmttb-text);
}

.sb-fmttb-btn:active {
    background: var(--fmttb-active-bg);
    transform: scale(0.9);
}

.sb-fmttb-btn svg {
    width: 20px;
    height: 20px;
}
```

```space-lua
-- priority: 1

-- 1. Configuration & Icon Definitions
local icons = {
    back     = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>]],
    headings = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>]],
    bold     = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path></svg>]],
    italic   = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>]],
    list     = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path></svg>]],
    h1       = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><text x="2" y="18" font-family="sans-serif" font-size="16" font-weight="bold">H1</text></svg>]],
    h2       = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><text x="2" y="18" font-family="sans-serif" font-size="16" font-weight="bold">H2</text></svg>]],
    h3       = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><text x="2" y="18" font-family="sans-serif" font-size="16" font-weight="bold">H3</text></svg>]],
    check    = [[<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="m9 12 2 2 4-4"></path></svg>]]
}

-- 2. Menu Schema
local menus = {
    main = {
        { icon = icons.bold,     cmd = "Text: Bold" },
        { icon = icons.italic,   cmd = "Text: Italic" },
        { icon = icons.headings, sub = "headings" }, -- Enter sub-menu
        { icon = icons.list,     cmd = "Text: Toggle Bullet List" },
        { icon = icons.check,    cmd = "Text: Toggle Task" }
    },
    headings = {
        { icon = icons.back,     sub = "main" },     -- Exit sub-menu
        { icon = icons.h1,       cmd = "Text: Toggle Heading 1" },
        { icon = icons.h2,       cmd = "Text: Toggle Heading 2" },
        { icon = icons.h3,       cmd = "Text: Toggle Heading 3" }
    }
}

-- 3. Core Rendering Function
function renderMobileToolbar(menuKey)
    local toolbar = js.window.document.getElementById("sb-mobile-toolbar")
    
    -- Create toolbar container if it doesn't exist
    if not toolbar then
        toolbar = js.window.document.createElement("div")
        toolbar.id = "sb-mobile-toolbar"
        js.window.document.body.appendChild(toolbar)

        -- Scoped Event Listener (Event Delegation)
        toolbar.addEventListener("click", function(e)
            local btn = e.target.closest(".sb-fmttb-btn")
            if not btn then return end
            
            -- Keep focus behaviors clean
            e.preventDefault()
            e.stopPropagation()

            local action = btn.getAttribute("data-action")
         
            if action:sub(1,5) == "menu:" then
                print("in menu")
                local targetMenu = action:sub(6)
                renderMobileToolbar(targetMenu)
            elseif action:sub(1,4) == "cmd:" then
                print("in cmd", action:sub(5))
                local cmd = action:sub(5)
                editor.invokeCommand(cmd)
                -- Force focus back to editor for seamless typing on mobile
                editor.focus()
            else
              print("action.sub", action.sub(1,5))
              print("action:sub", action:sub(1,5))
              end
          
        end)
    end

    -- Build the HTML for the current menu state
    local menuItems = menus[menuKey] or menus.main
    local html = '<div class="sb-toolbar-row">'
    
    for _, item in ipairs(menuItems) do
        local action = item.sub and ("menu:" .. item.sub) or ("cmd:" .. item.cmd)
        local label  = item.cmd or item.sub
        
        html = html .. string.format(
            '<button class="sb-fmttb-btn" data-action="%s" aria-label="%s">%s</button>',
            action, label, item.icon
        )
    end
    
    html = html .. '</div>'
    toolbar.innerHTML = html
end

-- 4. Initialization Logic
function initToolbar()
    -- Only show on mobile/small screens (optional check)
    local isMobile = js.window.innerWidth < 768 or js.window.navigator.userAgent:match("Android|iPhone|iPad")
    
    if not isMobile then
        renderMobileToolbar("main")
    end
end

-- 5. Cleanup (Standard SilverBullet Practice)
function destroyToolbar()
    local toolbar = js.window.document.getElementById("sb-mobile-toolbar")
    if toolbar then toolbar.remove() end
end

-- Execute
initToolbar()
```
