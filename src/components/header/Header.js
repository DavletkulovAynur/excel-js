import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from '@/components/header/header.template'
import * as actions from '@/redux/action'
import {$} from '@core/dom'
import {defaultTitle} from '@/constans'
import {debounce} from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().headerText || defaultTitle
    return createHeader(title)
  }

  onInput(event) {
    const data = $(event.target).text()
    this.$dispatch(actions.changeHeader(data))
  }
}


