export interface Plugin {
  name: string;
  init: (editor: Editor) => void;
  renderToolbarButton?: () => HTMLElement;
}

export class Editor {
  private element: HTMLElement;
  private plugins: Map<string, Plugin> = new Map();
  private toolbar: HTMLElement;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Container #${containerId} not found`);

    // Setup Toolbar
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'editor-toolbar';
    container.appendChild(this.toolbar);

    // Setup Editor Area
    this.element = document.createElement('div');
    this.element.className = 'editor-content';
    this.element.contentEditable = 'true';
    container.appendChild(this.element);
  }

  public static createIcon(path: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="editor-icon">${path}</svg>`;
  }

  public registerPlugin(plugin: Plugin) {
    this.plugins.set(plugin.name, plugin);
    plugin.init(this);

    if (plugin.renderToolbarButton) {
      const btn = plugin.renderToolbarButton();
      this.toolbar.appendChild(btn);
    }
  }

  public addDivider() {
    const divider = document.createElement('div');
    divider.className = 'toolbar-divider';
    this.toolbar.appendChild(divider);
  }

  public execCommand(command: string, value?: string) {
    this.element.focus();
    document.execCommand(command, false, value);
  }

  public getPlugins() {
    return Array.from(this.plugins.values());
  }

  public getContent() {
    return this.element.innerHTML;
  }
  
  public setContent(html: string) {
    this.element.innerHTML = html;
  }
}