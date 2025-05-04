import { createLabel } from './label.js'

export function createForm() {
  return `
    <form id="swapi-form">
      ${createLabel('category', 'Select a category:')}
      <select id="category" name="category">
        <option value="people">Character</option>
        <option value="starships">Ship</option>
        <option value="planets">Planet</option>
      </select>

      ${createLabel('item', 'Select an item:')}
      <select id="item" name="item" disabled>
        <option value="">Select a category first</option>
      </select>

      <div id="details"></div>

      ${createLabel('message', 'What does Star Wars mean to you?')}
      <textarea id="message" name="message" rows="5" placeholder="Type your message here..."></textarea>

      <button type="submit">Submit</button>
    </form>
  `
}

export async function fetchData(endpoint) {
  const response = await fetch(`https://swapi.tech/api/${endpoint}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`)
  }
  const data = await response.json()
  return data.result
}
