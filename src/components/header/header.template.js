export function createHeader(textHeader) {
  return `
        <input type="text" class="input" value="${textHeader}" />
        <div>
          <div class="button">
            <i class="material-icons">delete</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
    `
}
