import { describe, it, expect, beforeEach, spyOn } from "bun:test";
import { Editor } from "./editor";
import { 
  AlignmentPlugin,
  FontStylePlugin,
  CodeBlockPlugin
} from "./plugins/advanced";

describe("WYSIWYG Advanced Plugins", () => {
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
          value: '',
          focus: () => {},
          appendChild(child: any) {
            this.children.push(child);
          },
          _onclick: null as any,
          set onclick(fn: any) { this._onclick = fn; },
          get onclick() { return this._onclick; },
          click() { if(this._onclick) this._onclick(); },
          _onchange: null as any,
          set onchange(fn: any) { this._onchange = fn; },
          get onchange() { return this._onchange; },
          dispatchEvent() { if(this._onchange) this._onchange(); }
        };
        return el;
      }
    } as any;

    container = globalThis.document.createElement('div');
  });

  it("should apply justifyCenter when center button is clicked", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(editor, 'execCommand');
    
    editor.registerPlugin(AlignmentPlugin);
    const alignGroup = container.children[0].children[0];
    const centerBtn = alignGroup.children[1]; // justifyCenter
    
    centerBtn.click();
    expect(execSpy).toHaveBeenCalledWith('justifyCenter');
  });

  it("should change font size via FontStylePlugin dropdown", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(editor, 'execCommand');
    
    editor.registerPlugin(FontStylePlugin);
    const fontGroup = container.children[0].children[0];
    const sizeSelect = fontGroup.children[1]; // size dropdown
    
    sizeSelect.value = '5';
    sizeSelect.dispatchEvent();
    
    expect(execSpy).toHaveBeenCalledWith('fontSize', '5');
  });

  it("should insert pre block when CodeBlockPlugin is clicked", () => {
    const editor = new Editor('app');
    const execSpy = spyOn(editor, 'execCommand');
    
    editor.registerPlugin(CodeBlockPlugin);
    const codeBtn = container.children[0].children[0];
    
    codeBtn.click();
    expect(execSpy).toHaveBeenCalledWith('formatBlock', '<pre>');
  });
});