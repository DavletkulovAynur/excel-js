import {
  TABLE_RESIZE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  APPLY_STYLE,
  CHANGE_HEADER,
  UPDATE_DATE,
} from '@/redux/types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}

// value, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}

// header
export function changeHeader(data) {
  return {
    type: CHANGE_HEADER,
    data,
  }
}

export function updateDate() {
  return {
    type: UPDATE_DATE,
  }
}
