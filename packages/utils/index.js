/**
 * 判断值是否定义
 * @param obj
 * @returns {boolean}
 */
export const isDefined = (obj) => {
  return obj !== null && obj !== undefined
}

/**
 * 获取单例-通用的惰性单例
 * @param fn
 * @returns {function(): *}
 */
export const getSingleton = (fn) => {
  let result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}
