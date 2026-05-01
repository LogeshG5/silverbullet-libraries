---
name: "Library/LogeshG5/Journal As Index"
tags: meta/library
pageDecoration.prefix: "🔍︎ "
---

# Journal As Index

```space-lua
function getMondayFromToday()
  local now = os.time()
  -- now = os.time({year=2025, month=06, day=16})
  -- print("subtract 1: " .. os.date("%Y-%m-%d", now))
  local weekday = tonumber(os.date("%w", now))  -- Sunday = 1, Monday = 2,..

  -- print("subtract 1: " .. weekday)
  -- Calculate how many days to subtract to get to Monday
  local daysToSubtract = (weekday == 0) and 6 or (weekday - 1)
  -- print("subtract 2: " .. daysToSubtract)
  local mondayTime = now - (daysToSubtract * 24 * 60 * 60)
  -- print("subtract 3: " .. os.date("%Y-%m-%d", mondayTime))
  return os.date("%Y-%m-%d", mondayTime)
end

command.define {
  name = "Navigate: Journal Index",
  run = function() 
    editor.navigate("Journal/Week/" .. getMondayFromToday() .. ".md")
  end
}

-- local function redirectToCustomIndex()
--   if editor.getCurrentPage() == "index" then
--     -- Change this to whatever page you want your index page to be
--     editor.navigate("Journal/Week/" .. getMondayFromToday() .. ".md")
--   end
-- end

-- Trigger the above function when the editor is first loaded
-- event.listen {
--   name = "editor:init",
--   run = redirectToCustomIndex
-- }

-- And also when any page is loaded (because it may be the index page)
-- event.listen {
--   name = "editor:pageLoaded",
--   run = redirectToCustomIndex
-- }
```

${getMondayFromToday()}
