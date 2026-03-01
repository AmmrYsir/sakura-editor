# Sakura Editor: Future Roadmap & Recommendations

This document outlines high-impact features and improvements to transform Sakura Editor into a production-grade tool.

## 1. Core Experience Improvements
- [ ] **History Management (Undo/Redo)**: Implement a robust state stack to allow users to revert changes using `Ctrl+Z` and `Ctrl+Y`.
- [ ] **Auto-save**: Persist content to `localStorage` or a database automatically on every update to prevent data loss.
- [ ] **Floating Toolbar**: Add a context-aware mini-toolbar that appears when text is selected (similar to Medium or Notion).
- [ ] **Accessibility (A11y)**: Ensure the editor and toolbar are fully navigable via keyboard and screen readers.

## 2. Advanced Content Plugins
- [ ] **Table Support**: A plugin to insert and edit responsive HTML tables with row/column management.
- [ ] **Mathematical Formulas**: Integration with KaTeX or MathJax for rendering scientific equations.
- [ ] **Mentions & Tags**: An `@mention` system for linking users or tagging content within the editor.
- [ ] **Media Embeds**: Support for embedding YouTube videos, Tweets, or Figma files.

## 3. Data & Interoperability
- [ ] **Markdown Support**: Enable a "Switch to Markdown" mode and support importing/exporting Markdown files.
- [ ] **File Drag & Drop**: Allow users to drag images or documents directly into the editor area for instant upload and insertion.
- [ ] **HTML Cleanup**: A sanitizer plugin to ensure pasted content from other websites doesn't bring messy inline styles.

## 4. Professional Capabilities
- [ ] **Collaboration**: Integration with Yjs or Automerge for real-time, multi-user collaborative editing.
- [ ] **Dark Mode**: Add a theme-switcher to toggle between the current Sakura theme and a high-contrast dark version.
- [ ] **Read-Only Mode**: A toggle to lock the editor for viewing purposes without allowing modifications.
- [ ] **Plugin Marketplace**: A system to load external plugins dynamically via CDN URLs.

## 5. Engineering & Quality
- [ ] **E2E Testing**: Add Playwright or Cypress tests to verify complex browser interactions (like selections and drag-and-drop).
- [ ] **Performance Benchmarking**: Monitor large-document performance to ensure smooth typing at 10,000+ words.
- [ ] **Documentation**: Generate API docs from TypeScript types for third-party plugin developers.
