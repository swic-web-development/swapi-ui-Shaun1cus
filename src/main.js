import { handleButtonClicks } from './components/button.js'
import { createForm, fetchData } from './components/input.js'
import { createTextarea, handleTextareaSubmit } from './components/textarea.js'
import './styles.css'

async function initApp() {
  const app = document.getElementById('app')
  app.innerHTML = createForm() + createTextarea() // Add the textarea to the form
  handleButtonClicks()
  handleTextareaSubmit()

  // Fetch and display the people list on page load
  const output = document.getElementById('output')
  output.innerHTML = '<p class="text-yellow-400">Loading people...</p>'
  try {
    const people = await fetchData('people')
    output.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">People</h2>
      <ul class="list-disc pl-6 space-y-2" id="people-list">
        ${people.map((person) => `<li>${person.name}</li>`).join('')}
      </ul>
    `
  } catch (error) {
    output.innerHTML = `<p class="text-red-500">Failed to fetch people: ${error.message}</p>`
  }
}

initApp()
