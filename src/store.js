function createStore(initialState = {}) {
  let state = initialState
  const listeners = new Set()

  const getState = () => ({ ...state })
  const setState = (newState) => {
    state = typeof newState === 'function' ? newState(state) : { ...state, ...newState }
    listeners.forEach((listener) => listener(state))
  }
  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { getState, setState, subscribe }
}

const store = createStore({
  ships: [],
  isLoading: false,
  error: null,
})

export default store
