import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {creatTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {
  isCell,
  shouldResize,
  matrix,
  nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import * as actions from '@/redux/action'
import {defaultStyles} from '@/constans'
import {parse} from '@core/parse'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'mousemove',
        'mouseup',
        'click',
        'keydown',
        'input'],
      ...options,
    })
  }

  toHTML() {
    return creatTable(20, this.store.getState())
  }

  prepare() {
    super.prepare();
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar: applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }))
    })

    // Версия АЙНУРА ДАВЛЕТКУЛОВА
    // const {dataState} = this.store.getState()
    // Object.keys(dataState).forEach((key) => {
    //   const $elem = this.$root.findAll(`[data-id="${key}"]`)
    //   $elem[0].innerHTML = dataState[key]
    // })
    // const {colState} = this.store.getState()
    // Object.keys(colState).forEach((key) => {
    //   const $elem = this.$root.findAll(`[data-col="${key}"]`)
    //   $elem.forEach((elem) => {
    //     elem.style.width = `${colState[key]}px`
    //   })
    // })
  }


  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('error resize', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)

        const $cells = matrix(target, current)
            .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onClick(event) {
  }

  onMousemove() {}

  onMouseup() {}

  onKeyup(event) {}

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp']

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }
}
