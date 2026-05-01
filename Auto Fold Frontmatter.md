---
name: "Library/LogeshG5/Auto Fold Frontmatter"
tags: meta/library
pageDecoration.prefix: "➕ "
---

# Auto Fold Frontmatter

```space-lua
local function foldFrontmatter()
  local text = editor.getText()
  if(not string.startsWith(text, "---")) then
    print("No frontmatter, skipping folding")
    return 
  end
  local pos = editor.getCursor()
  editor.moveCursor(0)
  editor.fold()
  editor.moveCursor(pos)
  print("Frontmatter folded")
end

event.listen {
  name = "editor:pageLoaded",
  run = foldFrontmatter
}
```
