import {toInLineStyles} from '@core/utils'
import {defaultStyles} from '@/constans'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state = {}, index) {
  // console.log(state)
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const width = getWidth(state.colState, col)
    const styles = toInLineStyles({...defaultStyles, ...state.stylesState[id]})

    return `
    <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-value="${data || ''}"
        data-id="${row}:${col}"
        style="${styles}; width: ${width}"> 
        ${parse(data) || ''}
    </div>
  `
  }
}

function toColumn({col, index, width}) {
  return `
    <div    class="column" 
            data-type="resizable" 
            data-col="${index}"
            style="width: ${width}">
       ${col}
       <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function creatRow(index, content, rowState) {
  const height = getHeight(rowState, index)
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div 
        style="height: ${height}"
        data-row="${index}" 
        class="row" 
        data-type="resizable">
        <div class="row-info">
            ${index ? index : ''}
           ${resize}
        </div> 
        <div class="row-data">${content}</div>  
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    }
  }
}

export function creatTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // колонны (работа map ????????????)
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  // самая первая строка
  rows.push(creatRow(null, cols))

  // строки
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(creatRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
