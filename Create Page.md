---
name: "Library/LogeshG5/Create Page"
tags: meta/library
pageDecoration.prefix: "📄 "
---

# Create Page

```space-lua
command.define {
  name = "Page: Create Page",
  key = "Alt-Ctrl-n",
  run = function()
    local current = editor.getCurrentPage()
    text = editor.getText();
    selection = editor.getSelection();
    selectedText = text.slice(selection.from, selection.to);
    local path = string.gsub(current, "/*[^/]+$", "")
    if path ~= "" then path = path .. "/" end
    local name = editor.prompt("Page name", selectedText)
    if not name then return else editor.navigate(path  .. name) end
    editor.insertAtCursor("# " .. name .. "\n\n")
  end
}
```
