---
name: "Library/LogeshG5/Toggle Title Bar Visibility"
tags: meta/library
pageDecoration.prefix: "👁️‍🗨️ "
---

# Toggle Title Bar Visibility

```space-lua
command.define {
  name = "Editor: Toggle Title Bar Visibility",
  -- key = "Ctrl-Alt-C",
  run = function()
    local mode = editor.getUiOption('sbTopDisplay')
    print("Toggle top bar")
    editor.rebuildEditorState()
    editor.reloadConfigAndCommands()
    if mode == true then
      js.window.document.querySelector('#sb-top').style.display = 'block'
    else
      js.window.document.querySelector('#sb-top').style.display = 'none'
    end
    editor.setUiOption('sbTopDisplay', not mode)
  end
}
```
