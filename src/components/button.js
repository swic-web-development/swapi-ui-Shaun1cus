import { fetchData } from './input.js'

export function handleButtonClicks() {
  const output = document.getElementById('output')

  document.getElementById('fetch-people').addEventListener('click', async () => {
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
  })

  document.getElementById('fetch-planets').addEventListener('click', async () => {
    output.innerHTML = '<p class="text-yellow-400">Loading planets...</p>'
    try {
      const planets = await fetchData('planets')
      output.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Planets</h2>
        <ul class="list-disc pl-6 space-y-2" id="planets-list">
          ${planets.map((planet) => `<li>${planet.name}</li>`).join('')}
        </ul>
      `
    } catch (error) {
      output.innerHTML = `<p class="text-red-500">Failed to fetch planets: ${error.message}</p>`
    }
  })

  document.getElementById('fetch-ships').addEventListener('click', async () => {
    output.innerHTML = '<p class="text-yellow-400">Loading ships...</p>'
    try {
      const ships = await fetchData('starships')
      output.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Starships</h2>
        <ul class="list-disc pl-6 space-y-2" id="ships-list">
          ${ships.map((ship) => `<li>${ship.name}</li>`).join('')}
        </ul>
      `
    } catch (error) {
      output.innerHTML = `<p class="text-red-500">Failed to fetch ships: ${error.message}</p>`
    }
  })
}
