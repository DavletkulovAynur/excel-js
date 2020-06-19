function toButton(button) {
  const meta = `
      data-type="button"
      data-value='${JSON.stringify(button.value)}'
    `
  return `
        <div 
            class="button ${button.active ? 'active' : ''}"
            ${meta}>
            <i ${meta}  class="material-icons">${button.icon}</i>
        </div>
    `
}

export function createToolbar(state) {
  let obj
  switch (state['textAlign']) {
    case `left`:
      obj = {left: true, center: false, right: false}
      break
    case `center`:
      obj = {left: false, center: true, right: false}
      break
    case `right`:
      obj = {left: false, center: false, right: true}
      break
    default:
      obj = {left: true, center: false, right: false}
  }
  const buttons = [
    {
      icon: 'format_align_left',
      active: obj.left,
      value: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: obj.center,
      value: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      active: obj.right,
      value: {textAlign: 'right'},
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration:
          state['textDecoration'] === 'underline' ? 'normal' : 'underline'},
    },
  ]
  return buttons.map(toButton).join('')
}
