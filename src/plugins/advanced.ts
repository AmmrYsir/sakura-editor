import type { Plugin, Editor } from '../editor';

// --- Alignment Plugin ---
export const AlignmentPlugin: Plugin = {
  name: 'Alignment',
  init: (editor: Editor) => { (AlignmentPlugin as any).editor = editor; },
  renderToolbarButton: () => {
    const container = document.createElement('div');
    container.className = 'editor-btn-group';

    const commands = [
      { cmd: 'justifyLeft', icon: '左', title: 'Align Left' },
      { cmd: 'justifyCenter', icon: '中', title: 'Align Center' },
      { cmd: 'justifyRight', icon: '右', title: 'Align Right' },
      { cmd: 'justifyFull', icon: '全', title: 'Justify' }
    ];

    commands.forEach(c => {
      const btn = document.createElement('button');
      btn.innerHTML = c.icon;
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
    btn.innerHTML = '<code>{ }</code>';
    btn.title = 'Insert Code Block';
    btn.className = 'editor-btn';
    btn.onclick = () => (CodeBlockPlugin as any).editor.execCommand('formatBlock', '<pre>');
    return btn;
  }
};
