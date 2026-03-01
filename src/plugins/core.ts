import type { Plugin, Editor } from '../editor';

// Refined helper to use editor.execCommand
const createEditorCommandPlugin = (name: string, label: string, command: string): Plugin => {
  let editorInstance: Editor;
  return {
    name,
    init: (editor: Editor) => { editorInstance = editor; },
    renderToolbarButton: () => {
      const btn = document.createElement('button');
      btn.innerHTML = label;
      btn.className = `editor-btn editor-btn-${name.toLowerCase()}`;
      btn.onclick = () => editorInstance.execCommand(command);
      return btn;
    }
  };
};

export const BoldPlugin = createEditorCommandPlugin('Bold', '<b>B</b>', 'bold');
export const ItalicPlugin = createEditorCommandPlugin('Italic', '<i>I</i>', 'italic');
export const UnderlinePlugin = createEditorCommandPlugin('Underline', '<u>U</u>', 'underline');

export const ListPlugin: Plugin = {
  name: 'Lists',
  init: (editor: Editor) => {
    (ListPlugin as any).editor = editor;
  },
  renderToolbarButton: () => {
    const container = document.createElement('div');
    container.className = 'editor-btn-group';

    const ulBtn = document.createElement('button');
    ulBtn.innerHTML = '• UL';
    ulBtn.title = 'Unordered List';
    ulBtn.onclick = () => (ListPlugin as any).editor.execCommand('insertUnorderedList');

    const olBtn = document.createElement('button');
    olBtn.innerHTML = '1. OL';
    olBtn.title = 'Ordered List';
    olBtn.onclick = () => (ListPlugin as any).editor.execCommand('insertOrderedList');

    container.appendChild(ulBtn);
    container.appendChild(olBtn);
    return container;
  }
};

export const LinkPlugin: Plugin = {
  name: 'Link',
  init: (editor: Editor) => {
    (LinkPlugin as any).editor = editor;
  },
  renderToolbarButton: () => {
    const btn = document.createElement('button');
    btn.innerHTML = '🔗 Link';
    btn.className = 'editor-btn';
    btn.onclick = () => {
      const url = prompt('Enter the URL');
      if (url) (LinkPlugin as any).editor.execCommand('createLink', url);
    };
    return btn;
  }
};

export const ImagePlugin: Plugin = {
  name: 'Image',
  init: (editor: Editor) => {
    (ImagePlugin as any).editor = editor;
  },
  renderToolbarButton: () => {
    const btn = document.createElement('button');
    btn.innerHTML = '🖼️ Image';
    btn.className = 'editor-btn';
    btn.onclick = () => {
      const url = prompt('Enter the image URL');
      if (url) (ImagePlugin as any).editor.execCommand('insertImage', url);
    };
    return btn;
  }
};
