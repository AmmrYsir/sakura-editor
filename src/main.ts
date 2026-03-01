import './style.css'
import { Editor } from './editor'
import { 
  BoldPlugin, 
  ItalicPlugin, 
  UnderlinePlugin, 
  ListPlugin, 
  LinkPlugin, 
  ImagePlugin 
} from './plugins/core'
import { HighlightPlugin } from './plugins/highlight'
import { 
  AlignmentPlugin, 
  FontStylePlugin, 
  CodeBlockPlugin 
} from './plugins/advanced'

const editor = new Editor('app')

// Group 1: Typography
editor.registerPlugin(FontStylePlugin)
editor.addDivider()

// Group 2: Basic Formatting
editor.registerPlugin(BoldPlugin)
editor.registerPlugin(ItalicPlugin)
editor.registerPlugin(UnderlinePlugin)
editor.registerPlugin(new HighlightPlugin())
editor.addDivider()

// Group 3: Paragraph & Lists
editor.registerPlugin(AlignmentPlugin)
editor.registerPlugin(ListPlugin)
editor.addDivider()

// Group 4: Insert
editor.registerPlugin(LinkPlugin)
editor.registerPlugin(ImagePlugin)
editor.registerPlugin(CodeBlockPlugin)

// Final Tool: Clear (Pinned to Right via CSS auto margin)
editor.registerPlugin({
  name: 'ClearContent',
  init: () => {},
  renderToolbarButton: () => {
    const btn = document.createElement('button')
    btn.innerHTML = Editor.createIcon('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>');
    btn.title = 'Clear all content'
    btn.className = 'editor-btn'
    btn.style.marginLeft = 'auto'
    btn.onclick = () => {
      if(confirm('Clear all content?')) {
        editor.setContent('')
      }
    }
    return btn
  }
})

editor.setContent(`
  <h1>Sakura Editor Redesign</h1>
  <p>The toolbar has been redesigned for a <strong>modern, clean, and organized</strong> experience.</p>
  <blockquote>Plugins are now logically grouped with subtle dividers and refined spacing.</blockquote>
  <pre><code>// Example code block
const sakura = "🌸";
console.log("Welcome to Sakura Editor!");</code></pre>
`)
