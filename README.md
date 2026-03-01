# 🌸 Sakura Editor

Sakura Editor is a modern, elegant, and highly extensible open-source WYSIWYG editor built with TypeScript, Bun, and Vanilla CSS. It features a professional plugin-driven architecture that allows developers to easily create and register custom tools while maintaining a cohesive and polished UI.

## ✨ Key Features

- **Rich Formatting**: Bold, Italic, Underline, and customizable Highlighting.
- **Advanced Content**: Support for Links, Images, and Code Blocks.
- **Precision Typography**: Font Family and Pixel-based Font Size controls with custom sizing.
- **Smart Layout**: Categorized toolbar with logical grouping and visual dividers.
- **Plugin Architecture**: Easily extensible system for adding custom functionality.
- **Modern UI**: Elegant design with a "Cherry Blossom" aesthetic and frosted glass toolbar.
- **Developer Ready**: 100% Type-safe with TypeScript and verified with Bun's test runner.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Modern CSS Variables)
- **Dev Tooling**: Vite
- **Testing**: Bun Test

## 📋 Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sakura-editor.git
cd sakura-editor
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Development Server

```bash
bun run dev
```

Open the link provided by Vite (usually `http://localhost:5173`) in your browser.

### 4. Run Tests

```bash
bun test
```

### 5. Type Checking

```bash
bunx tsc --noEmit
```

## 🏗️ Architecture

### Directory Structure

```
├── docs/                   # Documentation and roadmaps
├── src/
│   ├── plugins/            # Editor plugins
│   │   ├── advanced.ts     # Alignment, Fonts, Code Blocks
│   │   ├── core.ts         # Basic formatting, Lists, Links, Images
│   │   └── highlight.ts    # Custom text highlight plugin
│   ├── editor.ts           # Core Editor class and Plugin interface
│   ├── editor.test.ts      # Comprehensive test suite
│   ├── main.ts             # Application entry point
│   └── style.css           # Modern Sakura theme styles
├── index.html              # HTML template
├── package.json            # Project configuration
└── tsconfig.json           # TypeScript configuration
```

### Plugin System

Sakura Editor uses a highly decoupled plugin architecture. A plugin is defined by the following interface:

```typescript
export interface Plugin {
  name: string;
  init: (editor: Editor) => void;
  renderToolbarButton?: () => HTMLElement;
}
```

To add a new feature, simply create an object or class implementing this interface and register it with `editor.registerPlugin(myPlugin)`.

## 🖍️ Custom Plugin Example

Creating a custom plugin is straightforward:

```typescript
const MyPlugin = {
  name: 'MyPlugin',
  init: (editor) => {
    // Perform setup here
  },
  renderToolbarButton: () => {
    const btn = document.createElement('button');
    btn.innerHTML = '🚀';
    btn.onclick = () => alert('Hello from Sakura!');
    return btn;
  }
};

editor.registerPlugin(MyPlugin);
```

## 🧪 Testing

The project uses `bun:test` for unit testing. We mock the DOM environment to verify plugin registrations, command executions, and toolbar rendering.

```bash
# Run all tests
bun test

# Run tests with coverage
bun test --coverage
```

## 🛡️ Security

We maintain high security standards:
- **Dependency Audit**: Verified with `bun audit` (0 vulnerabilities).
- **Sanitization**: Recommended next step includes a dedicated HTML sanitizer plugin for pasted content.

## 🗺️ Roadmap

Check out [docs/future-recommendations.md](./docs/future-recommendations.md) for our detailed future plans, including:
- Undo/Redo (History Management)
- Markdown Support
- Real-time Collaboration
- Table Editor

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## 📄 License

This project is open-source. (Add your license here, e.g., MIT).
