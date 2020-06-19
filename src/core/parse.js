export function parse(value = '') {
  console.log(value)
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      console.warn('parse', e.message)
      return value
    }
  }
  return value
}
