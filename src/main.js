import { renderPlanetCharacterList } from './components/input.js'
import './styles.css'

async function initApp() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="max-w-4xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 class="text-4xl font-extrabold mb-6 text-center">Star Wars Planets & Characters</h1>
      <div id="planet-character-list" class="space-y-6 text-lg"></div>
    </div>
  `

  const listContainer = document.getElementById('planet-character-list')
  try {
    listContainer.innerHTML = await renderPlanetCharacterList()
  } catch (error) {
    listContainer.innerHTML = `<p class="text-red-500">Failed to load data: ${error.message}</p>`
    console.error(error)
  }
}

initApp()
