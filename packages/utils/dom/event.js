/**
 * 阻止事件冒泡
 * @param event
 */
export const stopPropagation = (event) => {
  event.stopPropagation()
}

/**
 * 阻止事件默认行为；isStopPropagation为true同时阻止事件冒泡
 * @param event
 * @param isStopPropagation
 */
export const preventDefault = (event, isStopPropagation) => {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}
