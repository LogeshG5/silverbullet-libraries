---
name: "Library/LogeshG5/Formatter"
tags: meta/library
pageDecoration.prefix: "🛠️ "
files:
- prettier-3.6.2.js
- prettier-markdown-plugin-3.6.2.js
---

# Formatter

Format entire document or selected text with `Editor: Format` command.

Uses [Prettier](https://prettier.io/) under the hood.

A plug [silverbullet-formatter](https://github.com/LogeshG5/silverbullet-formatter) is also available for the same.

## Configuration

```lua
config.set("formatter.replace", {

  -- Escaped text to plain text
  {"\\%. ", ". "},  -- 1\. to 1. 
  {"\\%[", "["}, -- \[ to [
  {"\\%]", "]"}, -- \] to ]
  {"\\%*", "*"}, -- \* to *
  
  -- Asterisk list to hyphen list
  {"%- %[ %] ", "- [ ] "}, -- Asterisk task
  {"%- %[x%] ", "- [x] "},  -- Asterisk completed task
  {"^%* ", "- "}, -- Asterisk list

  -- Misc
  {":%*%*", "**:"}, -- :** to **: (spelling correction)
  {" ", " "}, -- special space char to normal space
})
```


## Implementaion

```space-lua
-- priority: -1
formatter = formatter or {}

-- From internet
--local prettier = js.import("https://cdn.jsdelivr.net/npm/prettier@3.6.2/standalone/+esm")
--local prettierMarkdown = js.import("https://cdn.jsdelivr.net/npm/prettier@3.6.2/plugins/markdown/+esm")

local prettier = js.import("/.fs/Library/LogeshG5/prettier-3.6.2.js")
local prettierMarkdown = js.import("/.fs/Library/LogeshG5/prettier-markdown-plugin-3.6.2.js")

function formatter.formatText(text)
  return prettier.format(text, { parser = 'markdown', plugins =  { prettierMarkdown } })
end

config.define("formatter.replace", schema.array(schema.array("string")))

function formatter.cleanupLLMText()
  local contents = editor.getText()

  local protected = {}
  local placeholderIndex = 0

  -- Helper to store and replace with placeholder
  local function protect(match)
    placeholderIndex = placeholderIndex + 1
    local key = "__CODE_BLOCK_" .. placeholderIndex .. "__"
    protected[key] = match
    return key
  end

  -- 1. Protect triple backtick blocks (multiline)
  contents = string.gsub(contents, "```.-```", protect)
  -- 2. Protect inline backticks
  contents = string.gsub(contents, "`[^`]-`", protect)
  -- 3. Protect ${...} template syntax
  contents = string.gsub(contents, "%${.-}", protect)

  -- 4. Apply replacements ONLY on non-code text
  for _, replacement in ipairs(config.get("formatter.replace") or {}) do
    contents = string.gsub(contents, replacement[1], replacement[2])
  end

  -- 5. Restore protected content
  for key, value in pairs(protected) do
    contents = string.gsub(contents, key, function()
      return value
    end)
  end

  editor.setText(contents)
end

function formatter.formatDocument()
  local text = editor.getText()
  local formattedText = formatter.formatText(text)
  editor.setText(formattedText)
end

function formatter.formatSelection()
  local selection = editor.getSelection()
  if selection.from == selection.to then
    return
  end
  local text = editor.getText()
  local selectedText = text.slice(selection.from, selection.to)
  local formattedText = formatter.formatText(selectedText)
  formattedText = text.substring(0, selection.from) + formattedText.slice(0, -1) + text.substring(selection.to)
  editor.setText(formattedText)
end

function formatter.formatContext()
  formatter.cleanupLLMText()
  local selection = editor.getSelection()
  if selection.from != selection.to then
    formatter.formatSelection()
  else
    formatter.formatDocument()
  end
end

function formatter.formatAndSave()
  formatter.formatContext()
  editor.save()
  editor.flashNotification "Formatted & Saved!"
end

command.define {
  name = "Editor: Format",
  run = formatter.formatContext,
}

command.define {
  name = "Save document (with Formatting)",
  key = "Ctrl-s",
  run = formatter.formatAndSave,
}
```
