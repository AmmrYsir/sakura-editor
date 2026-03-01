import { Editor, type Plugin } from '../editor';

export class HighlightPlugin implements Plugin {
  name = 'Highlight';
  private editor!: Editor;

  init(editor: Editor) {
    this.editor = editor;
  }

  renderToolbarButton() {
    const btn = document.createElement('button');
    btn.innerHTML = Editor.createIcon('<path d="M12 2l3.5 3.5L7 14l-3.5-3.5L12 2z"/><path d="M2 22l5-5-2-2-5 5v2h2z"/>');
    btn.className = 'editor-btn';
    btn.title = 'Highlight selected text';
    btn.onclick = () => {
      const color = prompt('Enter highlight color (e.g. yellow, #ff0000)', 'yellow');
      if (color) {
        this.editor.execCommand('hiliteColor', color);
      }
    };
    return btn;
  }
}
