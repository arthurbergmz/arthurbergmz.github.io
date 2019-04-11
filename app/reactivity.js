module.exports = function (initialState) {
  const stateMachine = Object.getOwnPropertyNames(initialState).reduce((machine, property) => {
    const propertyObj = initialState[property]
    let value = propertyObj.value;
    let handler = propertyObj.handler;
    if (value instanceof HTMLInputElement) {
      const element = value
      const otherHandler = handler
      element.addEventListener('keyup', (e) => {
        const newValue = e.target.value
        otherHandler((machine._core[property]._lastValue = machine._state[property]), newValue)
        machine._state[property] = newValue
      })
      value = element.value
      handler = (oldValue, newValue) => {
        element.value = newValue
        otherHandler(oldValue, newValue)
      }
    }
    machine._state[property] = value
    machine._core[property] = { _lastValue: value, _handler: handler }
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