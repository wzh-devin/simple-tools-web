/**
 * 2025/1/6 13:23
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 全局注册图标
 * @version 1.0
 * @since 1.0
 */
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function registerIcon(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
