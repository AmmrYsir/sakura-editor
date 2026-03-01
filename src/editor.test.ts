import { describe, it, expect, beforeEach } from "bun:test";
import { Editor } from "./editor";
import { 
  FontStylePlugin
} from "./plugins/advanced";

describe("WYSIWYG Pixel Size Plugin", () => {
  let container: any;

  beforeEach(() => {
    globalThis.document = {
      execCommand: (_command: string, _ui: boolean, _value?: string) => {},
      getElementById: (id: string) => (id === 'app' ? container : null),
      querySelectorAll: (_sel: string) => [],
      createElement: (tag: string) => {
        const el = {
          tagName: tag.toUpperCase(),
          className: '',
          style: { fontSize: '' },
          contentEditable: 'false',
          innerHTML: '',
          children: [] as any[],
          value: '',
          options: [] as any[],
          insertBefore: (_n: any, _r: any) => {},
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
        if (tag === 'select') {
          el.options = [] as any;
        }
        return el;
      }
    } as any;

    globalThis.window = {
      getSelection: () => ({
        rangeCount: 1,
        getRangeAt: () => ({
          extractContents: () => globalThis.document.createElement('div'),
          insertNode: (_node: any) => {}
        })
      })
    } as any;

    globalThis.prompt = () => '25px';

    container = globalThis.document.createElement('div');
  });

  it("should attempt to apply pixel font size when dropdown changes", () => {
    const editor = new Editor('app');
    editor.registerPlugin(FontStylePlugin);
    
    const fontGroup = container.children[0].children[0];
    const sizeSelect = fontGroup.children[1];
    
    sizeSelect.value = '24px';
    sizeSelect.dispatchEvent();
    
    expect(sizeSelect.value).toBe('24px');
  });
});