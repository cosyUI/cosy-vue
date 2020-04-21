import Overlay from '../../components/Overlay'

// Utils
import { getSingleton } from '../../utils/index'
import { mount } from '../../utils/functional'

// Context
import { context } from './context'

let defaultConfig = {
  className: '',
  customStyle: {}
}

/**
 * 点击遮罩层-回调处理
 */
export const handleClickOverlay = (event) => {
  let { stack } = context
  if (stack.peek()) {
    let { vm } = stack.peek()
    vm.$emit('click-overlay')

    if (vm.closeOnClickOverlay) {
      if (vm.onClickOverlay) {
        vm.onClickOverlay()
      } else {
        vm.close()
      }
    }
  }
}

/**
 * 设置初始化遮罩层方法
 * @type {function(): *}
 */
let initOverlay = getSingleton(function () {
  return mount(Overlay, {
    on: {
      click: handleClickOverlay
    }
  })
})

/**
 * 挂载遮罩层
 */
export const updateOverlay = () => {
  let { stack } = context
  let overlay = initOverlay() // 初始化遮罩层

  if (stack.peek()) {
    let { vm, config } = stack.peek()

    let el = vm.$el

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el)
    } else {
      document.body.appendChild(overlay.$el)
    }

    Object.assign(overlay, defaultConfig, config, {
      show: true
    })
  } else {
    overlay.show = false
  }
}

/**
 * 显示遮罩层
 * @param vm // 弹出层实例
 * @param config // 遮罩层的prop参数
 */
export const openOverlay = (vm, config) => {
  let { stack } = context
  let dataStore = stack.getData()
  if (!dataStore.some(item => item.vm === vm)) {
    stack.push({ vm, config })
    updateOverlay()
  }
}

/**
 * 隐藏遮罩层
 * @param vm // 弹出层实例
 */
export const closeOverlay = (vm) => {
  let { stack } = context
  if (!stack.isEmpty()) {
    if (stack.peek().vm === vm) {
      stack.pop()
      updateOverlay()
    } else {
      let dataStore = stack.getData()
      let filteredData = dataStore.filter(item => item.vm !== vm)
      stack.setData(filteredData)
    }
  }
}
