# Attribute Decorator

```space-style
.sb-attribute[data-due]::before,
.sb-attribute[data-ask]::before,
.sb-attribute[data-pr]::before,
.sb-attribute[data-to]::before {
  position: relative;
  left: 1.5em;
  color: var(--root-color); /* readable emoji color */
  margin-left: -1.5em;
}

.sb-attribute :is(.sb-meta, .sb-atom) {
  background: var(--root-background-color);
}

/* Hide meta characters: [, :, ] */
.sb-attribute:is([data-ask], [data-to], [data-pr], [data-due]) .sb-meta {
  color: var(--root-background-color);
  background: var(--root-background-color);
}

/* Hide the literal "To" text */
.sb-attribute:is([data-ask], [data-to], [data-pr], [data-due]) .sb-atom {
  color: transparent;
  background: var(--root-background-color);
  position: absolute;
}

/* Show emoji (🤵) instead of value ("To") */
.sb-attribute[data-ask]::before {
  content: "🚩";
}
.sb-attribute[data-to]::before {
  content: "🤵";
}
.sb-attribute[data-pr]::before {
  content: "⚡️";
}
.sb-attribute[data-due]::before {
  content: "📅";
}

/* Optional: slightly soften the value text */
.sb-attribute .sb-frontmatter:not(.sb-meta):not(.sb-atom) {
  opacity: 0.85;
  background: var(--root-background-color);
}
```
