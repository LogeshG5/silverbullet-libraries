---
name: "Library/LogeshG5/Print Preview"
tags: meta/library
pageDecoration.prefix: "🖨️ "
files:
- pandoc-loader.js
- pandoc.wasm
---

# Print Preview

```space-lua
local function collectImageFiles(markdownText, pageName)
  local tree = markdown.parseMarkdown(markdownText)
  local imageFiles = {}
  local pageDir = pageName:match("^(.*)/[^/]+$") or ""

  local function getText(node)
    if node.text then
      return node.text
    end

    local result = ""
    for _, child in ipairs(node.children or {}) do
      result = result .. getText(child)
    end
    return result
  end

  local function resolveImage(path)
    path = path:gsub("\\", "/"):gsub("^%s+", ""):gsub("%s+$", "")

    if path == "" or path:match("^%a[%w+%.%-]*:") or path:match("^//") then
      return nil
    end

    local candidates = {}

    local function add(candidate)
      if not candidate or candidate == "" then return end

      candidate = candidate:gsub("^/+", "")

      for _, existing in ipairs(candidates) do
        if existing == candidate then return end
      end

      table.insert(candidates, candidate)
    end

    -- An explicitly page-relative path should not be prefixed again.
    if path:sub(1, #pageDir + 1) == pageDir .. "/" then
      add(path)
    else
      -- Try the current page's directory first for relative paths.
      if pageDir ~= "" then
        add(pageDir .. "/" .. path)
      end
      add(path)
    end

    for _, candidate in ipairs(candidates) do

      if space.fileExists(candidate) then
        return space.readDocument(candidate)
      end
    end

    print("Image not found:", path)
    return nil
  end

  local function visit(node)
    if node.type == "Image" then
      for _, child in ipairs(node.children or {}) do
        if child.type == "WikiLink" then
          for _, part in ipairs(child.children or {}) do
            if part.type == "WikiLinkPage" then
              local path = getText(part)

              local data = resolveImage(path)

              if data then
                imageFiles[path] = data
              else
                print("Wiki image resolution failed:", path)
              end
            end
          end

        elseif child.type == "URL" then
          local path = getText(child)
          local data = resolveImage(path)

          if data then
            imageFiles[path] = data
          end
        end
      end
    end

    for _, child in ipairs(node.children or {}) do
      visit(child)
    end
  end

  visit(tree)
  return imageFiles
end


local function markdownToHtml(markdown, title)
  local pandoc = js.importFromSpace(
    "Library/LogeshG5/pandoc-loader.js"
  )

  -- Read WASM directly from SilverBullet filesystem.
  local wasmBinary = space.readDocument(
    "Library/LogeshG5/pandoc.wasm"
  )
  local imageFiles = collectImageFiles(markdown, title)
  pandoc.initialize(wasmBinary)

  return pandoc.markdownToHtml(markdown, title, js.tojs(imageFiles))
end


command.define {
  name = "Export: Print Preview with Pandoc",
  run = function()
    editor.save()

    local pageName = editor.getCurrentPage()
    local markdown = editor.getText()

    local html = markdownToHtml(markdown, pageName)

    local outputFile = "temp/PrintPreview.html"
    space.writeFile(outputFile, html)
    sync.performFileSync(outputFile)

    editor.openUrl(
      system.getURLPrefix() .. ".fs/" .. outputFile
    )
  end
}
```

