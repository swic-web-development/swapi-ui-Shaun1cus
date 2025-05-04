export async function renderPlanetCharacterList() {
  const planets = await fetchData('planets')
  const characters = await fetchData('people')

  console.log('Planets:', planets) // Debugging
  console.log('Characters:', characters) // Debugging

  // Ensure planets and characters are arrays
  if (!Array.isArray(planets) || !Array.isArray(characters)) {
    throw new Error('Planets or Characters data is not an array')
  }

  // Handle empty or missing data
  if (!planets || planets.length === 0) {
    throw new Error('No planets data available')
  }

  if (!characters || characters.length === 0) {
    throw new Error('No characters data available')
  }

  // Map planet IDs to planet names
  const planetMap = {}
  planets.forEach((planet) => {
    planetMap[planet.uid] = planet.name
  })

  // Group characters by their planets
  const groupedCharacters = {}
  const otherCharacters = []

  for (const character of characters) {
    const planetId = character.properties.homeworld?.split('/').pop() // Extract planet ID from URL
    if (planetMap[planetId]) {
      if (!groupedCharacters[planetMap[planetId]]) {
        groupedCharacters[planetMap[planetId]] = []
      }
      groupedCharacters[planetMap[planetId]].push(character.name)
    } else {
      otherCharacters.push(character.name)
    }
  }

  // Render the grouped data
  let html = '<div class="space-y-6">'
  for (const [planet, charList] of Object.entries(groupedCharacters)) {
    html += `
        <div>
          <h2 class="text-2xl font-bold mb-2">${planet}</h2>
          <ul class="list-disc pl-6">
            ${charList.map((char) => `<li>${char}</li>`).join('')}
          </ul>
        </div>
      `
  }

  // Render "Other Planets" list
  if (otherCharacters.length > 0) {
    html += `
        <div>
          <h2 class="text-2xl font-bold mb-2">Other Planets</h2>
          <ul class="list-disc pl-6">
            ${otherCharacters.map((char) => `<li>${char}</li>`).join('')}
          </ul>
        </div>
      `
  }

  html += '</div>'
  return html
}

export async function fetchData(endpoint) {
  try {
    const response = await fetch(`https://swapi.tech/api/${endpoint}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`)
    }
    const data = await response.json()
    console.log(`Fetched data from ${endpoint}:`, data) // Debugging
    return data.result // Ensure this is an array
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error)
    throw error
  }
}
