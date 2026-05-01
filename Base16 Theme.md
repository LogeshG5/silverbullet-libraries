---
name: "Library/LogeshG5/Base16 Theme"
tags: meta/library
pageDecoration.prefix: "🎨 "
---

# Base 16 Style

## Base 16 Variables

Copy one of the theme to your space-style config.

Hint: Give the variables to AI to generate your own theme

```css
/* priority: 1 */
/* Eva Dark */
html {
   --base00: #f8f8f8;
   --base01: #e8e8e8;
   --base02: #d8d8d8;
   --base03: #b8b8b8;
   --base04: #585858;
   --base05: #383838;
   --base06: #282828;
   --base07: #181818;
   --base08: #ab4642;
   --base09: #dc9656;
   --base0a: #f7ca88;
   --base0b: #a1b56c;
   --base0c: #86c1b9;
   --base0d: #7cafc2;
   --base0e: #ba8baf;
   --base0f: #a16946;
   color-scheme: light;
}
html[data-theme="dark"] {
   --base00: #1c2128;
   --base01: #373e47;
   --base02: #444c56;
   --base03: #545d68;
   --base04: #768390;
   --base05: #909dab;
   --base06: #adbac7;
   --base07: #cdd9e5;
   --base08: #f47067;
   --base09: #e0823d;
   --base0a: #c69026;
   --base0b: #57ab5a;
   --base0c: #96d0ff;
   --base0d: #539bf5;
   --base0e: #e275ad;
   --base0f: #ae5622;
   color-scheme: dark;
}
```

```css
/* priority: 1 */
/* tokyo-night */
html {
   --base00: #f8f8f8;
   --base01: #e8e8e8;
   --base02: #d8d8d8;
   --base03: #b8b8b8;
   --base04: #585858;
   --base05: #383838;
   --base06: #282828;
   --base07: #181818;
   --base08: #ab4642;
   --base09: #dc9656;
   --base0a: #f7ca88;
   --base0b: #a1b56c;
   --base0c: #86c1b9;
   --base0d: #7cafc2;
   --base0e: #ba8baf;
   --base0f: #a16946;
   color-scheme: light;
}
html[data-theme="dark"] {
  --base00: #1a1b26; /* background */
  --base01: #16161e;
  --base02: #2f3549;
  --base03: #444b6a;
  --base04: #787c99;
  --base05: #a9b1d6; /* default text */
  --base06: #cbccd1;
  --base07: #d5d6db;
  --base08: #f7768e; /* red */
  --base09: #ff9e64; /* orange */
  --base0a: #e0af68; /* yellow */
  --base0b: #9ece6a; /* green */
  --base0c: #7dcfff; /* cyan */
  --base0d: #7aa2f7; /* blue */
  --base0e: #bb9af7; /* purple */
  --base0f: #d18616; /* brown */
  color-scheme: dark;
}
```

```css
/* priority: 1 */
/* Catpuchin-mocha */
html {
  --base00: #eff1f5; /* base */
  --base01: #e6e9ef; /* mantle */
  --base02: #ccd0da; /* surface0 */
  --base03: #bcc0cc; /* surface1 */
  --base04: #acb0be; /* surface2 */
  --base05: #4c4f69; /* text */
  --base06: #dc8a78; /* rosewater */
  --base07: #7287fd; /* lavender */
  --base08: #d20f39; /* red */
  --base09: #fe640b; /* peach */
  --base0a: #df8e1d; /* yellow */
  --base0b: #40a02b; /* green */
  --base0c: #179299; /* teal */
  --base0d: #1e66f5; /* blue */
  --base0e: #8839ef; /* mauve */
  --base0f: #dd7878; /* flamingo */
  color-scheme: light;
}
html[data-theme="dark"] {
  --base00: #1e1e2e; /* base */
  --base01: #181825; /* mantle */
  --base02: #313244; /* surface0 */
  --base03: #45475a; /* surface1 */
  --base04: #585b70; /* surface2 */
  --base05: #cdd6f4; /* text */
  --base06: #f5e0dc; /* rosewater */
  --base07: #b4befe; /* lavender */
  --base08: #f38ba8; /* red */
  --base09: #fab387; /* peach */
  --base0a: #f9e2af; /* yellow */
  --base0b: #a6e3a1; /* green */
  --base0c: #94e2d5; /* teal */
  --base0d: #89b4fa; /* blue */
  --base0e: #cba6f7; /* mauve */
  --base0f: #f2cdcd; /* flamingo */
  color-scheme: dark;
}
```

## CSS Variables Mapping

```space-style
/* priority: 10 */
/* -------------------------------------------------------------- */
html,
html[data-theme="dark"] {
   --ui-accent-color: var(--base0c);
   --ui-accent-text-color: var(--ui-accent-color);
   --ui-accent-contrast-color: var(--base00);
   --highlight-color: color-mix(in srgb, var(--base0a), transparent 50%);
   --link-color: var(--base0c);
   --link-missing-color: var(--base09);
   --link-invalid-color: var(--base0e);
   --meta-color: var(--base08);
   --meta-subtle-color: var(--base04);
   --subtle-color: var(--base04);
   --subtle-background-color: color-mix(in srgb, var(--base01), transparent 50%);
   --root-background-color: var(--base00);
   --root-color: var(--base05);
   --top-color: inherit;
   --top-background-color: var(--base00);
   --top-border-color: var(--base02);
   --top-sync-error-color: var(--top-color);
   --top-sync-error-background-color: var(--base08);
   --top-saved-color: var(--base05);
   --top-unsaved-color: var(--base04);
   --top-loading-color: var(--base04);
   --panel-background-color: var(--base00);
   --panel-border-color: var(--base00);
   --bhs-background-color: var(--base00);
   --bhs-border-color: var(--base03);
   --modal-color: inherit;
   --modal-background-color: var(--base00);
   --modal-border-color: var(--base03);
   --modal-header-label-color: var(--ui-accent-text-color);
   --modal-help-background-color: var(--base01);
   --modal-help-color: var(--base04);
   --modal-selected-option-background-color: var(--base0c);
   --modal-selected-option-color: var(--ui-accent-contrast-color);
   --modal-hint-background-color: var(--base0d);
   --modal-hint-color: var(--base00);
   --modal-hint-inactive-background-color: var(--base01);
   --modal-hint-inactive-color: var(--base05);
   --modal-description-color: var(--base04);
   --modal-selected-option-description-color: var(--base02);
   --notifications-background-color: inherit;
   --notifications-border-color: var(--base03);
   --notification-info-background-color: var(--base01);
   --notification-error-background-color: var(--base08);
   --button-background-color: var(--base01);
   --button-hover-background-color: inherit;
   --button-color: var(--base05);
   --button-border-color: var(--base03);
   --primary-button-background-color: var(--ui-accent-color);
   --primary-button-hover-background-color: color-mix( in srgb, var(--ui-accent-color), var(--base00) 35% );
   --primary-button-color: var(--ui-accent-contrast-color);
   --primary-button-border-color: transparent;
   --text-field-background-color: var(--button-background-color);
   --progress-background-color: var(--base01);
   --progress-sync-color: var(--base05);
   --progress-index-color: var(--base0d);
   --action-button-background-color: transparent;
   --action-button-color: var(--base05);
   --action-button-hover-color: var(--base0d);
   --action-button-active-color: var(--base0d);
   --editor-caret-color: var(--base05);
   --editor-selection-background-color: color-mix(in srgb, var(--base0c), transparent 65%);
   --editor-panels-bottom-color: inherit;
   --editor-panels-bottom-background-color: var(--base01);
   --editor-panels-bottom-border-color: var(--base02);
   --editor-completion-detail-color: var(--base04);
   --editor-completion-detail-selected-color: var(--base02);
   --editor-list-bullet-color: var(--base04);
   --editor-heading-color: var(--base05);
   --editor-heading-meta-color: var(--meta-subtle-color);
   --editor-hashtag-background-color: color-mix(in srgb, var(--base0c), transparent 65%);
   --editor-hashtag-color: var(--base06);
   --editor-hashtag-border-color: color-mix(in srgb, var(--base0d), transparent 58%);
   --editor-ruler-color: var(--base04);
   --editor-naked-url-color: var(--link-color);
   --editor-code-color: var(--base04);
   --editor-link-color: var(--link-color);
   --editor-link-url-color: var(--link-color);
   --editor-link-meta-color: var(--meta-subtle-color);
   --editor-wiki-link-page-background-color: color-mix(in srgb, var(--base0d), transparent 93%);
   --editor-wiki-link-page-color: var(--link-color);
   --editor-wiki-link-page-missing-color: var(--link-missing-color);
   --editor-wiki-link-page-invalid-color: var(--link-invalid-color);
   --editor-wiki-link-color: var(--base0d);
   --editor-command-button-color: inherit;
   --editor-command-button-background-color: var(--base01);
   --editor-command-button-hover-background-color: inherit;
   --editor-command-button-meta-color: var(--meta-subtle-color);
   --editor-command-button-border-color: var(--base03);
   --editor-line-meta-color: var(--meta-subtle-color);
   --editor-meta-color: var(--meta-color);
   --editor-table-head-background-color: var(--base05);
   --editor-table-head-color: var(--base00);
   --editor-table-even-background-color: var(--base01);
   --editor-blockquote-background-color: var(--subtle-background-color);
   --editor-blockquote-color: var(--subtle-color);
   --editor-blockquote-border-color: var(--base04);
   --editor-struct-color: var(--base08);
   --editor-highlight-background-color: var(--highlight-color);
   --editor-code-background-color: color-mix(in srgb, var(--base01), transparent 50%);
   --editor-code-comment-color: var(--meta-subtle-color);
   --editor-code-variable-color: var(--base0c);
   --editor-code-typename-color: var(--base0d);
   --editor-code-string-color: var(--base0b);
   --editor-code-number-color: var(--base0e);
   --editor-code-operator-color: var(--base04);
   --editor-code-info-color: var(--subtle-color);
   --editor-code-atom-color: var(--base08);
   --editor-frontmatter-background-color: color-mix(in srgb, var(--base03), transparent 85%);
   --editor-frontmatter-color: var(--subtle-color);
   --editor-frontmatter-marker-color: color-mix(in srgb, var(--base08), transparent 50%);
   --editor-widget-background-color: var(--base01);
   --editor-task-marker-color: var(--subtle-color);
   --editor-task-state-color: var(--subtle-color);
   --editor-directive-mark-color: var(--base08);
   --editor-directive-color: var(--base04);
   --editor-directive-background-color: color-mix(in srgb, var(--base01), transparent 51%);
   --ui-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   --editor-font: "Consolas", "iA-Mono", "Menlo";
   --editor-width: 900px;
  /* Admonitions */
   --admonition-width: 1.25rem;
}

```

## Style Customizations

```space-style
/* Editor colors */
/* -------------------------------------------------------------- */
#sb-editor {
  .sb-line-h1 > span {
    color: var(--base0b);
  }
  .sb-line-h2 {
    color: var(--base0a);
    font-size: 18px;
  }
  .sb-line-h3 {
    color: var(--base0e);
  }
  .sb-line-h4 {
    color: var(--base0d);
  }
  .sb-line-h5 {
    color: var(--base0c);
  }
  .sb-line-h6 {
    color: var(--base0f);
  }
}

/* scrollbar */
/* -------------------------------------------------------------- */
::-webkit-scrollbar {
 width: 15px;
 background: hsla(0,0%,100%,.04);
}

::-webkit-scrollbar-track {
 background: transparent;
 border-radius: 15px;
}

::-webkit-scrollbar-thumb {
 -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
 background: hsla(0,0%,100%,.14);
}

/* Modal */
/* -------------------------------------------------------------- */
.sb-modal-box {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.85) !important;
  border: none !important;
  backdrop-filter: blur(16px);
  margin-top: 80px !important;
  font-size: large;
  margin-top: 80px !important;
  font-size: large;

  .sb-header label {

  }
  .sb-help-text {
    font-size: 0.8em;
    cursor: default;
    background-color: var(--subtle-background-color) !important;
    /*color: var(--subtext0) !important;*/
  }
  .sb-hint {
     font-size: 0.7em;
  }
  .sb-result-list {
    margin: 0.2em 0;
  }
  #mini-editor.svelte-umhpev {
    caret-color: #aaaaaa;
  }
}
.ͼ2 .cm-content {
  caret-color: #aaaaaa;
}
#sb-top {
    color: var(--top-color);
    background-color: var(--top-background-color);
    border-bottom: color-mix(in srgb, var(--top-border-color) 30%, transparent) 1px solid;
}


/* Bottom Widget: Linked Mentions */
/* -------------------------------------------------------------- */
#sb-main .cm-editor .sb-lua-bottom-widget blockquote {
    margin: 0 5px;
    padding: 12px;
    border: 1px solid var(--editor-widget-background-color);
    border-radius: 8px;
    background-color: var(--editor-widget-background-color);
    color: var(--editor-text-color);
    border-top: 1px solid var(--editor-widget-background-color);
}
#sb-main .cm-editor .sb-lua-bottom-widget h1 {
    margin: -10px -10px 10px -10px !important;
    padding: 15px 10px !important;
    background: none;
    font-size: 1.2em;
}

#sb-main .cm-editor .sb-lua-top-widget h1, #sb-main .cm-editor .sb-lua-bottom-widget h1 {
    margin: -10px -10px 1px -10px !important;
    padding: 5px 10px !important;
    background-color: transparent;
    font-size: 1.2em;
}

/* Admonition styling */
/* -------------------------------------------------------------- */
.sb-admonition[admonition="note"] .sb-admonition-type::before { width: var(--admonition-width) !important; }
.sb-admonition[admonition="note"] .sb-admonition-type * { display: none; }
.sb-admonition[admonition="note"] {
  --admonition-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>');
  --admonition-color: #00b8d4;
}

.sb-admonition[admonition="warning"] .sb-admonition-type::before { width: var(--admonition-width) !important; }
.sb-admonition[admonition="warning"] .sb-admonition-type * { display: none; }
.sb-admonition[admonition="warning"] {
  --admonition-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>');
  --admonition-color: #ff9100;
}

/* Find Replace */
/* -------------------------------------------------------------- */
.ͼ1 .cm-textfield {
  color: var(--base06);
  background-color: var(--base0c);
}
.ͼ1 .cm-button {
    color: var(--base00);
    background: var(--action-button-active-color);
    border: unset
}
#sb-editor .cm-panels-bottom .cm-search .cm-button {
    background-image: none;
    background: var(--base0c);
}

```

## Plugin Customizations

### Tree View

```space-style

/* Treeview */
/* -------------------------------------------------------------- */
#sb-top .panel {
  display: none;
}
#sb-main {
  position: relative;

  .sb-panel:nth-of-type(1) {
    position: absolute;
    display: block;
    height: 100%;
    z-index: 99;
    resize: horizontal;
    overflow: auto;
    background-color: var(--panel-background-color);
  }
}

.treeview-root {
  height: 100% !important;
  background-color: var(--panel-background-color);
  border-right: var(--top-border-color) 1px solid;

  .tree__label > span {
    /*font-family: var(--ui-font);
    font-size: 14px !important;
    font-weight: 400;
    border: unset;*/
    padding: 2px;

  }
  .treeview-header {
    background-color: var(--panel-background-color);

    .treeview-actions {
      background-color: var(--panel-background-color);
      border: unset;
    }
  }
  .tree__label > span[data-node-type="folder"] {
      background-color: transparent; 
      border-color: transparent;
      color: var(--base0e); 
  }
  .tree__label > span[data-node-type="page"] {
    background-color: transparent;
    border-color: transparent;
    color: var(--treeview-page-color);
  }
  .tree__label > span[data-current-page="true"] {
    /*width: 100%;*/
    border-radius: 3px;
    background-color: var(--base0c);
    color: var(--base00);
  }
  #treeview-tree .tree__node .tree__subnodes:has(> .tree__node):before {
    content: "";
    background-color: var(--panel-background-color);
    position: absolute;
    top: 33px;
    left: -13px;
    height: calc(100% - 40px);
    width: 1px;
  }

  .tree__collapse {
    /*color: var(--surface1);*/
    height: calc(var(--st-collapse-icon-height) - 5px);
  }
}
```
