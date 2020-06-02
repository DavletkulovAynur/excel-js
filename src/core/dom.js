class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this // ? ? ?
    }
    return this.$el.outerHTML
  }

  text(text) {
    if (typeof text === 'string' ) {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  focus() {
    this.$el.focus()
    return this
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    }
    return this.data.id
  }

  get data() {
    return this.$el.dataset
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  css(styles = {}) {
    // РЕАЛИЗАЦИЯ ЗАДАЧИ ПРИ ПОМОЩИ ЦИКЛА FOR IN
    // let test = ''
    // for (const key in styles) {
    //   if ({}.hasOwnProperty.call(styles, key)) {
    //     test = '' + (`${key} : ${styles[key]}`)
    //   }
    // }
    // this.$el.setAttribute('style', test)

    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key]
    })
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}
