export function createHeader(textHeader) {
  return `
        <input type="text" class="input" value="${textHeader}" />
        <div>
          <article class="button" data-id="delete">
            <i class="material-icons">delete</i>
          </article>
          <article class="button" data-id="exit_to_app">
            <i class="material-icons">exit_to_app</i>
          </article>
        </div>
    `
}
