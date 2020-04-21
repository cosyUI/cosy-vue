import Vue from 'vue'

/**
 * mount functional component
 * @param Component
 * @param data
 * @returns {Vue|CombinedVueInstance<Vue, object, object, object, Record<never, any>>|*}
 */
export const mount = (Component, data) => {
  let instance = new Vue({
    el: document.createElement('div'),
    props: Component.props,
    render (h) {
      return h(Component, {
        props: this.$props,
        ...data
      })
    }
  })

  document.body.appendChild(instance.$el)

  return instance
}
