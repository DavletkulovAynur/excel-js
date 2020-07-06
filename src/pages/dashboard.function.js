function toHtml(key) {
  const {headerText, openedDate} = JSON.parse(localStorage.getItem(key))
  const id = key.split(':')[1]
  return (
    `<li class="db__record">
        <a onclick="${test()}" href="#excel/${id}">${headerText}</a>
        <strong>
            ${new Date(openedDate).toLocaleDateString()}/
            ${new Date(openedDate).toLocaleTimeString()}
        </strong>
    </li>`
  )
}

function test() {
  const date = new Date()
  const openData = `${date.getDate()}
                    .${date.getMonth() + 1}
                    .${date.getFullYear()}`
  return openData
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `Вы не создали не одной записи`
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
    ${keys.map(toHtml).join('')}
    </ul>`
}
