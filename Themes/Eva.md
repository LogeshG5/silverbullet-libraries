---
name: Library/LogeshG5/Themes/Eva
tags: meta/library
description: SilverBullet Eva and Eva Dark theme
files:
- Eva/Light.md
- Eva/Dark.md
---


## CSS Variables Mapping

```space-style
/* priority: 1 */
html,
html[data-theme="light"],
html[data-theme="dark"] {
  /* ----------------------------------------------------
     Core Branding & Accents
     ---------------------------------------------------- */
  --ui-accent-color: var(--base0D); /* Primary Accent (Blue) */
  --ui-accent-text-color: var(--base0D);
  --ui-accent-contrast-color: var(--base00); /* Text on accent background */
  --highlight-color: color-mix(in srgb, var(--base0A) 40%, transparent); /* Highlight (Yellow) */
  --link-color: var(--base0D);
  --link-missing-color: var(--base09); /* Missing link (Orange) */
  --link-invalid-color: var(--base08); /* Invalid link (Red) */
  --meta-color: var(--base0F);         /* Structure/Meta (Brown/Dark Red) */
  --meta-subtle-color: var(--base03);  /* Muted metadata (Comments/Gray) */
  --subtle-color: var(--base04);       /* Secondary layout text */
  --subtle-background-color: color-mix(in srgb, var(--base03) 12%, transparent);

  /* ----------------------------------------------------
     Main Layout Canvas
     ---------------------------------------------------- */
  --root-background-color: var(--base00); /* Core Canvas Background */
  --root-color: var(--base05);            /* Core Text Foreground */

  /* Top Status & Navigation Bar */
  --top-color: var(--base05);
  --top-background-color: var(--base01);
  --top-border-color: var(--base02);
  --top-sync-error-color: var(--base08);
  --top-sync-error-background-color: color-mix(in srgb, var(--base08) 15%, transparent);
  --top-saved-color: var(--base06);
  --top-unsaved-color: var(--base03);
  --top-loading-color: var(--base04);

  /* Workspace Panels & Sidebar */
  --panel-background-color: var(--base00);
  --panel-border-color: var(--base02);
  --bhs-background-color: var(--base00);
  --bhs-border-color: var(--base02);

  /* ----------------------------------------------------
     Modals, Popovers & Commands
     ---------------------------------------------------- */
  --modal-color: var(--base05);
  --modal-background-color: var(--base01);
  --modal-border-color: var(--base03);
  --modal-backdrop-color: color-mix(in srgb, var(--base00) 50%, transparent);
  --modal-header-label-color: var(--ui-accent-text-color);
  --modal-help-background-color: var(--base02);
  --modal-help-color: var(--base05);
  --modal-selected-option-background-color: var(--ui-accent-color);
  --modal-selected-option-color: var(--ui-accent-contrast-color);
  --modal-hint-background-color: var(--base02);
  --modal-hint-color: var(--base05);
  --modal-hint-inactive-background-color: var(--base01);
  --modal-hint-inactive-color: var(--base04);
  --modal-description-color: var(--base04);
  --modal-selected-option-description-color: var(--ui-accent-contrast-color);

  /* Toast & App Notifications */
  --notifications-background-color: var(--base01);
  --notifications-border-color: var(--base02);
  --notification-info-background-color: color-mix(in srgb, var(--base0D) 20%, var(--base00));
  --notification-error-background-color: color-mix(in srgb, var(--base08) 20%, var(--base00));
  --notification-warning-background-color: color-mix(in srgb, var(--base09) 20%, var(--base00));

  /* ----------------------------------------------------
     Interactive UI Elements (Buttons & Inputs)
     ---------------------------------------------------- */
  --button-background-color: var(--base02);
  --button-hover-background-color: var(--base03);
  --button-color: var(--base05);
  --button-border-color: var(--base03);

  --primary-button-background-color: var(--ui-accent-color);
  --primary-button-hover-background-color: color-mix(in srgb, var(--ui-accent-color) 85%, var(--base05));
  --primary-button-color: var(--ui-accent-contrast-color);
  --primary-button-border-color: transparent;

  --text-field-background-color: var(--button-background-color);

  --progress-background-color: var(--base02);
  --progress-sync-color: var(--base05);
  --progress-index-color: var(--base0D);

  --action-button-background-color: transparent;
  --action-button-color: var(--base04);
  --action-button-hover-color: var(--base0D);
  --action-button-active-color: var(--base0D);

  /* ----------------------------------------------------
     The Markdown Editor Workspace
     ---------------------------------------------------- */
  --editor-caret-color: var(--base05);
  --editor-selection-background-color: var(--base02);
  --editor-panels-bottom-color: var(--base05);
  --editor-panels-bottom-background-color: var(--base01);
  --editor-panels-bottom-border-color: var(--base02);
  --editor-completion-detail-color: var(--base04);
  --editor-completion-detail-selected-color: var(--base06);
  --editor-list-bullet-color: var(--base03);
  --editor-heading-color: var(--base0D);
  --editor-heading-meta-color: var(--meta-subtle-color);
  --editor-ruler-color: var(--base02);

  /* Tags & Links */
  --editor-hashtag-background-color: color-mix(in srgb, var(--base0E) 15%, transparent);
  --editor-hashtag-color: var(--base0E);
  --editor-hashtag-border-color: color-mix(in srgb, var(--base0E) 30%, transparent);
  --editor-naked-url-color: var(--link-color);
  --editor-link-color: var(--link-color);
  --editor-link-url-color: var(--link-color);
  --editor-link-meta-color: var(--meta-subtle-color);
  --editor-wiki-link-page-background-color: color-mix(in srgb, var(--base0D) 8%, transparent);
  --editor-wiki-link-page-color: var(--link-color);
  --editor-wiki-link-page-missing-color: var(--link-missing-color);
  --editor-wiki-link-page-invalid-color: var(--link-invalid-color);
  --editor-wiki-link-color: var(--base0C);

  /* Inline Code & Markdown Tables */
  --editor-code-color: var(--base0B);
  --editor-code-background-color: var(--subtle-background-color);
  --editor-table-head-background-color: var(--base02);
  --editor-table-head-color: var(--base05);
  --editor-table-even-background-color: color-mix(in srgb, var(--base01) 40%, transparent);
  --editor-blockquote-background-color: var(--subtle-background-color);
  --editor-blockquote-color: var(--subtle-color);
  --editor-blockquote-border-color: var(--base03);
  --editor-highlight-background-color: var(--highlight-color);

  /* Commands & Directives */
  --editor-command-button-color: var(--base05);
  --editor-command-button-background-color: var(--base02);
  --editor-command-button-hover-background-color: var(--base03);
  --editor-command-button-meta-color: var(--meta-subtle-color);
  --editor-command-button-border-color: var(--base03);
  --editor-line-meta-color: var(--meta-subtle-color);
  --editor-meta-color: var(--meta-color);
  --editor-directive-mark-color: var(--base0E);
  --editor-directive-color: var(--base04);
  --editor-directive-background-color: var(--subtle-background-color);

  /* Code Blocks & Token Highlighting */
  --editor-struct-color: var(--base0E);
  --editor-code-comment-color: var(--base03);
  --editor-code-variable-color: var(--base08);
  --editor-code-typename-color: var(--base0A);
  --editor-code-string-color: var(--base0B);
  --editor-code-number-color: var(--base09);
  --editor-code-operator-color: var(--base0C);
  --editor-code-info-color: var(--subtle-color);
  --editor-code-atom-color: var(--base09);

  /* Frontmatter YAML Metadata */
  --editor-frontmatter-background-color: color-mix(in srgb, var(--base0F) 8%, transparent);
  --editor-frontmatter-color: var(--subtle-color);
  --editor-frontmatter-marker-color: var(--base0F);

  /* Miscellaneous Widgets & Checkboxes */
  --editor-widget-background-color: var(--base02);
  --editor-task-marker-color: var(--subtle-color);
  --editor-task-state-color: var(--subtle-color);

  /* Context Input & Dynamic Sliders */
  --editor-panels-bottom-input-background-color: var(--base00);
  --editor-panels-bottom-button-background-image: linear-gradient(var(--base02), var(--base01));
  --editor-panels-bottom-button-active-background-image: linear-gradient(var(--base01), var(--base03));

  /* Layout Typography Constraints */
   --ui-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   --editor-font: "Consolas", "iA-Mono", "Menlo";
   --editor-width: 1000px;


  /* ----------------------------------------------------
     Alerts & Shared Component Tokens
     ---------------------------------------------------- */
  --danger-color: var(--base08);
  --danger-contrast-color: var(--base00);
  --success-color: var(--base0B);

  --alert-error-background-color: color-mix(in srgb, var(--base08) 10%, transparent);
  --alert-error-color: var(--base08);
  --alert-error-border-color: color-mix(in srgb, var(--base08) 25%, transparent);

  --alert-warning-background-color: color-mix(in srgb, var(--base09) 10%, transparent);
  --alert-warning-color: var(--base09);
  --alert-warning-border-color: color-mix(in srgb, var(--base09) 25%, transparent);

  --alert-info-background-color: color-mix(in srgb, var(--base0D) 10%, transparent);
  --alert-info-color: var(--base0D);
  --alert-info-border-color: color-mix(in srgb, var(--base0D) 25%, transparent);

  --badge-background-color: color-mix(in srgb, var(--base0D) 15%, transparent);
  --badge-color: var(--base0D);
}

/* Base structural theme triggers for color scheme signaling */
html[data-theme="light"] { color-scheme: light; }
html[data-theme="dark"]  { color-scheme: dark; }
```

## Style Customizations

### Headings

```space-style
/* Editor colors */
/* -------------------------------------------------------------- */
#sb-editor {
  .sb-line-h1 > span {
    color: var(--base0B);
  }
  .sb-line-h2 {
    color: var(--base0A);
    font-size: 18px;
  }
  .sb-line-h3 {
    color: var(--base0E);
  }
  .sb-line-h4 {
    color: var(--base0D);
  }
  .sb-line-h5 {
    color: var(--base0C);
  }
  .sb-line-h6 {
    color: var(--base0F);
  }
}
```

### Scrollbar

```space-style
/* scrollbar */
/* -------------------------------------------------------------- */
::-webkit-scrollbar {
 width: 15px;
 background: var(--base01);
}

::-webkit-scrollbar-track {
 background: transparent;
 border-radius: 15px;
}

::-webkit-scrollbar-thumb {
 background: var(--base02);
}
```

### Task

```space-style
#sb-main .cm-editor .sb-checkbox {
    display: inline-block;
    text-align: center;
    <!-- width: 3ch; -->
    text-indent: 0;
    line-height: 1
}
.sb-checkbox {
    cursor: text !important;
}
#sb-main .cm-editor input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: 0em !important;

    /* Actual clickable area */
    width: 2.4em;
    <!-- height: 2.4em; -->

    margin: -0.6em;
    padding: 0;

    border: 0;
    border-radius: 3px;
    background: transparent;

    cursor: pointer;
    position: relative;  
}

#sb-main .cm-editor input[type=checkbox]::before {
    content: "";
    position: absolute;

    width: 1.2em;
    height: 1.2em;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    box-sizing: border-box;
    border: 2px solid var(--base04);
    border-radius: 3px;
    background: transparent;

    transition: background-color 0.15s ease, border-color 0.15s ease;
}
#sb-main .cm-editor input[type=checkbox]:checked::before {
    background: var(--base03);
    border-color: var(--base03);

}
#sb-main .cm-editor input[type=checkbox]:checked::after {
    content: "";
    position: absolute;
    left: 43%;
    top: 14%;
    width: .35em;
    height: .67em;
    border: solid var(--base01);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
      border-radius: 5%;
}
```

### Fix Border with Lua Widget

```space-style
.sb-lua-directive-inline {
  border: none !important;
}
```

### Fix Underscore in Page Picker

```space-style
.sb-nav-input:focus-visible {
  outline: none;
  box-shadow: none;
}
```

### Fix Search Highlight

```space-style
.sb-nav-primary mark, .sb-nav-description mark {
    color: revert !important;
}
```
