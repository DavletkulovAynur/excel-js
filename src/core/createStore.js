// export function createStore(rootReducer, initialState = {}) {
//   let state = rootReducer({...initialState}, {type: '__INIT__'})
//   let listeners = []
//
//   return {
//     subscribe(fn) {
//       listeners.push(fn)
//       return {
//         unsubscribe() {
//           listeners = listeners.filter((l) => l !== fn)
//         },
//       }
//     },
//     dispatch(action) {
//       state = rootReducer(state, action)
//       listeners.forEach((listener) => listener(state))
//     },
//     getState() {
//       return state
//     },
//   }
// }

// создаем Store
export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this.state = rootReducer({...initialState}, {type: '__INIT__'})
    this.listeners = []
  }

  // подписываемся
  subscribe(fn) {
    this.listeners.push(fn)
    const self = this
    return {
      unsubscribe() {
        self.listeners = self.listeners.filter((l) => l !== fn)
      },
    }
  }

  // меняем состояние
  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach((listener) => listener(this.state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
