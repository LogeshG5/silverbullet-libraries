# Attribute Decorator

```space-style
/* 1. Add new attribute name */
/* For the attribute [completed: 2026-02-02] add .sb-attribute[data-completed], */
.sb-attribute[data-deadline],
.sb-attribute[data-ask]
{
  > .sb-list.sb-frontmatter {
    background: none;
    color: var(--root-color);
  }

  > .sb-list.sb-frontmatter.sb-atom,
  > .sb-list.sb-frontmatter.sb-meta {
    display: none;
  }
}

/* 2. Add emoji decorations */
.sb-attribute[data-deadline]::before {
  content: "📅 ";
}
.sb-attribute[data-ask]::before {
  content: "🚩 ";
}
```
