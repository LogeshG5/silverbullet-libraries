---
name: "Library/LogeshG5/Export As PDF with Pandoc"
tags: meta/library
pageDecoration.prefix: "🖨️ "
---

# Export As PDF with Pandoc

A pdf will be created in the same directory as the md.

> **note** Note
> Will not work in docker as shell run gets executed inside docker 

```space-lua
save = {}

function save.export()
  print "Exporting to pdf..."
  pageName = editor.getCurrentPage()
  mdFileName = pageName .. ".md"
  pdfFileName = pageName .. ".pdf"
  shell.run("pandoc", {mdFileName, "-o", pdfFileName})
  editor.downloadFile(pdfFileName, pdfFileName)
  editor.flashNotification("PDF Created!")
end
```

