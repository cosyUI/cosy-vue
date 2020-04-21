import { PREFIX } from '../../config'
import Popup from './src/Popup'

Popup.install = function (Vue) {
  Vue.component(`${PREFIX}${Popup.name}`, Popup)
}

export default Popup
