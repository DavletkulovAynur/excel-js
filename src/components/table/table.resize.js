import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom': 'right'
  let value

  $resizer.css({
    [sideProp]: '-5000px',
  })

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = Math.floor(e.pageX - coords.right)
      value = coords.width + delta
      if (value > 40) {
        $resizer.css({right: -delta + 'px'})
      }
    } else {
      const delta = Math.floor(e.pageY - coords.bottom)
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = (e) => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      cells.forEach((cell) => {
        cell.style.width = value + 'px'
      })
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      right: 0,
      bottom: 0,
    })
  }
}
