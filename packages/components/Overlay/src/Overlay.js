// Utils
import { isDefined } from '../../../utils'
import { preventDefault } from '../../../utils/dom/event'

export default {
  name: 'Overlay',
  mixins: [],
  components: {},
  data () {
    return {}
  },
  props: {
    show: Boolean, // 是否展示遮罩层
    duration: [Number, String], // 动画时长，单位秒；优先级高于自定义样式
    className: null, // 自定义类名
    customStyle: { // 自定义样式
      type: Object,
      default () {
        return {}
      }
    },
    zIndex: { // z-index 层级；优先级高于自定义样式
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    overlayStyle () {
      let { duration, customStyle, zIndex } = this
      let style = {
        ...customStyle,
        zIndex: zIndex
      }
      if (isDefined(duration)) {
        style.animationDuration = `${duration}s`
      }
      return style
    }
  },
  methods: {
    preventTouchMove (event) { // 阻止触屏
      preventDefault(event, true)
    },
    handleClick (event) {
      this.$emit('click', event)
    }
  },
  filters: {},
  watch: {},
  render (h) {
    let { show, className, overlayStyle } = this
    return h('transition', {
      props: {
        // name: 'cyui-fade',
        // appear: true
      }
    }, [
      h('div', {
        class: ['cyui-overlay', className],
        style: overlayStyle,
        directives: [{
          name: 'show',
          value: show
        }],
        on: {
          click: this.handleClick,
          touchmove: this.preventTouchMove
        }
      })
    ])
  },
  created () {
  },
  mounted () {
  }
}
