export function createForm() {
  return `
      <div class="space-y-4">
        <h1 class="text-3xl font-bold text-center mb-4">Star Wars Data Explorer</h1>
        <div class="flex justify-center space-x-4">
          <button id="fetch-people" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Fetch People</button>
          <button id="fetch-planets" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Fetch Planets</button>
          <button id="fetch-ships" class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Fetch Ships</button>
        </div>
        <div id="output" class="mt-6 p-4 bg-gray-800 text-white rounded shadow-lg"></div>
      </div>
    `
}

export async function handleButtonClicks() {
  const output = document.getElementById('output')

  document.getElementById('fetch-people').addEventListener('click', async () => {
    output.innerHTML = '<p>Loading people...</p>'
    try {
      const people = await fetchData('people')
      output.innerHTML = `
          <h2 class="text-2xl font-bold mb-2">People</h2>
          <ul class="list-disc pl-6">
            ${people.map((person) => `<li>${person.name}</li>`).join('')}
          </ul>
        `
    } catch (error) {
      output.innerHTML = `<p class="text-red-500">Failed to fetch people: ${error.message}</p>`
    }
  })

  document.getElementById('fetch-planets').addEventListener('click', async () => {
    output.innerHTML = '<p>Loading planets...</p>'
    try {
      const planets = await fetchData('planets')
      output.innerHTML = `
          <h2 class="text-2xl font-bold mb-2">Planets</h2>
          <ul class="list-disc pl-6">
            ${planets.map((planet) => `<li>${planet.name}</li>`).join('')}
          </ul>
        `
    } catch (error) {
      output.innerHTML = `<p class="text-red-500">Failed to fetch planets: ${error.message}</p>`
    }
  })

  document.getElementById('fetch-ships').addEventListener('click', async () => {
    output.innerHTML = '<p>Loading ships...</p>'
    try {
      const ships = await fetchData('starships')
      output.innerHTML = `
          <h2 class="text-2xl font-bold mb-2">Starships</h2>
          <ul class="list-disc pl-6">
            ${ships.map((ship) => `<li>${ship.name}</li>`).join('')}
          </ul>
        `
    } catch (error) {
      output.innerHTML = `<p class="text-red-500">Failed to fetch ships: ${error.message}</p>`
    }
  })
}

export async function fetchData(endpoint) {
  try {
    const response = await fetch(`https://swapi.tech/api/${endpoint}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`)
    }
    const data = await response.json()
    console.log(`Full API response from ${endpoint}:`, data) // Debugging
    return data.result?.results || data.result // Adjust based on API response
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error)
    throw error
  }
}
