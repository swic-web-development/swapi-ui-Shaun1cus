import { createForm, handleButtonClicks } from './components/input.js'
import './styles.css'

function initApp() {
  const app = document.getElementById('app')
  app.innerHTML = createForm()
  handleButtonClicks()
}

initApp()
