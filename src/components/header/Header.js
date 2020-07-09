import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from '@/components/header/header.template'
import * as actions from '@/redux/action'
import {$} from '@core/dom'
import {defaultTitle} from '@/constans'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(event) {
    const article = event.target.closest('article')
    if (!article) return
    const $target = $(article)
    if ($target.data.id === 'delete') {
      const decision = confirm('Вы действительно хотите удалить таблицу')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.id === 'exit_to_app') {
      ActiveRoute.navigate('')
    }
  }
}

