import { describe, it, expect, beforeEach, spyOn } from "bun:test";
import { Editor } from "./editor";
import { 
  LinkPlugin 
} from "./plugins/core";
import { HighlightPlugin } from "./plugins/highlight";

describe("WYSIWYG Editor Plugins", () => {
  let container: any;

  beforeEach(() => {
    globalThis.document = {
      execCommand: (_command: string, _ui: boolean, _value?: string) => {},
      getElementById: (id: string) => (id === 'app' ? container : null),
      createElement: (tag: string) => {
        const el = {
          tagName: tag.toUpperCase(),
          className: '',
          style: {},
          contentEditable: 'false',
          innerHTML: '',
          children: [] as any[],
          focus: () => {},
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

    globalThis.prompt = (_message?: string, _default?: string) => 'http://example.com';

    container = globalThis.document.createElement('div');
  });

  it("should create link when LinkPlugin button is clicked", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(editor, 'execCommand');
    const promptSpy = spyOn(globalThis, 'prompt').mockReturnValue('https://bun.sh');
    
    editor.registerPlugin(LinkPlugin);
    const linkBtn = container.children[0].children[0];
    linkBtn.click();
    
    expect(promptSpy).toHaveBeenCalled();
    expect(execSpy).toHaveBeenCalledWith('createLink', 'https://bun.sh');
  });

  it("should apply highlight when HighlightPlugin button is clicked", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(editor, 'execCommand');
    const promptSpy = spyOn(globalThis, 'prompt').mockReturnValue('yellow');
    
    editor.registerPlugin(new HighlightPlugin());
    const highlightBtn = container.children[0].children[0];
    highlightBtn.click();
    
    expect(promptSpy).toHaveBeenCalled();
    expect(execSpy).toHaveBeenCalledWith('hiliteColor', 'yellow');
  });
});