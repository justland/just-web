export type Store = {
  browserErrors: {
    preventDefault: boolean
  }
}

let store: Store = {
  browserErrors: {
    preventDefault: true
  }
}

export function getStore() {
  return store
}

export function setStore(newStore: Store) {
  return store = newStore
}
