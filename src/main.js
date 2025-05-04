import { createForm, fetchData } from './components/input.js'
import './styles.css'

document.getElementById('app').innerHTML = createForm()

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

  detailsDiv.innerHTML = 'Loading details...'

  try {
    const itemDetails = await fetchData(`${category}/${itemId}`)
    detailsDiv.innerHTML = `
      <h3>${itemDetails.properties.name}</h3>
      <pre>${JSON.stringify(itemDetails.properties, null, 2)}</pre>
    `
  } catch (error) {
    detailsDiv.innerHTML = 'Failed to load details'
    console.error(error)
  }
})
