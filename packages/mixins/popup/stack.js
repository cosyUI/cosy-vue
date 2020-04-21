class Stack {
  constructor () {
    this.dataStore = []
  }

  /**
   * 获取数据
   * @returns {Array}
   * @api public
   */
  getData () {
    return this.dataStore
  }

  /**
   * 设置数据
   * @param data
   * @api public
   */
  setData (data = []) {
    this.dataStore = data
  }

  /**
   * 向栈中压入新元素
   * @param element
   * @api public
   */
  push (element) {
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
    return this.dataStore.pop()
  }

  /**
   * 预览栈顶元素，空栈返回 undefined
   * @returns {*}
   * @api public
   */
  peek () {
    return this.dataStore[this.size() - 1]
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
    return this.dataStore.length
  }

  /**
   * 清除栈内所有元素
   * @api public
   */
  clear () {
    this.dataStore = []
  }
}

export default Stack
