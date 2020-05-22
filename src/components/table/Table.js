import {ExcelComponent} from '@core/ExcelComponent'
import {creatTable} from '@/components/table/table.template'
// import {$} from '@core/dom'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    })
  }
  toHTML() {
    return creatTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  onMousemove() {}

  onMouseup() {}
}
