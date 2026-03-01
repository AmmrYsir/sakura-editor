import { Editor, type Plugin } from '../editor';

// Refined helper to use editor.execCommand with icons
const createEditorCommandPlugin = (name: string, iconPath: string, command: string): Plugin => {
  let editorInstance: Editor;
  return {
    name,
    init: (editor: Editor) => { editorInstance = editor; },
    renderToolbarButton: () => {
      const btn = document.createElement('button');
      btn.innerHTML = Editor.createIcon(iconPath);
      btn.title = name;
      btn.className = `editor-btn editor-btn-${name.toLowerCase()}`;
      btn.onclick = () => editorInstance.execCommand(command);
      return btn;
    }
  };
};

export const BoldPlugin = createEditorCommandPlugin(
  'Bold', 
  '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>', 
  'bold'
);

export const ItalicPlugin = createEditorCommandPlugin(
  'Italic', 
  '<line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>', 
  'italic'
);

export const UnderlinePlugin = createEditorCommandPlugin(
  'Underline', 
  '<path d="M6 3v7a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/>', 
  'underline'
);

export const ListPlugin: Plugin = {
  name: 'Lists',
  init: (editor: Editor) => {
    (ListPlugin as any).editor = editor;
  },
  renderToolbarButton: () => {
    const container = document.createElement('div');
    container.className = 'editor-btn-group';

    const ulBtn = document.createElement('button');
    ulBtn.innerHTML = Editor.createIcon('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>');
    ulBtn.title = 'Unordered List';
    ulBtn.onclick = () => (ListPlugin as any).editor.execCommand('insertUnorderedList');

    const olBtn = document.createElement('button');
    olBtn.innerHTML = Editor.createIcon('<line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>');
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
    btn.innerHTML = Editor.createIcon('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>');
    btn.title = 'Insert Link';
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
    btn.innerHTML = Editor.createIcon('<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>');
    btn.title = 'Insert Image';
    btn.className = 'editor-btn';
    btn.onclick = () => {
      const url = prompt('Enter the image URL');
      if (url) (ImagePlugin as any).editor.execCommand('insertImage', url);
    };
    return btn;
  }
};
