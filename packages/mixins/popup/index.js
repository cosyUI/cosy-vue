// Context
import { context } from './context'
import { handleClickOverlay, openOverlay, closeOverlay } from './overlay'

export const popupMixinProps = {
  value: Boolean, // 是否显示弹出框
  overlay: Boolean, // 是否显示遮罩层
  overlayClass: String, // 自定义遮罩层class名
  overlayStyle: Object, // 自定义遮罩层样式
  closeOnClickOverlay: Boolean, // 点击遮罩层是否关闭弹出框
  duration: [Number, String], // 弹出框动画持续时间
  zIndex: [Number, String],
  lockScroll: {
    type: Boolean,
    default: true
  },
  lazyRender: { // 是否懒加载
    type: Boolean,
    default: true
  }
}

export const PopupMixin = (options = {}) => {
  return {
    mixins: [],
    components: {},
    props: popupMixinProps,
    data () {
      return {
        inited: this.value, // 是否初始化
        opened: false // 是否打开了
      }
    },
    computed: {
      shouldRender () { // 是否渲染
        return this.inited || !this.lazyRender
      }
    },
    methods: {
      /**
       * 主要针对position是center的情况
       * 当position为center，默认弹出层是全屏覆盖遮罩层
       * 点击弹出层-回调处理
       */
      handleClickPopup () {
        if (this.overlay) {
          handleClickOverlay()
        }
      },
      /**
       * 打开弹出层
       */
      open () {
        if (this.opened) {
          return
        }

        // 覆盖默认zIndex
        if (this.zIndex !== undefined) {
          context.zIndex = this.zIndex
        }

        this.opened = true
        this.renderOverlay()
      },
      /**
       * 关闭弹出层
       */
      close () {
        if (!this.opened) {
          return
        }
        this.opened = false
        closeOverlay(this)
        this.$emit('input', false)
      },
      /**
       * 渲染遮罩层
       */
      renderOverlay () {
        if (!this.value) {
          return
        }
        this.$nextTick(() => {
          this.updateZIndex(this.overlay ? 1 : 0)

          if (this.overlay) {
            openOverlay(this, {
              zIndex: context.zIndex++,
              duration: this.duration,
              className: this.overlayClass,
              customStyle: this.overlayStyle
            })
          } else {
            closeOverlay(this)
          }
        })
      },
      /**
       * 更新弹出层的堆叠顺序
       * @param value
       */
      updateZIndex (value = 0) {
        this.$el.style.zIndex = ++context.zIndex + value
      }
    },
    filters: {},
    watch: {
      value (newVal, oldVal) {
        let type = newVal ? 'open' : 'close'
        this.inited = this.inited || newVal
        this[type]()

        if (!options.skipToggleEvent) {
          this.$emit(type)
        }
      },
      overlay: 'renderOverlay'
    },
    created () {
    },
    mounted () {
      if (this.value) {
        this.open()
      }
    },
    activated () {
      if (this.shouldReopen) {
        this.$emit('input', true)
        this.shouldReopen = false
      }
    },
    deactivated () {
      if (this.value) {
        this.close()
        this.shouldReopen = true
      }
    },
    beforeDestroy () {
      this.close()
    }
  }
}
