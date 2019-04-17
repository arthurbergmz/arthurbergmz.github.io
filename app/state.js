import reactivity from './reactivity'

module.exports = function (appElements) {
  const appProperties = Object.seal({
    mobileMenuMaxHeight: appElements['.app-menu__body'].el.getBoundingClientRect().height
  })
  return reactivity({
    menuOpen: {
      value: false,
      handler (_, value) {
        if (value) {
          appElements['.app-wrapper'].el.classList.add('app-wrapper--unfocused')
          appElements['.app-menu'].el.classList.add('app-menu--active')
          appElements['.app-menu__show-button'].el.classList.add('app-menu__show-button--show-less')
          if (appProperties.mobileMenuMaxHeight === 0) {
            // fix for when going from a large screen to a small screen. mobileMenuMaxHeight as 0 in large screens.
            appProperties.mobileMenuMaxHeight = appElements['.app-menu__body'].el.getBoundingClientRect().height
          }
          appElements['.app-menu__body-wrapper'].css('max-height', appProperties.mobileMenuMaxHeight + 'px')
          appElements['body'].css('overflow', 'hidden')
        } else {
          appElements['.app-wrapper'].el.classList.remove('app-wrapper--unfocused')
          appElements['.app-menu'].el.classList.remove('app-menu--active')
          appElements['.app-menu__show-button'].el.classList.remove('app-menu__show-button--show-less')
          appElements['.app-menu__body-wrapper'].css('max-height', 0)
          appElements['body'].css('overflow', 'auto')
        }
      }
    },
    searchOpen: {
      value: false,
      handler (_, value) {
        if (value) {
          appElements['.app-search-wrapper'].el.classList.add('app-search-wrapper--active')
          appElements['body'].css('overflow', 'hidden')
          appElements['.app-search__input'].el.focus()
        } else {
          appElements['body'].css('overflow', 'auto')
          appElements['body'].el.focus()
          appElements['.app-search-wrapper'].el.classList.remove('app-search-wrapper--active')
        }
      }
    },
    searchInput: {
      value: appElements['.app-search__input'].el,
      handler (_, value) {
        const clearButton = appElements['.app-search__clear-button'].el
        if (value && value.length > 0) {
          if (!clearButton.classList.contains('app-search__clear-button--visible')) {
            clearButton.classList.add('app-search__clear-button--visible')
          }
        } else if (clearButton.classList.contains('app-search__clear-button--visible')) {
          clearButton.classList.remove('app-search__clear-button--visible')
        }
      }
    }
  })
}
