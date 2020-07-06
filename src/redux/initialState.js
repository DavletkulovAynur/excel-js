import {defaultStyles} from '@/constans'
import {clone} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  headerText: 'Новая Таблица',
  openedDate: new Date().toJSON(),
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
