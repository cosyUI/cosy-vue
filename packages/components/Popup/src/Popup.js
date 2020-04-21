// Utils
import { isDefined } from '../../../utils'
import { stopPropagation } from '../../../utils/dom/event'

import { PopupMixin } from '../../../mixins/popup/index'

export default {
  name: 'Popup',
  mixins: [PopupMixin()],
  components: {},
  props: {
    position: {
      type: String,
      default: 'center'
    },
    transition: String, // 动画类名，等价于 transition 的name属性
    duration: [Number, String], // 动画时长，单位秒
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: Boolean
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    handleClick (event) {
      stopPropagation(event)
      this.$emit('click', event)
    },
    handleOpened (event) {
      this.$emit('opened', event)
    },
    handleClosed (event) {
      this.$emit('closed', event)
    }
  },
  filters: {},
  watch: {},
  render (h) {
    if (!this.shouldRender) {
      return
    }

    let { value, position, transition, duration } = this
    let isCenter = position === 'center'

    let transitionName =
      transition ||
      (isCenter ? `cyui-popup-fade` : `cyui-popup-slide-${position}`)

    let style = {}
    if (isDefined(duration)) {
      style.animationDuration = `${duration}s`
    }

    let popupWrapper = h('div', {
      class: ['cyui-popup-wrapper'],
      on: {
        click: this.handleClick
      }
    }, this.$slots.default)

    return h('transition', {
      props: {
        name: transitionName,
        appear: true
      },
      on: {
        afterEnter: this.handleOpened,
        afterLeave: this.handleClosed
      }
    }, [
      h('div', {
        class: ['cyui-popup', `cyui-popup-${position}`],
        style: style,
        directives: [{
          name: 'show',
          value: value
        }],
        on: {
          click: this.handleClickPopup
        }
      }, [popupWrapper])
    ])
  },
  created () {
  },
  mounted () {
  }
}
