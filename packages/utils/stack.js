/**
 * 栈（stack）是一种遵循后进先出（Last In First Out, LIFO）的有序集合所构成的数据结构。
 */
class Stack {
  constructor () {
    /**
     * 保存栈内元素
     * @type {Array}
     * @api private
     */
    this.dataStore = []

    /**
     * 记录栈顶位置
     * @type {number}
     * @api public
     */
    this.top = 0
  }

  /**
   * 向栈中压入新元素
   * @param element
   * @api public
   */
  push (element) {
    this.top++
    this.dataStore.push(element)
  }

  /**
   * 从栈中弹出栈顶元素
   * @returns {T}
   * @throws {Error} when the stack is empty.
   * @api public
   */
  pop () {
    if (this.isEmpty()) throw new Error('栈是空的！')
    this.top--
    return this.dataStore.pop()
  }

  /**
   * 预览栈顶元素，空栈返回undefined
   * @returns {*}
   * @api public
   */
  peek () {
    return this.dataStore[this.top - 1]
  }

  /**
   * 检查栈是否为空
   * @returns {boolean}
   * @api public
   */
  isEmpty () {
    return this.size() === 0
  }

  /**
   * 获取栈内元素的个数
   * @returns {number}
   * @api public
   */
  size () {
    return this.top
  }

  /**
   * 清除栈内所有元素
   * @api public
   */
  clear () {
    this.dataStore = []
    this.top = 0
  }
}

export default Stack
