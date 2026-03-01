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
    btn.innerHTML = '🧹 Clear'
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
