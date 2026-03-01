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

// Helper to apply pixel font size since execCommand 'fontSize' only supports 1-7
const applyPixelFontSize = (editor: Editor, size: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement('span');
  span.style.fontSize = size.endsWith('px') ? size : `${size}px`;
  
  try {
    span.appendChild(range.extractContents());
    range.insertNode(span);
    editor.execCommand('noop');
  } catch (e) {
    document.execCommand('fontSize', false, '7');
    const fonts = document.querySelectorAll('font[size="7"]');
    fonts.forEach(f => {
      const el = f as HTMLElement;
      el.removeAttribute('size');
      el.style.fontSize = span.style.fontSize;
      const newSpan = document.createElement('span');
      newSpan.style.fontSize = el.style.fontSize;
      newSpan.innerHTML = el.innerHTML;
      el.parentNode?.replaceChild(newSpan, el);
    });
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
    ['Arial', 'Inter', 'Times New Roman', 'Courier New', 'Georgia'].forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.innerText = f;
      familySelect.appendChild(opt);
    });
    familySelect.onchange = () => (FontStylePlugin as any).editor.execCommand('fontName', familySelect.value);

    // Font Size (Pixels)
    const sizeSelect = document.createElement('select');
    sizeSelect.className = 'editor-select';
    
    const sizes = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px', 'Custom...'];
    
    sizes.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.innerText = s;
      if (s === '16px') opt.selected = true;
      sizeSelect.appendChild(opt);
    });

    sizeSelect.onchange = () => {
      let val = sizeSelect.value;
      if (val === 'Custom...') {
        const custom = prompt('Enter custom pixel size (e.g. 25px)', '25px');
        if (custom) {
          val = custom;
          const exists = Array.from(sizeSelect.options).some(o => o.value === val);
          if (!exists) {
            const newOpt = document.createElement('option');
            newOpt.value = val;
            newOpt.innerText = val;
            sizeSelect.insertBefore(newOpt, sizeSelect.lastChild);
            newOpt.selected = true;
          }
        } else {
          sizeSelect.value = '16px';
          return;
        }
      }
      applyPixelFontSize((FontStylePlugin as any).editor, val);
    };

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
