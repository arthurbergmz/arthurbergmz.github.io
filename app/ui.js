import './style/_build.scss'
import getElements from './dom'
import initState from './state'

const appElements = getElements([
  'body', '.app-wrapper', '.app-menu', '.app-search-wrapper', '.js-app-header__search-button', '.app-search__input', '.app-search__clear-button', '.app-menu__header', '.app-menu__back-button', '.app-menu__show-button', '.app-menu__body', '.app-menu__body-wrapper'
])

const appState = initState(appElements)

appElements['.app-menu__header'].click((e, self) => {
  if (e.target !== self) {
    return e.preventDefault()
  }
  appState.menuOpen = !appState.menuOpen
})

appElements['.app-menu'].click((e, self) => {
  if (e.target !== self) {
    return e.preventDefault()
  }
  appState.menuOpen = false
})

appElements['.js-app-header__search-button'].click((e) => {
  e.preventDefault()
  appState.searchOpen = !appState.searchOpen
})

appElements['.app-search-wrapper'].click((e, self) => {
  if (e.target !== self) {
    return e.preventDefault()
  }
  appState.searchOpen = false
})

appElements['.app-search__clear-button'].click(() => {
  appState.searchInput = ''
  appElements['.app-search__input'].el.focus()
})

appElements['.app-search__input'].onEnter(() => {
  console.log(appState.searchInput)
  appState.searchOpen = false
})

appElements['.app-search__input'].onEsc(() => {
  appState.searchOpen = false
})

console.log('Hello, world!')