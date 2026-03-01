import type { Plugin } from '../editor';

const createCommandPlugin = (name: string, label: string, command: string): Plugin => ({
  name,
  init: () => {},
  renderToolbarButton: () => {
    const btn = document.createElement('button');
    btn.innerHTML = label;
    btn.className = `editor-btn editor-btn-${name.toLowerCase()}`;
    btn.onclick = () => document.execCommand(command, false);
    return btn;
  }
});

export const BoldPlugin = createCommandPlugin('Bold', '<b>B</b>', 'bold');
export const ItalicPlugin = createCommandPlugin('Italic', '<i>I</i>', 'italic');
export const UnderlinePlugin = createCommandPlugin('Underline', '<u>U</u>', 'underline');

export const ListPlugin: Plugin = {
  name: 'Lists',
  init: () => {},
  renderToolbarButton: () => {
    const container = document.createElement('div');
    container.className = 'editor-btn-group';

    const ulBtn = document.createElement('button');
    ulBtn.innerHTML = '• UL';
    ulBtn.onclick = () => document.execCommand('insertUnorderedList', false);

    const olBtn = document.createElement('button');
    olBtn.innerHTML = '1. OL';
    olBtn.onclick = () => document.execCommand('insertOrderedList', false);

    container.appendChild(ulBtn);
    container.appendChild(olBtn);
    return container;
  }
};
