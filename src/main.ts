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

const editor = new Editor('app')

editor.registerPlugin(BoldPlugin)
editor.registerPlugin(ItalicPlugin)
editor.registerPlugin(UnderlinePlugin)
editor.registerPlugin(ListPlugin)
editor.registerPlugin(LinkPlugin)
editor.registerPlugin(ImagePlugin)
editor.registerPlugin(new HighlightPlugin())

// Example of a custom "plugin" created inline to show extensibility
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

editor.setContent('<h1>Welcome to Sakura Editor</h1><p>Start typing here...</p>')
