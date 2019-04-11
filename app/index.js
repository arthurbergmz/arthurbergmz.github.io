import './style/_build.scss'

function getElements(elementClass) {
  return elementClass.reduce((obj, clazz) => {
    const el = document.querySelector(clazz)
    obj[clazz] = {
      click: (handler) => el.addEventListener('click', (event) => handler(event, el)),
      css: (property, value) => value === undefined ? el.style[property] : el.style[property] = value === null ? 0 : value,
      el
    }
    return obj
  }, {})
}

function reactivity (initialState) {
  const stateMachine = Object.getOwnPropertyNames(initialState).reduce((machine, property) => {
    const propertyObj = initialState[property]
    machine._state[property] = propertyObj.value
    machine._core[property] = { _lastValue: propertyObj.value, _handler: propertyObj.handler }
    return machine
  }, { _state: {}, _core: {} })
  return new Proxy(stateMachine._state, {
    set (target, property, value, receiver) {
      const propertyCore = stateMachine._core[property]
      propertyCore._handler((propertyCore._lastValue = target[property]), value)
      return Reflect.set(target, property, value, receiver)
    }
  })
}

const appElements = getElements([
  '.app-wrapper', '.app-menu', '.app-menu__header', '.app-menu__back-button', '.app-menu__show-button', '.app-menu__body', '.app-menu__body-wrapper'
])

const appProperties = Object.seal({
  mobileMenuMaxHeight: appElements['.app-menu__body'].el.getBoundingClientRect().height
})

const appState = reactivity({
  menuOpen: {
    value: false,
    handler (_, value) {
      if (value) {
        appElements['.app-wrapper'].el.classList.add('app-wrapper--unfocused')
        appElements['.app-menu'].el.classList.add('app-menu--active')
        appElements['.app-menu__show-button'].el.classList.add('app-menu__show-button--show-less')
        appElements['.app-menu__body-wrapper'].css('max-height', appProperties.mobileMenuMaxHeight + 'px')
      } else {
        appElements['.app-wrapper'].el.classList.remove('app-wrapper--unfocused')
        appElements['.app-menu'].el.classList.remove('app-menu--active')
        appElements['.app-menu__show-button'].el.classList.remove('app-menu__show-button--show-less')
        appElements['.app-menu__body-wrapper'].css('max-height', 0)
      }
    }
  }
})

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

console.log('Hello, world!')