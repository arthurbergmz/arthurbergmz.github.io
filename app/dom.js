module.exports = function (elements) {
  return elements.reduce((obj, query) => {
    const el = document.querySelector(query)
    obj[query] = {
      click: (handler) => el.addEventListener('click', (event) => handler(event, el)),
      css: (property, value) => value === undefined ? el.style[property] : el.style[property] = value === null ? 0 : value,
      onEnter: (handler) => el.addEventListener('keydown', (e) => {
        if (e.keyCode !== 13) return
        handler()
      }),
      onEsc: (handler) => el.addEventListener('keydown', (e) => {
        if (e.keyCode !== 27) return
        handler()
      }),
      el
    }
    return obj
  }, {})
}