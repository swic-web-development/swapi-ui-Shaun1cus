import { createForm, fetchData } from './components/input.js'
import './styles.css'

document.getElementById('app').innerHTML = `
  <div class="max-w-2xl mx-auto p-12 bg-gray-800 text-white rounded-xl shadow-2xl">
    <h1 class="text-4xl font-extrabold mb-8 text-center">Star Wars Explorer</h1>
    ${createForm()}
  </div>
`

const categorySelect = document.getElementById('category')
const itemSelect = document.getElementById('item')
const detailsDiv = document.getElementById('details')

categorySelect.addEventListener('change', async () => {
  const category = categorySelect.value
  itemSelect.disabled = true
  itemSelect.innerHTML = '<option value="">Loading...</option>'

  try {
    const items = await fetchData(category)
    itemSelect.innerHTML = items
      .map((item) => `<option value="${item.uid}">${item.name}</option>`)
      .join('')
    itemSelect.disabled = false
  } catch (error) {
    itemSelect.innerHTML = '<option value="">Failed to load items</option>'
    console.error(error)
  }
})

itemSelect.addEventListener('change', async () => {
  const category = categorySelect.value
  const itemId = itemSelect.value

  if (!itemId) return

  detailsDiv.innerHTML = '<p class="text-yellow-400 text-lg">Loading details...</p>'

  try {
    const itemDetails = await fetchData(`${category}/${itemId}`)
    detailsDiv.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${itemDetails.properties.name}</h3>
      <pre class="bg-gray-700 p-6 rounded-lg text-lg">${JSON.stringify(itemDetails.properties, null, 2)}</pre>
    `
  } catch (error) {
    detailsDiv.innerHTML = '<p class="text-red-500 text-lg">Failed to load details</p>'
    console.error(error)
  }
})
