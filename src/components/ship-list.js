export default function ShipList(ships) {
  return `
    <main class="space-y-6">
        ${ships
          .map(
            (ship) => `
            <section class="p-6 bg-gray-800 text-white rounded-lg shadow-md">
                <h2 class="text-2xl font-bold mb-2">${ship.name}</h2>
                <p class="text-lg text-gray-300"><span class="font-semibold text-white">Starship Class:</span> ${ship.starship_class}</p>
                <p class="text-lg text-gray-300"><span class="font-semibold text-white">Starship Crew:</span> ${ship.crew} people</p>
                <p class="text-lg text-gray-300"><span class="font-semibold text-white">Length:</span> ${ship.length} meters</p>
            </section>
        `,
          )
          .join('')}
    </main>
  `
}
