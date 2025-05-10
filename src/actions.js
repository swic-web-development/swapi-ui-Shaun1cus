import store from './store.js'

export async function fetchShips() {
  store.setState({ isLoading: true, error: null })

  try {
    const res = await fetch('https://swapi.tech/api/starships/')
    const data = await res.json()

    const detailPromises = data.results.map(async (ship) => {
      const res = await fetch(ship.url)
      const fullData = await res.json()
      return fullData.result.properties
    })

    const detailedShips = await Promise.all(detailPromises)

    console.log('Detailed ships:', detailedShips) // Debugging

    store.setState({ ships: detailedShips, isLoading: false })
  } catch (error) {
    store.setState({ error: error.message, isLoading: false, ships: [] })
  }
}
