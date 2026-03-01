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

  public registerPlugin(plugin: Plugin) {
    this.plugins.set(plugin.name, plugin);
    plugin.init(this);

    if (plugin.renderToolbarButton) {
      const btn = plugin.renderToolbarButton();
      this.toolbar.appendChild(btn);
    }
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