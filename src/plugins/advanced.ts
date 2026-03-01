import { Editor, type Plugin } from '../editor';

// --- Alignment Plugin ---
export const AlignmentPlugin: Plugin = {
  name: 'Alignment',
  init: (editor: Editor) => { (AlignmentPlugin as any).editor = editor; },
  renderToolbarButton: () => {
    const container = document.createElement('div');
    container.className = 'editor-btn-group';

    const commands = [
      { cmd: 'justifyLeft', title: 'Align Left', path: '<line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>' },
      { cmd: 'justifyCenter', title: 'Align Center', path: '<line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/>' },
      { cmd: 'justifyRight', title: 'Align Right', path: '<line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/>' },
      { cmd: 'justifyFull', title: 'Justify', path: '<line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/>' }
    ];

    commands.forEach(c => {
      const btn = document.createElement('button');
      btn.innerHTML = Editor.createIcon(c.path);
      btn.title = c.title;
      btn.onclick = () => (AlignmentPlugin as any).editor.execCommand(c.cmd);
      container.appendChild(btn);
    });

    return container;
  }
};

// --- Font Style Plugin (Family & Size) ---
export const FontStylePlugin: Plugin = {
  name: 'FontStyle',
  init: (editor: Editor) => { (FontStylePlugin as any).editor = editor; },
  renderToolbarButton: () => {
    const container = document.createElement('div');
    container.className = 'editor-btn-group';

    // Font Family
    const familySelect = document.createElement('select');
    familySelect.className = 'editor-select';
    ['Arial', 'Times New Roman', 'Courier New', 'Georgia'].forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.innerText = f;
      familySelect.appendChild(opt);
    });
    familySelect.onchange = () => (FontStylePlugin as any).editor.execCommand('fontName', familySelect.value);

    // Font Size
    const sizeSelect = document.createElement('select');
    sizeSelect.className = 'editor-select';
    [1, 2, 3, 4, 5, 6, 7].forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.toString();
      opt.innerText = `Size ${s}`;
      if (s === 3) opt.selected = true;
      sizeSelect.appendChild(opt);
    });
    sizeSelect.onchange = () => (FontStylePlugin as any).editor.execCommand('fontSize', sizeSelect.value);

    container.appendChild(familySelect);
    container.appendChild(sizeSelect);
    return container;
  }
};

// --- Code Block Plugin ---
export const CodeBlockPlugin: Plugin = {
  name: 'CodeBlock',
  init: (editor: Editor) => { (CodeBlockPlugin as any).editor = editor; },
  renderToolbarButton: () => {
    const btn = document.createElement('button');
    btn.innerHTML = Editor.createIcon('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>');
    btn.title = 'Insert Code Block';
    btn.className = 'editor-btn';
    btn.onclick = () => (CodeBlockPlugin as any).editor.execCommand('formatBlock', '<pre>');
    return btn;
  }
};
