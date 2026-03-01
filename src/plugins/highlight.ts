import type { Plugin, Editor } from '../editor';

export class HighlightPlugin implements Plugin {
  name = 'Highlight';
  private editor!: Editor;

  init(editor: Editor) {
    this.editor = editor;
  }

  renderToolbarButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '🖍️ Highlight';
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
