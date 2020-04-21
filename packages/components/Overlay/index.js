import { PREFIX } from '../../config'
import Overlay from './src/Overlay'

Overlay.install = function (Vue) {
  Vue.component(`${PREFIX}${Overlay.name}`, Overlay)
}

export default Overlay
