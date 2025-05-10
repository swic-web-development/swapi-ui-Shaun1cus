import { fetchShips } from './actions.js'
import ShipList from './components/ship-list.js'
import store from './store.js'
import './styles.css'

const app = document.getElementById('app')

function render(state) {
  if (state.error) {
    app.innerHTML = `<p class="text-red-500 text-center font-bold mt-4">${state.error}</p>`
  } else if (state.isLoading) {
    app.innerHTML = '<p class="text-yellow-400 text-center font-semibold mt-4">Loading...</p>'
  } else {
    app.innerHTML = `
      <div class="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        ${ShipList(state.ships)}
      </div>
    `
  }
}

render(store.getState())

store.subscribe(render)

fetchShips()
