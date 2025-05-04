export function createTextarea() {
  return `
      <div class="space-y-4 max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-6">
        <textarea id="suggestion" class="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-700" rows="4" placeholder="Suggest an addition to the selected list..."></textarea>
        <button id="submit-suggestion" class="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">Submit Suggestion</button>
      </div>
    `
}

export function handleTextareaSubmit() {
  document.getElementById('submit-suggestion').addEventListener('click', () => {
    const suggestion = document.getElementById('suggestion').value.trim()
    if (!suggestion) {
      return
    }

    const currentList = document.querySelector('#output ul')
    if (currentList) {
      currentList.innerHTML += `<li class="text-yellow-400">${suggestion}</li>`
      document.getElementById('suggestion').value = '' // Clear the textarea
    }
  })
}
