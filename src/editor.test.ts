import { describe, it, expect, beforeEach, spyOn } from "bun:test";
import { Editor } from "./editor";
import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from "./plugins/core";

describe("WYSIWYG Editor Plugins", () => {
  let container: any;

  beforeEach(() => {
    globalThis.document = {
      execCommand: (_command: string) => {},
      getElementById: (id: string) => (id === 'app' ? container : null),
      createElement: (tag: string) => {
        const el = {
          tagName: tag.toUpperCase(),
          className: '',
          style: {},
          contentEditable: 'false',
          innerHTML: '',
          children: [] as any[],
          appendChild(child: any) {
            this.children.push(child);
          },
          _onclick: null as any,
          set onclick(fn: any) { this._onclick = fn; },
          get onclick() { return this._onclick; },
          click() { if(this._onclick) this._onclick(); }
        };
        return el;
      }
    } as any;

    container = globalThis.document.createElement('div');
  });

  it("should apply bold when BoldPlugin button is clicked", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(globalThis.document, 'execCommand');
    
    editor.registerPlugin(BoldPlugin);
    const toolbar = container.children[0];
    const boldBtn = toolbar.children[0];
    
    boldBtn.click();
    expect(execSpy).toHaveBeenCalledWith('bold', false);
  });

  it("should apply italic when ItalicPlugin button is clicked", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(globalThis.document, 'execCommand');
    
    editor.registerPlugin(ItalicPlugin);
    const toolbar = container.children[0];
    const italicBtn = toolbar.children[0];
    
    italicBtn.click();
    expect(execSpy).toHaveBeenCalledWith('italic', false);
  });

  it("should apply underline when UnderlinePlugin button is clicked", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(globalThis.document, 'execCommand');
    
    editor.registerPlugin(UnderlinePlugin);
    const toolbar = container.children[0];
    const underlineBtn = toolbar.children[0];
    
    underlineBtn.click();
    expect(execSpy).toHaveBeenCalledWith('underline', false);
  });
});