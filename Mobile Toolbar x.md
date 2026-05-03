---
name: "Library/LogeshG5/Mobile Toolbar"
tags: meta/library
pageDecoration.prefix: "🧰 "
---

# Mobile Toolbar

### Mobile Toolbar

```space-lua
config.set {
  mobileMenuStyle = 'bottom-bar',
  actionButtons = {
    {
      icon = "home",
      description = "Go to the index page",
      run = function()
        editor.invokeCommand("Navigate: Home")
      end
    },
    {
      icon = "book",
      description = "Open page",
      run = function()
        editor.invokeCommand("Navigate: Page Picker")
      end
    },
    {
      icon = "search",
      description = "Search",
      run = function()
        editor.invokeCommand("Silversearch: Search")
      end
    },
    {
      icon = "terminal",
      description = "Run command",
      run = function()
        editor.invokeCommand "Open Command Palette"
      end,
    },
    {
      icon = "check-square",
      mobile = true,
      description = "Task",
      run = function()
        editor.invokeCommand("Task: Convert to Task")
      end
    },
    {
      icon = "md-format-indent-decrease",
      mobile = true,
      description = "Dedent",
      run = function()
        editor.invokeCommand("Outline: Move Left")
      end
    },
    {
      icon = "md-format-indent-increase",
      description = "Indent",
      mobile = true,
      run = function()
        editor.invokeCommand("Outline: Move Right")
      end
    },
    {
      icon = "arrow-up",
      mobile = true,
      description = "Outline Up",
      run = function()
        editor.invokeCommand("Outline: Move Up")
      end
    },
    {
      icon = "arrow-down",
      description = "Outline Down",
      mobile = true,
      run = function()
        editor.invokeCommand("Outline: Move Down")
      end
    },
    {
      icon = "hash",
      description = "Header: Toggle Level 3",
      mobile = true,
      run = function()
        editor.invokeCommand("Header: Toggle Level 3")
      end
    }
  }
}
```

Make mobile toolbar into a bottom bar or top bar on mobile and make it scrollable if there are too many buttons to fit

```space-style
@media only screen and (max-width: 600px) {
  /* Style the menu as a bottom bar */
  #sb-top .sb-actions.bottom-bar {
    position: fixed;
    // Bar at bottom 
    // bottom: 0; 
    // border-top: 2px solid var(--base02); 
    // Bar at top
    border-bottom: 2px solid var(--base02); 
    top: 55px; 
    left: 0;
    padding: 10px 0;
    background: var(--top-background-color);
    width: 100vw;
    box-shadow: 0px 4px 8px black;
    //justify-content: flex-start;
    overflow-x:scroll;
    cursor:grab;
    scrollbar-width:none;
    flex-wrap: nowrap;
    height:2rem;
    white-space: nowrap;
    display: flex;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch; /* smooth momentum scrolling on iOS */
    scrollbar-width: none;            /* Firefox */
    -ms-overflow-style: none;
  }
  #sb-top .sb-actions.bottom-bar button {
    padding: 1.1ex;
    margin: 0;
    height: unset;
    width: unset;
  }
  #sb-top .sb-actions.bottom-bar button svg {
    margin-bottom: -0.2rem;
    height: 18px !important;
    width: 18px !important;
  }
}
```

### Convert To Task

```space-lua
command.define {
  name = "Task: Convert to Task",
  run = function()

    local function convertLines(text)
      local count = 0

      local newText = string.gsub(text, "[^\n]+", function(line)
        -- skip if already a task
        if line:match("^%s*%- %[[ xX]%]") then
          return line
        end

        count = count + 1

        if line:match("^%s*$") then
          return "- [ ] "
        end

        return "- [ ] " .. line
      end)

      return newText, count
    end

    local selection = editor.getSelection()

    -- Case 1: Selection exists
    if selection and selection.text and selection.text ~= "" then
      local newText, count = convertLines(selection.text)
      -- editor.replaceRange(selection.from, selection.to, newText, true)
      editor.replaceRange(selection.from, selection.to, newText)
      editor.flashNotification("Converted " .. count .. " lines to tasks")
      return
    end

    -- CASE 2: Current line
    local line = editor.getCurrentLine()

    if line and line.text then

      if line.text:match("^%s*%- %[[ xX]%]") then
        editor.flashNotification("Already a task")
        return
      end

      local newLine
      newLine = "- [ ] " .. line.text 
      editor.replaceRange(line.from, line.to, newLine)
      editor.moveCursor(line.from + #newLine, false)
      editor.flashNotification("Converted line to task")
    end

  end
}
```

### Header Toggle

```space-lua
-- function to toggle a specific header level
local function toggleHead(level)
  local line = editor.getCurrentLine()
  
  local text = line.text
  local currentLevel = string.match(text, "^(#+)%s*")
  currentLevel = currentLevel and #currentLevel or 0
  
  local textC = line.textWithCursor
  local posC = string.find(textC, "", 1, true)
  
  local lineHead
  if posC > currentLevel + 1 then
    local bodyTextC = string.gsub(textC, "^#+%s*", "")
    if currentLevel == level then
      lineHead = bodyTextC
    else
      lineHead = string.rep("#", level) .. " " .. bodyTextC
    end
  else
    local bodyText = string.gsub(text, "^#+%s*", "")
    if currentLevel == level then
      lineHead =  bodyText
    else
      lineHead = string.rep("#", level) .. " " .. bodyText
    end
  end
  editor.replaceRange(line.from, line.to, lineHead)
  editor.moveCursor(line.from + #lineHead, false)
  
end

-- register commands Ctrl-1 → Ctrl-6
for lvl = 1, 6 do
  command.define {
    name = "Header: Toggle Level " .. lvl,
    key = "Ctrl-" .. lvl,
    run = function() 
      toggleHead(lvl) 
    end
  }
end
```
