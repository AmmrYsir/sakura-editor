import { describe, it, expect, beforeEach } from "bun:test";
import { Editor, Plugin } from "./editor";

describe("WYSIWYG Editor", () => {
  let container: any;

  beforeEach(() => {
    // Simple DOM mock for Bun's test environment
    globalThis.document = {
      getElementById: (id: string) => {
        if (id === 'editor-container') return container;
        return null;
      },
      createElement: (tag: string) => ({
        tagName: tag.toUpperCase(),
        className: '',
        contentEditable: 'false',
        innerHTML: '',
        children: [],
        appendChild(child: any) {
          this.children.push(child);
        }
      })
    } as any;

    container = globalThis.document.createElement('div');
    container.id = 'editor-container';
  });

  it("should initialize editor with toolbar and content area", () => {
    const editor = new Editor('editor-container');
    expect(container.children.length).toBe(2);
    expect(container.children[0].className).toBe('editor-toolbar');
    expect(container.children[1].className).toBe('editor-content');
    expect(container.children[1].contentEditable).toBe('true');
  });

  it("should register plugins and call init", () => {
    const editor = new Editor('editor-container');
    let initialized = false;
    
    const mockPlugin: Plugin = {
      name: "MockPlugin",
      init: (e) => { initialized = true; }
    };

    editor.registerPlugin(mockPlugin);
    expect(initialized).toBe(true);
    expect(editor.getPlugins().length).toBe(1);
  });

  it("should render plugin toolbar button if provided", () => {
    const editor = new Editor('editor-container');
    
    const btnMock = { tagName: 'BUTTON', innerHTML: 'B' };
    const mockPlugin: Plugin = {
      name: "BoldPlugin",
      init: () => {},
      renderToolbarButton: () => btnMock as any
    };

    editor.registerPlugin(mockPlugin);
    
    const toolbar = container.children[0];
    expect(toolbar.children.length).toBe(1);
    expect(toolbar.children[0]).toBe(btnMock);
  });

  it("should get and set content", () => {
    const editor = new Editor('editor-container');
    editor.setContent("<p>Hello Bun</p>");
    expect(editor.getContent()).toBe("<p>Hello Bun</p>");
  });
});