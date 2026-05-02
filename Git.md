---
name: "Library/LogeshG5/Git"
tags: meta/library
pageDecoration.prefix: "📝 "
---

# Git Sync

```space-lua
git = {}

function git.init(url, email, username)
  local ok, message = pcall(function()
    result = shell.run("git", {"init"})
    print("Clone init: ", result.stdout)
    result = shell.run("git", {"remote", "remove", "origin"})
    print("Clone: ", result.stdout)
    result = shell.run("git", {"remote", "add", "origin", url})
    print("Clone: ", result.stdout)
    result = shell.run("git", {"fetch", "origin"})
    print("Clone: ", result.stdout)
    result = shell.run("git", {"checkout", "-b", "main", "origin/main"})
    print("git checkout: ", result.stdout)
    result = shell.run("git", {"status"})
    print("git status: ", result.stdout)
    result = shell.run("git", {"log", "-1"})
    print("git log: ", result.stdout)
    result = shell.run("git", {"reset", "--hard", "origin/main"})
    print("git reset: ", result.stdout)
    result = shell.run("git", {"clean", "-fd"})
    print("git clean: ", result.stdout)
    result = shell.run("git", {"branch", "--set-upstream-to=origin/main", "main"})
    print("git set-upstream: ", result.stdout)
    result = shell.run("git", {"config", "--global", 
      "user.email", "logeshg5@gmail.com"})
    print("git user.email: ", result)
    result = shell.run("git", {"config", "--global", 
      "user.name", "Logesh G"})
    print("git user.name: ", result)
  end)
  if not ok then
    print("Git clone failed: " .. message)
  end
end

function git.commit(message)
  message = message or "Snapshot"
  print "Comitting..."
  local ok, message = pcall(function()
    result = shell.run("git", {"add", "."})
    print("git add", result)
    result = shell.run("git", {"commit", "-a", "-m", message})
    print("git commit", result)
    result = shell.run("git", {"log", "-1"})
    print("git log: ", result)
  end)
  if not ok then
    print("Git commit failed: " .. message)
  end
end

function git.sync()
  -- git.commit()
  print "Pulling New ..."
  local ok, result = pcall(function()
    result = shell.run("git", {"status"})
    print("git status", result)
    result = shell.run("git", {"pull"})
    print("git pull", result.stdout, result.stderr or "ERR!")
    result = shell.run("git", {"push"})
    print("git push", result.stdout, result.stderr or "ERR!")
    result = shell.run("git", {"status"})
    print("git status: ", result.stdout, result.stderr or "ERR!")
    result = shell.run("git", {"log", "-1"})
    print("git log: ", result.stdout, result.stderr or "ERR!")
  end)
    
end

function git.debug()
  -- git.commit()
  print "Pulling New ..."
  local ok, result = pcall(function()
    result = shell.run("git", {"config", "--global", 
      "user.email", "logeshg5@gmail.com"})
    print("git user.email: ", result)
    result = shell.run("git", {"config", "--global", 
      "user.name", "Logesh G"})
    print("git user.name: ", result)
    result = shell.run("git", {"status"})
    print("git status", result)
    result = shell.run("git", {"remote", "-v"})
    print("git remote", result)
    -- result = shell.run("git", {"push"})
    -- print("git push", result.stdout, result.stderr or "ERR!")
    -- result = shell.run("git", {"status"})
    -- print("git status: ", result.stdout, result.stderr or "ERR!")
    result = shell.run("git", {"log", "-6"})
    print("git log: ", result.stdout, result.stderr or "ERR!")
  end)
    
end

command.define {
  name = "Git: 
  run = function()
    local confirmed = editor.confirm "This operation will reset all existing files, Are you sure?"
    if not confirmed then return end
    local url = editor.prompt "Clone URL:"
    local email = editor.prompt "Email:"
    local username = editor.prompt "User Name:"
    git.init(url, email, username)
    editor.flashNotification "Cloned!"
  end
}

command.define {
  name = "Git: Commit",
  run = function()
    local message = editor.prompt("Commit message:", "Snapshot")
    git.commit(message)
    editor.flashNotification "Committed!"
  end
}

command.define {
  name = "Git: Sync",
  run = function()
    git.sync()
    editor.flashNotification "Sync Complete!"
  end
}

command.define {
  name = "Git: Debug",
  run = function()
    git.debug()
  end
}
```
