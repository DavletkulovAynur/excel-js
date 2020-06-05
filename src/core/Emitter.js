export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch  уведомляем
  // table.emit('table.select', {a:2})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }

  // on, listen подписываемся на уведомления
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter((listener) => listener !== fn)
    }
  }
}

// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('Aynur', (data) => console.log(data))
//
// setTimeout(() => {
//   emitter.emit('Aynur', '2000')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('Aynur', '4000')
// }, 4000)

